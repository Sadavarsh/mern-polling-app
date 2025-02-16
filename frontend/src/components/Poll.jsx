import React, { useEffect, useState } from "react";
import CreatePoll from "./CreatePoll";
import axios from "axios";

const Poll = () => {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    fetchPolls();
  }, []);

  const fetchPolls = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/polls`);
      setPolls(response.data);
    } catch (error) {
      console.error("Error fetching polls:", error);
    }
  };

  const votePoll = async (pollId, optionIndex) => {
    try {
      await axios.post(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/polls/vote`, { pollId, optionIndex });
      fetchPolls();
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 p-6">
      <h1 className="text-3xl font-extrabold text-center text-indigo-700 mb-6">🗳️ Poll Voting App</h1>

      {/* Create Poll Section */}
      <div className="max-w-2xl mx-auto mb-8">
        <CreatePoll onPollCreated={fetchPolls} />
      </div>

      {/* Polls Grid - Two columns on desktop, stacked on mobile */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {polls.length > 0 ? (
          polls.map((poll) => (
            <div key={poll._id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">{poll.question}</h2>

              {/* Options */}
              <div className="space-y-3">
                {poll.options.map((option, index) => (
                  <button
                    key={index}
                    className="flex justify-between items-center w-full px-4 py-2 border rounded-lg hover:bg-indigo-100 transition duration-300"
                    onClick={() => votePoll(poll._id, index)}
                  >
                    <span className="text-gray-700">{option.text}</span>
                    <span className="bg-indigo-500 text-white px-3 py-1 rounded-md text-sm font-bold">
                      {option.votes} Votes
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-2">No polls available. Create one! 😊</p>
        )}
      </div>
    </div>
  );
};

export default Poll;
