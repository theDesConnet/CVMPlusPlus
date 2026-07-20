import { useEffect, useState, useContext } from "react";
import { VMCard } from "./VMCard";
import { getVMList } from "../cvmclient/DSUtils";
import { VMInfo } from "../models";
import { CurrentVM } from '../context/CurrentVM'
import { VM } from '../cvmclient/VM';
import { VMUser, Permissions } from '../cvmclient/VMUser';
import axios from 'axios';
import config from '../config.json'

export default function VMList() {
    const [vm, setVM] = useState<VMInfo[]>([]);
    const { cvm, setCVM } = useContext(CurrentVM);

    const addVM = (vm: VMInfo) => {
        setVM(prev => [...prev, vm])
    }

    useEffect(() => {
        config.ServerAddresses.forEach(async (srv: string) => {
            try {
                getVMList(srv, true).then(vminfo => {
                    vminfo.map(x => {
                        addVM({
                            IP: srv,
                            Name: x.name,
                            Title: x.title,
                            Image: x.image
                        });
                    })
                }).catch(() => { })
            } catch (e) {
                console.log(e);
            }
        })
    }, [])

    return (
        <div className="container-fluid">
            <div id="vm-list">
                {vm.map((x, i) => (<VMCard vmInfo={x} onClick={() => {
                    setCVM({
                        vmInfo: x, vm: new VM({
                            IP: x.IP,
                            autoReconnect: true,
                            secureWebSocket: true,
                            VMName: x.Name
                        }, new VMUser({ Name: "cvmplusplus-demo", Permission: Permissions.Guest }),)
                    });
                }} key={i} />))}
            </div>
        </div>
    );
}
