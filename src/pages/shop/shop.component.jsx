import React from 'react';
import { SHOP_DATA } from './shop.data';

import ShopCollections from '../../components/shop-collections/shop-collections.component';

class ShopPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            collections: SHOP_DATA
        };
    }

    render(){
        const {collections} = this.state;
        return (
        <div className="shop-page">
            {
                collections.map(({id, ...props}) => (
                    <ShopCollections key={id} {...props}/>
                ))
            }
        </div>);
    }
}

export default ShopPage;