export function VMControl() {
    return (
        <div id="vm-buttons">
            <div>
                <button id="turn-btn" onClick={() => console.log('test')}>
                    <b>&#xf8cc;</b> Занять очередь</button>
                <button id="end-turn-btn" onClick={() => console.log('test')}><b>&#xf8cc;</b> Покинуть очередь</button>
                <button onClick={() => console.log('test')}><b>&#xf11c;</b> Клавиатура</button>
                <button onClick={() => console.log('test')}><b>&#xf2ea;</b> Голосовать за сброс</button>
                <button onClick={() => console.log('test')}><b>&#xf030;</b> Сделать скриншот</button>
                <button onClick={() => console.log('test')}><b>&#xf0c5;</b> Автонабор</button>
                <div className="select">
                    <select>
                        <option><b>&#xf013;</b> Ctrl+Alt+Del</option>
                        <option><b>&#xf121;</b> Win+R</option>
                    </select>
                    <div className="select_arrow">
                    </div>
                </div>
                <button onClick={() => console.log('test')}><i className="fa-sharp fa-solid fa-turn-down-left"></i>
                     Выполнить</button>
                <button onClick={() => console.log('test')}>
                    <b>&#xf093;</b>
                </button>
            </div>
        </div>
    )
}