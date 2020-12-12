import React from 'react';
import Popup from 'reactjs-popup';
import './tutorial.css';

export default () => (
  <Popup
    trigger={<button className="button"> Tutorial </button>}
    modal
    nested
  >
    {close => (
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="header"> Tutorial </div>
        <div className="content">
          {' '}
          Take it in turns to place cells.
        </div>
        <div className="actions">
          <button
            className="button"
            onClick={() => {
              close();
            }}
          >
            Got it.
          </button>
        </div>
      </div>
    )}
  </Popup>
);
