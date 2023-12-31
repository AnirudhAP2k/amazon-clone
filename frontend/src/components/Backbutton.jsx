import React from 'react';
import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

const Backbutton = () => {
  return (
    <div className='d-flex' style={{marginTop: '30px'}}>
      <Link className='btn btn-primary rounded-lg' to={'/'}>
        <BsArrowLeft className='me-2' />
        Back to Home
      </Link>
    </div>
  );
};

export default Backbutton;
