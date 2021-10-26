import { Component } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class InvoiceComponent {
  constructor(private http : HttpClient) {};

  Customer: any = {
    "id": "",
    "logo": "",
    "from": "",
    "bill_to": "",
    "address": "",
    "date": ""
  };

  Items: any = {
    items: [],
    note: '',
  };

  OtherChanges: any = {
    "discount": 0,
    "tax_after_discount": 0,
    "shipping": 0,
    "prepaid": 0
  };

  Total: number = 0;
  AmountPaid: number = 0;

  TotalBalanceDue: number = 0;

  ngOnInit() {
    this.loadDataCustomer();
    this.loadDataItems();
    this.loadDataOtherChanges();
  }

  loadDataCustomer(): void {
    this.http.get<any>("../assets/json/customer.json")
      .subscribe((data: any) => {
        this.Customer = data;
      });
  };

  loadDataItems(): void {
    this.http.get<any>("../../../assets/json/items.json")
      .subscribe((data: any) => {
        this.Items = data;
      });
  };

  loadDataOtherChanges(): void {
    this.http.get<any>("../assets/json/other_changes.json")
      .subscribe((data: any) => {
        this.OtherChanges = data;
      })
  };

  setTotal(Total: number) {
    this.Total = Total;

    this.calBalanceDue();
  };

  setAmountPaid(AmountPaid: number) {
    this.AmountPaid = AmountPaid;

    this.calBalanceDue();
  }

  calBalanceDue() : void {
    let val = (this.Total - this.AmountPaid);

    this.TotalBalanceDue = val;
  };
}
