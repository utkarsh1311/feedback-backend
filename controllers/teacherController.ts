import { comparePassword, createJWT, hashPassword } from "../utils/auth";
import ErrorHandler from "../utils/customError";
import prisma from "../utils/db";

export const teacherLogin = async (req, res, next) => {

	const teacher = await prisma.teacher.findUnique({
		where: {
			email: req.body.email
		}
	});

	if (!teacher) {
		return next(new ErrorHandler("Invalid credentials", 401));
	}

	if (teacher.status !== "ACTIVE") {
		return next(new ErrorHandler("Teacher is not active", 403));
	}

	const passwordIsCorrect = await comparePassword(
		req.body.password,
		teacher.password
	);

	if (!passwordIsCorrect) {
		return next(new ErrorHandler("Invalid credentials", 401));
	}

	const userForToken = {
		id: teacher.id,
		email: teacher.email,
		role: teacher.role
	};

	const token = createJWT(userForToken);

	return res.status(200).json({
		success: true,
		data: {
			token,
			id: teacher.id,
			role: teacher.role
		}
	});
};

export const createTeacher = async (req, res, next) => {
	const teacher = await prisma.teacher.findUnique({
		where: {
			email: req.body.email
		}
	});

	if (teacher) {
		return next(
			new ErrorHandler("Teacher with provided mail already exists", 400)
		);
	}

	const hashedPassword = await hashPassword(req.body.password);

	await prisma.teacher.create({
		data: {
			email: req.body.email,
			password: hashedPassword,
			role: "TEACHER",
			assignedStudents: req.body.assignedStudents || [],
			phone: req.body.phone,
			name: req.body.name
		}
	});

	return res.status(201).json({ success: true, message: "Teacher created" });
};

export const getAllTeachers = async (_req, res) => {
	const teachers = await prisma.teacher.findMany({
		include: {
			feedbacks: true
		}
	});
	return res.json({ success: true, data: teachers });
};

export const getTeacherById = async (req, res, next) => {
	const { id } = req.params;

	const teacher = await prisma.teacher.findUnique({
		where: {
			id
		},
		include: {
			feedbacks: true
		}
	});

	if (!teacher) {
		return next(new ErrorHandler("Teacher not found", 404));
	}

	return res.json({ success: true, data: teacher });
};

export const updateTeacherDetails = async (req, res, next) => {
	const { id } = req.params;

	const teacher = await prisma.teacher.findUnique({
		where: {
			id
		}
	});

	if (!teacher) {
		return next(new ErrorHandler("Teacher not found", 404));
	}

	if (req.body.password) {
		const hashedPassword = await hashPassword(req.body.password);
		req.body.password = hashedPassword;
	}

	const updatedTeacher = await prisma.teacher.update({
		where: {
			id
		},
		data: req.body
	});

	return res.json({ success: true, data: updatedTeacher });
};

export const deleteTeacher = async (req, res, next) => {
	const { id } = req.params;

	const teacher = await prisma.teacher.findUnique({
		where: {
			id
		}
	});

	if (!teacher) {
		return next(new ErrorHandler("Teacher not found", 404));
	}

	await prisma.teacher.delete({
		where: {
			id
		}
	});

	return res.json({ success: true, data: {} });
};
