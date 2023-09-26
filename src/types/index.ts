export interface Product{
    id?:number;
    description?:string;
    category?:string;
    image?:string;
    price?:number;
    rating?:Rating,
    title?:string;
}
export interface NewProduct extends Partial<Product> {

}

interface Rating {
    rate:number;
    count:number;
}

export interface AuthData {
    username:string;
    password:string
}