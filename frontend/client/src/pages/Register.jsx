import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';   

const Register = () => {
  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Create Your Account</h1>
          <p>Join the best events happening in Nairobi</p>
        </div>

        <form className="auth-form">
          <div className="form-field">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" placeholder="John Doe" required />
          </div>

          <div className="form-field">
            <label htmlFor="email">Email address</label>
            <input type="email" id="email" placeholder="your@email.com" required />
          </div>

          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="••••••••••••" required />
          </div>

          <div className="form-field">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" placeholder="••••••••••••" required />
          </div>

          <button type="submit" className="btn-login">
            Create Account
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="switch-link">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;   // ← THIS LINE WAS MISSING OR REMOVED