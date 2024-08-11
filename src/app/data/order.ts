import { Product } from "./product";

export class Order
{
    id?: number;
    userId?: number;
    products?: Product[];
    orderTime?: Date;
}