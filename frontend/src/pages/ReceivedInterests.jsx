import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ReceivedInterests = () => {
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState("");

  // ==========================================
  // FETCH RECEIVED INTERESTS
  // ==========================================
  const fetchReceivedInterests = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError(
          "Received Interests dekhne ke liye login karein."
        );
        return;
      }

      const response = await axios.get(
        "http://localhost:3200/api/interests/received",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setInterests(response.data.interests || []);

    } catch (error) {
      console.error(
        "Received interests fetch error:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Received interests load nahi ho paye."
      );

    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // PAGE LOAD
  // ==========================================
  useEffect(() => {
    fetchReceivedInterests();
  }, []);

  // ==========================================
  // ACCEPT INTEREST
  // ==========================================
  const handleAccept = async (interestId) => {
    try {
      setActionLoading(interestId);

      const token = localStorage.getItem("token");

      const response = await axios.put(
        `http://localhost:3200/api/interests/${interestId}/accept`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert(
        response.data.message ||
        "Interest accepted successfully"
      );

      await fetchReceivedInterests();

    } catch (error) {
      console.error(
        "Accept interest error:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Interest accept nahi ho paya."
      );

    } finally {
      setActionLoading("");
    }
  };

  // ==========================================
  // REJECT INTEREST
  // ==========================================
  const handleReject = async (interestId) => {
    try {
      setActionLoading(interestId);

      const token = localStorage.getItem("token");

      const response = await axios.put(
        `http://localhost:3200/api/interests/${interestId}/reject`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert(
        response.data.message ||
        "Interest rejected successfully"
      );

      await fetchReceivedInterests();

    } catch (error) {
      console.error(
        "Reject interest error:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Interest reject nahi ho paya."
      );

    } finally {
      setActionLoading("");
    }
  };

  // ==========================================
  // LOADING
  // ==========================================
  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "100px 20px"
        }}
      >
        <h2>
          ⏳ Received Interests load ho rahe hain...
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
        style={{
          textAlign: "center",
          padding: "100px 20px"
        }}
      >
        <h2>❌ {error}</h2>

        <br />

        <Link to="/profiles">
          ← Find Partner
        </Link>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "80vh",
        padding: "50px 20px"
      }}
    >

      {/* ======================================
          PAGE HEADER
      ====================================== */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "40px"
        }}
      >
        <h1>💌 Received Interests</h1>

        <p>
          Jin users ne aapko interest bheja hai
        </p>
      </div>


      {/* ======================================
          NO INTEREST
      ====================================== */}
      {interests.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "50px"
          }}
        >
          <h2>
            💔 Abhi koi interest receive nahi hua.
          </h2>

          <br />

          <Link to="/profiles">
            ❤️ Find Partner
          </Link>
        </div>
      )}


      {/* ======================================
          INTEREST LIST
      ====================================== */}
      {interests.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "25px",
            maxWidth: "1200px",
            margin: "0 auto"
          }}
        >

          {interests.map((interest) => {

            const profile =
              interest.senderProfile;

            if (!profile) {
              return null;
            }

            return (
              <div
                key={interest._id}
                style={{
                  background: "#fff",
                  borderRadius: "15px",
                  overflow: "hidden",
                  boxShadow:
                    "0 5px 20px rgba(0,0,0,0.1)"
                }}
              >

                {/* PROFILE IMAGE */}
                <img
                  src={
                    profile.image ||
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600"
                  }
                  alt={profile.name}
                  style={{
                    width: "100%",
                    height: "280px",
                    objectFit: "cover"
                  }}
                />


                {/* PROFILE CONTENT */}
                <div
                  style={{
                    padding: "20px"
                  }}
                >

                  <h2>
                    {profile.name}, {profile.age}
                  </h2>

                  <p>
                    📍 {profile.city}
                  </p>

                  <p>
                    🎓{" "}
                    {profile.education ||
                      "Not specified"}
                  </p>

                  <p>
                    💼{" "}
                    {profile.profession ||
                      "Not specified"}
                  </p>

                  <p>
                    ❤️ Status:{" "}
                    <strong>
                      {interest.status}
                    </strong>
                  </p>


                  {/* VIEW PROFILE */}
                  <Link
                    to={`/profile/${profile._id}`}
                    style={{
                      display: "inline-block",
                      marginTop: "10px",
                      textDecoration: "none"
                    }}
                  >
                    👤 View Profile
                  </Link>


                  {/* =================================
                      ACCEPT / REJECT BUTTONS
                  ================================= */}
                  {interest.status === "pending" && (
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        marginTop: "20px"
                      }}
                    >

                      {/* ACCEPT */}
                      <button
                        onClick={() =>
                          handleAccept(interest._id)
                        }
                        disabled={
                          actionLoading ===
                          interest._id
                        }
                        style={{
                          flex: 1,
                          padding: "10px",
                          border: "none",
                          borderRadius: "8px",
                          cursor: "pointer",
                          background: "#198754",
                          color: "#fff",
                          fontWeight: "600"
                        }}
                      >
                        {actionLoading ===
                        interest._id
                          ? "⏳"
                          : "✅ Accept"}
                      </button>


                      {/* REJECT */}
                      <button
                        onClick={() =>
                          handleReject(interest._id)
                        }
                        disabled={
                          actionLoading ===
                          interest._id
                        }
                        style={{
                          flex: 1,
                          padding: "10px",
                          border: "none",
                          borderRadius: "8px",
                          cursor: "pointer",
                          background: "#dc3545",
                          color: "#fff",
                          fontWeight: "600"
                        }}
                      >
                        {actionLoading ===
                        interest._id
                          ? "⏳"
                          : "❌ Reject"}
                      </button>

                    </div>
                  )}

                </div>

              </div>
            );
          })}

        </div>
      )}

    </div>
  );
};

export default ReceivedInterests;