import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { addPost } from '../redux/post/postActions';
import Button from './Button';
import TextError from './TextError';

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