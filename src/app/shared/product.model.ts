import { MobileDesc } from './mobile-desc.model';

export interface Product {
     id?: string,
     mobileBrand: string,
     mobileName: string,
     mobileModel: string,
     mobilePrice: number,
     mobileImgPath: string,
     description: MobileDesc

}
