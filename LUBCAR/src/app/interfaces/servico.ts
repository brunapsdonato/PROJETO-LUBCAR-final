import { Cliente } from './cliente';
export interface Servico {
    id?: string;  // ID do documento 
    data: string;
    servico: string;
    valor: number;
    cliente: Cliente;
  }
  