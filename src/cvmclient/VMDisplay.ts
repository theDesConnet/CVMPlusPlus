import { VMWebSocket } from "./VMWebSocket";

type Size = {x: Number | null, y: Number | null};

enum KeyCodes {
    Null = 0,
    RightBtn = 1
}

type Mouse = {
    position: Size,
    keyCode: KeyCodes
}

/**
 * Класс дисплея CollabVM
 */
export class VMDisplay {
    size: Size;
    canvas: any;
    mouse: Mouse;

    constructor(VM: VMWebSocket) {
        this.size = { x: null, y: null };
        this.mouse = {
            position: { x: null, y: null },
            keyCode: KeyCodes.Null
        }
    }

    setSize(x: Number, y: Number) {
        this.size = { x, y };

    }
}