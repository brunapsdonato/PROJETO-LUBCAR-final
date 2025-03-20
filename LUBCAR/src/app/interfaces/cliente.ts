export interface Cliente {
  firebaseId?: string;  // ID do documento no Firestore
  nome: string;
  cpf: string;
  email: string;
  carroModelo: string;
  ano: number;
  data: string;
  servico: string;
  valor: number;
  // Definindo o histórico como um array de objetos (adicione os campos conforme necessário)
  historico: Array<{
    data: string;
    servico: string;
    valor: number;
  }>;

}
