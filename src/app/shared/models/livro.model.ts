import { Assunto } from "./assunto.model";
import { Autor } from "./autor.model";

export interface LivroCreate {
    codL: number;
    titulo: string;
    editora: string;
    edicao: number;
    anoPublicacao: string;
    autoresIds: number[];
    assuntosIds: number[];
  }
  
  export interface LivroRead {
    codL: number;
    titulo: string;
    editora: string;
    edicao: number;
    anoPublicacao: string;
    autores: Autor[];
    assuntos: Assunto[];
}

export function mapLivroReadToCreate(dto: LivroRead): LivroCreate {
  return {
    codL: dto.codL,
    titulo: dto.titulo,
    editora: dto.editora,
    edicao: dto.edicao,
    anoPublicacao: dto.anoPublicacao,
    autoresIds: dto.autores.map(a => a.codAu),
    assuntosIds: dto.assuntos.map(a => a.codAs)
  };
}
