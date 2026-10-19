import React, { useState } from "react";

const Navbar = () => {

  const [isLoggedIn, setIsLoggedIn] =
    useState(
      !!localStorage.getItem("token")
    );


  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsLoggedIn(false);

    window.location.href = "/";

  };


  return (

    <nav className="navbar">

      {/* ======================================
          LOGO
      ====================================== */}

      <div className="logo">

        <span className="logo-heart">
          ♥
        </span>

        <div>

          <h2>
            KANU SAMAJ
          </h2>

          <small>
            MATRIMONIAL
          </small>

        </div>

      </div>


      {/* ======================================
          NAV LINKS
      ====================================== */}

      <div className="nav-links">

        <a href="/">
          Home
        </a>

        <a href="/profiles">
          Find Partner
        </a>

        <a href="/about">
          About Us
        </a>

        <a href="/success-stories">
          Success Stories
        </a>

        <a href="/contact">
          Contact Us
        </a>

      </div>


      {/* ======================================
          NAV BUTTONS
      ====================================== */}

      <div className="nav-buttons">

        {isLoggedIn ? (

          <>

            {/* My Profile */}

            <a href="/my-profile">

              <button className="login-btn">
                👤 My Profile
              </button>

            </a>


            {/* Sent Interests */}

            <a href="/sent-interests">

              <button className="login-btn">
                ❤️ Sent Interests
              </button>

            </a>


            {/* Received Interests */}

            <a href="/received-interests">

              <button className="login-btn">
                💌 Received Interests
              </button>

            </a>


            {/* Blocked Users */}

            <a href="/blocked-users">

              <button className="login-btn">
                🔒 Blocked Users
              </button>

            </a>


            {/* Edit Profile */}

            <a href="/edit-profile">

              <button className="register-btn">
                ✏️ Edit Profile
              </button>

            </a>


            {/* Logout */}

            <button
              className="register-btn"
              onClick={handleLogout}
            >
              🚪 Logout
            </button>

          </>

        ) : (

          <>

            {/* Login */}

            <a href="/login">

              <button className="login-btn">
                Login
              </button>

            </a>


            {/* Register */}

            <a href="/register">

              <button className="register-btn">
                Register
              </button>

            </a>

          </>

        )}

      </div>

    </nav>

  );

};

export default Navbar;