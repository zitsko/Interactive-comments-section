import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CommentSection() {
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState({
    content: '',
    userId: '',
    createdAt: Date.now(),
    upvotes: '',
  });
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState({
    _id: '',
    email: '',
  });

  useEffect(() => {
    if (localStorage.getItem('token')) {
      axios
        .post('http://localhost:3005/user/verify', {
          token: localStorage.getItem('token'),
        })
        .then(({ data }) => {
          if (data.userData._id) {
            console.log(data.userData);
            setUser(data.userData);
            axios
              .get('http://localhost:3005/comment/' + data.userData._id)
              .then(({ data }) => {
                console.log("user comments", data);
                setComments(data);
              });
          } else {
            navigate('/');
          }
        });
    } else {
      navigate('/');
    }
  }, []);

  const handleCommentChange = (event) => {
    const { name, value } = event.target;
    setNewComment((prevComment) => ({
      ...prevComment,
      [name]: value,
      userId: user._id,
    }));
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    console.log(newComment);
  
    axios
      .post('http://localhost:3005/comment', newComment)
      .then(() => {
        setNewComment({
          content: '',
          userId: '',
          createdAt: Date.now(),
          upvotes: '',
        });
        // Fetch the updated comments after successful submission
        axios
          .get('http://localhost:3005/comment/' + user._id)
          .then(({ data }) => {
            console.log('user comments', data);
            setComments(data);
          })
          .catch((error) => {
            console.error('Error fetching comments:', error);
          });
      })
      .catch((error) => {
        console.error('Error sending comment data:', error);
      });
  };

  function handleCommentDelete(commentId) {
    axios
      .delete(`http://localhost:3005/comment/${commentId}`)
      .then(() => {
        setComments((prevComments) => prevComments.filter((comment) => comment._id !== commentId));
      })
      .catch((error) => {
        console.error('Error deleting comment:', error);
      });
  };

  const handleCommentEdit = (commentId, updatedContent) => {
    axios
      .put(`http://localhost:3005/comment/${commentId}`, { content: updatedContent })
      .then(() => {
        // Fetch the updated comments after successful edit
        axios
          .get('http://localhost:3005/comment/' + user._id)
          .then(({ data }) => {
            console.log('user comments', data);
            setComments(data);
          })
          .catch((error) => {
            console.error('Error fetching comments:', error);
          });
      })
      .catch((error) => {
        console.error('Error updating comment:', error);
      });
  };

  return (
    <div>
      <h2>Comments</h2>
      <form onSubmit={handleCommentSubmit}>
        <label>
          Comment:
          <textarea
          name="content"
          value={newComment.content}
          onChange={handleCommentChange}
        />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      <div className="comment-section">
        {comments.map((newComment) => (
          <div key={newComment._id} className="comment-item">
            <p>Content: {newComment.content}</p>
            <p>UserID: {newComment.userId}</p>
            <p>Created At: {newComment.createdAt}</p>
            <p>Upvotes: {newComment.upvotes}</p>
            <button onClick={() => handleCommentEdit(newComment._id, 'Updated Content')}>Edit</button>
            <button onClick={() => handleCommentDelete(newComment._id)}>Delete</button>
           </div>
         ))}
      </div>
      </div>
  );
}

export default CommentSection;