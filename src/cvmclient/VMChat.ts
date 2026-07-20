import { VM } from "./VM";

/**
 * Класс чата CollabVM
 */
export class VMChat {
    chatSound: any;
    vm: VM;
    
    constructor(sound: string, VM: VM) {
        this.chatSound = sound;
        this.vm = VM;
    }

    /**
     * Отправка сообщения в чат
     * 
     * @param text - Текст сообщения 
     */
    sendMessage(text: string) {
        this.vm.server.send(['chat', text]);
    }
}