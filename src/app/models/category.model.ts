import { Image } from "./image.model";

export class Category{
    catNo!: number;
    catNameAr!: string;
    catNameEn!: string;
    catDsc!: string;
    catDscAr!: string;
    catDscEn!: string;
    categoryName!: string;
    images!:Array<Image>;
  }
  
