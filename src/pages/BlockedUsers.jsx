import React, { useEffect, useState } from "react";
import axios from "axios";

const BlockedUsers = () => {

  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [unblockLoading, setUnblockLoading] = useState("");

  // ==========================================
  // GET BLOCKED USERS
  // ==========================================

  const fetchBlockedUsers = async () => {

    try {

      setLoading(true);
      setError("");

      const token =
        localStorage.getItem("token");

      if (!token) {
        setError(
          "Blocked users dekhne ke liye pehle login karein."
        );
        return;
      }

      const response = await axios.get(
        "http://localhost:3200/api/blocks",
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      setBlocks(
        response.data.blocks || []
      );

    } catch (error) {

      console.error(
        "Blocked users fetch error:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Blocked users fetch nahi ho paye."
      );

    } finally {

      setLoading(false);

    }
  };


  // ==========================================
  // PAGE LOAD
  // ==========================================

  useEffect(() => {

    fetchBlockedUsers();

  }, []);


  // ==========================================
  // UNBLOCK USER
  // ==========================================

  const handleUnblock = async (profileId) => {

    const confirmUnblock =
      window.confirm(
        "Kya aap is user ko unblock karna chahte hain?"
      );

    if (!confirmUnblock) {
      return;
    }

    try {

      setUnblockLoading(profileId);
      setError("");

      const token =
        localStorage.getItem("token");

      await axios.delete(
        `http://localhost:3200/api/blocks/${profileId}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      // Unblock hone ke baad list se remove
      setBlocks((previousBlocks) =>
        previousBlocks.filter(
          (block) =>
            block.profileId !== profileId
        )
      );

    } catch (error) {

      console.error(
        "Unblock error:",
        error
      );

      setError(
        error.response?.data?.message ||
        "User unblock nahi ho paya."
      );

    } finally {

      setUnblockLoading("");

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
          ⏳ Blocked users load ho rahe hain...
        </h2>
      </div>
    );

  }


  // ==========================================
  // PAGE
  // ==========================================

  return (

    <div
      style={{
        maxWidth: "1000px",
        margin: "40px auto",
        padding: "20px"
      }}
    >

      <h1>
        🔒 Blocked Users
      </h1>

      <p>
        Yahan aapke blocked users dikhai denge.
      </p>


      {/* ERROR */}

      {error && (

        <div
          style={{
            background: "#ffeaea",
            color: "red",
            padding: "12px",
            borderRadius: "8px",
            marginTop: "20px"
          }}
        >
          ❌ {error}
        </div>

      )}


      {/* NO BLOCKED USERS */}

      {!error && blocks.length === 0 && (

        <div
          style={{
            textAlign: "center",
            padding: "60px 20px"
          }}
        >

          <h2>
            😊 Koi blocked user nahi hai
          </h2>

          <p>
            Aapne abhi kisi user ko block nahi kiya hai.
          </p>

        </div>

      )}


      {/* BLOCKED USERS */}

      {blocks.length > 0 && (

        <div
          style={{
            marginTop: "30px",
            display: "flex",
            flexDirection: "column",
            gap: "15px"
          }}
        >

          {blocks.map((block) => (

            <div
              key={block._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "20px"
              }}
            >

              <div>

                <h3>
                  🔒 Blocked User
                </h3>

                <p>
                  Profile ID:
                  <br />
                  <strong>
                    {block.profileId}
                  </strong>
                </p>

              </div>


              <button
                onClick={() =>
                  handleUnblock(
                    block.profileId
                  )
                }
                disabled={
                  unblockLoading ===
                  block.profileId
                }
                style={{
                  padding: "10px 18px",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer"
                }}
              >

                {unblockLoading ===
                block.profileId
                  ? "⏳ Unblocking..."
                  : "🔓 Unblock"
                }

              </button>

            </div>

          ))}

        </div>

      )}

    </div>

  );
};

export default BlockedUsers;