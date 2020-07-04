import React from 'react';
import { Field, reduxForm } from 'redux-form';
import styled from 'styled-components';
import Button from './Button';

const StyledForm = styled.form`
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
    margin-left: ${props => props.formtype === 'comment' ? '0' : '5px'};
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

let TestForm = props => {
    const { handleSubmit, closeModal, type } = props;

    return (
        <StyledForm onSubmit={handleSubmit}>
            <StyledHeader>Add {type === 'comment' ? 'comment' : 'post'}</StyledHeader>
            <StyledWrapper>
                <StyledLabel 
                    htmlFor={type === 'comment' ? 'name' : 'title'}
                >
                    {type === 'comment' ? 'Name' : 'Title'}
                </StyledLabel>
                <StyledInputField 
                    name={type === 'comment' ? 'name' : 'title'} 
                    component="input" 
                    type="text"
                    formtype={type} 
                />
            </StyledWrapper>
            {type === 'comment' && (
                <StyledWrapper>
                    <StyledLabel 
                        htmlFor="email"
                    >
                        Email
                    </StyledLabel>
                    <StyledInputField 
                        name="email" 
                        component="input" 
                        type="email"
                        formtype={type} 
                    />
                </StyledWrapper>
            )}
            <StyledWrapper>
                <StyledLabel htmlFor="body">Body</StyledLabel>
                <StyledTextareaField name="body" component="textarea" rows="6" />
            </StyledWrapper>
            <StyledButtonWrapper>
                <StyledButton onClick={closeModal}>Cancel</StyledButton>
                <Button type="submit">Save</Button>
            </StyledButtonWrapper>
        </StyledForm>
    );
}

TestForm = reduxForm({
    form: 'post',
})(TestForm);

export default TestForm;