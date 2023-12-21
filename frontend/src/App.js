import './App.css';
import React, { useState } from 'react';
import LoginForm from './login/LoginForm';
import useAuth from './login/useAuth';
import TodoManager from './components/ToDoManger';


const App = () => {
  const [loginModal, setLoginModal] = useState(false);

  const toggleLoginModal = () => {
    setLoginModal(!loginModal);
  };

  const { authToken, login, logout } = useAuth();

  return (
      <div className="App">
        {authToken ? 
          (<button onClick={logout} type="submit" className="btn btn-secondary">Logout</button>)
          :
          (<button onClick={toggleLoginModal} type="submit" className="btn btn-primary">Login</button>)
        }
        
        {loginModal && (
          <LoginForm
            onLogin={(...args) => {
              login(...args);
              toggleLoginModal();
            }}
            onClose={toggleLoginModal}
          />
        )}

        {authToken && (
            <TodoManager />
        )}
      </div>
  );
};

export default App;
