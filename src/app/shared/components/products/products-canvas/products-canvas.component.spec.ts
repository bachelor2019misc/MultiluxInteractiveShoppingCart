import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsCanvasComponent } from './products-canvas.component';

describe('RoomSelectionComponent', () => {
  let component: ProductsCanvasComponent;
  let fixture: ComponentFixture<ProductsCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsCanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
