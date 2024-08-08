import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Homepage from './components/Homepage';
import './css/style.css';
// Import other components
// import Authors from './components/Authors';
// import Categories from './components/Categories';
// import CreateBlog from './components/CreateBlog';
// import Login from './components/Login';
// import Register from './components/Register';

const App = () => {
  return (
    <Router>
      <header>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/authors">Authors</Link></li>
            <li><Link to="/categories">Categories</Link></li>
            <li><Link to="/create-blog">Create Blog</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Homepage />} />
          {/* Add routes for other components */}
          {/* <Route path="/authors" element={<Authors />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/create-blog" element={<CreateBlog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> */}
        </Routes>
      </main>
    </Router>
  );
};

export default App;
