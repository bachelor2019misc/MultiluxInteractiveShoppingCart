import { Injectable } from '@angular/core';
import { RestService } from '../rest/rest.service';
import { Currency } from '../../models/currency.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private rest: RestService) {}

  getAll():Observable<Currency[]> {
    return this.rest.httpGet('currency');
  }

  create(currency:Currency):Observable<Currency> {
    return this.rest.httpPost('currency', currency);
  }

  update(currency:Currency):Observable<Currency> {
    if(currency.idCurrency !== undefined) {
      return this.rest.httpPut('currency/' + currency.idCurrency, currency);
    }
  }

  delete(currency:Currency):Observable<Currency> {
    return this.rest.httpDelete('currency/' + currency.idCurrency);
  }
}
