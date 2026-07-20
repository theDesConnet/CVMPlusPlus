import { VMWebSocket, VMInfo } from "./VMWebSocket";

export async function getVMList(IP: string, secureConnect: boolean = true){
    return new Promise<VMInfo[]>((resolve, reject) => {
        const Server = new VMWebSocket({
            IP,
            autoReconnect: false,
            secureWebSocket: secureConnect
        })
    
        Server.on('close', (code, res) => reject({code, reason: res}));

        Server.on('list', (list) => {
            Server.disconnect();
            resolve(list);
        })
    
        Server.on('connect', () => Server.send(['list']));
    })
}