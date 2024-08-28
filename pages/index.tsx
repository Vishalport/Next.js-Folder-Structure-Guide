import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import axios from 'axios';
import { useRouter } from 'next/router';
import Modal from '../component/user/modal/Modal';

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { userAuth, logout } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({})


  const handleInfo = async () => {
    try {
      if (userAuth) {
        const response = await axios.post("http://localhost:8521/api/v1/user/get-profile", {},
          {
            withCredentials: true // Ensure cookies are sent with the request
          }
        );
        if (response) {
          setIsModalOpen(true);
          setUserInfo(response?.data?.result?.userInfo)
        }
      } else {
        router.push('/sign-in');
      }
    } catch (error) {
      console.error("Error fetching profile info:", error);
      alert("Error fetching profile info!");
    }
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="home-page-container">
      <h1 className="home-page-title">Home Page</h1>
      <div className="home-page-button-div">
        <button
          onClick={handleInfo}
          type="button"
          className="home-page-button"
        >
          Get Info
        </button>

        <button
          onClick={logout}
          type="button"
          className="home-page-button"
        >
          {userAuth ? "Logout" : "Login"}
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        userInfo={userInfo}
      />

      <style jsx>{`
        .home-page-container {
          background: linear-gradient(to bottom, #000000, #ffcc00);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          color: white;
        }
        .home-page-title {
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 1.5rem;
        }
        .home-page-button {
          background-color: #3182ce;
          color: white;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 0.375rem;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
        }
        .home-page-button:hover {
          background-color: #2b6cb0;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .home-page-button-div {
          display: flex;
          gap: 10px;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
