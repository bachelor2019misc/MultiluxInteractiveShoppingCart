import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVesselComponent } from './edit-vessel.component';

describe('AddVesselComponent', () => {
  let component: EditVesselComponent;
  let fixture: ComponentFixture<EditVesselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVesselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVesselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
