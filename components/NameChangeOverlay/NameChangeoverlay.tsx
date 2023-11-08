import React, { MouseEventHandler } from "react"

interface NameChangeOverlayProps {
  onClick: MouseEventHandler
}

const NameChangeOverlay: React.FC<NameChangeOverlayProps> = ({ onClick }) => {
  return <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50" onClick={onClick}></div>
}

export default NameChangeOverlay
