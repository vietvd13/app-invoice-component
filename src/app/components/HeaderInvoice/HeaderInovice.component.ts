import { Component, Input } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'header-inovice',
  templateUrl: './HeaderInovice.component.html'
})

export class HeaderInovice {
  constructor(private http : HttpClient) {};

  @Input() Customer: any = {
    "id": "",
    "logo": "",
    "from": "",
    "bill_to": "",
    "address": "",
    "date": ""
  };

  @Input() TotalBalanceDue: number = 0;

  validateMMDDYYYY(val : string) : boolean {
    if (!val) {
      return false;
    }

    const re = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;

    return re.test(val);
  };

  formatDate(val : string) : string {
    if (!val) {
      return '';
    };

    if (!this.validateMMDDYYYY(val)) {
      const split = val.split('/');
      let textMonth = '';

      switch (split[0]) {
        case '01':
        case '1': {
          textMonth = 'Jan';

          break;
        };

        case '02':
        case '2': {
          textMonth = 'Feb';

          break;
        };

        case '03':
        case '3': {
          textMonth = 'Mar';

          break;
        };

        case '04':
        case '4': {
          textMonth = 'Apr';

          break;
        };

        case '05':
        case '5': {
          textMonth = 'May';

          break;
        };

        case '06':
        case '6': {
          textMonth = 'Jun';

          break;
        };

        case '07':
        case '7': {
          textMonth = 'Jul';

          break;
        };

        case '08':
        case '8': {
          textMonth = 'Aug';

          break;
        };

        case '09':
        case '9': {
          textMonth = 'Sep';

          break;
        };
        case '10': {
          textMonth = 'Oct';

          break;
        };

        case '11': {
          textMonth = 'Nov';

          break;
        };

        case '12': {
          textMonth = 'Dec';

          break;
        }

        default: {
          textMonth = '';
        };
      };

      return `${textMonth} ${split[1]}, ${split[2]}`;
    };

    return '';
  };

  handleSplitNumberWithDot(val : any) : string {
    val = val.toFixed(2);

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
