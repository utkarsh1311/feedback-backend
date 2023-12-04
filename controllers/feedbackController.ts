import ErrorHandler from "../utils/customError";
import prisma from "../utils/db";

export const getAllFeedbacks = async (req, res) => {
  const feedbacks = await prisma.feedback.findMany();
  res.json({ success: true, data: feedbacks });
};

export const getFeedbackByTeacherId = async (req, res, next) => {
  const { teacherId } = req.user;

  const teacher = await prisma.teacher.findUnique({
    where: {
      id: teacherId,
    },
    include: {
      feedbacks: true,
    },
  });

  if (!teacher) {
    return next(new ErrorHandler("Invalid teacher id provided", 404));
  }

  const feedbacks = teacher.feedbacks;
  return res.status(201).json({ success: true, data: feedbacks });
};

export const getFeedbackById = async (req, res, next) => {
  const { id } = req.params;

  const feedback = await prisma.feedback.findUnique({
    where: {
      id,
    },
  });

  if (!feedback) {
    return next(new ErrorHandler("Invalid feedback id", 404));
  }

  return res.status(200).json({ success: true, data: feedback });
};

export const createFeedback = async (req, res, next) => {
  const newFeedback = await prisma.feedback.create({
    data: {
      student: req.body.student,
      teacherId: req.user.id,
      feedback: req.body.feedback,
      testScore: req.body.testScore,
      subject: req.body.subject,
      duration: req.body.duration,
      createdAt: new Date(req.body.createdAt),
    },
  });

  return res.status(201).json({ success: true, data: newFeedback });
};

export const updateFeedback = async (req, res) => {};

export const deleteFeedback = async (req, res) => {};
