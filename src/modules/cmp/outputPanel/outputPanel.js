import { LightningElement, wire } from 'lwc';
import {
  connectStore,
  store,
  deselectChildRelationship,
  clearQueryError
} from 'redux/store';
import { showToast } from 'base/toast';
import { I18nMixin } from 'service/i18n';

export default class OutputPanel extends I18nMixin(LightningElement) {
  response;
  childResponse;
  isLoading;

  _sObject;

  @wire(connectStore, { store })
  storeChange({ query, ui }) {
    this.isLoading = query.isFetching;
    if (query.data) {
      if (this.response !== query.data) {
        this.response = query.data;
        this._sObject = ui.query.sObject;
      }
    } else {
      this.response = undefined;
    }
    if (query.error) {
      console.error(query.error);
      showToast({
        message: this.i18n.OUTPUT_PANEL_FAILED_SOQL,
        errors: query.error
      });
      store.dispatch(clearQueryError());
    }
    this.childResponse = ui.childRelationship;
  }

  closeChildRelationship() {
    store.dispatch(deselectChildRelationship());
  }

  async exportCsv() {
    this.isLoading = true;
    try {
      const data = await this.template
        .querySelector('cmp-output-table.main-output')
        .generateCsv();
      const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
      const blob = new Blob([bom, data], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const download = document.createElement('a');
      download.href = window.URL.createObjectURL(blob);
      download.download = `${this._sObject}.csv`;
      download.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      showToast({
        message: this.i18n.OUTPUT_PANEL_FAILED_EXPORT_CSV,
        errors: e
      });
    }
    this.isLoading = false;
  }
}
