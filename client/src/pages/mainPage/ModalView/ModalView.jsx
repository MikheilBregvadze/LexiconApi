import React from 'react'
import CustomCloseButton from '../../../components/closeButton/CustomCloseButton'
import CustomModal from '../../../components/customModal/customModal'
import style from './ModalView.module.css'

function ModalView({ modalIsOpen, closeModal, words }) {
    return (
        <CustomModal
            modalIsOpen={modalIsOpen}
            closeModal={closeModal}
        >
            <div className={style.container}>
                <CustomCloseButton closeModal={closeModal} />
            </div>
            <div className={style.content}>
                { 
                    words && words.map((word, index) => (
                        <div key={index} className={style.item}>
                            <div className={style.national}>{word.national}:</div>
                            <div className={style.foreign}>{word.foreign}</div>
                        </div>
                    ))
                }
            </div>
        </CustomModal>
    )
}

export default ModalView
