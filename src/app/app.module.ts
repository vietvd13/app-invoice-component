import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { InvoiceComponent } from './Invoice.component';

import { HeaderInovice } from './components/HeaderInvoice/HeaderInovice.component';
import { BodyInovice } from "./components/BodyInvoice/BodyInvoice.component";
import { BalanceInovice } from './components/BalanceInvoice/BalanceInovice.component'

@NgModule({
  imports: [BrowserModule, HttpClientModule, FormsModule],
  declarations: [InvoiceComponent, HeaderInovice, BodyInovice, BalanceInovice],
  bootstrap: [InvoiceComponent]
})
export class AppModule {

}
