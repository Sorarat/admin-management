import './App.css';
import Login from './components/login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPanel from './components/adminPanel';
import AddNewUser from './components/addNewUser';
import UpdateUser from './components/updateUser';
import Chat from './components/chat';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/panel" element={<AdminPanel/>} />
        <Route path="/add-user" element={<AddNewUser/>} />
        <Route path="/update-user" element={<UpdateUser/>} />
        <Route path="/chat/:userId" element={<Chat/>} />
      </Routes>
    </Router>
  );
}

export default App
