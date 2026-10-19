import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Profiles = () => {

  // MongoDB se profiles
  const [profiles, setProfiles] = useState([]);

  // Filter ke baad profiles
  const [filteredProfiles, setFilteredProfiles] = useState([]);

  // Loading
  const [loading, setLoading] = useState(true);

  // Error
  const [error, setError] = useState("");

  // Filter values
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [education, setEducation] = useState("");


  // =====================================
  // MongoDB se profiles fetch
  // =====================================
  useEffect(() => {

    const fetchProfiles = async () => {

      try {

        setLoading(true);
        setError("");

        const response = await axios.get(
          "http://localhost:3200/api/profiles"
        );

        const data = response.data.profiles || [];

        setProfiles(data);
        setFilteredProfiles(data);

      } catch (error) {

        console.error("Profiles fetch error:", error);

        setError(
          error.response?.data?.message ||
          "Profiles load nahi ho paye."
        );

      } finally {

        setLoading(false);

      }

    };

    fetchProfiles();

  }, []);


  // =====================================
  // Search / Filter
  // =====================================
  const handleSearch = () => {

    let result = [...profiles];


    // Gender filter
    if (gender) {

      result = result.filter((profile) => {

        return profile.gender === gender;

      });

    }


    // Age filter
    if (age) {

      result = result.filter((profile) => {

        const profileAge = Number(profile.age);

        if (age === "22-25") {
          return profileAge >= 22 && profileAge <= 25;
        }

        if (age === "26-30") {
          return profileAge >= 26 && profileAge <= 30;
        }

        if (age === "31-35") {
          return profileAge >= 31 && profileAge <= 35;
        }

        return true;

      });

    }


    // Location filter
    if (location) {

      result = result.filter((profile) => {

        return profile.city
          ?.toLowerCase()
          .includes(location.toLowerCase());

      });

    }


    // Education filter
    if (education) {

      result = result.filter((profile) => {

        const userEducation =
          profile.education?.toLowerCase() || "";

        if (education === "Graduate") {

          return (
            userEducation.includes("bca") ||
            userEducation.includes("b.com") ||
            userEducation.includes("bba") ||
            userEducation.includes("b.sc") ||
            userEducation.includes("b.a") ||
            userEducation.includes("ba")
          );

        }

        if (education === "Post Graduate") {

          return (
            userEducation.includes("mca") ||
            userEducation.includes("mba") ||
            userEducation.includes("m.a") ||
            userEducation.includes("ma") ||
            userEducation.includes("m.sc")
          );

        }

        return true;

      });

    }


    // Final filtered profiles
    setFilteredProfiles(result);

  };


  // =====================================
  // Reset Filters
  // =====================================
  const handleReset = () => {

    setGender("");
    setAge("");
    setLocation("");
    setEducation("");

    setFilteredProfiles(profiles);

  };


  return (
    <div className="profiles-page">

      {/* Decorative Background */}
      <div className="profiles-bg-heart profiles-heart-one">
        ♥
      </div>

      <div className="profiles-bg-heart profiles-heart-two">
        ♥
      </div>


      {/* Header */}
      <div className="profiles-header">

        <span className="profiles-small-title">
          ❤️ Kanu Samaj Matrimonial ❤️
        </span>

        <h1>
          Find Your Perfect Partner
        </h1>

        <p>
          Apne liye ek suitable jeevan saathi ki talaash karein
          aur apne rishton ki nayi shuruaat karein.
        </p>

      </div>


      {/* Search Box */}
      <div className="profiles-search">

        {/* Looking For */}
        <div className="profile-filter">

          <label>
            Looking For
          </label>

          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >

            <option value="">
              Any
            </option>

            <option value="Female">
              Bride
            </option>

            <option value="Male">
              Groom
            </option>

          </select>

        </div>


        {/* Age */}
        <div className="profile-filter">

          <label>
            Age
          </label>

          <select
            value={age}
            onChange={(e) => setAge(e.target.value)}
          >

            <option value="">
              Any Age
            </option>

            <option value="22-25">
              22 - 25
            </option>

            <option value="26-30">
              26 - 30
            </option>

            <option value="31-35">
              31 - 35
            </option>

          </select>

        </div>


        {/* Location */}
        <div className="profile-filter">

          <label>
            Location
          </label>

          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >

            <option value="">
              All Locations
            </option>

            <option value="Delhi">
              Delhi
            </option>

            <option value="Bihar">
              Bihar
            </option>

            <option value="Mumbai">
              Mumbai
            </option>

            <option value="Sitamarhi">
              Sitamarhi
            </option>

            <option value="Ara">
              Ara
            </option>

          </select>

        </div>


        {/* Education */}
        <div className="profile-filter">

          <label>
            Education
          </label>

          <select
            value={education}
            onChange={(e) => setEducation(e.target.value)}
          >

            <option value="">
              Any Education
            </option>

            <option value="Graduate">
              Graduate
            </option>

            <option value="Post Graduate">
              Post Graduate
            </option>

          </select>

        </div>


        {/* Search */}
        <button
          className="profile-search-btn"
          onClick={handleSearch}
        >
          🔍 Search
        </button>


        {/* Reset */}
        <button
          type="button"
          onClick={handleReset}
          style={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
            color: "#8b1e3f",
            fontWeight: "600"
          }}
        >
          Reset
        </button>

      </div>


      {/* Profile Count */}
      <div className="profiles-result">

        <h2>
          Featured Profiles
        </h2>

        <span>
          {loading
            ? "Loading..."
            : `${filteredProfiles.length} Profiles Found`
          }
        </span>

      </div>


      {/* Loading */}
      {loading && (

        <div
          style={{
            textAlign: "center",
            padding: "40px",
            fontSize: "20px"
          }}
        >
          ⏳ Profiles load ho rahe hain...
        </div>

      )}


      {/* Error */}
      {!loading && error && (

        <div
          style={{
            textAlign: "center",
            padding: "40px",
            color: "red",
            fontSize: "18px"
          }}
        >
          ❌ {error}
        </div>

      )}


      {/* No Profile */}
      {!loading &&
        !error &&
        filteredProfiles.length === 0 && (

        <div
          style={{
            textAlign: "center",
            padding: "40px",
            fontSize: "18px"
          }}
        >
          😔 Is filter ke according koi profile nahi mili.
        </div>

      )}


      {/* Profiles */}
      {!loading &&
        !error &&
        filteredProfiles.length > 0 && (

        <div className="profiles-grid">

          {filteredProfiles.map((profile) => (

            <div
              className="partner-card"
              key={profile._id}
            >

              {/* Image */}
              <div className="partner-image">

                <img
                  src={
                    profile.image ||
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600"
                  }
                  alt={profile.name}
                />

                <span className="partner-online">
                  🟢 Online
                </span>

              </div>


              {/* Content */}
              <div className="partner-content">

                <h3>
                  {profile.name}, {profile.age} ❤️
                </h3>

                <p className="partner-city">
                  📍 {profile.city}
                </p>

                <div className="partner-info">

                  <span>
                    🎓 {profile.education || "Not specified"}
                  </span>

                  <span>
                    💼 {profile.profession || "Not specified"}
                  </span>

                </div>


                {/* View Profile */}
                <Link
                  to={`/profile/${profile._id}`}
                  className="partner-view-btn"
                >
                  ♡ View Profile
                </Link>

              </div>

            </div>

          ))}

        </div>

      )}


      {/* Bottom */}
      <div className="profiles-bottom">

        <h2>
          ❤️ Rishton ki ek nayi shuruaat
        </h2>

        <p>
          Kanu Samaj Matrimonial par apne perfect life partner
          ki talaash karein.
        </p>

        <h3>
          🙏 Jai Baba Ganinath Ji Maharaj
        </h3>

      </div>

    </div>
  );
};

export default Profiles;