import { Product } from "./product";

export class User
{
    constructor(public id?: number,
                public username?: string, 
                public password?: string,
                public verifyPassword?: string,
                public name?: string,
                public surname?: string,
                public gender?: string,
                public birthDate?: Date,
                public profileImage?: string,
                public email?: string,
                public cart? : Product[]
            ) {}
}
