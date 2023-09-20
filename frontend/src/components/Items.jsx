import React, { useContext, useState } from 'react';
import ItemContext from '../context/ItemContext';
import {AiOutlineEdit} from 'react-icons/ai'
import {BsInfoCircle} from 'react-icons/bs'
import {MdOutlineDelete} from 'react-icons/md'
import { useSnackbar } from 'notistack';
import ShowItem from './ShowItem';
import { Link } from 'react-router-dom';

const Items = ({item}) => {
    const context = useContext(ItemContext);
    const { deleteItem, updateItem } = context;
    const { enqueueSnackbar } = useSnackbar();

  return (
    <>
     <div className="col-md-3 my-3">
        <div className="card">
          <div className="card-body">
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
              <AiOutlineEdit
              className='mx-1'
              style={{cursor: 'pointer', fontSize: '24px'}}
                fill='blue'
                onClick={() => {updateItem(item._id); enqueueSnackbar("Item Deleted Successfully", {variant: "success"}); }}
              />
              <MdOutlineDelete
              className='mx-1'
              style={{cursor: 'pointer', fontSize: '24px'}}
                fill='red'
                onClick={() => {deleteItem(item._id); enqueueSnackbar("Item Deleted Successfully", {variant: "success"}); }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Items
