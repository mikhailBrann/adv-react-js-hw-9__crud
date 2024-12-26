import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';
import ViewPost from './components/ViewPost';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<PostList />} />
        <Route path="/posts/new" element={<CreatePost />} />
        <Route path="/posts/:id" element={<ViewPost />} />
      </Routes>
    </Router>
  );
}

export default App
