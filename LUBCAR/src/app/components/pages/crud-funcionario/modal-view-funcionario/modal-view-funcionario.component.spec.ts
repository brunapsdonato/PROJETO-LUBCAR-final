import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalViewFuncionarioComponent } from './modal-view-funcionario.component';

describe('ModalViewFuncionarioComponent', () => {
  let component: ModalViewFuncionarioComponent;
  let fixture: ComponentFixture<ModalViewFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalViewFuncionarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalViewFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
