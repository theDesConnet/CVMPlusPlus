import { EventEmitter } from "events";
import { VMWebSocket } from "./VMWebSocket";

type VoteCount = { yes: Number, no: Number }

export class VMVote extends EventEmitter{
    Timer: NodeJS.Timer | undefined;
    Time: number | null;
    Votes: VoteCount | null;

    constructor(Server: VMWebSocket) {
        super();

        Server.on('vote', (vote, time, votesYes, votesNo) => {
            switch (Number(vote)) {
                case 3: return;
                case 2:
                    this.emit('voteEnd', this.Votes !== null && (this.Votes.yes > this.Votes.no) ? true : false);
                    this.clearVote();
                    break;
                
                case 1:
                    if (this.Timer !== null) {
                        if (this.Time == null) this.Time = Number(time);
                        this.Votes = { yes: votesYes, no: votesNo };
                        this.emit('voteUpdate', votesYes, votesNo, time);
                    }
                    break;

                case 0:
                    this.Timer = setInterval(() => {
                        if (this.Time !== null) {
                            this.Time -= 1000;
                            let seconds = Math.floor(this.Time / 1000)
                            if (seconds <= 0) this.clearVote();
                        } else this.clearVote();
                    }, 1000)
                    this.emit('voteStart');
                    break;
            }
        })
    }

    clearVote() {
        clearInterval(this.Timer);
        this.Votes = null;
        this.Time = null;
    }
}