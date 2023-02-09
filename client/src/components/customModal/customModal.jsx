import React from 'react'
import Modal from 'react-modal'
import style from './CustomModal.module.css'

Modal.setAppElement('#root');

function CustomModal({children, modalIsOpen, closeModal}) {
    return (
        <Modal
            isOpen={modalIsOpen}
            className={style.modal}
            onRequestClose={() => closeModal()}
            disableAutoFocus={true}
            disableEnforceFocus={true}
        >
            {children}
        </Modal>
    )
}

export default CustomModal
