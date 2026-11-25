// Get Logged-in User Profile
const getUserProfile = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user profile',
    })
  }
}

module.exports = {
  getUserProfile,
}