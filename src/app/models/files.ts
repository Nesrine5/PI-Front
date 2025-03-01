import { Evaluation } from "./evaluation";


export interface Files {
    fileId?: string;
    name: string;
    type: string;
    url: string;
    size: number;
    livrableNom?:string;
    livrablePrenom?:string;
    livrableNote?: number;
    livrableEvaluations: Evaluation[];
  
    }