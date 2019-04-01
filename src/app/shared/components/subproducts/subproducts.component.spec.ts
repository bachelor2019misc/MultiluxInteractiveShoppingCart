import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubproductsComponent } from './subproducts.component';

describe('ProductComponent', () => {
  let component: SubproductsComponent;
  let fixture: ComponentFixture<SubproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
