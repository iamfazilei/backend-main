import React, { useState } from 'react';
import Header from '../component/header';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Login.css';
import loginImage from '../assets/loginreg.webp';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      alert(data.message || data.error);

      if (response.ok) {
        // Save the token
      localStorage.setItem('token', data.token);
      
      if (data.role === 'instructor') {
        window.location.href = './instructor'; 
      } else if (data.role === 'student') {
        window.location.href = './student'; 
      }
      }
    } catch (error) {
      alert('Error logging in: ' + error.message);
    }
  };

  return (
    <div>
      <Header />
      <div id='login' className="container">
        <div className="row">
          <div className="col-12 col-md-6">
            <img src={loginImage} alt="Login" className="login-image" />   
            <h1 className='left-text'>Your imagination, our platform— class<span>iz.</span> transforms ideas into engaging quizzes!</h1>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-container">
              <h1>class<span>iz.</span></h1>
              <p>Where Every Question Counts.</p>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    id="email" 
                    name="email" 
                    required 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    id="password" 
                    name="password" 
                    required 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                  />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
                <div className='link-row'>
                    <a href="#" className="forgot-pw">Forgot password?</a>
                    <p>Don’t have an account?<a href="/register">Sign up</a></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
