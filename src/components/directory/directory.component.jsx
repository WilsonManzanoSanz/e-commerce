import React from 'react';
import HomePageCard from '../menu-item/menu-item.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCategories, } from '../../redux/product/product.selector';
// import { selectDirectorySections } from '../../redux/directory/directory.selector';

import './directory.style.scss';

const Directory = ({ categories }) => (
    <div className='directory-menu'>
      {categories.map(({ id, ...otherSectionProps }) => (
        <HomePageCard key={id} {...otherSectionProps} />
      ))}
    </div>
);

const mapStateToProps = createStructuredSelector({
    categories: selectCategories
});

  
export default connect(mapStateToProps)(Directory);