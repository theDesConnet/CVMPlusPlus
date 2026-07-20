import { useEffect, useState, useContext } from "react"
import { CurrentVM } from "../context/CurrentVM"

interface Message {
    username: string,
    message: string
}

export function VMChat() {
    const [messages, setMsg] = useState<Array<Message>>([]);
    const [currentMsg, setCurrentMsg] = useState<string>("");
    const { cvm } = useContext(CurrentVM);

    useEffect(() => {
        cvm?.vm?.server.on('message', (user, msg) => {
            setMsg(prev => [...prev, { username: user, message: msg }])
        })
    }, [])

    return (
        <div id="chat-wrapper2">
            <div id="chat-wrapper">
                <div id="chat-display">
                    {
                        messages.map((msg, i) => (
                            <div className="chat-message" key={i}>
                                <b>{msg.username !== "" ? `${msg.username}>` : ""}</b>
                                <span dangerouslySetInnerHTML={{__html: msg.message}} />
                            </div>
                        ))
                    }
                </div>
                <div id="chat-input-group">
                    <span id="chat-username">{cvm?.vm?.currentUser.Name}</span>
                    <input id="chat-input" type="text" maxLength={100} onChange={(e) => setCurrentMsg(e.target.value)} value={currentMsg}></input>
                    <button id="chat-send" onClick={() => { cvm?.vm && cvm.vm.chat.sendMessage(currentMsg); setCurrentMsg(""); } }>Отправить</button>
                    <button id="chat-sound-toggle">звук</button>
                </div>
            </div>
        </div>
    )
}