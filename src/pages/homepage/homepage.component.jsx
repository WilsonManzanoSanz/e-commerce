import React from 'react';
import Directory from '../../components/directory/directory.component';
import { connect } from 'react-redux';
import { fetchCategories } from '../../redux/product/product.action';
import { selectCategories, } from '../../redux/product/product.selector';
import { createStructuredSelector } from 'reselect';

import './homepage.style.scss';

class HomePage extends React.Component { 

    componentDidMount(){
      const { fetchCategories } = this.props;
      fetchCategories({include: true});
    }

    render(){
      return(    
      <div className="homepage">
        <h1>Welcome to my E-commerce </h1>
        <Directory />
      </div>);
    }
};

const mapDispatchToProps = dispatch => ({
  fetchCategories: (params) => dispatch(fetchCategories(params))
});

const mapStateToProps = createStructuredSelector({
  categories: selectCategories,
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage) ;