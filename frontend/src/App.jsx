import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/profile/:id" element={<UserProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;