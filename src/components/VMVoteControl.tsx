export function VMVoteControl() {
    return (
        <div id="vote-status">
        <span id="vote-time">...</span> осталось до окончания голосования<br></br>
        <button className="btn btn-success" id="voteYesBtn" onClick={() => console.log('test')}>
            <i className="fa-solid fa-check"></i>
            Да<span className="badge bg-secondary" id="votes-yes"></span>
        </button>
        <button className="btn btn-danger" id="voteNoBtn" onClick={() => console.log('test')}>
            <i className="fa-solid fa-ban"></i>
            Нет<span className="badge bg-secondary" id="votes-no"></span>
        </button>
    </div>
    )
}