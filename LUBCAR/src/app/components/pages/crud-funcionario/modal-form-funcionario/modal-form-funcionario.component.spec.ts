import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFormFuncionarioComponent } from './modal-form-funcionario.component';

describe('ModalFormFuncionarioComponent', () => {
  let component: ModalFormFuncionarioComponent;
  let fixture: ComponentFixture<ModalFormFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalFormFuncionarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalFormFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
