import { NativeDateAdapter } from '@angular/material/core';

export class AppDateAdapter extends NativeDateAdapter {
  override format(date: Date, displayFormat: Object): string {
    const day = date.getDate().toString().padStart(2, '0'); // Dia com 2 dígitos
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Mês com 2 dígitos
    const year = date.getFullYear();

    if (displayFormat === 'input') {
      return `${day}/${month}/${year}`; // Formato dd/MM/yyyy
    }
    return date.toDateString();
  }
}
