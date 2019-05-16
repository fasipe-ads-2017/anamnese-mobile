export class Paciente {
  _id?: string;
  nome?: string;
  cpf?: string;
  rg?: string;
  sexo?: string;
  telefone?: string;
  dataNascimento?: string;

  responsavel?: string;
  cep?: string;
  endereco?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
}

export class Foto {
  _id?: string;
  foto?: string;
}
