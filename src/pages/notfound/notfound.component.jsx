import React from 'react';
import { Link } from 'react-router-dom';

import './notfound.style.scss';


function NotFound() {
  return (
    <div>
        <h1 style={{textAlign:"center"}}>Page not found</h1>
        <Link to={`/`}>Return to home</Link>
    </div>
  );
}

export default NotFound;
