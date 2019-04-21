import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubProduct } from '../../models/sub-product.model';
import { RestService } from '../rest/rest.service';

@Injectable({
  providedIn: 'root'
})
export class SubproductService {

  constructor(private rest: RestService) {}

  getAll():Observable<SubProduct[]> {
    return this.rest.httpGet('subproduct');
  }

  create(subproduct:SubProduct):Observable<SubProduct> {
    return this.rest.httpPost('subproduct', subproduct);
  }

  update(subproduct:SubProduct):Observable<SubProduct> {
    if(subproduct.idSubproduct !== undefined) {
      return this.rest.httpPut('subproduct/' + subproduct.idSubproduct, subproduct);
    }
  }

  delete(subproduct:SubProduct):Observable<SubProduct> {
    return this.rest.httpDelete('subproduct/' + subproduct.idSubproduct);
  }
}
