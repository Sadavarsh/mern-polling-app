import axios from "axios";
import { useState } from "react";

export default function CreatePoll({ onPollCreated }) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([""]);

  const addOption = () => {
    if (options.length < 4) setOptions([...options, ""]);
  };

  const removeOption = (index) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const submitPoll = async () => {
    if (!question.trim() || options.some((opt) => !opt.trim())) {
      alert("Please fill all fields!");
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/polls/create`, { question, options });
      setQuestion("");
      setOptions([""]);
      onPollCreated();
    } catch (error) {
      console.error("Error creating poll:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Create a New Poll</h2>
      <input
        type="text"
        className="w-full border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
        placeholder="Enter your poll question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      
      {options.map((opt, idx) => (
        <div key={idx} className="flex gap-2 mb-2">
          <input
            className="w-full border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={opt}
            onChange={(e) => handleChange(idx, e.target.value)}
            placeholder={`Option ${idx + 1}`}
          />
          {options.length > 1 && (
            <button
              onClick={() => removeOption(idx)}
              className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition duration-200"
            >
              ❌
            </button>
          )}
        </div>
      ))}

      {/* Buttons: Full width on mobile, flex on larger screens */}
      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        <button
          onClick={addOption}
          disabled={options.length >= 4}
          className={`w-full sm:w-1/2 px-4 py-2 rounded-lg transition duration-200 ${
            options.length >= 4 ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600 text-white"
          }`}
        >
          ➕ Add Option
        </button>
        <button
          onClick={submitPoll}
          className="w-full sm:w-1/2 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          ✅ Create Poll
        </button>
      </div>
    </div>
  );
}
