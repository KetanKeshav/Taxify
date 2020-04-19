import React from "react";
import PropTypes from "prop-types";
import classnames from 'classnames'



const ItineararyHeader = props => {

  const bgClass = classnames(
    'nmt-16',
    'mb-16',
    'bg-white',
    'bbr-4',
    'p-32',
    'pt-48',
    props.className
  )

  return (
    <div className={bgClass}>
      {props.children}
    </div>
  )
};

ItineararyHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

ItineararyHeader.defaultProps = {
  className: ''
};

export default React.memo(ItineararyHeader);
