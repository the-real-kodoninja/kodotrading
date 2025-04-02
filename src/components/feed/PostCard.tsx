import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, Typography, Box, IconButton, Modal, TextField, Button, Divider, List, ListItem, ListItemText } from '@mui/material';
import { ThumbUp, Comment, Share, ExpandMore, ExpandLess } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { cardStyle, inputStyle, buttonStyle } from '../../assets/styles/styles';

interface Comment {
  id: string;
  username: string;
  content: string;
  timestamp: Date;
  replies?: Comment[];
}

interface PostCardProps {
  id: string;
  username: string;
  content: string;
  timestamp: Date;
  likes: number;
  comments: number;
  image?: string;
  video?: string;
  stock?: string;
}

const PostCard: React.FC<PostCardProps> = ({
  id,
  username,
  content,
  timestamp,
  likes,
  comments,
  image,
  video,
  stock,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [postComments, setPostComments] = useState<Comment[]>([
    {
      id: '1',
      username: 'user1',
      content: 'Great post!',
      timestamp: new Date(),
      replies: [
        { id: '1-1', username: 'user2', content: 'I agree!', timestamp: new Date() },
      ],
    },
  ]);
  const [expandedComments, setExpandedComments] = useState<string[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const comment: Comment = {
      id: Date.now().toString(),
      username: 'currentUser',
      content: newComment,
      timestamp: new Date(),
    };
    setPostComments((prev) => [...prev, comment]);
    setNewComment('');
  };

  const handleAddReply = (commentId: string, replyContent: string) => {
    if (!replyContent.trim()) return;
    const reply: Comment = {
      id: `${commentId}-${Date.now()}`,
      username: 'currentUser',
      content: replyContent,
      timestamp: new Date(),
    };
    setPostComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? { ...comment, replies: [...(comment.replies || []), reply] }
          : comment
      )
    );
  };

  const toggleCommentExpand = (commentId: string) => {
    setExpandedComments((prev) =>
      prev.includes(commentId)
        ? prev.filter((id) => id !== commentId)
        : [...prev, commentId]
    );
  };

  // Focus the modal when it opens for accessibility
  useEffect(() => {
    if (isModalOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isModalOpen]);

  return (
    <>
      <Card
        sx={cardStyle}
        onClick={() => setIsModalOpen(true)}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => e.key === 'Enter' && setIsModalOpen(true)}
        aria-label={`Post by ${username} on ${timestamp.toLocaleString()}`}
      >
        <CardContent>
          <Typography variant="subtitle2" color="text.secondary">
            {username} • {timestamp.toLocaleString()}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, mb: 2 }}>
            {content}
          </Typography>
          {image && (
            <Box sx={{ mb: 2 }}>
              <img src={image} alt="Post content" style={{ maxWidth: '100%', borderRadius: 8 }} />
            </Box>
          )}
          {video && (
            <Box sx={{ mb: 2 }}>
              <video controls style={{ maxWidth: '100%', borderRadius: 8 }} aria-label="Video content">
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Box>
          )}
          {stock && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="primary">
                <Link to={`/stock/${stock}`} aria-label={`View details for stock ${stock}`}>
                  {stock}
                </Link>
              </Typography>
            </Box>
          )}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton aria-label={`Like post, ${likes} likes`}>
              <ThumbUp />
              <Typography variant="body2" sx={{ ml: 0.5 }}>
                {likes}
              </Typography>
            </IconButton>
            <IconButton aria-label={`Comment on post, ${comments} comments`}>
              <Comment />
              <Typography variant="body2" sx={{ ml: 0.5 }}>
                {comments}
              </Typography>
            </IconButton>
            <IconButton aria-label="Share post">
              <Share />
            </IconButton>
          </Box>
        </CardContent>
      </Card>

      {/* Modal for Expanded View */}
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="post-modal-title"
        aria-describedby="post-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: '80%', md: 800 },
            maxHeight: '90vh',
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius: 2,
            p: 3,
            overflowY: 'auto',
          }}
          ref={modalRef}
          tabIndex={-1}
        >
          <Typography
            id="post-modal-title"
            variant="subtitle2"
            color="text.secondary"
            aria-label={`Post by ${username} on ${timestamp.toLocaleString()}`}
          >
            {username} • {timestamp.toLocaleString()}
          </Typography>
          <Typography id="post-modal-description" variant="body1" sx={{ mt: 1, mb: 2 }}>
            {content}
          </Typography>
          {image && (
            <Box sx={{ mb: 2 }}>
              <img src={image} alt="Post content" style={{ width: '100%', borderRadius: 8 }} />
            </Box>
          )}
          {video && (
            <Box sx={{ mb: 2 }}>
              <video controls style={{ width: '100%', borderRadius: 8 }} aria-label="Video content">
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Box>
          )}
          {stock && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="primary">
                <Link to={`/stock/${stock}`} aria-label={`View details for stock ${stock}`}>
                  {stock}
                </Link>
              </Typography>
            </Box>
          )}
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <IconButton aria-label={`Like post, ${likes} likes`}>
              <ThumbUp />
              <Typography variant="body2" sx={{ ml: 0.5 }}>
                {likes}
              </Typography>
            </IconButton>
            <IconButton aria-label={`Comment on post, ${comments} comments`}>
              <Comment />
              <Typography variant="body2" sx={{ ml: 0.5 }}>
                {comments}
              </Typography>
            </IconButton>
            <IconButton aria-label="Share post">
              <Share />
            </IconButton>
          </Box>

          {/* Comments Section */}
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" sx={{ mb: 1 }} id="comments-section">
            Comments
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <TextField
              fullWidth
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              variant="outlined"
              sx={inputStyle}
              aria-label="Add a comment"
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleAddComment();
              }}
            />
            <Button
              variant="contained"
              onClick={handleAddComment}
              sx={buttonStyle}
              disabled={!newComment.trim()}
              aria-label="Post comment"
            >
              Post
            </Button>
          </Box>
          <List aria-label="Comments list">
            {postComments.map((comment) => (
              <Box key={comment.id}>
                <ListItem>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle2">
                        {comment.username} • {comment.timestamp.toLocaleString()}
                      </Typography>
                    }
                    secondary={comment.content}
                  />
                  {comment.replies && comment.replies.length > 0 && (
                    <IconButton
                      onClick={() => toggleCommentExpand(comment.id)}
                      aria-label={
                        expandedComments.includes(comment.id)
                          ? 'Collapse replies'
                          : 'Expand replies'
                      }
                    >
                      {expandedComments.includes(comment.id) ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                  )}
                </ListItem>
                {comment.replies && expandedComments.includes(comment.id) && (
                  <Box sx={{ pl: 4 }}>
                    {comment.replies.map((reply) => (
                      <ListItem key={reply.id}>
                        <ListItemText
                          primary={
                            <Typography variant="subtitle2">
                              {reply.username} • {reply.timestamp.toLocaleString()}
                            </Typography>
                          }
                          secondary={reply.content}
                        />
                      </ListItem>
                    ))}
                  </Box>
                )}
                <Box sx={{ pl: 4, display: 'flex', gap: 1, mb: 1 }}>
                  <TextField
                    fullWidth
                    placeholder="Add a reply..."
                    variant="outlined"
                    size="small"
                    sx={inputStyle}
                    aria-label="Add a reply"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        const target = e.target as HTMLInputElement;
                        handleAddReply(comment.id, target.value);
                        target.value = '';
                      }
                    }}
                  />
                </Box>
              </Box>
            ))}
          </List>

          {/* Related Content Section */}
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" sx={{ mb: 1 }} id="related-content-section">
            Related Content
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }} aria-label="Related content links">
            <Typography variant="body2">
              <Link to="/post/123" aria-label="View similar post by user2">
                Similar Post by user2
              </Link>
            </Typography>
            {stock && (
              <Typography variant="body2">
                <Link to={`/stock/${stock}`} aria-label={`View more about stock ${stock}`}>
                  More about {stock}
                </Link>
              </Typography>
            )}
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default PostCard;