import { LightningElement, wire } from 'lwc';
import {
  connectStore,
  store,
  selectSObject,
  clearSObjectsError
} from 'redux/store';
import { showToast } from 'base/toast';
import { escapeRegExp } from 'base/utils';
import { I18nMixin } from 'service/i18n';

export default class SobjectsPanel extends I18nMixin(LightningElement) {
  keyword = '';
  sobjects;
  isLoading;

  _rawSObjects;

  get isNoSObjects() {
    return !this.isLoading && (!this.sobjects || !this.sobjects.length);
  }

  get isDisplayClearButton() {
    return this.keyword !== '';
  }

  @wire(connectStore, { store })
  storeChange({ sobjects }) {
    if (this._rawSObjects) return;
    this.isLoading = sobjects.isFetching;
    console.log(sobjects);
    if (sobjects.data) {
      this._rawSObjects = sobjects.data.sobjects.map(sobject => {
        return {
          ...sobject,
          itemLabel: `${sobject.name} / ${sobject.label}`
        };
      });
      this.sobjects = this._rawSObjects;
    } else if (sobjects.error) {
      console.error(sobjects.error);
      showToast({
        message: this.i18n.SOBJECTS_PANEL_FAILED_FETCH_SOBJECTS,
        errors: sobjects.error
      });
      store.dispatch(clearSObjectsError());
    }
  }

  setKeyword(event) {
    this.keyword = event.target.value;
    this.filterSObjects(this.keyword);
  }

  filterSObjects(keyword) {
    if (keyword) {
      const escapedKeyword = escapeRegExp(keyword);
      const keywordPattern = new RegExp(escapedKeyword, 'i');
      this.sobjects = this._rawSObjects.filter(sobject => {
        return keywordPattern.test(`${sobject.name} ${sobject.label}`);
      });
    } else {
      this.sobjects = this._rawSObjects;
    }
  }

  selectSObject(event) {
    const sObjectName = event.target.dataset.name;
    store.dispatch(selectSObject(sObjectName));
  }

  handleClear() {
    this.keyword = '';
    this.filterSObjects(this.keyword);
  }
}
