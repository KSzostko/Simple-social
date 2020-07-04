import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from './Button';

let TestForm = props => {
    const { handleSubmit, closeModal } = props;

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Title</label>
                <Field name="title" component="input" type="text" />
            </div>
            <div>
                <label htmlFor="body">Body</label>
                <Field name="body" component="textarea" />
            </div>
            <Button onClick={closeModal}>Cancel</Button>
            <Button type="submit">Submit</Button>
        </form>
    );
}

TestForm = reduxForm({
    form: 'post',
})(TestForm);

export default TestForm;