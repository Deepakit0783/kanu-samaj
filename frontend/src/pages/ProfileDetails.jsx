import React, { useEffect, useState } from "react";
import {
  useParams,
  Link,
  useNavigate
} from "react-router-dom";
import axios from "axios";

const ProfileDetails = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // INTEREST STATES
  // ==========================================

  const [interestLoading, setInterestLoading] =
    useState(false);

  const [interestMessage, setInterestMessage] =
    useState("");

  const [interestError, setInterestError] =
    useState("");


  // ==========================================
  // BLOCK STATES
  // ==========================================

  const [blockLoading, setBlockLoading] =
    useState(false);

  const [blockMessage, setBlockMessage] =
    useState("");

  const [blockError, setBlockError] =
    useState("");


  // ==========================================
  // REPORT STATES
  // ==========================================

  const [reportLoading, setReportLoading] =
    useState(false);

  const [reportMessage, setReportMessage] =
    useState("");

  const [reportError, setReportError] =
    useState("");

  const [showReportForm, setShowReportForm] =
    useState(false);

  const [reportReason, setReportReason] =
    useState("");


  // ==========================================
  // FETCH PROFILE
  // ==========================================

  useEffect(() => {

    const fetchProfile = async () => {

      try {

        setLoading(true);
        setError("");

        const response = await axios.get(
          `http://localhost:3200/api/profiles/${id}`
        );

        setProfile(
          response.data.profile
        );

      } catch (error) {

        console.error(
          "Profile fetch error:",
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

    fetchProfile();

  }, [id]);


  // ==========================================
  // SEND INTEREST
  // ==========================================

  const handleSendInterest = async () => {

    try {

      setInterestLoading(true);

      setInterestMessage("");
      setInterestError("");

      const token =
        localStorage.getItem("token");

      if (!token) {

        setInterestError(
          "Interest bhejne ke liye pehle login karein."
        );

        return;
      }

      const response = await axios.post(
        "http://localhost:3200/api/interests",
        {
          receiverId: id
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      setInterestMessage(
        response.data.message ||
        "Interest successfully sent"
      );

    } catch (error) {

      console.error(
        "Send interest error:",
        error
      );

      setInterestError(
        error.response?.data?.message ||
        "Interest send nahi ho paya."
      );

    } finally {

      setInterestLoading(false);

    }

  };


  // ==========================================
  // MESSAGE
  // ==========================================

  const handleMessage = () => {

    const token =
      localStorage.getItem("token");

    if (!token) {

      alert(
        "Message karne ke liye pehle login karein."
      );

      return;
    }

    navigate(`/chat/${id}`);

  };


  // ==========================================
  // BLOCK USER
  // ==========================================

  const handleBlockUser = async () => {

    const token =
      localStorage.getItem("token");

    if (!token) {

      setBlockError(
        "User ko block karne ke liye pehle login karein."
      );

      return;
    }

    const confirmBlock =
      window.confirm(
        `Kya aap ${profile?.name || "is user"} ko block karna chahte hain?`
      );

    if (!confirmBlock) {
      return;
    }

    try {

      setBlockLoading(true);

      setBlockMessage("");
      setBlockError("");

      const response = await axios.post(
        "http://localhost:3200/api/blocks",
        {
          profileId: id
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      setBlockMessage(
        response.data.message ||
        "User successfully blocked"
      );

    } catch (error) {

      console.error(
        "Block user error:",
        error
      );

      setBlockError(
        error.response?.data?.message ||
        "User block nahi ho paya."
      );

    } finally {

      setBlockLoading(false);

    }

  };


  // ==========================================
  // OPEN REPORT FORM
  // ==========================================

  const handleOpenReport = () => {

    const token =
      localStorage.getItem("token");

    if (!token) {

      setReportError(
        "User ko report karne ke liye pehle login karein."
      );

      return;
    }

    setReportError("");
    setReportMessage("");
    setShowReportForm(true);

  };


  // ==========================================
  // SUBMIT REPORT
  // ==========================================

  const handleReportUser = async () => {

    if (!reportReason.trim()) {

      setReportError(
        "Please report reason select karein."
      );

      return;
    }

    try {

      setReportLoading(true);

      setReportMessage("");
      setReportError("");

      const token =
        localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:3200/api/reports",
        {
          profileId: id,
          reason: reportReason
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      setReportMessage(
        response.data.message ||
        "Profile successfully reported"
      );

      setShowReportForm(false);
      setReportReason("");

    } catch (error) {

      console.error(
        "Report user error:",
        error
      );

      setReportError(
        error.response?.data?.message ||
        "Report submit nahi ho payi."
      );

    } finally {

      setReportLoading(false);

    }

  };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (
      <div
        className="profile-details-page"
        style={{
          textAlign: "center",
          paddingTop: "100px"
        }}
      >

        <h2>
          ⏳ Profile load ho rahi hai...
        </h2>

      </div>
    );

  }


  // ==========================================
  // ERROR
  // ==========================================

  if (error) {

    return (
      <div
        className="profile-details-page"
        style={{
          textAlign: "center",
          paddingTop: "100px"
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


  // ==========================================
  // PROFILE NOT FOUND
  // ==========================================

  if (!profile) {

    return (
      <div
        className="profile-details-page"
        style={{
          textAlign: "center",
          paddingTop: "100px"
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


  // ==========================================
  // MAIN PAGE
  // ==========================================

  return (

    <div className="profile-details-page">

      <div className="profile-bg-heart profile-heart-one">
        ♥
      </div>

      <div className="profile-bg-heart profile-heart-two">
        ♥
      </div>


      {/* ======================================
          TOP
      ====================================== */}

      <div className="profile-top">

        <Link
          to="/profiles"
          className="back-profile"
        >
          ← Back to Profiles
        </Link>

      </div>


      {/* ======================================
          PROFILE CARD
      ====================================== */}

      <div className="profile-details-card">


        {/* PROFILE IMAGE */}

        <div className="profile-details-image">

          <img
            src={
              profile.image ||
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800"
            }
            alt={profile.name}
          />

          <span className="profile-online">
            🟢 Online
          </span>

        </div>


        {/* PROFILE CONTENT */}

        <div className="profile-details-content">


          {/* NAME */}

          <div className="profile-name-row">

            <div>

              <h1>
                {profile.name}, {profile.age}
              </h1>

              <p className="profile-location">
                📍 {profile.city}
              </p>

            </div>

            <span className="profile-id">
              ID: {profile._id}
            </span>

          </div>


          {/* QUICK INFO */}

          <div className="profile-quick-info">

            <div>

              <span>
                🎓
              </span>

              <p>
                Education
              </p>

              <strong>
                {profile.education ||
                  "Not specified"}
              </strong>

            </div>


            <div>

              <span>
                💼
              </span>

              <p>
                Profession
              </p>

              <strong>
                {profile.profession ||
                  "Not specified"}
              </strong>

            </div>


            <div>

              <span>
                📏
              </span>

              <p>
                Height
              </p>

              <strong>
                {profile.height ||
                  "Not specified"}
              </strong>

            </div>

          </div>


          {/* ABOUT */}

          <div className="profile-about">

            <h2>
              About Me ❤️
            </h2>

            <p>
              {profile.about ||
                "About information available nahi hai."}
            </p>

          </div>


          {/* PERSONAL DETAILS */}

          <div className="personal-details">

            <h2>
              Personal Details
            </h2>

            <div className="details-grid">

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
                  Religion
                </span>

                <strong>
                  {profile.religion ||
                    "Not specified"}
                </strong>

              </div>


              <div>

                <span>
                  Mother Tongue
                </span>

                <strong>
                  {profile.language ||
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

            </div>

          </div>


          {/* ==================================
              INTEREST MESSAGE
          ================================== */}

          {interestMessage && (

            <div
              style={{
                background: "#e8f8ee",
                color: "green",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "15px"
              }}
            >
              ✅ {interestMessage}
            </div>

          )}


          {interestError && (

            <div
              style={{
                background: "#ffeaea",
                color: "red",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "15px"
              }}
            >
              ❌ {interestError}
            </div>

          )}


          {/* ==================================
              BLOCK MESSAGE
          ================================== */}

          {blockMessage && (

            <div
              style={{
                background: "#e8f8ee",
                color: "green",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "15px"
              }}
            >
              ✅ {blockMessage}
            </div>

          )}


          {blockError && (

            <div
              style={{
                background: "#ffeaea",
                color: "red",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "15px"
              }}
            >
              ❌ {blockError}
            </div>

          )}


          {/* ==================================
              REPORT MESSAGE
          ================================== */}

          {reportMessage && (

            <div
              style={{
                background: "#e8f8ee",
                color: "green",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "15px"
              }}
            >
              ✅ {reportMessage}
            </div>

          )}


          {reportError && (

            <div
              style={{
                background: "#ffeaea",
                color: "red",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "15px"
              }}
            >
              ❌ {reportError}
            </div>

          )}


          {/* ==================================
              REPORT FORM
          ================================== */}

          {showReportForm && (

            <div
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "15px",
                marginBottom: "15px"
              }}
            >

              <h3>
                🚩 Report this Profile
              </h3>

              <select
                value={reportReason}
                onChange={(e) =>
                  setReportReason(
                    e.target.value
                  )
                }
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "10px",
                  marginBottom: "10px",
                  borderRadius: "6px"
                }}
              >

                <option value="">
                  Select Reason
                </option>

                <option value="Fake Profile">
                  Fake Profile
                </option>

                <option value="Wrong Information">
                  Wrong Information
                </option>

                <option value="Abusive Behaviour">
                  Abusive Behaviour
                </option>

                <option value="Harassment">
                  Harassment
                </option>

                <option value="Inappropriate Content">
                  Inappropriate Content
                </option>

                <option value="Other">
                  Other
                </option>

              </select>


              <button
                onClick={handleReportUser}
                disabled={reportLoading}
                className="interest-btn"
              >

                {reportLoading
                  ? "⏳ Reporting..."
                  : "🚩 Submit Report"
                }

              </button>


              <button
                onClick={() => {
                  setShowReportForm(false);
                  setReportReason("");
                  setReportError("");
                }}
                className="message-btn"
                style={{
                  marginLeft: "10px"
                }}
              >
                Cancel
              </button>

            </div>

          )}


          {/* ==================================
              ACTION BUTTONS
          ================================== */}

          <div className="profile-actions">

            <button
              className="interest-btn"
              onClick={handleSendInterest}
              disabled={interestLoading}
            >

              {interestLoading
                ? "⏳ Sending..."
                : "❤️ Send Interest"
              }

            </button>


            <button
              className="message-btn"
              onClick={handleMessage}
            >
              💬 Message
            </button>


            <button
              className="message-btn"
              onClick={handleBlockUser}
              disabled={blockLoading}
            >

              {blockLoading
                ? "⏳ Blocking..."
                : "🔒 Block"
              }

            </button>


            <button
              className="message-btn"
              onClick={handleOpenReport}
            >
              🚩 Report
            </button>

          </div>

        </div>

      </div>


      {/* ======================================
          BOTTOM
      ====================================== */}

      <div className="profile-bottom">

        <h2>
          ❤️ Find Your Perfect Life Partner
        </h2>

        <p>
          Kanu Samaj Matrimonial – Rishton ko jodne
          ki ek trusted koshish.
        </p>

        <h3>
          🙏 Jai Baba Ganinath Ji Maharaj
        </h3>

      </div>

    </div>

  );

};

export default ProfileDetails;