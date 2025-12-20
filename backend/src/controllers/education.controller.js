const { status } = require('http-status');
const catchAsync = require('../utils/catchAsync');
const educationService = require('../services/education.service');

const createEducation = catchAsync(async (req, res) => {
  const education = await educationService.createEducation({
    ...req.body,
    userId: req.user.id,
  });

  res.status(status.CREATED).send(education);
});

const getEducations = catchAsync(async (req, res) => {
  const educations = await educationService.getEducationsByUser(req.user.id);
  res.send(educations);
});

const getEducation = catchAsync(async (req, res) => {
  const education = await educationService.getEducationById(req.params.educationId);
  res.send(education);
});

const updateEducation = catchAsync(async (req, res) => {
  const education = await educationService.updateEducationById(req.params.educationId, req.body);
  res.send(education);
});

const deleteEducation = catchAsync(async (req, res) => {
  await educationService.deleteEducationById(req.params.educationId);
  res.status(status.NO_CONTENT).send();
});

module.exports = {
  createEducation,
  getEducations,
  getEducation,
  updateEducation,
  deleteEducation,
};
