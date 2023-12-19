import ErrorHandler from "../utils/customError";
import prisma from "../utils/db";

export const checkTeacherStatus = async (req, res, next) => {
	const { id } = req.user;

	const teacher = await prisma.teacher.findUnique({
		where: {
			id
		}
	});

	if (!teacher) {
		return next(new ErrorHandler("Teacher not found", 404));
	}

	if (teacher.status !== "ACTIVE") {
		return next(new ErrorHandler("Access for teacher is unauthorized", 403));
	}

	next();
};
