// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        string name;
        uint256 voteCount;
    }

    Candidate[] public candidates;
    address public owner;
    mapping(address => bool) public voters;

    uint256 public votingStart;
    uint256 public votingEnd;

    // Constructor to initialize candidates and voting duration
    constructor(string[] memory _candidateNames, uint256 _durationInMinutes) {
        for (uint256 i = 0; i < _candidateNames.length; i++) {
            candidates.push(Candidate({
                name: _candidateNames[i],
                voteCount: 0
            }));
        }
        owner = msg.sender;
        votingStart = block.timestamp;
        votingEnd = block.timestamp + (_durationInMinutes * 1 minutes);
    }

    // Modifier to restrict access to the contract owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action.");
        _;
    }

    // Add a new candidate (only owner can call this)
    function addCandidate(string memory _name) public onlyOwner {
        candidates.push(Candidate({
            name: _name,
            voteCount: 0
        }));
    }

    // Vote for a candidate by index
    function vote(uint256 _candidateIndex) public {
        require(!voters[msg.sender], "You have already voted.");
        require(_candidateIndex < candidates.length, "Invalid candidate index.");

        candidates[_candidateIndex].voteCount++;
        voters[msg.sender] = true;
    }

    // Get all candidates with their vote counts
    function getAllVotesOfCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }

    // Check if voting is currently active
    function getVotingStatus() public view returns (bool) {
        return (block.timestamp >= votingStart && block.timestamp < votingEnd);
    }

    // Get the remaining time for voting to end
    function getRemainingTime() public view returns (uint256) {
        require(block.timestamp >= votingStart, "Voting has not started yet.");
        if (block.timestamp >= votingEnd) {
            return 0;
        }
        return votingEnd - block.timestamp;ad
    }
}
