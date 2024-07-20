


import { Fragment, useEffect } from 'react';
import {
	SubmitHandler,
	useFieldArray,
	useFormContext,
	useWatch,
} from 'react-hook-form';



import { useCreateUser, useEditUser } from '../services/mutations';
import {
	useGenders,
	useLanguages,
	useSkills,
	useStates,
	useUser,
	useUsers,
} from '../services/queries';
import { defaultValues, schema, Schema } from '../types/schema';
import { RHFTailwindTextField } from '../../components/tailwind/RHFTailwindTextField';
import { RHFTailwindAutocomplete } from '../../components/tailwind/RHFTailwindAutocomplete';
import { RHFTailwindToggleButtonGroup } from '../../components/tailwind/RHFToggleButtonGroup';
import { RHFTailwindRadioGroup } from '../../components/tailwind/RHFTailwindRadioGroup';
import { RHFTailwindCheckbox } from '../../components/tailwind/RHFTailwindCheckbox';
// import { RHFTailwindDateRangePicker } from '../../components/tailwind/RHFTailwindDateRangePicker';
import { RHFTailwindSlider } from '../../components/tailwind/RHFTailwindSlider';
import { RHFTailwindSwitch } from '../../components/tailwind/RHFTailwindSwitch';
import { RHFDateTailwindTimePicker } from '../../components/tailwind/RHFTailwindDateTimePicker';
import RHFTailwindMultiSelect from '../../components/tailwind/RHFTailwindMultiSelect';
// import { RHFDateTailwindTimePicker } from '../../components/tailwind/RHFTailwindDateTimePicker';

export  default function UserWithTailwind() {
	const statesQuery = useStates();
	const languagesQuery = useLanguages();
	const gendersQuery = useGenders();
	const skillsQuery = useSkills();
	const usersQuery = useUsers();

	const { watch, control, unregister, reset, setValue, handleSubmit } =
		useFormContext<Schema>();

	const id = useWatch({ control, name: 'id' });
	const variant = useWatch({ control, name: 'variant' });

	const userQuery = useUser(id);

	useEffect(() => {
		const sub = watch((value) => {
			console.log(value);
		});

		return () => sub.unsubscribe();
	}, [watch]);

	const isTeacher = useWatch({ control, name: 'isTeacher' });

	const { append, fields, remove, replace } = useFieldArray({
		control,
		name: 'students',
	});

	const handleUserClick = (id: string) => {
		setValue('id', id);
	};

	useEffect(() => {
		if (!isTeacher) {
			replace([]);
			unregister('students');
		}
	}, [isTeacher, replace, unregister]);

	useEffect(() => {
		if (userQuery.data) {
			reset(userQuery.data);
		}
	}, [reset, userQuery.data]);

	const handleReset = () => {
		reset(defaultValues);
	};

	const createUserMutation = useCreateUser();
	const editUserMutation = useEditUser();

	const onSubmit: SubmitHandler<Schema> = (data) => {
		if (variant === 'create') {
			createUserMutation.mutate(data);
		} else {
			editUserMutation.mutate(data);
		}
	};
	return (
<div className="conatiner"> 

        <div className="m-28">
    

		<form onSubmit={handleSubmit(onSubmit)}>
		


			
					<RHFTailwindTextField<Schema> maxLength={10} name="name" label="Name" />
					<RHFTailwindTextField<Schema>  name="email" label="Email" />
					{/* <RHFTailwindAutocomplete<Schema>
						name="states"
						label="States"
						options={statesQuery.data}
					/> */}
					<RHFTailwindMultiSelect<Schema>
						name="states"
						label="States"
						options={statesQuery.data}
					/>
					<RHFTailwindToggleButtonGroup<Schema>
						name="languagesSpoken"
						options={languagesQuery.data}
					/>
					<RHFTailwindRadioGroup<Schema>
						name="gender"
						options={gendersQuery.data}
						label="Gender"
					/>
					<RHFTailwindCheckbox<Schema>
						name="skills"
						options={skillsQuery.data}
						label="Skills"
					/>

					<RHFDateTailwindTimePicker<Schema>
						name="registrationDateAndTime"
						label="Registration Date & Time"
					/>
					<p>Former Employment Period:</p>
					{/* <RHFTailwindDateRangePicker<Schema> name="formerEmploymentPeriod" /> */}
					<RHFTailwindSlider<Schema> name="salaryRange" label="Salary Range" />
					<RHFTailwindSwitch<Schema> name="isTeacher" label="Are you a teacher?" />

					{isTeacher && (
						<button onClick={() => append({ name: '' })} type="button">
							Add new student
						</button>
					)}

					{fields.map((field, index) => (
						<Fragment key={field.id}>
							<RHFTailwindTextField<Schema>
								name={`students.${index}.name`}
								label="Name"
							/>
							<button
								color="error"
								onClick={() => {
									remove(index);
								}}
								type="button"
							>
								Remove
							</button>
						</Fragment>
					))}

				
						<button  type="submit">
							{variant === 'create' ? 'New user' : 'Edit user'}
						</button>
						<button onClick={handleReset}>Reset</button>
				
			
		
		</form>

        </div>
        </div>

	);
}
