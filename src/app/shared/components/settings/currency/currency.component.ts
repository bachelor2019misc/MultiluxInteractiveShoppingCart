import { Component, OnInit, ViewChild } from '@angular/core';
import { CurrencyService } from '../../../services/currency/currency.service';
import { Currency } from '../../../models/currency.model';
import { Globals } from '../../../utils/globals';
import { MatTableDataSource, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'settings-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {

  form: FormGroup;
  currencies: Currency[] = [];
  displayedColumns = ['title', 'value', 'default', 'delete'];
  dataSource: MatTableDataSource<Currency> = new MatTableDataSource<Currency>();
  selection = new SelectionModel<Currency>(true, []);

  @ViewChild(MatSort) sort: MatSort;

  constructor(private currencyService: CurrencyService, private formBuilder: FormBuilder, private global: Globals) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.form = this.formBuilder.group({
      title: '',
      value: '',
      default: false
    });
    this.fillTableWithCurrencies();
  }

  fillTableWithCurrencies() {
    this.currencyService.getAll().subscribe(
      res => {
        console.log(res);
        this.currencies = res;
        this.dataSource.data = this.currencies;
      },
      err => {
        console.log("Error occured: ", err);
      }
    );
  }

  setAsDefault(currency: Currency) {
    currency.default = true;
    this.updateCurrency(currency);
  }

  updateCurrencyTitle(currency: Currency, title: string) {
    currency.title = title;
    this.updateCurrency(currency);
  }

  updateCurrencyValue(currency: Currency, value:number) {
    currency.value = value;
    this.updateCurrency(currency);
  }

  updateCurrency(currency: Currency) {
    this.currencyService.update(currency).subscribe(
      res => {
        console.log(res);
        this.fillTableWithCurrencies();
      },
      err => {
        console.log("Error occured: ", err);
      }
    );
  }

  deleteCurrency(currency: Currency) {
    this.currencyService.delete(currency).subscribe(
      res => {
        console.log(res);
        this.fillTableWithCurrencies();
      },
      err => {
        console.log("Error occured: ", err);
      }
    );
  }

  submit(form: any) {
    let newCurrency: Currency = new Currency();
    newCurrency.title = form.value.title;
    newCurrency.value = form.value.value;
    if (form.value.default) {
      newCurrency.default = form.value.default;
    }
    this.currencyService.create(newCurrency).subscribe(
      res => {
        console.log(res);
        this.fillTableWithCurrencies();
      },
      err => {
        console.log("Error occured: ", err);
      }
    );
  }
}
