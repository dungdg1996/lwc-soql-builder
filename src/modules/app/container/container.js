import { LightningElement, wire } from 'lwc';
import { connectStore, store, fetchSObjectsIfNeeded } from 'redux/store';
import { registerToastListener } from 'base/toast';
import { getConnection } from 'service/salesforce';

export default class Container extends LightningElement {
  isLoading;
  isLoggedIn = true;
  selectedSObject;

  get sobjectsPanelClass() {
    return this.selectedSObject ? 'slds-hide' : '';
  }

  @wire(connectStore, { store })
  storeChange({ ui }) {
    if (ui.selectedSObject) {
      this.selectedSObject = ui.selectedSObject;
    } else {
      this.selectedSObject = null;
    }
  }

  constructor() {
    super();
    getConnection();
    registerToastListener();
    store.dispatch(fetchSObjectsIfNeeded());
  }
}
