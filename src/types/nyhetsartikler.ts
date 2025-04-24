export default interface nyhetsartikler {
  id: number;
  ducomentId: string;
  Tittel: string;
  Ingress: string;
  Innhold: string;
  Dato: string;
  Bilde: Bilde;
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
    small: {
      ext: string;
      url: string;
      hash: string;
      mime: string;
      name: string;
      
    },
    medium: {
      ext: string;
      url: string;
      hash: string;
      mime: string;
      name: string;
    },
    thumbnail: {
      ext: string;
      url: string;
      hash: string;
      mime: string;
      name: string;
    }
  };
}