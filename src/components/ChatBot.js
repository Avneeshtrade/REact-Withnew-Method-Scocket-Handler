import React, { memo } from 'react';
import ChatMessage from './Card/ChatbotCard';

const ChatMessages = ({messages=[]}) =>{
    const renderMessages = () =>{
        return messages.map(e=>{
            return <ChatMessage message={e.message} id={e.id} image={e.image} name={e.name} time={e.time} />
        })
    }
    return (<>
        <h2>Chat Messages</h2>
        {renderMessages()}
</>
    )
}

export default memo(ChatMessages);