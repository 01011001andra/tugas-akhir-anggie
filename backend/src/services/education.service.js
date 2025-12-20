const { status } = require('http-status');
const prisma = require('../../prisma');
const ApiError = require('../utils/ApiError');

const createEducation = async (data) => {
  return prisma.education.create({ data });
};

const getEducationsByUser = async (userId) => {
  return prisma.education.findMany({
    where: { userId },
  });
};

const getEducationById = async (id) => {
  return prisma.education.findFirst({
    where: { id },
  });
};

const updateEducationById = async (id, data) => {
  const education = await getEducationById(id);
  if (!education) {
    throw new ApiError(status.NOT_FOUND, 'Education not found');
  }

  return prisma.education.update({
    where: { id },
    data,
  });
};

const deleteEducationById = async (id) => {
  const education = await getEducationById(id);
  if (!education) {
    throw new ApiError(status.NOT_FOUND, 'Education not found');
  }

  return prisma.education.delete({
    where: { id },
  });
};

module.exports = {
  createEducation,
  getEducationsByUser,
  getEducationById,
  updateEducationById,
  deleteEducationById,
};
