import { VMInfo } from "../models"

interface CardProps {
    vmInfo: VMInfo,
    onClick: () => void,
}

export function VMCard({vmInfo, onClick}: CardProps) {
    return (
        <span
            className="vm-list-entry"
            onClick={onClick}
        >
            <img src={`data:image/png;base64,${vmInfo.Image}`} />
            <h4 dangerouslySetInnerHTML={{__html: vmInfo.Title}} />
        </span>
    )
}
