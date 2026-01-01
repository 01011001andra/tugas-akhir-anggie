const dashboardService = require('../services/dashboard.service');

const getDashboardSummary = async (req, res) => {
  const data = await dashboardService.getDashboardSummary();

  res.status(200).json({
    success: true,
    data,
  });
};

module.exports = {
  getDashboardSummary,
};
