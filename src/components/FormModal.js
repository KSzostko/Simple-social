import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { addPost } from '../redux/post/postActions';
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
        const { type, addPostFn, closeModal } = this.props;

        closeModal();

        if(type === 'post') {
            addPostFn(values);
        }
        // if(type === 'post') {
        //     const { title, body } = values;

        //     axios.post('https://jsonplaceholder.typicode.com/posts', {
        //         title,
        //         body,
        //         userId: parseInt(userId),
        //     }, {
        //         headers: {
        //             "Content-Type": "application/json; charset=UTF-8"
        //         }
        //     })
        //         .then(resp => {
        //             console.log(resp.data);
        //             const post = resp.data;
        //             // function for adding post
        //         })
        //         .catch(err => console.log(err));
        // } 
        // else if(type === 'comment') {
        //     const { name, email, body } = values;
            
        //     axios.post('https://jsonplaceholder.typicode.com/comments', {
        //         name,
        //         email,
        //         body,
        //         postId: parseInt(postId),
        //     }, {
        //         headers: {
        //             "Content-Type": "application/json; charset=UTF-8",
        //         }
        //     })
        //         .then(resp => console.log(resp.data))
        //         .catch(err => console.log(err));
        // }
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
    };
}

export default connect(null, mapDispatchToProps)(FormModal);