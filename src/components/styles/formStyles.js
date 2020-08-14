import styled from 'styled-components';
import { Form, Field } from 'formik';
import Button from '../Button';

export const StyledForm = styled(Form)`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const StyledHeader = styled.h2`
    margin-top: 0;
    margin-bottom: 40px;
`;

export const StyledWrapper = styled.div`
    width: 100%;
    margin-bottom: 20px;
    display: grid;
    grid-template-columns: auto 1fr;
`;

export const StyledLabel = styled.label`
    margin-top: 10px;
    margin-right: 40px;
    font-size: 12px;
`;

export const StyledTextareaField = styled(Field)`
    resize: none;
    padding: 5px 10px;
    border: 1px solid #BBB;
    border-radius: 4px;

    &:focus {
        border-color: #252B2D;
    }
`;

export const StyledButtonWrapper = styled.div`
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
`;

export const StyledButton = styled(Button)`
    margin-right: 20px;
`;