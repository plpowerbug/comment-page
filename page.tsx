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
        user_name: 'you'
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
  // 头像生成器
  const generateAvatar = (username: string) => {
    // 如果是当前用户
    if(username === 'you') {
      return (
        <div className="avatar current-user">
          <span>YOU</span>
        </div>
      )
    }
    // 其他用户取首字母
    const initials = username.charAt(0).toUpperCase();
    return (
      <div className="avatar other-user">
        <span>{initials}</span>
      </div>
    )
  }


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
                {/* 添加头像容器 */}

                <div className="comment-container">
                  {/* 头像和用户信息行 */}
                  <div className="user-info-row">
                    {generateAvatar(comment.user_name)}
                    <div className="user-meta">
                      <div className="user-name">{comment.user_name}</div>
                      <div className="comment-info">Created At: {comment.createdAt}</div>
                    </div>
                  </div>

                  {/* 评论内容 */}
                  <div className="comment-content">{comment.content}</div>
                </div>
                  {comment.user_name === 'you' && (
                  <div className="comment-actions">
                  <button className="edit" onClick={() => handleEditComment(comment.id, comment.content)}>
                  <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"
                        fill="#5357B6" />
                    </svg>
                    Edit
                  </button>
                  
                  <button className="delete" onClick={() => handleDeleteComment(comment.id)}>
                  <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
                      fill="#ED6368" />
                    </svg>
                    Delete
                  </button>
                  </div>
                  )}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="add-comment-form">
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

export default App;
