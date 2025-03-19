import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalViewInsumoComponent } from './modal-view-insumo.component';

describe('ModalViewInsumoComponent', () => {
  let component: ModalViewInsumoComponent;
  let fixture: ComponentFixture<ModalViewInsumoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalViewInsumoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalViewInsumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
