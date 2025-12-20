const { status } = require('http-status');
const tokenService = require('./token.service');
const userService = require('./user.service');
const prisma = require('../../prisma');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');
const bcrypt = require('bcryptjs');

/**
 * Login with email and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
  // 1. User not found
  const user = await userService.getUserByEmail(email);
  if (!user) {
    throw new ApiError(status.NOT_FOUND, 'User not found');
  }

  // 2. Email not verified (opsional tapi sangat disarankan)
  // if (!user.isEmailVerified) {
  //   throw new ApiError(status.FORBIDDEN, 'Email not verified');
  // }

  // 3. Password incorrect
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new ApiError(status.UNAUTHORIZED, 'Incorrect email or password');
  }

  return user;
};

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise<void>}
 */
const logout = async (refreshToken) => {
  const refreshTokenDoc = await prisma.token.findFirst({
    where: {
      token: refreshToken,
      type: tokenTypes.REFRESH,
      blacklisted: false,
    },
  });

  // Refresh token not found / already revoked
  if (!refreshTokenDoc) {
    throw new ApiError(status.NOT_FOUND, 'Refresh token not found');
  }

  await prisma.token.delete({
    where: { id: refreshTokenDoc.id },
  });
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);

    const user = await userService.getUserById(refreshTokenDoc.user);
    if (!user) {
      throw new ApiError(status.NOT_FOUND, 'User not found');
    }

    // Single-use refresh token
    await prisma.token.delete({
      where: { id: refreshTokenDoc.id },
    });

    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(status.UNAUTHORIZED, 'Please authenticate');
  }
};

/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise<void>}
 */
const resetPassword = async (resetPasswordToken, newPassword) => {
  try {
    const resetPasswordTokenDoc = await tokenService.verifyToken(resetPasswordToken, tokenTypes.RESET_PASSWORD);

    const user = await userService.getUserById(resetPasswordTokenDoc.user);
    if (!user) {
      throw new ApiError(status.NOT_FOUND, 'User not found');
    }

    await userService.updateUserById(user.id, {
      password: newPassword,
    });

    await prisma.token.deleteMany({
      where: {
        userId: user.id,
        type: tokenTypes.RESET_PASSWORD,
      },
    });
  } catch (error) {
    throw new ApiError(status.UNAUTHORIZED, 'Password reset failed');
  }
};

/**
 * Verify email
 * @param {string} verifyEmailToken
 * @returns {Promise<void>}
 */
const verifyEmail = async (verifyEmailToken) => {
  try {
    const verifyEmailTokenDoc = await tokenService.verifyToken(verifyEmailToken, tokenTypes.VERIFY_EMAIL);

    const user = await userService.getUserById(verifyEmailTokenDoc.user);
    if (!user) {
      throw new ApiError(status.NOT_FOUND, 'User not found');
    }

    await prisma.token.deleteMany({
      where: {
        userId: user.id,
        type: tokenTypes.VERIFY_EMAIL,
      },
    });

    await userService.updateUserById(user.id, {
      isEmailVerified: true,
    });
  } catch (error) {
    throw new ApiError(status.UNAUTHORIZED, 'Email verification failed');
  }
};

module.exports = {
  loginUserWithEmailAndPassword,
  logout,
  refreshAuth,
  resetPassword,
  verifyEmail,
};
