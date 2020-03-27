import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import { fetchProduct } from '../../redux/product/product.action';
import ShopCard from '../../components/shop-card/shop-card.component';

const ProductPage = (props) => {

    const [product, setProduct] = useState({});

    useEffect(() => {
        console.log(props);
        let { id } = props.match.params;
        const {fetchProduct} = props;
        const searchProducts =  async (value) => {
            try{
                const productsResponse = await fetchProduct(id);
                setProduct(productsResponse.data);
            } catch(error) {
                console.error(error);
            }
        }
        searchProducts();
      });
      
      return(<div>
          <ShopCard item={product}></ShopCard>
      </div>)
};

const mapDispatchToProps = dispatch => ({
    fetchProduct: (user) => dispatch(fetchProduct(user)),
});

export default connect(null, mapDispatchToProps)(ProductPage);