import React from 'react'
import Modal from 'react-modal'

Modal.setAppElement('#root');

function CustomModal({children, modalIsOpen, closeModal}) {
    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
        >
            {children}
        </Modal>
    )
}

export default CustomModal
