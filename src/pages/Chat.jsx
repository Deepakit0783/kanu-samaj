import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const Chat = () => {

  // URL se PROFILE ID milegi
  const { userId } = useParams();

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");


  // ==========================================
  // GET CHAT MESSAGES
  // ==========================================

  const fetchMessages = async () => {
    try {

      const token =
        localStorage.getItem("token");

      if (!token) {
        setError(
          "Chat ke liye pehle login karein."
        );
        return;
      }

      const response = await axios.get(
        `http://localhost:3200/api/messages/${userId}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      setMessages(
        response.data.messages || []
      );

    } catch (error) {

      console.error(
        "Messages fetch error:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Messages load nahi ho paye."
      );

    } finally {

      setLoading(false);

    }
  };


  // ==========================================
  // GET PROFILE
  // ==========================================

  const fetchProfile = async () => {
    try {

      const response = await axios.get(
        `http://localhost:3200/api/profiles/${userId}`
      );

      setProfile(
        response.data.profile
      );

    } catch (error) {

      console.error(
        "Profile fetch error:",
        error
      );

    }
  };


  // ==========================================
  // PAGE LOAD
  // ==========================================

  useEffect(() => {

    fetchMessages();
    fetchProfile();

  }, [userId]);


  // ==========================================
  // SEND MESSAGE
  // ==========================================

  const handleSendMessage = async (e) => {

    e.preventDefault();

    if (!message.trim()) {
      return;
    }

    try {

      setSending(true);

      const token =
        localStorage.getItem("token");


      await axios.post(

        "http://localhost:3200/api/messages",

        {
          // IMPORTANT:
          // Yahan PROFILE ID bhej rahe hain
          receiverId: userId,

          message: message.trim()
        },

        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }

      );


      // Input clear
      setMessage("");


      // Messages dobara load
      await fetchMessages();

    } catch (error) {

      console.error(
        "Send message error:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Message send nahi ho paya."
      );

    } finally {

      setSending(false);

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
          ⏳ Chat load ho rahi hai...
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

        <h2>
          ❌ {error}
        </h2>

        <br />

        <Link to="/profiles">
          ← Find Partner
        </Link>

      </div>
    );
  }


  // ==========================================
  // CURRENT USER ID
  // ==========================================

  const loggedInUser =
    JSON.parse(
      localStorage.getItem("user") || "{}"
    );

  const currentUserId =
    loggedInUser?.id?.toString();


  // ==========================================
  // UI
  // ==========================================

  return (

    <div
      style={{
        minHeight: "80vh",
        padding: "40px 20px",
        background: "#f8f9fa"
      }}
    >

      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          background: "#fff",
          borderRadius: "15px",
          overflow: "hidden",
          boxShadow:
            "0 5px 20px rgba(0,0,0,0.1)"
        }}
      >

        {/* =================================
            CHAT HEADER
        ================================= */}

        <div
          style={{
            padding: "20px",
            borderBottom:
              "1px solid #eee",

            display: "flex",
            alignItems: "center",
            gap: "15px"
          }}
        >

          {profile && (

            <img
              src={
                profile.image ||
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200"
              }

              alt={profile.name}

              style={{
                width: "55px",
                height: "55px",
                borderRadius: "50%",
                objectFit: "cover"
              }}
            />

          )}


          <div>

            <h2>
              {profile?.name || "User"}
            </h2>

            <p>
              📍 {profile?.city || ""}
            </p>

          </div>

        </div>


        {/* =================================
            MESSAGES
        ================================= */}

        <div
          style={{
            minHeight: "400px",
            maxHeight: "500px",
            overflowY: "auto",
            padding: "20px"
          }}
        >

          {messages.length === 0 ? (

            <div
              style={{
                textAlign: "center",
                padding: "100px 20px"
              }}
            >

              <h3>
                💬 Abhi koi message nahi hai.
              </h3>

              <p>
                Conversation start karein ❤️
              </p>

            </div>

          ) : (

            messages.map((item) => {

              // Check message current user ka hai
              const isMine =
                item.senderId ===
                currentUserId;


              return (

                <div
                  key={item._id}

                  style={{
                    display: "flex",

                    justifyContent:
                      isMine
                        ? "flex-end"
                        : "flex-start",

                    marginBottom: "12px"
                  }}
                >

                  <div
                    style={{
                      maxWidth: "70%",
                      padding:
                        "10px 15px",

                      borderRadius:
                        "15px",

                      background:
                        isMine
                          ? "#dcf8c6"
                          : "#f1f1f1"
                    }}
                  >

                    <p
                      style={{
                        margin: 0
                      }}
                    >
                      {item.message}
                    </p>

                  </div>

                </div>

              );

            })

          )}

        </div>


        {/* =================================
            SEND MESSAGE FORM
        ================================= */}

        <form
          onSubmit={handleSendMessage}

          style={{
            display: "flex",
            gap: "10px",
            padding: "15px",
            borderTop:
              "1px solid #eee"
          }}
        >

          <input
            type="text"

            value={message}

            onChange={(e) =>
              setMessage(e.target.value)
            }

            placeholder="Type a message..."

            style={{
              flex: 1,
              padding: "12px",
              border:
                "1px solid #ddd",

              borderRadius: "8px",
              outline: "none"
            }}
          />


          <button
            type="submit"

            disabled={sending}

            style={{
              padding:
                "12px 20px",

              border: "none",

              borderRadius: "8px",

              background:
                "#e91e63",

              color: "#fff",

              cursor: "pointer",

              fontWeight: "600"
            }}
          >

            {sending
              ? "⏳"
              : "📤 Send"}

          </button>

        </form>

      </div>

    </div>

  );
};

export default Chat;