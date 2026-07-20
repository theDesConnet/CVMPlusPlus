import { createContext } from "react";
import { VMInfo } from "../models";
import { VM } from "../cvmclient/VM";

export interface CVMProps {
    vmInfo: VMInfo | undefined,
    vm: VM | undefined
}

export interface CVM {
    cvm: CVMProps | undefined,
    setCVM: (CVMInfo: CVMProps | undefined) => void;
}

export const CurrentVM = createContext<CVM>({
    cvm: undefined,
    setCVM: (CVMInfo: CVMProps | undefined) => { }
});