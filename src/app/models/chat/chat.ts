import { Message } from "./message";
import { User } from "./user";

export class Chat {

    chatId: Number;
    firstUserName: string;
    secondUserName: string;
    messageList?: Message[];
    id: number;
    messages?: Message[];
    users?:User[];
    constructor() {

    }
}
