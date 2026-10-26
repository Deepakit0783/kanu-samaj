import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const EditProfile = () => {

  const navigate = useNavigate();

  // =====================================
  // PROFILE DATA
  // =====================================
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    age: "",
    city: "",
    education: "",
    profession: "",
    height: "",
    maritalStatus: "",
    about: ""
  });

  // =====================================
  // PROFILE PHOTO
  // =====================================
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [photoUpdating, setPhotoUpdating] = useState(false);

  // =====================================
  // LOADING
  // =====================================
  const [loading, setLoading] = useState(true);

  // Profile update loading
  const [updating, setUpdating] = useState(false);

  // Messages
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");


  // =====================================
  // PROFILE FETCH
  // =====================================
  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const token = localStorage.getItem("token");

        if (!token) {
          setError("Please pehle login karein.");
          return;
        }

        const response = await axios.get(
          "http://localhost:3200/api/profiles/me",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const profile = response.data.profile;

        // Existing profile data
        setFormData({
          name: profile.name || "",
          gender: profile.gender || "",
          age: profile.age || "",
          city: profile.city || "",
          education: profile.education || "",
          profession: profile.profession || "",
          height: profile.height || "",
          maritalStatus: profile.maritalStatus || "",
          about: profile.about || ""
        });

        // Existing profile photo
        setPhotoPreview(profile.image || "");

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

  }, []);


  // =====================================
  // INPUT CHANGE
  // =====================================
  const handleChange = (e) => {

    const {
      name,
      value
    } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

  };


  // =====================================
  // PHOTO SELECT
  // =====================================
  const handlePhotoChange = (e) => {

    const file = e.target.files[0];

    if (!file) {
      return;
    }

    // Sirf image allow
    if (!file.type.startsWith("image/")) {

      setError(
        "Sirf image file select karein."
      );

      return;
    }

    // Maximum 5 MB
    if (file.size > 5 * 1024 * 1024) {

      setError(
        "Image maximum 5 MB ki honi chahiye."
      );

      return;
    }

    // Selected image save
    setSelectedPhoto(file);

    // Preview
    setPhotoPreview(
      URL.createObjectURL(file)
    );

    setError("");
    setMessage("");

  };


  // =====================================
  // PHOTO UPLOAD
  // =====================================
  const handlePhotoUpload = async () => {

    if (!selectedPhoto) {

      setError(
        "Pehle photo select karein."
      );

      return;
    }

    try {

      setPhotoUpdating(true);
      setMessage("");
      setError("");

      const token =
        localStorage.getItem("token");

      if (!token) {

        setError(
          "Please pehle login karein."
        );

        return;
      }

      // FormData image ke liye
      const formDataImage =
        new FormData();

      formDataImage.append(
        "image",
        selectedPhoto
      );

      // Backend API
      const response = await axios.put(
        "http://localhost:3200/api/profiles/me/photo",
        formDataImage,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      // Success message
      setMessage(
        response.data.message ||
        "Profile photo successfully updated"
      );

      // Cloudinary ki new image
      setPhotoPreview(
        response.data.image
      );

      // Selected photo clear
      setSelectedPhoto(null);

    } catch (error) {

      console.error(
        "Photo upload error:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Profile photo update nahi ho payi."
      );

    } finally {

      setPhotoUpdating(false);

    }

  };


  // =====================================
  // UPDATE PROFILE
  // =====================================
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setUpdating(true);
      setMessage("");
      setError("");

      const token =
        localStorage.getItem("token");

      if (!token) {

        setError(
          "Please pehle login karein."
        );

        return;
      }

      const response = await axios.put(
        "http://localhost:3200/api/profiles/me",
        formData,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      setMessage(
        response.data.message ||
        "Profile successfully updated"
      );

      // 1.5 second baad My Profile
      setTimeout(() => {

        navigate("/my-profile");

      }, 1500);

    } catch (error) {

      console.error(
        "Update profile error:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Profile update nahi ho payi."
      );

    } finally {

      setUpdating(false);

    }

  };


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
          ⏳ Profile load ho rahi hai...
        </h2>

      </div>
    );

  }


  // =====================================
  // ERROR
  // =====================================
  if (error && !formData.name) {

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

        <Link to="/my-profile">
          ← Back to My Profile
        </Link>

      </div>
    );

  }


  // =====================================
  // MAIN UI
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
          to="/my-profile"
          className="back-profile"
        >
          ← Back to My Profile
        </Link>

      </div>


      {/* Edit Card */}
      <div
        className="profile-details-card"
        style={{
          display: "block",
          maxWidth: "800px",
          margin: "30px auto"
        }}
      >

        <div className="profile-details-content">

          <h1>
            ✏️ Edit Profile
          </h1>

          <p>
            Apni profile ki information update karein.
          </p>


          {/* =====================================
              PROFILE PHOTO
          ===================================== */}
          <div
            style={{
              marginBottom: "25px",
              textAlign: "center"
            }}
          >

            <label
              style={{
                display: "block",
                marginBottom: "10px",
                fontWeight: "600"
              }}
            >
              📷 Profile Photo
            </label>


            {/* Photo Preview */}
            {photoPreview && (

              <div
                style={{
                  marginBottom: "15px"
                }}
              >

                <img
                  src={photoPreview}
                  alt="Profile Preview"
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "50%",
                    border: "4px solid #8b1e3f"
                  }}
                />

              </div>

            )}


            {/* Choose Photo */}
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
            />


            {/* Upload Photo Button */}
            {selectedPhoto && (

              <div
                style={{
                  marginTop: "15px"
                }}
              >

                <button
                  type="button"
                  className="interest-btn"
                  onClick={handlePhotoUpload}
                  disabled={photoUpdating}
                >

                  {photoUpdating
                    ? "⏳ Uploading..."
                    : "📷 Update Photo"
                  }

                </button>

              </div>

            )}

          </div>


          {/* Success Message */}
          {message && (

            <div
              style={{
                background: "#e8f8ee",
                color: "green",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "20px"
              }}
            >
              ✅ {message}
            </div>

          )}


          {/* Error Message */}
          {error && (

            <div
              style={{
                background: "#ffeaea",
                color: "red",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "20px"
              }}
            >
              ❌ {error}
            </div>

          )}


          <form onSubmit={handleSubmit}>

            {/* Name */}
            <div style={{ marginBottom: "18px" }}>

              <label>
                Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  marginTop: "6px"
                }}
              />

            </div>


            {/* Gender */}
            <div style={{ marginBottom: "18px" }}>

              <label>
                Gender
              </label>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  marginTop: "6px"
                }}
              >

                <option value="">
                  Select Gender
                </option>

                <option value="Male">
                  Male
                </option>

                <option value="Female">
                  Female
                </option>

              </select>

            </div>


            {/* Age */}
            <div style={{ marginBottom: "18px" }}>

              <label>
                Age
              </label>

              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                min="18"
                max="100"
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  marginTop: "6px"
                }}
              />

            </div>


            {/* City */}
            <div style={{ marginBottom: "18px" }}>

              <label>
                City
              </label>

              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  marginTop: "6px"
                }}
              />

            </div>


            {/* Education */}
            <div style={{ marginBottom: "18px" }}>

              <label>
                Education
              </label>

              <input
                type="text"
                name="education"
                value={formData.education}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px",
                  marginTop: "6px"
                }}
              />

            </div>


            {/* Profession */}
            <div style={{ marginBottom: "18px" }}>

              <label>
                Profession
              </label>

              <input
                type="text"
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px",
                  marginTop: "6px"
                }}
              />

            </div>


            {/* Height */}
            <div style={{ marginBottom: "18px" }}>

              <label>
                Height
              </label>

              <input
                type="text"
                name="height"
                value={formData.height}
                onChange={handleChange}
                placeholder="Example: 5'8"
                style={{
                  width: "100%",
                  padding: "12px",
                  marginTop: "6px"
                }}
              />

            </div>


            {/* Marital Status */}
            <div style={{ marginBottom: "18px" }}>

              <label>
                Marital Status
              </label>

              <select
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px",
                  marginTop: "6px"
                }}
              >

                <option value="">
                  Select Status
                </option>

                <option value="Never Married">
                  Never Married
                </option>

                <option value="Divorced">
                  Divorced
                </option>

                <option value="Widowed">
                  Widowed
                </option>

              </select>

            </div>


            {/* About */}
            <div style={{ marginBottom: "20px" }}>

              <label>
                About Me
              </label>

              <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                rows="5"
                placeholder="Apne baare mein likhein..."
                style={{
                  width: "100%",
                  padding: "12px",
                  marginTop: "6px",
                  resize: "vertical"
                }}
              />

            </div>


            {/* Buttons */}
            <div
              className="profile-actions"
              style={{
                display: "flex",
                gap: "15px"
              }}
            >

              <button
                type="submit"
                className="interest-btn"
                disabled={updating}
              >

                {updating
                  ? "⏳ Updating..."
                  : "💾 Update Profile"
                }

              </button>


              <Link
                to="/my-profile"
                className="message-btn"
              >
                Cancel
              </Link>

            </div>

          </form>

        </div>

      </div>


      {/* Bottom */}
      <div className="profile-bottom">

        <h2>
          ❤️ Keep Your Profile Updated
        </h2>

        <p>
          Apni information updated rakhein
          taaki suitable partner aapko easily samajh sake.
        </p>

        <h3>
          🙏 Jai Baba Ganinath Ji Maharaj
        </h3>

      </div>

    </div>
  );
};

export default EditProfile;