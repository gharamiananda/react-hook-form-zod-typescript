/* eslint-disable no-useless-escape */
import { z } from 'zod';


export const schema = z
	.intersection(
		z.object({
			name: z.string().min(1, { message: 'Required' }).max(10, { message: 'Name must be 10 characters or less' }),

			password: z
        .string({
			message: 'Password must be at least 10 characters'
		})
        .min(8, { message: 'Password must be at least 8 characters long' })
        .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
        .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
        .regex(/\d/, { message: 'Password must contain at least one number' })
        .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: 'Password must contain at least one special character' }),
      

			phone: z.string()
        .min(10, { message: 'Phone number must be exactly 10 digits' })
        .max(12, { message: 'Phone number must be exactly 12 digits' })
        .regex(/^\d{10}$/, { message: 'Phone number must be numeric and 10 digits long' }),
      
			email: z
				.string()
				.min(1, { message: 'Email is required' })
				.refine((val) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val), { message: 'Invalid email address' }),

				
			states: z.array(z.string()).min(1).max(2),
			languagesSpoken: z.array(z.string()),
			gender: z.string().min(1),
			skills: z.array(z.string()).max(2),
			registrationDateAndTime: z.date(),
			formerEmploymentPeriod: z.array(z.date()).min(2).max(2),
			salaryRange: z.array(z.number()).max(2),
		}),

		z.discriminatedUnion('variant', [
			z.object({ variant: z.literal('create') }),
			z.object({ variant: z.literal('edit'), id: z.string().min(1) }),
		])
	)
	.and(
		z.union([
			z.object({ isTeacher: z.literal(false) }),
			z.object({
				isTeacher: z.literal(true),

				students: z.array(
					z.object({
						name: z.string().min(4),
					})
				),
			}),
		])
	);

export type Schema = z.infer<typeof schema>;

export const defaultValues: Schema = {
	variant: 'create',
	email: '',
	name: '',
	states: [],
	languagesSpoken: [],
	gender: '',
	skills: [],
	registrationDateAndTime: new Date(),
	formerEmploymentPeriod: [new Date(), new Date()],
	salaryRange: [0, 2000],
	isTeacher: false,
	phone:'',
	password:''
};
