import React from 'react';
import { withRouter } from 'react-router-dom';

import './menu-item.style.scss';

const HomePageCard = ({category, photoUrl, size, history,}) => {
    return (
    <div className={`${size} menu-item`} onClick={() => history.push(`shop/${category.toLowerCase()}`)}>
        <div className="background-image" style={{
            backgroundImage: `url(${photoUrl})`
        }}/>
        <div className="content">
            <div className="title">{category.toUpperCase()}</div>
            <span className="subtitle">SHOP NOW</span>
        </div>
    </div>);
}

export default withRouter(HomePageCard);