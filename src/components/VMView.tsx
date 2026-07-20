import { VMChat } from './VMChat';
import { VMControl } from './VMControl';
import { VMUserList } from './VMUserList';
import { VMVoteControl } from './VMVoteControl';
import { useState, useContext, useEffect, useRef } from 'react';
import { CurrentVM } from '../context/CurrentVM'

interface CanvasSize {
    width: number,
    height: number
}

export default function VMView() {
    const { cvm, setCVM } = useContext(CurrentVM);
    const [connected, setConnected] = useState<boolean>(false)
    const [startedVote, setStartedVote] = useState<boolean>(false);
    const [ canvasSize, setCanvasSize ] = useState<CanvasSize>({ width: 100, height: 100 });
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        cvm?.vm?.server
        .on("connect", () => {
            setConnected(true);
        })
        .on('size', (state, w, h) => {
            setCanvasSize({width: w, height: h})
        })
        .on('screen', (img, x, y) => {
            let dimg = new Image();
            dimg.onload = () => canvasRef?.current?.getContext('2d')?.drawImage(dimg, x, y)
            dimg.src = `data:image/png;base64,${img}`
        })
    }, [])

    return (
        <div id="vm-view">
            {
                !connected &&
                <center>
                    <div id="vm-header">Загрузка...</div>
                </center>
            }
            {
                connected &&
                <center>
                    <canvas ref={canvasRef} width={canvasSize.width} height={canvasSize.height} id="vm-canvas"></canvas>
                </center>
            }
            <center>
                <div id="turn-status"></div>
                {startedVote && <VMVoteControl />}
                <VMControl />
            </center>
            <br></br>
            <div id="under-vm">
                <VMUserList />
                <VMChat />
                <div style={{ clear: 'both' }}></div>
            </div>
        </div>
    );
}
