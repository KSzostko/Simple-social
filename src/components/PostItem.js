import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { UserContext } from '../context';
import { deletePost } from '../redux/post/postActions';
import Button from './Button';

const StyledListItem = styled.li`
    border: 1px solid #000;
    padding: 10px;
    margin-bottom: 20px;
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 10px;
    align-items: center;
`;

const StyledHeader = styled.h3`
    font-weight: 400;
    font-size: 1rem;
`;

const StyledIcon = styled.i`
    color: #e4bb7a;
    font-size: 2rem;
`;

function PostItem({ data, deletePostFn }) {
    const { userId, id, title } = data;
    
    return (
        <UserContext.Consumer>
            {value => (
                <StyledListItem>
                    <Button icon onClick={() => deletePostFn(id)}>
                        <StyledIcon
                        className="fa fa-trash-o"
                        aria-hidden="true"
                        data-testid="trash-button"></StyledIcon>
                    </Button>
                    <StyledHeader>{title}</StyledHeader>
                    <Link to={{
                        pathname: `/user/${userId}/${id}`,
                        state: {
                            post: data,
                            name: value,
                        }
                    }}>
                        <StyledIcon
                            className="fa fa-chevron-right"
                            aria-hidden="true"
                            data-testid="arrow-button"></StyledIcon>
                    </Link>
                </StyledListItem>
            )}
        </UserContext.Consumer>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        deletePostFn: id => dispatch(deletePost(id)),
    }
}

PostItem.propTypes = {
    deletePostFn: PropTypes.func,
    data: PropTypes.shape({
        userId: PropTypes.number,
        id: PropTypes.number,
        title: PropTypes.string,
        body: PropTypes.string,
    }),
};

export default connect(null, mapDispatchToProps)(PostItem);