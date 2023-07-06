// Import necessary dependencies and hooks
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Define the CommentSection component
function CommentSection() {
  // Initialize state variables
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [user, setUser] = useState({
    _id: '',
    email: '',
  });

  // Perform initial setup and token verification
  useEffect(() => {
    // Check if a token is present in local storage
    if (localStorage.getItem('token')) {
      // Send a token verification request to the server
      axios
        .post('http://localhost:3005/user/verify', {
          token: localStorage.getItem('token'),
        })
        .then(({ data }) => {
          console.log('User logged in:', data);
          // If the token is valid and user data is received, update the user state
          if (data._id) {
            setUser(data);
            fetchComments(data._id);
            console.log('Comments fetched');
          } else {
            // If the token is invalid or no user data is received, redirect to the login page
            console.log('Invalid token:', data);
            navigate('/');
          }
        });
    } else {
      // If no token is found, redirect to the login page
      navigate('/');
    }
  }, []);

  // Fetch comments for the current user
  const fetchComments = (userId) => {
    axios
      .get(`http://localhost:3005/comment/${userId}`)
      .then((response) => {
        setComments(response.data);
        console.log('Comment get:', response.data);
      })
      .catch((error) => {
        console.error('Error fetching comments:', error);
      });
  };

  // Create a new comment
  function createComment() {
    axios
      .post('http://localhost:3005/comment', {
        content: newComment,
        user: user._id,
      })
      .then((response) => {
        console.log('Comment created:', response.data);
        setComments([...comments, response.data]);
        setNewComment('');
      })
      .catch((error) => {
        console.error('Error creating comment:', error);
      });
  }

  // Delete a comment
  function deleteComment(commentId) {
    axios
      .delete(`http://localhost:3005/comment/${commentId}`)
      .then(() => {
        setComments(comments.filter((comment) => comment._id !== commentId));
      })
      .catch((error) => {
        console.error('Error deleting comment:', error);
      });
  }

  // Render the component
  return (
    <div>
      <h2>Comments</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment._id}>
            {comment.content}{' '}
            <button onClick={() => deleteComment(comment._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <form onSubmit={createComment}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Enter your comment"
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CommentSection;
