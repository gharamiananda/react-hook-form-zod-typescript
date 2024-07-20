import { FormProvider, useForm } from 'react-hook-form';

import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';

import { defaultValues, Schema, schema } from '../types/schema';
// import UsersWithMui from './UsersWithMui';
import UserWithTailwind from './UserWithTailwind';

export function UsersProvider() {
	const methods = useForm<Schema>({
		mode: 'all',
		resolver: zodResolver(schema),
		defaultValues,
	});

	return (
		<FormProvider {...methods}>
			{/* <UsersWithMui /> */}
		
			<UserWithTailwind />

			<DevTool control={methods.control} />
		</FormProvider>
	);
}
