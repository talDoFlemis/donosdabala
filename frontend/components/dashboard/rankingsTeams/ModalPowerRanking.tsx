import React from "react"
import { Modal } from "../../layout/Modal"

interface Props {
  isOpen: any
  setIsOpen: any
}

function ModalPowerRanking({ isOpen, setIsOpen }: Props) {
  return <Modal isOpen={isOpen} setIsOpen={setIsOpen}></Modal>
}

export default ModalPowerRanking
