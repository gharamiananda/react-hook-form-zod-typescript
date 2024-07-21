/* eslint-disable @typescript-eslint/no-unused-vars */



import { Fragment, useEffect, useState } from 'react';
import {
	SubmitHandler,
	useFieldArray,
	useFormContext,
	useWatch,
} from 'react-hook-form';
import { defaultValues, schema, Schema } from './types/schema';
import { RHFTailwindTextField } from '../tailwind/RHFTailwindTextField';
// import { RHFTailwindDateRangePicker } from '../../components/tailwind/RHFTailwindDateRangePicker';
import { RHFTailwindSlider } from '../../components/tailwind/RHFTailwindSlider';
import { RHFTailwindSwitch } from '../../components/tailwind/RHFTailwindSwitch';
import { RHFDateTailwindTimePicker } from '../../components/tailwind/RHFTailwindDateTimePicker';
import PopOver from '../../modal/PopOver';
import Modal from '../../modal/Modal';
// import { RHFDateTailwindTimePicker } from '../../components/tailwind/RHFTailwindDateTimePicker';

export  default function UserForm (){
	

	const { watch, control, unregister, reset, setValue, handleSubmit } =
		useFormContext<Schema>();

	const id = useWatch({ control, name: 'id' });
	const variant = useWatch({ control, name: 'variant' });

	

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


	const handleReset = () => {
		reset(defaultValues);
	};


	const onSubmit: SubmitHandler<Schema> = (data) => {
	
	};

	const [showModal, setShowModal] = useState(false);

	const toggleModal = () => setShowModal(!showModal);


	const [showSmallModal, setShowSmallModal] = useState(false);
	const [showMediumModal, setShowMediumModal] = useState(false);
	const [showLargeModal, setShowLargeModal] = useState(false);
	const [showExtralargeModal, setShowExtralargeModal] = useState(false);


	return (
<div className="conatiner "> 

        <div className="m-28 ">



    

		<form noValidate onSubmit={handleSubmit(onSubmit)}>
		


			
					<RHFTailwindTextField<Schema> name="name" label="Name" />
					<RHFTailwindTextField<Schema>  name="email" label="Email" />
					<RHFTailwindTextField<Schema>  name="phone" label="Phone"  type='number' />
					<RHFTailwindTextField<Schema> name="password" label="Password" type="password" />

					{/* <RHFTailwindAutocomplete<Schema>
						name="states"
						label="States"
						options={statesQuery.data}
					/> */}
		


					<p>Former Employment Period:</p>
					{/* <RHFTailwindDateRangePicker<Schema> name="formerEmploymentPeriod" /> */}
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

				



<div>
  <button  type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
    <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
    </svg>

							{variant === 'create' ? 'New user' : 'Edit user'}
  </button>
</div>


						<button onClick={handleReset}>Reset</button>
				
			
		




		
		</form>


		<div className="p-5">
      <button
        onClick={toggleModal}
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Toggle modal
      </button>

      <PopOver  show={showModal} onClose={toggleModal}>
        <div className="p-4 md:p-5 text-center">
          <svg
            className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to delete this product?
          </h3>
          <button
            onClick={toggleModal}
            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
          >
            Yes, I'm sure
          </button>
          <button
            onClick={toggleModal}
            className="py-2.5 px-5 ml-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            No, cancel
          </button>
        </div>
      </PopOver>

 <div className="p-5 space-y-4">
      <div className="block space-y-4 md:flex md:space-y-0 md:space-x-4 rtl:space-x-reverse">
        <button
          onClick={() => setShowSmallModal(true)}
          className="block w-full md:w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Small modal
        </button>
        <button
          onClick={() => setShowMediumModal(true)}
          className="block w-full md:w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Default modal
        </button>
        <button
          onClick={() => setShowLargeModal(true)}
          className="block w-full md:w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Large modal
        </button>
        <button
          onClick={() => setShowExtralargeModal(true)}
          className="block w-full md:w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Extra large modal
        </button>
      </div>

      <Modal id="small-modal" show={showSmallModal} onClose={() => setShowSmallModal(false)} size="small" title="Small modal">
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
          With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
        </p>
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
          The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
        </p>
      </Modal>



      <Modal id="medium-modal" show={showMediumModal} onClose={() => setShowMediumModal(false)} size="medium" title="Default modal">
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
          With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
        </p>
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
          The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
        </p>
      </Modal>

      <Modal id="large-modal" show={showLargeModal} onClose={() => setShowLargeModal(false)} size="large" title="Large modal">
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
          With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
        </p>
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
          The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
        </p>
      </Modal>

  </div> 
    </div>
        </div>
        </div>

	);
}
