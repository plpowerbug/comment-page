"use client";

import React, { useState } from 'react';
import './App.css';

// 定义留言的类型
interface Comment {
  id: number;
  user_name: string;
  content: string;
  createdAt: string;
}

function App() {
  // 使用 useState 管理留言列表
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, user_name:'AIG Jimmy Master Account',content: 'test', createdAt: '2025-02-18 15:55:37' },
    { id: 2, user_name:'AIG Jimmy Master Account',content: 'test', createdAt: '2025-02-18 15:55:31' },
  ]);

  // 新留言的输入
  const [newComment, setNewComment] = useState<string>('');

  // 编辑留言的状态
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>('');

  // 添加留言
  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentObj: Comment = {
        id: Date.now(), // 使用时间戳作为唯一 ID
        content: newComment,
        createdAt: new Date().toLocaleString(),
        user_name: ''
      };
      setComments([...comments, newCommentObj]);
      setNewComment('');
    }
  };

  // 进入编辑模式
  const handleEditComment = (id: number, content: string) => {
    setEditingCommentId(id);
    setEditText(content);
  };

  // 更新留言
  const handleUpdateComment = () => {
    setComments(
      comments.map((comment) =>
        comment.id === editingCommentId ? { ...comment, content: editText } : comment
      )
    );
    setEditingCommentId(null);
    setEditText('');
  };

  // 删除留言
  const handleDeleteComment = (id: number) => {
    setComments(comments.filter((comment) => comment.id !== id));
  };

  return (
    <div className="container">
      <h1>Application Comment</h1>
      <div id="comments">
        {comments.map((comment) => (
          <div key={comment.id} className="comment-card">
            {editingCommentId === comment.id ? (
              <div>
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={handleUpdateComment}>Save</button>
              </div>
            ) : (
              <div>
                <div className="user-name">{comment.user_name}</div>
                <div className="comment-content">{comment.content}</div>
                <div className="comment-info">Created At: {comment.createdAt}</div>
                <div className="comment-actions">
                  <button
                    className="edit"
                    onClick={() => handleEditComment(comment.id, comment.content)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete"
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="add-comment-form">
        <h2>Add Your Comment</h2>
        <textarea
          id="new-comment"
          placeholder="Enter your comment here..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button id="submit-comment" onClick={handleAddComment}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default App;