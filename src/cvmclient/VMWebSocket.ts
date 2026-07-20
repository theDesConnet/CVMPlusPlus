/* eslint-disable @typescript-eslint/no-unused-expressions */
import { WebsocketBuilder, Websocket } from 'websocket-ts/lib';
import { EventEmitter } from 'events'
import { VMUser, Permissions } from './VMUser';
import { VM } from './VM';
import { decodeGuac, encodeGuac } from './GuacUtils';

export type VMOptions = {
    IP: string,
    autoReconnect: boolean,
    secureWebSocket: boolean,
    VMName?: string
}

export type VMInfo = {
    name: string,
    title: string,
    image: string
}

export class VMWebSocket extends EventEmitter {
    IP: string;
    autoReconnect: boolean;
    ws: Websocket;

    constructor(options: VMOptions, VM?: VM) {
        super();

        this.IP = options.IP,
            this.autoReconnect = options.autoReconnect,
            //this.setMaxListeners(2);

            this.ws = new WebsocketBuilder(`${options.secureWebSocket ? "wss://" : "ws://"}${this.IP}`)
                .onOpen(() => {
                    if (options.VMName && VM !== undefined) this.connect(VM.currentUser.Name, options.VMName);
                    this.emit('connect', null);
                })
                .onMessage((i, e) => {
                    const d = decodeGuac(e.data.toString());
                    switch (d[0]) {
                        case 'nop': return this.send(['nop']);
                        case 'adduser':
                            for (let i = 2; i < d.length; i += 2) {
                                const p: Permissions = Number(d[i + 1]);
                                this.emit("addUser", new VMUser({ Name: d[i], Permission: p }));
                            }
                            break;

                        case 'remuser':
                            for (let i = 2; i < d.length; i++) {
                                this.emit("remUser", d[i++]);
                            }
                            break;

                        case 'rename':
                            this.emit('rename', d[2], d[3], Number(d[1]) === 0 ? true : false);
                            break;

                        case 'chat':
                            this.emit('message', d[1], d[2]);
                            break;

                        case 'vote':
                            this.emit('vote', d[1], d[2] ?? null, d[3] ?? null, d[4] ?? null);
                            break;

                        case 'turn':
                            if (Number(d[2]) === 0) this.emit('turn', null, d[1], d[2]);
                            else {
                                let turnUsers: string[] = [];
                                for (let i = 3; i < Number(d[2]) + 3; i++) {
                                    turnUsers.push(d[i]);
                                }
                                this.emit('turn', turnUsers, Number(d[1]), turnUsers.some(x => VM?.currentUser.Name == x) ? Number(d[d.length -1]) : null);
                            }
                            break;

                        case 'png':
                            /**
                             * Обьяснение что к чему :3
                             * d[5] - Кусок картинки зашифрованный в base64
                             * d[3] - Координата X
                             * d[4] - Координата Y
                             */
                            this.emit('screen', d[5], d[3], d[4])
                            break;

                        case 'sync': break; //IDK wtf is this

                        case 'size':
                            this.emit('size', d[1], Number(d[2]), Number(d[3]))
                            break;

                        case 'list':
                            let vmList: Array<VMInfo> = []
                            for (let i = 1; i < d.length; i += 3) {
                                vmList.push({
                                    name: d[i],
                                    title: d[i + 1],
                                    image: d[i + 2]
                                })
                            }
                            this.emit('list', vmList)
                            break;

                        default:
                            console.log(`[WARN] Unknown message: ${d}`);
                            this.emit("unhandled", d);
                            break;
                    }
                })
                .onClose((i, e) => {
                    this.emit("close", e.code, e.reason);
                }).withProtocols('guacamole').build();
    }

    send(array: Array<string>) {
        this.ws.send(encodeGuac(array));
    }

    connect(Username: string, VMName: string) {
        this.send(['rename', Username]);
        this.send(['connect', VMName]);
        this.emit('connect', VMName);
    }

    disconnect() {
        this.send(['disconnect']);
        this.ws.close();
    }
}