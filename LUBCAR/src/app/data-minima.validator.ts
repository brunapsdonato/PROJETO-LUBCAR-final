import { AbstractControl, ValidatorFn } from '@angular/forms';

export function dataMinimaValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    const dataSelecionada = new Date(control.value);
    const dataAtual = new Date();

    dataAtual.setHours(0, 0, 0, 0);
    dataSelecionada.setHours(0, 0, 0, 0);

    return dataSelecionada >= dataAtual ? null : { dataInvalida: true };
  };
}
