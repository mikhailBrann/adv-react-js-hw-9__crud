import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const path = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(path)
      .then(response => response.json())
      .then(data => setPosts(data));
  }, []);

  return (
    <div className="posts-grid__main">
      <div className="posts-grid">
        {posts.map(post => (
          <Link to={`/posts/${post.id}`} key={post.id} className="post-card__link">
            <div className="post-card">
              <span className='post-card__date'>{new Date(post.created).toLocaleString()}</span>
              <p className='post-card__content'>{post.content}</p>
            </div>
          </Link>
        ))}
      </div>
      <Link to="/posts/new" className='btn create-post__btn'>Создать пост</Link>
    </div>
  );
}

export default PostList;