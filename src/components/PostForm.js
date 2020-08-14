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
import { addPost } from '../redux/post/postActions';
import Button from './Button';
import TextError from './TextError';

const StyledInputField = styled(Field)`
    margin-left: 5px;
    padding: 5px 10px;
    border: 1px solid #BBB;
    border-radius: 4px;

    &:focus {
        border-color: #252B2D;
    }

    &:invalid {
        border-color: red;
    }
`;

function PostForm(props) {
    const { closeModal, userId, addPostFn } = props;
    
    const initialValues = {
        title: '',
        body: '',
    };

    const validationSchema = Yup.object({
        title: Yup.string().required('Required'),
        body: Yup.string().required('Required'),
    });

    const onSubmit = values => {
        values.userId = userId;

        closeModal();
        
        addPostFn(values);
    };

    
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {formik => (
                <StyledForm>
                    <StyledHeader>Add post</StyledHeader>
                    <StyledWrapper>
                        <StyledLabel htmlFor="title">Title</StyledLabel>
                        <StyledInputField
                            id="title" 
                            name="title"
                        />
                        <ErrorMessage name="title" component={TextError} />
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
        addPostFn: post => dispatch(addPost(post)),
    };
}

PostForm.propTypes = {
    closeModal: PropTypes.func,
    addPostFn: PropTypes.func,
    userId: PropTypes.string,
};

export default connect(null, mapDispatchToProps)(PostForm);