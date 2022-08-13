import { LightningElement, wire } from 'lwc';
import { connectStore, store } from 'redux/store';
import * as salesforce from 'service/salesforce';
import { I18nMixin } from 'service/i18n';
export default class Header extends I18nMixin(LightningElement) {
  isLoggedIn = true;
  _user;
  _apiUsage;

  get userLabel() {
    if (!this._user) return '';
    return `${this._user.name}(${this._user.preferred_username})`;
  }

  get apiUsage() {
    if (!this._apiUsage) return '';
    return `${this._apiUsage.used}/${this._apiUsage.limit}`;
  }

  @wire(connectStore, { store })
  storeChange({ ui }) {
    // this.isLoggedIn = ui.isLoggedIn;
    // this._user = salesforce.connetion.userInfo;
    // this._apiUsage = salesforce.connetion.limitInfo.apiUsage;
  }

  logout() {
    salesforce.logout();
  }
}
