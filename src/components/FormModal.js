import React from 'react';
import Modal from 'react-modal';
import AddForm from './AddForm';

const customStyles = {
    content: {
        minWidth: '400px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

class FormModal extends React.Component {
    submit = values => {
        console.log(values);
    }
    
    render() {
        const { modalOpen, closeModal, type } = this.props;
        
        return (
            <Modal 
                isOpen={modalOpen}
                onRequestClose={closeModal}
                style={customStyles}
            >
                <AddForm 
                    type={type}
                    onSubmit={this.submit} 
                    closeModal={closeModal}
                />
            </Modal>
        );
    }
}

export default FormModal;