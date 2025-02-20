import React from "react";
import PropTypes from "prop-types"; // Import PropTypes for type checking
import './Connected.css'; // Ensure this file exists in the same directory

const Connected = ({ account, remainingTime, showButton, number, handleNumberChange, voteFunction, candidates }) => {
    return (
        <div className="connected-container">
            <h1 className="connected-header">Connected to MetaMask</h1>
            <p className="connected-account">
                Account: <span className="account-highlight">{account}</span>
            </p>
            <p className="connected-account">Remaining Time: <strong>{remainingTime}</strong></p>
            {showButton ? (
                <p className="connected-message">You have already voted</p>
            ) : (
                <div className="vote-section">
                    <input 
                        type="number" 
                        placeholder="Enter Candidate Index" 
                        value={number} 
                        onChange={handleNumberChange} 
                        className="candidate-input"
                        aria-label="Candidate Index" // Accessibility improvement
                    />
                    <button 
                        className="vote-button" 
                        onClick={voteFunction}
                        disabled={!number} // Disable button if no number is entered
                        aria-label="Vote" // Accessibility improvement
                    >
                        Vote
                    </button>
                </div>
            )}
            
            <table className="candidates-table">
                <thead>
                    <tr>
                        <th>Index</th>
                        <th>Candidate Name</th>
                        <th>Votes</th>
                    </tr>
                </thead>
                <tbody>
                    {candidates.map((candidate) => (
                        <tr key={candidate.index}>
                            <td>{candidate.index}</td>
                            <td>{candidate.name}</td>
                            <td>{candidate.voteCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// Define prop types for better documentation and type checking
Connected.propTypes = {
    account: PropTypes.string.isRequired,
    remainingTime: PropTypes.string.isRequired,
    showButton: PropTypes.bool.isRequired,
    number: PropTypes.number,
    handleNumberChange: PropTypes.func.isRequired,
    voteFunction: PropTypes.func.isRequired,
    candidates: PropTypes.arrayOf(
        PropTypes.shape({
            index: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            voteCount: PropTypes.number.isRequired,
        })
    ).isRequired,
};

export default Connected;