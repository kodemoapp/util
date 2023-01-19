import * as Toast from '../components/Toast';
import React from 'react';

const NotificationsContext = React.createContext();

function notificationReducer(value, action) {
  switch (action.type) {
    case 'ADD': {
      // Only allow one notification with the same id at a time
      value = value.filter((n) => n.id !== action.payload.id);
      return value.concat([action.payload]);
    }
    case 'REMOVE': {
      // Don't modiy the array if the id is not found
      if (value.every((item) => item.id !== action.payload)) {
        return value;
      }

      return value.filter((n) => n.id !== action.payload);
    }
    default: {
      throw new Error(`Unsupported action type: ${action.type}`);
    }
  }
}

function NotificationsProvider({ children }) {
  const [notifications, dispatch] = React.useReducer(notificationReducer, []);

  const showNotification = React.useCallback((data) => {
    if (typeof data.id !== 'string') data.id = data.title;

    dispatch({
      type: 'ADD',
      payload: data,
    });
  }, []);

  const hideNotification = React.useCallback((id) => {
    dispatch({
      type: 'REMOVE',
      payload: id,
    });
  }, []);

  return (
    <NotificationsContext.Provider value={{ showNotification, hideNotification, notifications }}>
      {children}
      {notifications.map((data) => {
        return <Notification key={data.title} onClose={hideNotification} {...data} />;
      })}
    </NotificationsContext.Provider>
  );
}

function Notification({ type, id, title, description, icon, closeAfter = 5000, onClose }) {
  React.useEffect(() => {
    if (closeAfter > 0) {
      setTimeout(() => {
        onClose(id);
      }, closeAfter);
    }
  }, []);

  if (type === 'error' || type === 'warning') {
    return <Toast.Warning title={title} open={true} closable={false} description={description} icon={icon} />;
  } else {
    return <Toast.Info title={title} open={true} closable={false} description={description} icon={icon} />;
  }
}

function useNotifications() {
  return React.useContext(NotificationsContext);
}

export { useNotifications, NotificationsProvider };
