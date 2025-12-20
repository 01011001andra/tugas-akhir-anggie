const { status } = require('http-status');
const prisma = require('../../prisma');
const ApiError = require('../utils/ApiError');
const bcrypt = require('bcryptjs');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  // hash password
  userBody.password = bcrypt.hashSync(userBody.password, 8);

  // cek apakah ini user pertama
  const userCount = await prisma.user.count();

  // kalau user pertama → admin
  if (userCount === 0) {
    userBody.role = 'admin';
  } else {
    // kalau bukan user pertama
    userBody.role = userBody.role || 'user';
  }

  return prisma.user.create({
    data: userBody,
  });
};

/**
 * Query for users
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return prisma.user.findFirst({
    where: {
      id: id,
    },
  });
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(status.NOT_FOUND, 'User not found');
  }

  const updateUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: updateBody,
  });

  return updateUser;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(status.NOT_FOUND, 'User not found');
  }

  // ❌ admin tidak boleh dihapus
  if (user.role === 'admin') {
    throw new ApiError(status.FORBIDDEN, 'Admin user cannot be deleted');
  }

  return prisma.user.delete({
    where: { id: userId },
  });
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
};
