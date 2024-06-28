import { Libro } from "./libro.interface";

export interface ReporteExit {
  _id: string;
  total: number;
  book_details: Libro
}
