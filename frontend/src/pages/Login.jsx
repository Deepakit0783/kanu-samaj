import React, { useState } from "react";
import axios from "axios";

const Login = () => {

  // ==========================================
  // LOGIN FORM DATA
  // ==========================================

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  // Error / Success message
  const [message, setMessage] = useState("");

  // Loading state
  const [loading, setLoading] = useState(false);


  // ==========================================
  // INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

  };


  // ==========================================
  // LOGIN SUBMIT
  // ==========================================

  const handleSubmit = async (e) => {

    // Page refresh rokna
    e.preventDefault();

    setMessage("");

    try {

      setLoading(true);

      // Backend Login API
      const response = await axios.post(
        "http://localhost:3200/api/auth/login",
        {
          email: formData.email,
          password: formData.password
        }
      );


      // ==========================================
      // JWT TOKEN SAVE
      // ==========================================

      localStorage.setItem(
        "token",
        response.data.token
      );


      // User information save
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );


      setMessage("Login successful");


      // Login ke baad Profiles page
      setTimeout(() => {
        window.location.href = "/profiles";
      }, 1000);


    } catch (error) {

      // Backend ka error message
      const errorMessage =
        error.response?.data?.message ||
        "Login failed. Please try again.";

      setMessage(errorMessage);

    } finally {

      setLoading(false);

    }

  };


  return (
    <div className="login-page">

      {/* Background Decoration */}
      <div className="login-heart heart-one">♥</div>
      <div className="login-heart heart-two">♥</div>


      {/* Login Card */}
      <div className="login-card">

        {/* Logo */}
        <div className="login-logo">

          <div className="login-logo-heart">
            ♥
          </div>

          <h1>KANU SAMAJ</h1>

          <span>MATRIMONIAL</span>

        </div>


        {/* Heading */}
        <div className="login-heading">

          <h2>Welcome Back ❤️</h2>

          <p>
            Apne account me login karein aur
            apne jeevan saathi ki talaash jaari rakhein.
          </p>

        </div>


        {/* Login Form */}
        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div className="login-form-group">

            <label>Email Address</label>

            <div className="login-input-box">

              <span>📧</span>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />

            </div>

          </div>


          {/* Password */}
          <div className="login-form-group">

            <label>Password</label>

            <div className="login-input-box">

              <span>🔒</span>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />

            </div>

          </div>


          {/* Remember + Forgot */}
          <div className="login-options">

            <label>
              <input type="checkbox" />
              Remember me
            </label>

            <a href="#">
              Forgot Password?
            </a>

          </div>


          {/* Message */}
          {message && (
            <p className="login-message">
              {message}
            </p>
          )}


          {/* Login Button */}
          <button
            type="submit"
            className="login-submit"
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "🔐 Login"
            }
          </button>

        </form>


        {/* Divider */}
        <div className="login-divider">
          <span>OR</span>
        </div>


        {/* Register */}
        <div className="login-register">

          <p>
            Don't have an account?
          </p>

          <a href="/register">
            Create New Profile
          </a>

        </div>


        {/* Bottom */}
        <div className="login-bottom">

          <span>🔒</span>

          Your information is safe and secure

        </div>

      </div>


      {/* Footer Message */}
      <div className="login-footer">

        ❤️ Find Your Perfect Life Partner

        <br />

        <span>
          🙏 Jai Baba Ganinath Ji Maharaj
        </span>

      </div>

    </div>
  );
};

export default Login;