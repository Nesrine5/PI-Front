
import { Evaluation } from "./evaluation";
import { Files } from "./files";

export interface Livrable {
    idLivrable?: number; // Make it optional if it might not be present during creation
    matricule: string;
    nom: string;
    prenom: string;
    etablissement: string;
    niveau: string;
    phoneNumber: string;
    adresse: string;
    ville: string;
    codePostal: string;
    email: string;
    evaluations: Evaluation[];
    files: Files[];
  //fileUrls: string[];
  }