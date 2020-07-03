import React from 'react';
import Modal from 'react-modal';
import TestForm from './TestForm';

Modal.setAppElement('#root');

class FormModal extends React.Component {
    submit = values => {
        console.log(values);
    }
    
    render() {
        const { modalOpen, closeModal } = this.props;
        
        return (
            <Modal 
                isOpen={modalOpen}
                onRequestClose={closeModal}
            >
                <TestForm onSubmit={this.submit} />
            </Modal>
        );
    }
}

export default FormModal;