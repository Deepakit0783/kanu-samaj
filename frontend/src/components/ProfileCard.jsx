import React from "react";
import { useNavigate } from "react-router-dom";

const ProfileCard = ({
  id,
  img,
  name,
  age,
  city,
  education,
  profession
}) => {

  const navigate = useNavigate();

  return (
    <div className="profile-card">

      <div className="profile-image">

        <img src={img} alt={name} />

        <span className="online">
          Online
        </span>

      </div>

      <div className="profile-content">

        <h3>
          {name}, {age} ❤️
        </h3>

        <p>📍 {city}</p>

        <p>{education}</p>

        <p>{profession}</p>

        <button
          className="profile-btn"
          onClick={() => navigate(`/profile/${id}`)}
        >
          ♡ View Profile
        </button>

      </div>

    </div>
  );
};

export default ProfileCard;