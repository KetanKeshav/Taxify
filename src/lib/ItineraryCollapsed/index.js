import React from "react";
import PropTypes from "prop-types";

const ItineraryCollapsed = ({children, onClick}) => {
  return (
    <div
      className="bg-white mb-16 br-4"
      style={{height: '84px'}}
      onClick={onClick}
    >
      {children}
    </div>
  )
};

ItineraryCollapsed.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired
};

ItineraryCollapsed.defaultProps = {
  onClick: () => {},
};

export default React.memo(ItineraryCollapsed);
