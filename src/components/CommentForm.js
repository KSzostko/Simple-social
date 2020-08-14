import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
    StyledForm,
    StyledHeader,
    StyledWrapper,
    StyledLabel,
    StyledTextareaField,
    StyledButtonWrapper,
    StyledButton
} from './styles/formStyles';
import { addComment } from '../redux/comment/commentActions'
import Button from './Button';
import TextError from './TextError';

const StyledInputField = styled(Field)`
    margin-left: 0;
    padding: 5px 10px;
    border: 1px solid #BBB;
    border-radius: 4px;

    &:focus {
        border-color: #252B2D;
    }
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
                        <ErrorMessage name="name" component={TextError} />
                    </StyledWrapper>
                    <StyledWrapper>
                        <StyledLabel htmlFor="email">Email</StyledLabel>
                        <StyledInputField
                            type="email"
                            id="email" 
                            name="email"
                        />
                        <ErrorMessage name="email" component={TextError} />
                    </StyledWrapper>
                    <StyledWrapper>
                        <StyledLabel htmlFor="body">Body</StyledLabel>
                        <StyledTextareaField
                            component="textarea"
                            id="body"
                            name="body"
                            rows="6"
                        />
                        <ErrorMessage name="body" component={TextError} />
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