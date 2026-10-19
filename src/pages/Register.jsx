import React, { useState } from "react";
import axios from "axios";

const Register = () => {

  // ==========================================
  // FORM DATA
  // ==========================================

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    age: "",
    city: "",
    education: "",
    profession: "",
    height: "",
    maritalStatus: "",
    about: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    terms: false,

    // Profile photo
    image: null
  });

  // Success / Error message
  const [message, setMessage] = useState("");

  // Loading state
  const [loading, setLoading] = useState(false);


  // ==========================================
  // INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {

    const {
      name,
      value,
      type,
      checked
    } = e.target;

    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : value
    });
  };


  // ==========================================
  // PROFILE IMAGE CHANGE
  // ==========================================

  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (file) {

      // Maximum 5 MB check
      if (file.size > 5 * 1024 * 1024) {

        setMessage(
          "Profile photo maximum 5MB ki honi chahiye."
        );

        return;
      }

      // Sirf image check
      if (!file.type.startsWith("image/")) {

        setMessage(
          "Sirf image file upload karein."
        );

        return;
      }

      setFormData({
        ...formData,
        image: file
      });

      setMessage("");
    }
  };


  // ==========================================
  // REGISTER FORM SUBMIT
  // ==========================================

  const handleSubmit = async (e) => {

    // Page refresh ko rokna
    e.preventDefault();

    setMessage("");


    // Password match check
    if (
      formData.password !==
      formData.confirmPassword
    ) {

      setMessage(
        "Password aur Confirm Password same nahi hain."
      );

      return;
    }


    // Terms check
    if (!formData.terms) {

      setMessage(
        "Please Terms & Conditions accept karein."
      );

      return;
    }


    try {

      setLoading(true);


      // ==========================================
      // FORMDATA CREATE
      // ==========================================

      const data = new FormData();


      // Profile Information
      data.append(
        "name",
        formData.name
      );

      data.append(
        "gender",
        formData.gender
      );

      data.append(
        "age",
        formData.age
      );

      data.append(
        "city",
        formData.city
      );

      data.append(
        "education",
        formData.education
      );

      data.append(
        "profession",
        formData.profession
      );


      // Personal Details
      data.append(
        "height",
        formData.height
      );

      data.append(
        "maritalStatus",
        formData.maritalStatus
      );

      data.append(
        "about",
        formData.about
      );


      // Account Details
      data.append(
        "email",
        formData.email
      );

      data.append(
        "mobile",
        formData.mobile
      );

      data.append(
        "password",
        formData.password
      );


      // ==========================================
      // PROFILE IMAGE
      // ==========================================

      if (formData.image) {

        data.append(
          "image",
          formData.image
        );

      }


      // ==========================================
      // BACKEND REGISTER API
      // ==========================================

      const response = await axios.post(
        "http://localhost:3200/api/auth/register",
        data
      );


      // ==========================================
      // SUCCESS MESSAGE
      // ==========================================

      setMessage(
        response.data.message
      );


      // ==========================================
      // LOGIN PAGE PAR REDIRECT
      // ==========================================

      setTimeout(() => {

        window.location.href =
          "/login";

      }, 2000);


    } catch (error) {

      // ==========================================
      // ERROR MESSAGE
      // ==========================================

      const errorMessage =
        error.response?.data?.message ||
        "Registration failed. Please try again.";

      setMessage(
        errorMessage
      );

    } finally {

      setLoading(false);

    }
  };


  return (
    <div className="register-page">

      {/* Background Hearts */}
      <div className="register-bg-heart register-heart-one">
        ♥
      </div>

      <div className="register-bg-heart register-heart-two">
        ♥
      </div>


      {/* Registration Card */}
      <div className="register-card">

        {/* Header */}
        <div className="register-header">

          <div className="register-logo">
            ♥
          </div>

          <h1>
            Create Your Profile
          </h1>

          <p>
            Kanu Samaj Matrimonial par apni profile banayein
            aur apne perfect life partner ki talaash shuru karein.
          </p>

        </div>


        {/* Form */}
        <form
          className="register-form"
          onSubmit={handleSubmit}
        >


          {/* Profile Information */}
          <div className="register-section-title">
            👤 Profile Information
          </div>


          <div className="register-row">

            {/* Name */}
            <div className="register-group">

              <label>
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />

            </div>


            {/* Gender */}
            <div className="register-group">

              <label>
                Gender
              </label>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
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

          </div>


          <div className="register-row">

            {/* Age */}
            <div className="register-group">

              <label>
                Age
              </label>

              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter your age"
                required
              />

            </div>


            {/* City */}
            <div className="register-group">

              <label>
                City
              </label>

              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter your city"
                required
              />

            </div>

          </div>


          <div className="register-row">

            {/* Education */}
            <div className="register-group">

              <label>
                Education
              </label>

              <input
                type="text"
                name="education"
                value={formData.education}
                onChange={handleChange}
                placeholder="e.g. BCA, MBA, M.A."
              />

            </div>


            {/* Profession */}
            <div className="register-group">

              <label>
                Profession
              </label>

              <input
                type="text"
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                placeholder="e.g. Teacher, Engineer"
              />

            </div>

          </div>


          {/* ==========================================
              PROFILE PHOTO
          ========================================== */}

          <div className="register-group">

            <label>
              Profile Photo
            </label>

            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
            />

            <small>
              JPG, PNG etc. | Maximum 5MB
            </small>

          </div>


          {/* Personal Details */}
          <div className="register-section-title">
            💕 Personal Details
          </div>


          <div className="register-row">

            {/* Height */}
            <div className="register-group">

              <label>
                Height
              </label>

              <input
                type="text"
                name="height"
                value={formData.height}
                onChange={handleChange}
                placeholder="e.g. 5'5"
              />

            </div>


            {/* Marital Status */}
            <div className="register-group">

              <label>
                Marital Status
              </label>

              <select
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
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

          </div>


          {/* About */}
          <div className="register-group">

            <label>
              About Yourself
            </label>

            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              rows="4"
              placeholder="Tell us something about yourself..."
            ></textarea>

          </div>


          {/* Account Details */}
          <div className="register-section-title">
            🔐 Account Details
          </div>


          <div className="register-row">

            {/* Email */}
            <div className="register-group">

              <label>
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />

            </div>


            {/* Mobile */}
            <div className="register-group">

              <label>
                Mobile Number
              </label>

              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter mobile number"
              />

            </div>

          </div>


          <div className="register-row">

            {/* Password */}
            <div className="register-group">

              <label>
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create password"
                required
              />

            </div>


            {/* Confirm Password */}
            <div className="register-group">

              <label>
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                required
              />

            </div>

          </div>


          {/* Terms */}
          <div className="register-terms">

            <label>

              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
              />

              <span>
                I agree to the Terms & Conditions and Privacy Policy.
              </span>

            </label>

          </div>


          {/* Success / Error Message */}
          {message && (
            <p className="register-message">
              {message}
            </p>
          )}


          {/* Button */}
          <button
            type="submit"
            className="register-submit"
            disabled={loading}
          >

            {loading
              ? "Creating Profile..."
              : "❤️ Create My Profile"
            }

          </button>


          {/* Login */}
          <div className="already-account">

            <p>
              Already have an account?
            </p>

            <a href="/login">
              Login Here
            </a>

          </div>


        </form>


        {/* Bottom */}
        <div className="register-bottom">

          🔒 Your personal information is kept private and secure.

        </div>

      </div>


      {/* Footer */}
      <div className="register-footer">

        <h3>
          ❤️ Rishton ki ek nayi shuruaat
        </h3>

        <p>
          Kanu Samaj Matrimonial
        </p>

        <span>
          🙏 Jai Baba Ganinath Ji Maharaj
        </span>

      </div>

    </div>
  );
};

export default Register;