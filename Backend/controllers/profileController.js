const profileModel = require("../models/profileModel");

const createProfile = async (req, res) => {
  const { userId, role, skills, interests, bio } = req.body;

  try {
    const profile = await profileModel.createProfile(
      userId,
      role,
      skills,
      interests,
      bio
    );
    res.status(201).json(profile);
  } catch (err) {
    console.error("Error creating profile:", err);
    res.status(500).json({ error: "Unable to create profile" });
  }
};

const getProfile = async (req, res) => {
  const { userId } = req.params;
  try {
    const profile = await profileModel.getProfileByUserId(userId);
    if (!profile) {
      return res.json({ error: "Profile not found" });
    }
    res.status(200).json(profile);
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ error: "Unable to fetch profile" });
  }
};

const updateProfile = async (req, res) => {
  const { userId } = req.params;
  const updates = req.body;
  try {
    const updatedProfile = await profileModel.updateProfile(userId, updates);
    res.status(200).json(updatedProfile);
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ error: "Unable to update profile" });
  }
};

const deleteProfile = async (req, res) => {
  const { userId } = req.params;
  try {
    const deletedProfile = await profileModel.deleteProfileByUserId(userId);
    res
      .status(200)
      .json({ message: "Profile deleted successfully", deletedProfile });
  } catch (err) {
    console.error("Error deleting profile:", err);
    res.status(500).json({ error: "Unable to delete profile" });
  }
};

module.exports = { createProfile, getProfile, updateProfile, deleteProfile };
