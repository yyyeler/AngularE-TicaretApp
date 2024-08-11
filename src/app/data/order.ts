import { Product } from "./product";

export class Order
{
    id?: number;
    userId?: number;
    products?: Product[];
    totalCost?: number;
    address?: string;
    orderTime?: Date;
}