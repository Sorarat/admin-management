import { useEffect, useRef, useState } from 'react';
import { useParams, useLocation} from 'react-router-dom';
import './Chat.css';

const Chat = () => {
  const { userId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const location = useLocation();
  const username = location.state?.username || '';
  const ws = useRef(null);

useEffect(() => {
    ws.current = new WebSocket(`ws://localhost:8000/ws/${userId}`);
    
    ws.current.onopen = () => {
      console.log('WebSocket connection opened for user ' + userId);  
    };
  
    ws.current.onmessage = (event) => {
        console.log('Received message:', event.data);  
        setMessages(prev => [...prev, event.data]);
    };
    
  
    ws.current.onclose = () => {
      console.log('WebSocket connection closed for user ' + userId);  
    };
  
    return () => {
      ws.current.close();
    };
  }, [userId]);
  
  const sendMessage = () => {
    if (input.trim() !== '') {
      ws.current.send(JSON.stringify({
        message: input,
        sender: sessionStorage.getItem('username'), 
      }));
      setInput('');
    }
  };
  

  return (
    <div className="chat-container">
      <h2 className="chat-title">Chat with <strong>{username}</strong></h2>
      <div className="chat-box">
        {messages.map((msg, idx) => (
          <div key={idx} className="message">{msg}</div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(); }}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
