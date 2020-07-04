import React from 'react';
import Modal from 'react-modal';
import PostForm from './PostForm';

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
                <PostForm 
                    onSubmit={this.submit} 
                    closeModal={closeModal}
                />
            </Modal>
        );
    }
}

export default FormModal;