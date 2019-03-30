import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBlueprintComponent } from './edit-blueprint.component';

describe('EditBlueprintComponent', () => {
  let component: EditBlueprintComponent;
  let fixture: ComponentFixture<EditBlueprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBlueprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBlueprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
