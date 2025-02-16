import Poll from "../models/poll.model.js";

// Create Poll
export const createPoll = async (req, res) => {
  try {
    const { question, options } = req.body;

    if (!question || !options || options.length === 0) {
      return res.status(400).json({ message: "Invalid poll data" });
    }

    const poll = new Poll({
      question,
      options: options.map((opt) => ({ text: opt, votes: 0 })),
    });

    await poll.save();
    res.status(201).json(poll);
  } catch (error) {
    console.error("Error creating poll:", error);
    res.status(500).json({ message: "Error creating poll", error: error.message });
  }
};

// Vote on Poll
export const votePoll = async (req, res) => {
  try {
    const { pollId, optionIndex } = req.body;
    const poll = await Poll.findById(pollId);
    if (!poll) return res.status(404).json({ message: "Poll not found" });

    poll.options[optionIndex].votes += 1;
    await poll.save();
    res.json(poll);
  } catch (error) {
    res.status(500).json({ message: "Error voting", error: error.message });
  }
};

// Get All Polls
export const getPolls = async (req, res) => {
  try {
    const polls = await Poll.find();
    res.json(polls);
  } catch (error) {
    res.status(500).json({ message: "Error fetching polls", error: error.message });
  }
};
