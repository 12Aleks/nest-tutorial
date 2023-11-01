import {Exclude} from "class-transformer";

export interface Index {
    username: string;
    password: string;
}

export class SerializedUser{
    username: string;

    //@Exclude() - password removed in replies
    @Exclude()
    password: string;

    constructor(partial: Partial<SerializedUser>) {
        Object.assign(this , partial)
    }
}