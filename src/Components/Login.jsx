import React from "react";
import './Login.css'; // Ensure this file exists in the same directory

const Login = (props) => {
    return (
        <div className="login-container">
            <div className="login-card">
                <h1 className="welcome-message">Welcome to the Decentralized Voting Application</h1>
                <p className="description">Connect your wallet to participate in secure and transparent voting.</p>
                <div className="button-container">
                    <button className="login-button" onClick={props.connectWallet}>
                        <span className="button-icon">🦊</span> {/* MetaMask icon */}
                        Login with MetaMask
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;