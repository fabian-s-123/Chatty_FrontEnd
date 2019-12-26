import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './pages/Home/Home.page';
import ChatRoom from './pages/ChatRoom/ChatRoom.page';
import './App.css';
//import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="page">
      <Router>
        <Route exact path="/" component={Home}/>
        <Route exact path="/chat-room" component={ChatRoom}/>
      </Router>
    </div>
  );
}

export default App;
