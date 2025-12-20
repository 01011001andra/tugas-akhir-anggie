const express = require('express');
const auth = require('../../middlewares/auth');
const educationController = require('../../controllers/education.controller');

const router = express.Router();

router.post('/', auth(), educationController.createEducation);
router.get('/', auth(), educationController.getEducations);
router.get('/:educationId', auth(), educationController.getEducation);
router.patch('/:educationId', auth(), educationController.updateEducation);
router.delete('/:educationId', auth(), educationController.deleteEducation);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Education
 *   description: User education management
 */

/**
 * @swagger
 * /educations:
 *   post:
 *     summary: Create education
 *     tags: [Education]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, image]
 *             properties:
 *               title:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       "201":
 *         description: Created
 */

/**
 * @swagger
 * /educations/me:
 *   get:
 *     summary: Get my educations
 *     tags: [Education]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 */
