import React from 'react';
import Modal from 'react-modal';
import Button from './Button';

Modal.setAppElement('#root');

const FormModal = ({ modalOpen, closeModal }) => (
    <Modal 
        isOpen={modalOpen}
        onRequestClose={closeModal}
    >
        <h2>Modal title</h2>
        <p>Modal body</p>
        <Button onClick={closeModal}>x</Button>
    </Modal>
);

export default FormModal;