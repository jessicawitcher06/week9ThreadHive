import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createThreadThunk } from "../../reducers/threadListSlice";
import {
  fetchSubreddits as fetchSubredditsThunk,
  createSubreddit as createSubredditThunk,
} from "../../reducers/subredditSlice";
import { Form, Spinner, Button } from "react-bootstrap";
import { rephraseText } from "../../services/aiService.js";
import "./CreateThreadForm.css";

export default function CreateThreadForm({ onClose }) {
  const dispatch = useDispatch();
  const { subreddits } = useSelector((state) => state.subreddits);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [subredditId, setSubredditId] = useState("");
  const [newSubredditName, setNewSubredditName] = useState("");
  const [newSubredditDescription, setNewSubredditDescription] = useState("");

  const [rephrase, setRephrase] = useState({ title: null, body: null });
  const [rephraseLoading, setRephraseLoading] = useState({ title: false, body: false });
  const [rephraseError, setRephraseError] = useState({ title: null, body: null });

  useEffect(() => {
    dispatch(fetchSubredditsThunk());
  }, [dispatch]);

  const handleNewSubredditChange = (value) => {
    setNewSubredditName(value);
    if (value.trim()) {
      setSubredditId("");
    }
  };

  const handleSubredditSelect = (value) => {
    setSubredditId(value);
    if (value) {
      setNewSubredditName("");
      setNewSubredditDescription("");
    }
  };

  const handleRephrase = async (field, text, type) => {
    if (!text.trim()) return;
    setRephraseLoading((prev) => ({ ...prev, [field]: true }));
    setRephraseError((prev) => ({ ...prev, [field]: null }));
    setRephrase((prev) => ({ ...prev, [field]: null }));
    try {
      const result = await rephraseText(text, type);
      setRephrase((prev) => ({ ...prev, [field]: result }));
    } catch {
      setRephraseError((prev) => ({ ...prev, [field]: "Failed to rephrase. Please try again." }));
    } finally {
      setRephraseLoading((prev) => ({ ...prev, [field]: false }));
    }
  };

  const clearRephrase = (field) => {
    setRephrase((prev) => ({ ...prev, [field]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let subredditToUse = subredditId;

    // Create new subreddit first if needed
    if (newSubredditName.trim()) {
      if (!newSubredditDescription.trim()) {
        alert("Please provide a description for the new subreddit.");
        return;
      }

      const resultAction = await dispatch(
        createSubredditThunk({
          name: newSubredditName,
          description: newSubredditDescription,
        }),
      );

      if (createSubredditThunk.fulfilled.match(resultAction)) {
        subredditToUse = resultAction.payload._id;
        setSubredditId(resultAction.payload._id);
      } else {
        alert("Failed to create community. Please try again.");
        return;
      }
    }

    if (!subredditToUse) {
      alert("Please select or create a subreddit before posting.");
      return;
    }

    // Use Redux to create thread
    const resultAction = await dispatch(
      createThreadThunk({
        title,
        content,
        subreddit: subredditToUse,
      }),
    );

    if (createThreadThunk.fulfilled.match(resultAction)) {
      onClose();
    } else {
      alert("Failed to create thread. Please try again.");
    }
  };

  return (
    <div className="create-thread-form px-0">
      <h3 className="form-title">✏️ Create New Thread</h3>
      <Form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="form-group-custom">
          <label className="form-label-custom">Thread Title</label>
          <input
            type="text"
            className="form-control-custom"
            placeholder="What's on your mind?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <button
            type="button"
            className="form-btn form-btn-secondary mt-2"
            onClick={() => handleRephrase("title", title, "title")}
            disabled={rephraseLoading.title || !title.trim()}
          >
            {rephraseLoading.title ? (
              <><Spinner animation="border" size="sm" className="me-1" />Rephrasing...</>
            ) : (
              "✨ Rephrase with AI"
            )}
          </button>
          {rephraseError.title && (
            <div className="text-danger mt-1 small">{rephraseError.title}</div>
          )}
          {rephrase.title && (
            <div className="mt-2 p-2 border rounded bg-light">
              <p className="mb-1 small fw-semibold">Suggested:</p>
              <p className="mb-2 small">{rephrase.title}</p>
              <Button
                type="button"
                size="sm"
                variant="primary"
                className="me-2"
                onClick={() => { setTitle(rephrase.title); clearRephrase("title"); }}
              >
                Accept
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline-secondary"
                onClick={() => clearRephrase("title")}
              >
                Reject
              </Button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="form-group-custom">
          <label className="form-label-custom">Content</label>
          <textarea
            className="form-control-custom form-textarea-custom"
            rows={4}
            placeholder="Share your thoughts..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <button
            type="button"
            className="form-btn form-btn-secondary mt-2"
            onClick={() => handleRephrase("body", content, "body")}
            disabled={rephraseLoading.body || !content.trim()}
          >
            {rephraseLoading.body ? (
              <><Spinner animation="border" size="sm" className="me-1" />Rephrasing...</>
            ) : (
              "✨ Rephrase with AI"
            )}
          </button>
          {rephraseError.body && (
            <div className="text-danger mt-1 small">{rephraseError.body}</div>
          )}
          {rephrase.body && (
            <div className="mt-2 p-2 border rounded bg-light">
              <p className="mb-1 small fw-semibold">Suggested:</p>
              <p className="mb-2 small">{rephrase.body}</p>
              <Button
                type="button"
                size="sm"
                variant="primary"
                className="me-2"
                onClick={() => { setContent(rephrase.body); clearRephrase("body"); }}
              >
                Accept
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline-secondary"
                onClick={() => clearRephrase("body")}
              >
                Reject
              </Button>
            </div>
          )}
        </div>

        {/* Subreddit Selection */}
        <div className="form-group-custom">
          <label className="form-label-custom">Community</label>
          {subreddits.length > 0 ? (
            <select
              className="form-control-custom"
              value={subredditId}
              onChange={(e) => handleSubredditSelect(e.target.value)}
              disabled={!!newSubredditName.trim()}
            >
              <option value="">Select a community</option>
              {subreddits.map((sr) => (
                <option key={sr._id} value={sr._id}>
                  r/{sr.name}
                </option>
              ))}
            </select>
          ) : (
            <p className="form-hint">No communities found.</p>
          )}

          <div className="new-subreddit-section">
            <label className="form-label-custom mb-2">
              Or Create New Community
            </label>
            <input
              type="text"
              className="form-control-custom mb-2"
              placeholder={
                subredditId
                  ? "Deselect above to create new"
                  : "Enter community name"
              }
              value={newSubredditName}
              onChange={(e) => handleNewSubredditChange(e.target.value)}
              disabled={!!subredditId}
            />
            {newSubredditName && !subredditId && (
              <textarea
                className="form-control-custom"
                rows={2}
                placeholder="Describe your community"
                value={newSubredditDescription}
                onChange={(e) => setNewSubredditDescription(e.target.value)}
                required
              />
            )}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="form-btn form-btn-primary">
            📝 Post Thread
          </button>
          <button
            type="button"
            className="form-btn form-btn-secondary"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </Form>
    </div>
  );
}
