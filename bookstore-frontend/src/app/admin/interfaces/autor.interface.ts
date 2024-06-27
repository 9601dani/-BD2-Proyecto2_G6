export interface Autor {
  _id:        string;
  name:       string;
  photo:      string;
  biography:  string;
  active:     boolean;
}

export interface ResponseAutor {
  mesaage?:   string;
  value?:     Autor;
  deleted?:   Autor;
  updated?:   Autor;
}

export interface FileUploadResponse {
  fileName?     : string;
  error?        : string;
}
