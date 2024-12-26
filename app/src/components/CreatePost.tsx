import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const path = import.meta.env.VITE_API_URL;

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content })
    })
    .then(() => navigate('/'));
  };

  return (
    <div className="post-view-form">
      <textarea
        className='post-view-form__input' 
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className='post-view-form__ctrl-btns'>
        <button className='btn' onClick={() => navigate('/')}>✕</button>
        <button className='btn' onClick={handleSubmit}>Опубликовать</button>
      </div>
    </div>
  );
}

export default CreatePost;