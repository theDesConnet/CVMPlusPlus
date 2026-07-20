import { useContext } from "react";
import { CurrentVM } from "../context/CurrentVM";

export default function Header() {
  const {cvm, setCVM} = useContext(CurrentVM);
  const backEvent = () => {
    cvm?.vm?.exit();
    setCVM(undefined);
  }

  return (
    <div id="navbar">
        <span id="navbar-logo">CollabVM</span>
        <span id="navbar-back" onClick={cvm && backEvent}>Back</span>
        <span id="settings-title" onClick={() => console.log('test')}><i className="fa-solid fa-gear"></i></span>
    </div>
  );
}
