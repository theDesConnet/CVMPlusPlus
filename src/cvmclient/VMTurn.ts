import { VMUser } from "./VMUser";

/**
 * Класс очереди CollabVM
 */
export class VMTurn {
    Timer: NodeJS.Timer | undefined;
    TurnTime: number;
    hasTurn: boolean;
    users: VMUser[];

    /**
     * Конструктор нового класса VMTurn
     * @param turnTime - Время очереди
     * @param hasTurn - Имеет ли очередь
     */
    constructor(turnTime?: number, hasTurn?: boolean) {
        this.TurnTime = turnTime || -1;
        this.hasTurn = hasTurn || false;
        this.users = [];
    }

    /** */
    setTurnTime(time: number) {
        this.TurnTime = time;
        this.Timer = setInterval(() => {
            this.TurnTime -= 1000;
            if (this.TurnTime < 0) {
                this.TurnTime = -1;
                clearInterval(this.Timer);
            }
        }, 1000);
    }
}