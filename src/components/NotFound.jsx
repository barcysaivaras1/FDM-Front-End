import React from 'react'
import { Link } from 'react-router-dom'

import '../css/NotFound.css';

const NotFound = () => {
  return (
    <div className='notfound'>
        <div className='notfound-container'>
            <div className='heading'>404</div>

            <div className='sub-heading'>Page not found</div>

            <div className='description'>
                The page you are trying to access doesn't exist.
                Go back or head back to the home <Link to="/" className='link'>here</Link>
            </div>
        </div>
    </div>
  )
}

export default NotFound