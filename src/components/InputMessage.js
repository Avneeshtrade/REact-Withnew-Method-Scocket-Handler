import React, { memo } from 'react';
import styles from './styles/InputMessage.module.css';

const InputMessage = () =>{
    const renderComponent = () =>{
        return <div className={styles["chat__form"]}>
        <form id={styles["chat__form"]}>
          <input id={styles["text-message"]} type="text" placeholder="Type your message here ..." />
          <button type="submit">Send</button>
        </form>
      </div>
    }
    return renderComponent();
}

export default memo(InputMessage);