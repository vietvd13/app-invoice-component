import { Component, Input } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'body-inovice',
  templateUrl: './BodyInvoice.component.html'
})

export class BodyInovice {
  constructor(private http : HttpClient) {};

  @Input() Items: any = {
    items: [],
    note: '',
  };

  handleSplitNumberWithDot(val : any) : string {
    val = val + '';
    const splitVal = val.split('.');

    if (splitVal.length > 1) {
      return `${this.formatMoney(splitVal[0])}.${splitVal[1]}`
    } else {
      return val;
    }
  };

  formatMoney(val : any) : string {
    if (!val) {
      return '';
    };

    return val.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
}
