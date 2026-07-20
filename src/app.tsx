import Header from './components/Header';
import VMView from './components/VMView';
import VMList from './components/VMList';
import { CurrentVM, CVMProps } from './context/CurrentVM'
import { useState } from 'react'

export default function App() {
    const [currentVM, setCurrentVM] = useState<CVMProps | undefined>(undefined);

    const setCVM = (CVMInfo: CVMProps | undefined) => setCurrentVM(CVMInfo);

    return (
        <CurrentVM.Provider value={{ cvm: currentVM, setCVM }}>
            <Header />
            {!currentVM && <VMList />}
            {currentVM && <VMView />}
        </CurrentVM.Provider>
    )
}