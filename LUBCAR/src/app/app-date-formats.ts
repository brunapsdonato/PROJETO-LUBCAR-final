import { MatDateFormats } from '@angular/material/core';

export const APP_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'DD/MM/YYYY', // Formato esperado ao digitar
  },
  display: {
    dateInput: 'input', // Formato exibido no campo
    monthYearLabel: 'MM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MM YYYY',
  },
};
