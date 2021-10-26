import { Component, Input, Output, EventEmitter } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'balance-inovice',
  templateUrl: './BalanceInvoice.component.html'
})

export class BalanceInovice {
  constructor(private http : HttpClient) {};

  @Input() Items: any = {
    items: [],
    note: '',
  };

  @Input() OtherChanges: any = {
    "discount": 0,
    "tax_after_discount": 0,
    "shipping": 0,
    "prepaid": 0
  };

  @Output() Total = new EventEmitter<number>();
  @Output() AmountPaid = new EventEmitter<number>();

  TotalAmount: number = 0;

  ngOnChanges() {
    this.totalAmount();
  }

  totalAmount() : void {
    let val = this.Items.items.reduce(
      function (total :number, item :any) {
        return total + (item.rate * item.quantity);
      },
      0
    );

    this.TotalAmount = val;
  };

  calDiscount() : string {
    const Discount = (this.TotalAmount * this.OtherChanges.discount).toFixed(2);

    return Discount;
  };

  calTaxAfterDiscout() :string {
    const TaxAfterDiscount = ((this.TotalAmount - parseFloat(this.calDiscount())) * this.OtherChanges.tax_after_discount).toFixed(2);

    return TaxAfterDiscount;
  };

  formatShipping() : string {
    let val = parseFloat(this.OtherChanges.shipping).toFixed(2);

    return val;
  };

  formatAmountPaid() :string {
    let val = parseFloat(this.OtherChanges.prepaid);

    this.AmountPaid.emit(val);

    return val.toFixed(2);
  };

  calTotal() : string {
    let val = (
      (this.TotalAmount - parseFloat(this.calDiscount())) +
      (parseFloat(this.calTaxAfterDiscout()) + parseFloat(this.formatShipping()) )
    );

    this.Total.emit(val);

    return val.toFixed(2);
  };

  handleSplitNumberWithDot(val : any) : string {
    val = val + '';
    const splitVal = val.split('.');

    if (splitVal.length > 1) {
      return `${this.formatMoney(splitVal[0])}.${splitVal[1]}`
    }

    return val;
  };

  formatMoney(val : any) : string {
    if (!val) {
      return '';
    };

    return val.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
}
