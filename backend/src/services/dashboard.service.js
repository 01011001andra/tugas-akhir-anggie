const prisma = require('../../prisma');

/**
 * Get dashboard summary
 * - totalProducts
 * - totalUsers
 * - totalTransactions
 * - totalRevenue (approved transactions only)
 *
 * @returns {Promise<Object>}
 */
const getDashboardSummary = async () => {
  // Jalankan paralel agar lebih cepat
  const [totalProducts, totalUsers, totalTransactions, approvedRevenue] = await Promise.all([
    prisma.product.count(),

    prisma.user.count(),

    prisma.transaction.count(),

    prisma.transaction.aggregate({
      where: {
        status: 'APPROVED',
      },
      _sum: {
        totalPrice: true,
      },
    }),
  ]);

  return {
    totalProducts,
    totalUsers,
    totalTransactions,
    totalRevenue: approvedRevenue._sum.totalPrice || 0,
  };
};

module.exports = {
  getDashboardSummary,
};
