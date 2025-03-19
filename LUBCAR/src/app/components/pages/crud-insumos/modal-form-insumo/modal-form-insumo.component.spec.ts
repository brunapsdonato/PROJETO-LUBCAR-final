import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFormInsumoComponent } from './modal-form-insumo.component';

describe('ModalFormInsumoComponent', () => {
  let component: ModalFormInsumoComponent;
  let fixture: ComponentFixture<ModalFormInsumoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalFormInsumoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalFormInsumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
