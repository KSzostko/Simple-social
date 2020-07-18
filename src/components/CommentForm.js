import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { addComment } from '../redux/comment/commentActions'
import Button from './Button';

const StyledForm = styled(Form)`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StyledHeader = styled.h2`
    margin-top: 0;
    margin-bottom: 40px;
`;

const StyledWrapper = styled.div`
    width: 100%;
    margin-bottom: 20px;
    display: grid;
    grid-template-columns: auto 1fr;
`;

const StyledLabel = styled.label`
    margin-top: 10px;
    margin-right: 40px;
    font-size: 12px;
`;

const StyledInputField = styled(Field)`
    margin-left: 0;
    padding: 5px 10px;
    border: 1px solid #BBB;
    border-radius: 4px;

    &:focus {
        border-color: #252B2D;
    }
`;

const StyledTextareaField = styled(Field)`
    resize: none;
    padding: 5px 10px;
    border: 1px solid #BBB;
    border-radius: 4px;

    &:focus {
        border-color: #252B2D;
    }
`;

const StyledButtonWrapper = styled.div`
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
`;

const StyledButton = styled(Button)`
    margin-right: 20px;
`;

function CommentForm(props) {
    const { closeModal, postId , addCommentFn} = props;
    
    const initialValues = {
        name: '',
        email: '',
        body: '',
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email format').required('Required'),
        body: Yup.string().required('Required'),
    });

    const onSubmit = values => {
        values.postId = postId;

        closeModal();

        addCommentFn(values);
    };
    
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {formik => (
                <StyledForm>
                    <StyledHeader>Add comment</StyledHeader>
                    <StyledWrapper>
                        <StyledLabel htmlFor="name">Name</StyledLabel>
                        <StyledInputField
                            id="name" 
                            name="name"
                        />
                        <ErrorMessage name="name" />
                    </StyledWrapper>
                    <StyledWrapper>
                        <StyledLabel htmlFor="email">Email</StyledLabel>
                        <StyledInputField
                            type="email"
                            id="email" 
                            name="email"
                        />
                        <ErrorMessage name="email" />
                    </StyledWrapper>
                    <StyledWrapper>
                        <StyledLabel htmlFor="body">Body</StyledLabel>
                        <StyledTextareaField
                            component="textarea"
                            id="body"
                            name="body"
                            rows="6"
                        />
                        <ErrorMessage name="body" />
                    </StyledWrapper>
                    <StyledButtonWrapper>
                        <StyledButton type="button" onClick={closeModal}>Cancel</StyledButton>
                        <Button type="submit" disabled={!formik.isValid}>Save</Button>
                    </StyledButtonWrapper>
                </StyledForm>
            )}
        </Formik>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        addCommentFn: comment => dispatch(addComment(comment)),
    };
}

CommentForm.propTypes = {
    closeModal: PropTypes.func,
    addCommentFn: PropTypes.func,
    postId: PropTypes.string,
};

export default connect(null, mapDispatchToProps)(CommentForm);