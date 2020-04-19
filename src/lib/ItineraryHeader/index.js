import React from "react";
import PropTypes from "prop-types";
import classnames from 'classnames'



const ItineararyHeader = props => {

  const bgClass = classnames(
    'h-80',
    'flex',
    'flex-middle',
    'px-32',
    'py-12',
    {
      'br-4': !props.active,
      'btr-4': props.active,
      'bg-white': !props.active,
      'bg-blue': props.active
    },
    props.className
  )

  const labelClass = classnames(
    'fs-heading',
    'm-0',
    'lh-0',
    'ml-24',
    {
      'c-grey-30': !props.active,
      'c-white': props.active
    }
  )

  const stepbgClass = classnames(
    'h-40',
    'w-40',
    'bs-solid',
    'bw-1',
    'br-100',
    'flex',
    'flex-middle',
    'flex-center',
    {
      'bc-grey-30': !props.active,
      'bc-white': props.active,
      'bg-white': props.active
    }
  )

  const stepClass = classnames(
    'fs-heading',
    'm-0',
    'lh-0',
    {
      'c-grey-30': !props.active,
      'c-blue': props.active,
      'fw-700': props.active
    }
  )

  return (
    <div className={bgClass}>
      <div className={stepbgClass}>
        <p className={stepClass}>
          {props.step}
        </p>
      </div>
      <p className={labelClass}>
        {props.children}
      </p>
    </div>
  )
};

ItineararyHeader.propTypes = {
  step: PropTypes.number,
  active: PropTypes.bool,
  children: PropTypes.node.isRequired
};

ItineararyHeader.defaultProps = {
  step: 1,
  active: false
};

export default React.memo(ItineararyHeader);
