import React, { useState } from 'react';
import { FaSearch, FaBell, FaUser, FaCog, FaComments } from 'react-icons/fa';
import './Header.css';

function Header({ onSearchChange, onChatToggle }) {
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'High priority task due today', isRead: false },
    { id: 2, text: '3 tasks are overdue', isRead: false },
    { id: 3, text: 'New task assigned to you', isRead: false }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    if (showNotifications) {
      setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    }
  };

  const handleSearchChange = (e) => {
    onSearchChange(e.target.value);
  };

  return (
    <header className="header">
      <div className="logo">
        <h1>AlphaFlow AI</h1>
      </div>


      <div className="header-actions">
        <div className="notification-container">
          <button 
            className="notification-button"
            onClick={handleNotificationClick}
          >
            <FaBell />
            {unreadCount > 0 && (
              <span className="notification-badge">{unreadCount}</span>
            )}
          </button>
          
          {showNotifications && (
            <div className="notification-dropdown">
              {notifications.length > 0 ? (
                notifications.map(notification => (
                  <div 
                    key={notification.id}
                    className={`notification-item ${!notification.isRead ? 'unread' : ''}`}
                  >
                    {notification.text}
                  </div>
                ))
              ) : (
                <div className="no-notifications">No notifications</div>
              )}
            </div>
          )}
        </div>

        <button 
          className="chat-button"
          onClick={onChatToggle}
        >
          <FaComments />
        </button>

        <div className="user-container">
          <button 
            className="user-button"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <FaUser />
          </button>
          
          {showUserMenu && (
            <div className="user-dropdown">
              <a href="/profile">Profile</a>
              <a href="/settings">Settings</a>
              <a href="/logout">Logout</a>
            </div>
          )}
        </div>

        <button className="settings-button">
          <FaCog />
        </button>
      </div>
    </header>
  );
}

export default Header; 