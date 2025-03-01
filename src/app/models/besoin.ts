import { FileHandle } from "./file-handle.model";


export enum TypeBesoin {
  Affiche,
  Logo,
  Badge,
  Brochure
}
export class Besoin {
   besoinId: number;
    title: string;
    description: string;
    date: Date;
    image: FileHandle[] = [];
    isEditing?: boolean;
    starRating?:number;
    type?:string;
    //type?:TypeBesoin;
    imagePath?: string;
  }