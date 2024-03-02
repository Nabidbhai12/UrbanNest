import React from 'react';
import { ChatEngine } from 'react-chat-engine';

const ChatEngineApp = () => {
    return(
        <div>
            <h1>Chat Engine App</h1>
            <ChatEngine
            projectID='53075a31-e033-4e01-9a83-edf8cc8f4745'
            userName='adam'
            userSecret='123'
            />
        </div>
        
    );
};

export default ChatEngineApp;