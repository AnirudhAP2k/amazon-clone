import React, { useContext } from 'react';
import ItemContext from '../context/ItemContext';
import {BsInfoCircle} from 'react-icons/bs'
import { MdOutlineAddBox} from 'react-icons/md'
// import { useSnackbar } from 'notistack';
import { Link } from 'react-router-dom';

const Items = ({item}) => {
    const context = useContext(ItemContext);
    const { addWishlist } = context;
    // const { enqueueSnackbar } = useSnackbar();

  return (
    <>
     <div className="col-md-3 my-3">
        <div className="card">
          <div className="card-body" style={{cursor: 'pointer'}}>
            <h5 className="card-title">{item.title}</h5>
            <p className="card-text">{item.description}</p>
            <p className="card-text"><strong>Rs. {item.price}</strong></p>
            <span
            className="position-absolute top-0 translate-middle badge rounded-pill bg-success"
            style={{ left: "50%" }}
          >
            {item.category}
          </span>
            <div className="container">
            <Link to={`/item/${item._id}`}>
                <BsInfoCircle
                className='mx-1'
                style={{cursor: 'pointer', fontSize: '20px'}}
                    fill='green'
                />
              </Link>
              <MdOutlineAddBox
              className='mx-1'
              style={{cursor: 'pointer', fontSize: '24px'}}
                fill='blue'
                onClick={() => {addWishlist(item._id);}}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Items
