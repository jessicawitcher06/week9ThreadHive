import { useState } from "react";
import { Card, Form, Button, Spinner } from "react-bootstrap";
import { rephraseText } from "../../services/aiService.js";
import './CommentForm.css';

export default function CommentForm({ commentText, onCommentChange, onPostComment, disabled }) {
  const [rephrase, setRephrase] = useState(null);
  const [rephraseLoading, setRephraseLoading] = useState(false);
  const [rephraseError, setRephraseError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onPostComment) {
      onPostComment();
    }
  };

  const handleRephrase = async () => {
    if (!commentText?.trim()) return;
    setRephraseLoading(true);
    setRephraseError(null);
    setRephrase(null);
    try {
      const result = await rephraseText(commentText, "comment");
      setRephrase(result);
    } catch {
      setRephraseError("Failed to rephrase. Please try again.");
    } finally {
      setRephraseLoading(false);
    }
  };

  return (
    <Card className="add-comment-section mb-4 border-0">
      <Card.Body>
        <h5 className="add-comment-title">Add a Comment</h5>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="commentTextarea" className="mb-3">
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Write a comment..."
              value={commentText}
              onChange={onCommentChange}
              required
              className="comment-textarea"
            />
          </Form.Group>

          <div className="mb-3">
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={handleRephrase}
              disabled={rephraseLoading || !commentText?.trim()}
              className="me-2"
            >
              {rephraseLoading ? (
                <><Spinner animation="border" size="sm" className="me-1" />Rephrasing...</>
              ) : (
                "✨ Rephrase with AI"
              )}
            </Button>

            {rephraseError && (
              <div className="text-danger mt-1 small">{rephraseError}</div>
            )}

            {rephrase && (
              <div className="mt-2 p-2 border rounded bg-light">
                <p className="mb-1 small fw-semibold">Suggested:</p>
                <p className="mb-2 small">{rephrase}</p>
                <Button
                  variant="primary"
                  size="sm"
                  className="me-2"
                  onClick={() => {
                    onCommentChange({ target: { value: rephrase } });
                    setRephrase(null);
                  }}
                >
                  Accept
                </Button>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => setRephrase(null)}
                >
                  Reject
                </Button>
              </div>
            )}
          </div>

          <Button
            variant="primary"
            type="submit"
            disabled={disabled || !commentText?.trim()}
            className="post-comment-btn"
          >
            📝 Post Comment
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
