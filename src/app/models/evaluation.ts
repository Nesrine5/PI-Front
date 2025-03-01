import { Besoin } from "./besoin";
import { Livrable } from "./livrable";

export class Evaluation {
    idEvaluation: number;
    etat: string;
    date: Date;
    livrable?: {
        id_livrable: number;
        nom: string;
        prenom: string;
        email: string;
      };
    besoin: Besoin;
     starRating:number;
     besoinTitle?:string;
  }