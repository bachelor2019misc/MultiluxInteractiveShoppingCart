import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RoomsCanvasComponent } from './rooms-canvas.component';

describe('RoomSelectionComponent', () => {
  let component: RoomsCanvasComponent;
  let fixture: ComponentFixture<RoomsCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomsCanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomsCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
