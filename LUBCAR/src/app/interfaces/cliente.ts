export interface Cliente {
  firebaseId?: string;
  nome: string;
  carroModelo: string;
  ano: number;
  data: Date;
  servico: string;
  cpf: string;
  email: string;
  valor: number;
}
