import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addPost } from '../redux/post/postActions';
import { addComment } from '../redux/comment/commentActions';
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
        const { type, addPostFn, addCommentFn, closeModal, postId, userId } = this.props;

        closeModal();

        if(type === 'post') {
            values.userId = userId;
            addPostFn(values);
        }
        else if(type === 'comment') {
            values.postId = postId;
            addCommentFn(values);
        }
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

const mapDispatchToProps = dispatch => {
    return {
        addPostFn: post => dispatch(addPost(post)),
        addCommentFn: comment => dispatch(addComment(comment)),
    };
}

FormModal.propTypes = {
    addCommentFn: PropTypes.func,
    addPostFn: PropTypes.func,
    closeModal: PropTypes.func,
    modalOpen: PropTypes.bool,
    type: PropTypes.string,
    userId: PropTypes.string,
    postId: PropTypes.string,
};

export default connect(null, mapDispatchToProps)(FormModal);