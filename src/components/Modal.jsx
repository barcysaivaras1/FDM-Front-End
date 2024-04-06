import { CloseIcon } from '../assets/Icons';

import '../css/Modal.css';

const Modal = ({ open, children, onClose }) => {
    if (!open) {
        return null
    }

  return (
    <>
        <div className='overlay' />

        <div className='modal'>
            <CloseIcon onClick={onClose} />

            {children}
        </div>
    </>
  )
}

export default Modal
