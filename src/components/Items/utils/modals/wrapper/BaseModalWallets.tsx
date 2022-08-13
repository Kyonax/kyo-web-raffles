import React from 'react'
import ModalWallet from './ModalWallets';
import Modal from './ModalWallets'

interface BaseModalWrapperProps {    
    props: any;
    togglePopUp: any;
    isModalVisible: boolean;   
    publicAddress: any;     
    arrayWallets: any;
    total_tickets: number;
    onBackdropClick: () => void;
}

const BaseModalWrapper: React.FC<BaseModalWrapperProps> = ({ props, onBackdropClick, publicAddress, arrayWallets, isModalVisible, togglePopUp, total_tickets}) => {
    if (!isModalVisible) {
        return null
    }
    return (<ModalWallet onBackdropClick={onBackdropClick} publicAddress={publicAddress} arrayWallets={arrayWallets} setModalVisible={togglePopUp} props={props} total_tickets={total_tickets}/>);
}

export default BaseModalWrapper