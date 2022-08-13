import React from 'react'
import ReactDOM from 'react-dom'
import { FaCheckCircle, FaTimesCircle, FaInfoCircle, FaExclamationTriangle } from 'react-icons/fa'
import './Modal.css';

interface ModalProps {
    typeAlert: string;
    textContent: string;
    onBackdropClick: () => void;
}

function logoInit(props: string) {
    switch (props) {
        case "success":
            return <FaCheckCircle className='success mb-1' />
            break;
        case "error":
            return <FaTimesCircle className='error mb-1' />
            break;
        case "info":
            return <FaInfoCircle className='info mb-1' />
            break;
        case "warning":
            return <FaExclamationTriangle className='warning mb-1' />
            break;
        default:
            break;
    }
}

const Modal: React.FC<ModalProps> = ({ typeAlert, textContent, onBackdropClick }) => {
    return ReactDOM.createPortal(<div onClick={onBackdropClick}>
        <div className={"dialog dialog-" + typeAlert} role="alert">
            <strong className='flex flex-wrap justify-center'> <a className='mt-1 mr-2'>{logoInit(typeAlert)}</a> {" " + textContent}</strong>
        </div>
    </div>, document.getElementById('modal-root')!);
}

export default Modal