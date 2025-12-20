import api from "../api/api";

// =======================
// EDUCATIONS
// =======================

// Create education
export const createEducation = (payload) => api.post("/educations", payload);

// Get my educations
export const getEducations = () => api.get("/educations");

// Get education by id
export const getEducationById = (id) => api.get(`/educations/${id}`);

// Update education
export const updateEducation = (id, payload) =>
  api.patch(`/educations/${id}`, payload);

// Delete education
export const deleteEducation = (id) => api.delete(`/educations/${id}`);
