import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubProductsComponent } from './sub-products.component';

describe('SubProductsComponent', () => {
  let component: SubProductsComponent;
  let fixture: ComponentFixture<SubProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
