import { Usuario } from './usuario.model';
import { Paciente } from "./paciente.model";

export class Formulario {
  id?: number;
  paciente?: Paciente;
  responsavel?: Usuario;
  data?: string;

  pressaoArterial?: number;
  frequenciaCardiaca?: number;
  frequenciaRespiratoria?: number;
  temperatura?: number;
  auscultaCardiaca?: string;
  auscultaPulmonar?: string;

  exameFisicoPalpacao?: string;
  exameFisicoInspecao?: string;
  exameFisicoPerimetria?: string;
  exameFisicoTestesEspeciais?: string;
  exameFisicoGoniometria?: string;

  examesComplementares?: string;
  medicacao?: string;
  planoDeTratamento?: string;
  hipoteseDiagnostica?: string;
  diagnostico?: string;
}
