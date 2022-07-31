import React, { memo } from 'react';
import styles from '../styles/ChatBot.module.css';

const ChatMessage = ({image,name,message,time,id}) => {
    return (
        <div className={`${styles["container"]} ${styles["darker"]}`}>
            <img src={image} alt={name} className={styles["right"]} />
            <p>{message}</p>
            <span className={styles["time-left"]}>{time}</span>
        </div>
    )
}

export default memo(ChatMessage);