import '../css/Modal.css';

const Modal = ({ open, children, onClose }) => {
    if (!open) {
        return null
    }

  return (
    <>
        <div className='overlay' />

        <div className='modal'>
            <button onClick={onClose}>x</button>

            {children}
        </div>
    </>
  )
}

export default Modal
