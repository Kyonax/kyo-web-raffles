import React from 'react'
import Modal from './Modal'

interface BaseModalWrapperProps {
    isModalVisible: boolean;
    typeAlert: string;
    textContent: string;
    onBackdropClick: () => void;
}

const BaseModalWrapper: React.FC<BaseModalWrapperProps> = ({onBackdropClick, isModalVisible, typeAlert, textContent}) => {
    if (!isModalVisible) {
        return null
    }
    return (<Modal onBackdropClick={onBackdropClick} typeAlert={typeAlert} textContent={textContent}/>);
}

export default BaseModalWrapper