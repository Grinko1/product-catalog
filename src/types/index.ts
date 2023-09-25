export interface Product{
    id:number;
    description:string;
    category:string;
    image:string;
    price:number;
    rating:Rating,
    title:string;
}
export interface NewProduct {
    description?:string;
    category?:string;
    image?:string;
    price?:number;
    title?:string;
}

interface Rating {
    rate:number;
    count:number;
}

export interface AuthData {
    username:string;
    password:string
}