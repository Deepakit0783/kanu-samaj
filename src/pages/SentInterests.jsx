import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SentInterests = () => {
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // FETCH SENT INTERESTS
  // ==========================================
  useEffect(() => {
    const fetchSentInterests = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        if (!token) {
          setError("Sent Interests dekhne ke liye login karein.");
          return;
        }

        const response = await axios.get(
          "http://localhost:3200/api/interests/sent",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setInterests(response.data.interests || []);

      } catch (error) {
        console.error(
          "Sent interests fetch error:",
          error
        );

        setError(
          error.response?.data?.message ||
          "Sent interests load nahi ho paye."
        );

      } finally {
        setLoading(false);
      }
    };

    fetchSentInterests();
  }, []);

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
        <h2>⏳ Sent Interests load ho rahe hain...</h2>
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

      {/* PAGE HEADER */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "40px"
        }}
      >
        <h1>❤️ Sent Interests</h1>

        <p>
          Aapne jin profiles ko interest bheja hai
        </p>
      </div>


      {/* NO INTEREST */}
      {interests.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "50px"
          }}
        >
          <h2>💔 Abhi koi interest nahi bheja hai.</h2>

          <br />

          <Link to="/profiles">
            ❤️ Find Partner
          </Link>
        </div>
      )}


      {/* INTEREST LIST */}
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
              interest.receiverProfile;

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

                {/* IMAGE */}
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

                {/* CONTENT */}
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

                </div>

              </div>
            );
          })}

        </div>
      )}

    </div>
  );
};

export default SentInterests;