/* eslint-disable @typescript-eslint/no-unused-expressions */
import { VMWebSocket, VMOptions } from "./VMWebSocket";
import { VMUser, UserOptions } from "./VMUser";
import { VMChat } from "./VMChat";
import { VMDisplay } from "./VMDisplay";
import { VMVote } from "./VMVote";
import { useState } from 'react';
import { VMTurn } from "./VMTurn";

const Keys: {[key: string]: number[] | null} = {
    Again: [65382],
    AllCandidates: [65341],
    Alphanumeric: [65328],
    Alt: [65513, 65513, 65027],
    Attn: [64782],
    AltGraph: [65027],
    ArrowDown: [65364],
    ArrowLeft: [65361],
    ArrowRight: [65363],
    ArrowUp: [65362],
    Backspace: [65288],
    CapsLock: [65509],
    Cancel: [65385],
    Clear: [65291],
    Convert: [65313],
    Copy: [64789],
    Crsel: [64796],
    CrSel: [64796],
    CodeInput: [65335],
    Compose: [65312],
    Control: [65507, 65507, 65508],
    ContextMenu: [65383],
    DeadGrave: [65104],
    DeadAcute: [65105],
    DeadCircumflex: [65106],
    DeadTilde: [65107],
    DeadMacron: [65108],
    DeadBreve: [65109],
    DeadAboveDot: [65110],
    DeadUmlaut: [65111],
    DeadAboveRing: [65112],
    DeadDoubleacute: [65113],
    DeadCaron: [65114],
    DeadCedilla: [65115],
    DeadOgonek: [65116],
    DeadIota: [65117],
    DeadVoicedSound: [65118],
    DeadSemivoicedSound: [65119],
    Delete: [65535],
    Down: [65364],
    End: [65367],
    Enter: [65293],
    EraseEof: [64774],
    Escape: [65307],
    Execute: [65378],
    Exsel: [64797],
    ExSel: [64797],
    F1: [65470],
    F2: [65471],
    F3: [65472],
    F4: [65473],
    F5: [65474],
    F6: [65475],
    F7: [65476],
    F8: [65477],
    F9: [65478],
    F10: [65479],
    F11: [65480],
    F12: [65481],
    F13: [65482],
    F14: [65483],
    F15: [65484],
    F16: [65485],
    F17: [65486],
    F18: [65487],
    F19: [65488],
    F20: [65489],
    F21: [65490],
    F22: [65491],
    F23: [65492],
    F24: [65493],
    Find: [65384],
    GroupFirst: [65036],
    GroupLast: [65038],
    GroupNext: [65032],
    GroupPrevious: [65034],
    FullWidth: null,
    HalfWidth: null,
    HangulMode: [65329],
    Hankaku: [65321],
    HanjaMode: [65332],
    Help: [65386],
    Hiragana: [65317],
    HiraganaKatakana: [65319],
    Home: [65360],
    Hyper: [65517, 65517, 65518],
    Insert: [65379],
    JapaneseHiragana: [65317],
    JapaneseKatakana: [65318],
    JapaneseRomaji: [65316],
    JunjaMode: [65336],
    KanaMode: [65325],
    KanjiMode: [65313],
    Katakana: [65318],
    Left: [65361],
    Meta: [65511, 65511, 65512],
    ModeChange: [65406],
    NumLock: [65407],
    PageDown: [65366],
    PageUp: [65365],
    Pause: [65299],
    Play: [64790],
    PreviousCandidate: [65342],
    PrintScreen: [64797],
    Redo: [65382],
    Right: [65363],
    RomanCharacters: null,
    Scroll: [65300],
    Select: [65376],
    Separator: [65452],
    Shift: [65505, 65505, 65506],
    SingleCandidate: [65340],
    Super: [65515, 65515, 65516],
    Tab: [65289],
    Up: [65362],
    Undo: [65381],
    Win: [65515],
    Zenkaku: [65320],
    ZenkakuHankaku: [65322]
}

export class VM {
    server: VMWebSocket;
    users: Array<VMUser>;
    chat: VMChat;
    display: VMDisplay;
    vote: VMVote;
    turn: VMTurn;
    currentUser: VMUser;

    constructor(options: VMOptions, user: UserOptions, ViewControl?: JSX.Element) {
        this.server = new VMWebSocket(options, this);
        this.currentUser = new VMUser(user);

        this.server.on("connect", () => {
            console.log(`[INFO] Connected!`)
            this.display = new VMDisplay(this.server);
            this.chat = new VMChat("", this);
            this.vote = new VMVote(this.server);
            this.turn = new VMTurn();
            this.users = [];

            this.vote.on('voteStart', () => {
                ViewControl
            }).on('voteEnd', (hasWon) => {
                console.log(`[INFO] Ended vote for VM Reset [Result: ${hasWon ? "Won" : "Lose"}]`);
            }).on('voteUpdate', (yes, no, time) => {
                console.log(`[INFO] Vote has been updated [${yes}:${no} | Time: ${time}]`);
            })
        });

        this.server.on('unhandled', (data) => {
            console.log(data)
        }).on('addUser', (user) => {
            this.users.push(user);
            console.log(`[INFO] New user: ${user.Name}`);
        }).on('remUser', (user) => {
            this.users = this.users.filter(x => x.Name !== user)
            console.log(`[INFO] User leave: ${user}`);
        }).on('message', (user, msg) => {
            console.log(`[INFO] New Message: ${user !== "" ? `${user}:`: ""} ${msg}`);
        }).on('turn', (turnList, time, youTurnTime) => {
            console.log(turnList, time, youTurnTime);
        })
    }

    convertKeys(keysyms: string, keycode: number, keysym: string, mod: number[]) {
        function o(e: string | null, t: number[]) {
          if (!e) return null;
          let n: string, r: number, o = e.indexOf("U+");
          if (o >= 0) {
            let i = e.substring(o + 2);
            n = String.fromCharCode(parseInt(i, 16));
          } else {
            if (1 !== e.length) return a(Keys[e] ?? null, t);
            n = e;
          }
          return (r = n.charCodeAt(0)) <= 31 || (r >= 127 && r <= 159) ? 65280 | r : r >= 0 && r <= 255 ? r : r >= 256 && r <= 1114111 ? 16777216 | r : null;
        }
        function a(e: number[] | null, t: number[]) {
            return e ? e[t[0]] : null;
        }
        let ks = o(keysym, mod);
        if (!ks) {
          ks = o(keysym, mod);
        }
        return ks;
      }

    setVote(reset: boolean) {
        this.server.send(['vote', reset ? '1' : '0']);
    }

    setTurn(take: boolean) {
        this.server.send(take ? ['turn'] : ['turn', '0']);
    }

    exit() {
        this.server.removeAllListeners();
        this.server.disconnect();
    }
}