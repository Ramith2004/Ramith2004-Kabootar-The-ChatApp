// filepath: c:\Users\ramit\OneDrive\Desktop\Chat-app\frontend\src\Components\messages\Messages.jsx
import React, { useEffect, useRef } from 'react'
import Message from './Message'
import useGetMessages from '../../hooks/useGetMessages'
import useListenMessages from '../../hooks/useListenMessages'
import MessageSkeleton from '../../Skeletons/MessageSkeleton';

const Messages = () => {
  const { loading, messages } = useGetMessages();
  const lastMessageRef = useRef()
  
  // Use the custom hook for listening to real-time messages
  useListenMessages();
  
  // Scroll to bottom when messages change
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages])
  
  return (
    <div className='px-4 flex-1 overflow-auto'>
        {!loading && messages && messages.length > 0 && messages.map((message, index) => (
            <div 
              key={message._id || index}
              ref={index === messages.length - 1 ? lastMessageRef : null}
            >
              <Message message={message} />
            </div>
        ))}

        {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

        {!loading && (!messages || messages.length === 0) && (
          <div className='text-center text-gray-400 py-8'>
            <p>Send a message to start the conversation 💬</p>
          </div>
        )}
    </div>
  )
}

export default Messages