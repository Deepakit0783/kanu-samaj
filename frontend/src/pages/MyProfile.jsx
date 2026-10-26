import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const MyProfile = () => {

  // Profile data
  const [profile, setProfile] = useState(null);

  // Loading
  const [loading, setLoading] = useState(true);

  // Error
  const [error, setError] = useState("");

  // =====================================
  // LOGIN USER KI PROFILE FETCH
  // =====================================
  useEffect(() => {

    const fetchMyProfile = async () => {

      try {

        setLoading(true);
        setError("");

        // LocalStorage se JWT token
        const token = localStorage.getItem("token");

        // Agar login nahi hai
        if (!token) {
          setError("Please pehle login karein.");
          return;
        }

        // Backend API
        const response = await axios.get(
          "http://localhost:3200/api/profiles/me",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        // Profile save
        setProfile(response.data.profile);

      } catch (error) {

        console.error(
          "My Profile Error:",
          error
        );

        setError(
          error.response?.data?.message ||
          "Profile load nahi ho payi."
        );

      } finally {

        setLoading(false);

      }

    };

    fetchMyProfile();

  }, []);


  // =====================================
  // LOADING
  // =====================================
  if (loading) {

    return (
      <div
        style={{
          textAlign: "center",
          padding: "100px"
        }}
      >
        <h2>
          ⏳ Aapki profile load ho rahi hai...
        </h2>
      </div>
    );

  }


  // =====================================
  // ERROR
  // =====================================
  if (error) {

    return (
      <div
        style={{
          textAlign: "center",
          padding: "100px"
        }}
      >

        <h2>
          ❌ {error}
        </h2>

        <br />

        <Link to="/profiles">
          ← Back to Profiles
        </Link>

      </div>
    );

  }


  // =====================================
  // PROFILE NOT FOUND
  // =====================================
  if (!profile) {

    return (
      <div
        style={{
          textAlign: "center",
          padding: "100px"
        }}
      >

        <h2>
          😔 Profile nahi mili
        </h2>

        <br />

        <Link to="/profiles">
          ← Back to Profiles
        </Link>

      </div>
    );

  }


  // =====================================
  // PROFILE DISPLAY
  // =====================================
  return (
    <div className="profile-details-page">

      {/* Background Hearts */}
      <div className="profile-bg-heart profile-heart-one">
        ♥
      </div>

      <div className="profile-bg-heart profile-heart-two">
        ♥
      </div>


      {/* Top */}
      <div className="profile-top">

        <Link
          to="/profiles"
          className="back-profile"
        >
          ← Back to Profiles
        </Link>

      </div>


      {/* Main Card */}
      <div className="profile-details-card">

        {/* Image */}
        <div className="profile-details-image">

          <img
            src={
              profile.image ||
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800"
            }
            alt={profile.name}
          />

          <span className="profile-online">
            🟢 My Profile
          </span>

        </div>


        {/* Content */}
        <div className="profile-details-content">

          {/* Name */}
          <div className="profile-name-row">

            <div>

              <h1>
                {profile.name}, {profile.age}
              </h1>

              <p className="profile-location">
                📍 {profile.city}
              </p>

            </div>

          </div>


          {/* Quick Information */}
          <div className="profile-quick-info">

            <div>

              <span>🎓</span>

              <p>
                Education
              </p>

              <strong>
                {profile.education || "Not specified"}
              </strong>

            </div>


            <div>

              <span>💼</span>

              <p>
                Profession
              </p>

              <strong>
                {profile.profession || "Not specified"}
              </strong>

            </div>


            <div>

              <span>📏</span>

              <p>
                Height
              </p>

              <strong>
                {profile.height || "Not specified"}
              </strong>

            </div>

          </div>


          {/* About */}
          <div className="profile-about">

            <h2>
              About Me ❤️
            </h2>

            <p>
              {profile.about ||
                "About information available nahi hai."}
            </p>

          </div>


          {/* Personal Details */}
          <div className="personal-details">

            <h2>
              Personal Details
            </h2>

            <div className="details-grid">

              <div>

                <span>
                  Gender
                </span>

                <strong>
                  {profile.gender ||
                    "Not specified"}
                </strong>

              </div>


              <div>

                <span>
                  Marital Status
                </span>

                <strong>
                  {profile.maritalStatus ||
                    "Not specified"}
                </strong>

              </div>


              <div>

                <span>
                  Location
                </span>

                <strong>
                  {profile.city}
                </strong>

              </div>


              <div>

                <span>
                  Mobile
                </span>

                <strong>
                  {profile.mobile ||
                    "Not specified"}
                </strong>

              </div>

            </div>

          </div>


          {/* Edit Button */}
          <div className="profile-actions">

            <button
              className="interest-btn"
              onClick={() => {
                window.location.href =
                  "/edit-profile";
              }}
            >
              ✏️ Edit Profile
            </button>

          </div>

        </div>

      </div>


      {/* Bottom */}
      <div className="profile-bottom">

        <h2>
          ❤️ Your Profile
        </h2>

        <p>
          Apni profile ko updated rakhein
          aur apne liye suitable partner dhoondhein.
        </p>

        <h3>
          🙏 Jai Baba Ganinath Ji Maharaj
        </h3>

      </div>

    </div>
  );
};

export default MyProfile;