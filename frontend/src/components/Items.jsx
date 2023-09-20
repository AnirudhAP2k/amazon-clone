import React, { useContext, useState } from 'react';
import ItemContext from '../context/ItemContext';

const Items = ({item}) => {
    const context = useContext(ItemContext);

  return (
    <>
     <div className="col-md-3 my-3">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{item.title}</h5>
            <p className="card-text">{item.description}</p>
            <p className="card-text"><strong>{item.category}</strong></p>
            <span
            className="position-absolute top-0 translate-middle badge rounded-pill bg-success"
            style={{ left: "50%" }}
          >
            Rs. {item.price}
          </span>
            {/* <div className="container">
              <img
                className="mx-1"
                src={delImg}
                alt=""
                height="25px"
                onClick={() => {deleteNote(note._id); showAlert("Note Deleted Successfully", "success"); }}
              />
              <img
                className="mx-1"
                src={editImg}
                alt=""
                height="20px"
                data-bs-toggle="modal"
                data-bs-target={`#exampleModaledit-${note._id}`}
              />
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Items
