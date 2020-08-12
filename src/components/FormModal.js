import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import PostForm from './PostForm';
import CommentForm from './CommentForm';

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

if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#root');

function FormModal(props) {    
    const { modalOpen, closeModal, type, userId, postId } = props;
    
    return (
        <Modal 
            isOpen={modalOpen}
            onRequestClose={closeModal}
            style={customStyles}
        >
            {
                type === 'post' ? (
                    <PostForm
                        closeModal={closeModal}
                        userId={userId}
                    />
                ) : (
                    <CommentForm
                        closeModal={closeModal}
                        postId={postId}
                    />
                )
            }
        </Modal>
    );
}

FormModal.propTypes = {
    closeModal: PropTypes.func,
    modalOpen: PropTypes.bool,
    type: PropTypes.string,
    userId: PropTypes.string,
    postId: PropTypes.string,
};

export default FormModal;