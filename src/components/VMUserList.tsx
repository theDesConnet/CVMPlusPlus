import { CurrentVM } from '../context/CurrentVM'
import { useContext, useState, useEffect } from 'react';
import { VMUser } from '../cvmclient/VMUser';

export function VMUserList() {
    const { cvm } = useContext(CurrentVM);
    const [users, setUsers] = useState<Array<VMUser>>([]);

    useEffect(() => {
        cvm?.vm?.server
        .on('addUser', user => {
            setUsers(prev => [...prev, user]);
        })
        .on('remUser', user => {
            setUsers(prev => prev.filter(x => x.Name !== user));
        })
        .on('turn', (i, x, z) => {
            console.log(i, x, z);
        })
    }, [])

    return (
        <div id="user-list-wrapper2">
            <div id="user-list-wrapper">
                <div id="user-list-header">Пользователи онлайн: {users.length > 0 ? users.length : "Загрузка..."}</div>
                <div id="user-list">
                {
                    users.map((user, i) => (<div className={`user-list-entry ${cvm?.vm?.currentUser.Name == user.Name ? 'user-current' : ''} ${user.Permission == 2 ? "user-admin" : ""} ${user.Permission == 3 ? "user-moderator" : ""}`}  key={i}>{user.Name}</div>))
                }
                </div>
            </div>
        </div>
    )
}