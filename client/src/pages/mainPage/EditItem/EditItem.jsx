import React from 'react'
import CustomModal from '../../../components/customModal/customModal'

function EditItem({ modalIsOpen, closeModal, item }) {
    console.log(item);
    console.log(modalIsOpen);
    return (
        <CustomModal
            modalIsOpen={modalIsOpen}
            closeModal={closeModal}
        >
            <div>Form</div>
        </CustomModal>
    )
}

export default EditItem
