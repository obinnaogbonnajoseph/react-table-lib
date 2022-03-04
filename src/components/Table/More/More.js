import React from 'react';
import PropTypes from 'prop-types';
import './More.css';
import Icon from '../../Icon/Icon';

const More = ({ id, currentOptionId, onSetCurrentOptionId, moreOptions, onMoreClick }) => {

  const setMoreOption = (e) => {
    e.preventDefault();
    onSetCurrentOptionId(id)
  }

  const moreItems = moreOptions?.map(more =>
    <span
      key={more.text}
      onClick={() => onMoreClick(more.action)}
      className="cursor-pointer hover:bg-neutral-600 hover:bg-opacity-5 flex items-center p-8">
      {more.icon && <Icon iconName={more.icon} className="material-icons" />}
      <span>{more.text}</span>
    </span>
  )

  return (
    <>
      <span id={id}
        aria-controls="menu"
        className="cursor-pointer relative"
        aria-haspopup="menu" onClick={setMoreOption}>
        <Icon iconName="more_vert" className="material-icons" />
        {
          currentOptionId === id &&
          <div
            id="menu"
            aria-hidden={currentOptionId !== id}
            aria-expanded={currentOptionId === id}
            aria-labelledby={id} className="flex z-10 flex-col bg-neutral-100 border-1x5 border-solid border-neutral-600 shadow-blur-8 absolute">
            {moreItems}
          </div>
        }
      </span>
      {
        currentOptionId === id &&
        <div className="fixed top-0 left-0 z-0 w-screen h-screen" onClick={setMoreOption} id="menu-overlay" />
      }
    </>

  )

};

More.propTypes = {
  id: PropTypes.number,
  currentOptionId: PropTypes.number,
  onSetCurrentOptionId: PropTypes.func,
  moreOptions: PropTypes.array,
  onMoreClick: PropTypes.func
};

More.defaultProps = {
  moreOptions: []
};

export default More;