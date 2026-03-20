

exports.checkScam = async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Image is required"
      });
    }

    const mockResult = {
      status: "yellow",
      confidence: 0.78,
      reason: "Message contains urgency and suspicious payment request"
    };

    return res.status(200).json({
      success: true,
      data: mockResult
    });

  } catch (error) {
    console.error("Error in checkScam:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};