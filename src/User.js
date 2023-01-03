import React from "react";
import { useRef } from "react";

const User = ({ setUserIn }) => {
  const userField = useRef();
  const startTheGame = () => {
    userField.current.value === ""
      ? alert("Enter Your Name...")
      : setUserIn(true);
  };
  return (
    <>
      <div className="user">
        <p>Let's Play the game</p>
        <h1>Kon Banega Karorpati</h1>
        <input type="text" placeholder="Type Your Name..." ref={userField} />
        <br></br>
        <button className="startGame" onClick={startTheGame}>
          Start Game
        </button>
      </div>
    </>
  );
};

export default User;
