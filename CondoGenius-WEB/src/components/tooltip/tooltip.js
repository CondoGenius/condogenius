import React from 'react';

import { Button, Icon } from 'react-materialize';

import styles from './tooltip.module.scss';

const Tooltip = ({ message, icon, position, children, onClick }) => {
  return (
    <Button
      className={`${styles.tooltip} ${children ? styles.text : ''}`}
      floating
      small={!children}
      tooltip={message}
      tooltipOptions={{
        position: position || 'top'
      }}
      icon={children ? null : <Icon>{icon}</Icon>}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default Tooltip;
