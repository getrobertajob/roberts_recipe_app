// imports
import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";

// component to display the table
function TableComponent({ onSelectRecord, refreshTable }) {
  // declare use states
  const [records, setRecords] = useState([]); 
  const [userVotes, setUserVotes] = useState(() => {
    const savedVotes = localStorage.getItem("userVotes");
    return savedVotes ? JSON.parse(savedVotes) : {};
  });

  // use effect run when table data needs to be refreshed
  useEffect(() => {
    fetchRecords();
  }, [refreshTable]);

  // use effect to load the users vote data from local storage on refresh
  useEffect(() => {
    localStorage.setItem("userVotes", JSON.stringify(userVotes));
  }, [userVotes]);

  // function to populate table data on refresh
  const fetchRecords = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/records/`
      );
      setRecords(response.data);
    } catch (err) {
      console.error("Error fetching records:", err.response ? err.response.data : err);
    }
  };

  // function to handle when user clicks on a title in the table
  const handleTitleClick = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/records/${id}/`
      );
      onSelectRecord(response.data);
    } catch (err) {
      console.error("Error fetching record:", err.response ? err.response.data : err);
    }
  };

  // function to handle when the user clicks on a vote button
  const handleVote = async (id, change) => {
    try {
      const record = records.find((record) => record.id === id);
      const currentVote = userVotes[id] || 0;

      // checks current vote is new or a vote change
      // includes incrementing enough to match if the user had originally voted opposite direction
      let voteChange = change;
      if (currentVote === change) {
        voteChange = -change;
      } else if (currentVote !== 0) {
        voteChange = change * 2;
      }

      const updatedVotes = record.votes + voteChange;

      await axios.put(`${process.env.REACT_APP_API_URL}/records/${id}/`, {
        ...record,
        votes: updatedVotes,
      });

      setUserVotes((prevVotes) => ({
        ...prevVotes,
        [id]: currentVote === change ? 0 : change,
      }));

      fetchRecords();
    } catch (err) {
      console.error("Error updating votes:", err.response ? err.response.data : err);
    }
  };

  return (
    <div className="table-container">
      <Table striped variant="success" className="Table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Recipe Title</th>
            <th>Author</th>
            <th>Votes</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr
              key={record.id}
              className={
                userVotes[record.id] === 1
                  ? "upvoted"
                  : userVotes[record.id] === -1
                    ? "downvoted"
                    : ""
              }
            >
              <td>{index + 1}</td>
              <td className="titleLink"  onClick={() => handleTitleClick(record.id)}>{record.title}</td>
              <td>{record.author}</td>
              <td>
                <button
                  className={`upvote ${userVotes[record.id] === 1 ? "voted" : ""}`}
                  onClick={() => handleVote(record.id, 1)}
                  disabled={userVotes[record.id] === 1}
                >
                  ▲
                </button>
                <button
                  className={`downvote ${userVotes[record.id] === -1 ? "voted" : ""}`}
                  onClick={() => handleVote(record.id, -1)}
                  disabled={userVotes[record.id] === -1}
                >
                  ▼
                </button>
                {record.votes}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default TableComponent;
