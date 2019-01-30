import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VesselSelectionComponent } from './vessel-selection.component';

describe('VesselSelectionComponent', () => {
  let component: VesselSelectionComponent;
  let fixture: ComponentFixture<VesselSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VesselSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VesselSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
