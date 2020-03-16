import React from 'react';
import Button from '../../components/button/button.component';

import './delete-category.style.scss';

const DeleteCategory = ({categoryId, onClose, onResult}) => {

    return (
    <div className="delete-category">
        <h2 className="delete-category-title">Do you want to delete this category?</h2>
        <div className="delete-category-buttons">
            <Button className="primary-button" onClick={() => onResult(true)}>YES</Button>
            <Button classType="inverted" onClick={() => onResult(false)}>NO</Button>
        </div>
    </div>);
}


export default DeleteCategory;