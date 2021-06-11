import { Image } from "./image.model";


export class About {
    aboutNo!: number;
    enabled!: boolean;
    orderNo!: number;
    aboutTxtAr!: string;
    aboutTxtEn!: string;
    images!:Array<Image>;
}
