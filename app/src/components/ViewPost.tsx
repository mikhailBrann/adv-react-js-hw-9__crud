import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ViewPost = () => {
  const [post, setPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const path = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${path}/${id}`)
      .then(response => response.json())
      .then(data => {
        setPost(data.post);
        setContent(data.post.content);
      });
  }, [id]);

  const handleDelete = () => {
    fetch(`${path}/${id}`, {
      method: 'DELETE'
    })
    .then(() => navigate('/'));
  };

  const handleUpdate = () => {
    fetch(`${path}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content })
    })
    .then(() => {
      setIsEditing(false);
      setPost({ ...post, content });
    });
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="post-view-form">
      {isEditing ? (
        <>
          <textarea
            className='post-view-form__input' 
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className='post-view-form__ctrl-btns'>
            <button className='btn' onClick={() => setIsEditing(false)}>✕</button>
            <button className='btn' onClick={handleUpdate}>Сохранить</button>
          </div>
        </>
      ) : (
        <>
          <div className='post-view-form__ctrl-btns'>
            <button className='btn' onClick={() => navigate('/')}>Назад</button>
          </div>
          <div className="post-content">{post.content}</div>
          <div className='post-view-form__ctrl-btns'>
            <button className='btn' onClick={() => setIsEditing(true)}>Редактировать</button>
            <button className='btn' onClick={handleDelete}>Удалить</button>
          </div>
        </>
      )}
    </div>
  );
}

export default ViewPost;