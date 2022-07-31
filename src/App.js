// import logo from './logo.svg';
import './App.css';
import { useContext } from 'react';
import { Context as AuthContext } from './context/authContext';
import SocketHandler from './components/SocketHandler';
import ChatMessages from './components/ChatBot';
import InputMessage from './components/InputMessage';

function App() {
  const {state,signin} = useContext(AuthContext)
  console.log("state here : ",state);
  return (
    <div className="App">
         <InputMessage />
         <ChatMessages />
          <SocketHandler 
            endpoint={"ws://localhost:5001/event/chat"}
            user="email"
            token="token"
            hostToken="host token here"
            isHost={false}
          />
    </div>
  );
}

export default App;
