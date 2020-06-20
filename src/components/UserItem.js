import React from 'react';
import Button from './Button';

const UserItem = ({ data }) => {
    const { name, email, phone, website, company } = data;
    
    return (
        <li>
            <h2>{name}</h2>
            <div>
                <span>{email}</span>
                <span>{phone}</span>
                <span>{website}</span>
            </div>
            <div>
                <span>{company.name}</span>
                <span>{company.catchPhrase}</span>
                <span>{company.bs}</span>
            </div>
            <Button>Details</Button>
        </li>
    );
};

export default UserItem;