export interface Product{
    id:number;
    description:string;
    category:string;
    image:string;
    price:number | null;
    rating:Rating,
    title:string;
}

interface Rating {
    rate:number;
    count:number;
}

export interface AuthData {
    username:string;
    password:string
}