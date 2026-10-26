import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profiles from "./pages/Profiles";
import About from "./pages/About";
import SuccessStories from "./pages/SuccessStories";
import Contact from "./pages/Contact";
import ProfileDetails from "./pages/ProfileDetails";
import MyProfile from "./pages/MyProfile";
import EditProfile from "./pages/EditProfile";
import SentInterests from "./pages/SentInterests";
import ReceivedInterests from "./pages/ReceivedInterests";
import Chat from "./pages/Chat";

// ==========================================
// BLOCKED USERS
// ==========================================
import BlockedUsers from "./pages/BlockedUsers";


function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* ==================================
            HOME PAGE
        ================================== */}
        <Route
          path="/"
          element={<Home />}
        />


        {/* ==================================
            REGISTER PAGE
        ================================== */}
        <Route
          path="/register"
          element={<Register />}
        />


        {/* ==================================
            LOGIN PAGE
        ================================== */}
        <Route
          path="/login"
          element={<Login />}
        />


        {/* ==================================
            ALL PROFILES
        ================================== */}
        <Route
          path="/profiles"
          element={<Profiles />}
        />


        {/* ==================================
            ABOUT
        ================================== */}
        <Route
          path="/about"
          element={<About />}
        />


        {/* ==================================
            SUCCESS STORIES
        ================================== */}
        <Route
          path="/success-stories"
          element={<SuccessStories />}
        />


        {/* ==================================
            CONTACT
        ================================== */}
        <Route
          path="/contact"
          element={<Contact />}
        />


        {/* ==================================
            SINGLE PROFILE
        ================================== */}
        <Route
          path="/profile/:id"
          element={<ProfileDetails />}
        />


        {/* ==================================
            MY PROFILE
        ================================== */}
        <Route
          path="/my-profile"
          element={<MyProfile />}
        />


        {/* ==================================
            EDIT PROFILE
        ================================== */}
        <Route
          path="/edit-profile"
          element={<EditProfile />}
        />


        {/* ==================================
            SENT INTERESTS
        ================================== */}
        <Route
          path="/sent-interests"
          element={<SentInterests />}
        />


        {/* ==================================
            RECEIVED INTERESTS
        ================================== */}
        <Route
          path="/received-interests"
          element={<ReceivedInterests />}
        />


        {/* ==================================
            CHAT
        ================================== */}
        <Route
          path="/chat/:userId"
          element={<Chat />}
        />


        {/* ==================================
            BLOCKED USERS
        ================================== */}
        <Route
          path="/blocked-users"
          element={<BlockedUsers />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;