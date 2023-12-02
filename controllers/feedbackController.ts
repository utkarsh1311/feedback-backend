import prisma from "../utils/db";

export const getAllFeedbacks = async (req, res) => {
  const feedbacks = await prisma.feedback.findMany();
  res.json({ success: true, data: feedbacks });
};

export const getFeedbackByTeacherId = async (req, res) => {};

export const createFeedback = async (req, res) => {};

export const getFeedbackById = async (req, res) => {};

export const updateFeedback = async (req, res) => {};

export const deleteFeedback = async (req, res) => {};
