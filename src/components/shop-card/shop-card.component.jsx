import React, {memo} from 'react';
import Button from '../ui/button/button.component';
import { connect } from 'react-redux';
import { addItem } from '../../redux/cart/cart.action';

import './shop-card.style.scss'

function areEqual(prevProps, nextProps) {
    /*
    return true if passing nextProps to render would return
    the same result as passing prevProps to render,
    otherwise return false
    */
    if(prevProps.item.name === nextProps.item.name){
        return prevProps.item.name === nextProps.item.name;
    }
}

const ShopCard = ({ item, addItem, editItem, editMode }) => {

    console.log('rendered card')
    const dispatchAction = editMode ? editItem : addItem;
    const { name, price, photoUrl } = item;
    return (
        <div className="shop-card">
            <div className="image" style={{backgroundImage: `url(${photoUrl ? photoUrl: 'http://emea.dynabook.com/images/local/en_EU/default/unknown_product_page.jpg'})`}}>
            </div>
            <div className="content-footer">
                <span className="name">{name}</span>
                <span className="price">${price}</span>
            </div>
            <Button classType="inverted" onClick={() => dispatchAction(item)}>{editMode ? 'Edit' : 'Add to Cart'}</Button>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
})

export default memo(connect(null, mapDispatchToProps)(ShopCard), areEqual);