export interface arrangementer {
  id: string;
  documentId: string;
  Type: string;
  Tittel: string;
  Tidspunkt: string;
  Ingress: string;
  Beskrivelse: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  Lokasjon: Lokasjon;
  Bilde: Bilde;
}

export interface Lokasjon {
  id: string;
  documentId: string;
  Navn: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface Bilde {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    large: {
      ext: string;
      url: string;
      hash: string;
      mime: string;
      name: string;
    };
    small: {
      ext: string;
      url: string;
      hash: string;
      mime: string;
      name: string;
    };
    medium: {
      ext: string;
      url: string;
      hash: string;
      mime: string;
      name: string;
    };
    thumbnail: {
      ext: string;
      url: string;
      hash: string;
      mime: string;
      name: string;
    };
  };
}
