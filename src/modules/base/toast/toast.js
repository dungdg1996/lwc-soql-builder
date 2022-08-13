import { LightningElement, api } from 'lwc';
import { reduceErrors, getErrorDetails } from 'base/utils';

export * from './toast-manager';
export default class Toast extends LightningElement {
  @api message;
  @api errors;

  viewDetails = false;

  get errorMessages() {
    return reduceErrors(this.errors);
  }

  get errorDetails() {
    return getErrorDetails(this.errors);
  }

  handleCheckboxChange(event) {
    this.viewDetails = event.target.checked;
  }

  handleClose() {
    this.template.host.remove();
  }
}
