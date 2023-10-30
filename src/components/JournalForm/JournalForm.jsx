import './JournalForm.css';
import Button from '../Button/Button';
import { useState } from 'react';

function JournalForm({ onSubmit }) {
	const [formValidState, setFormValidState] = useState(
		{
			title: true,
			text: true,
			date: true
		}
	);


	const addJournalItem = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const formProps = Object.fromEntries(formData);

		// Validation of our data
		let isFormValid = true;
		if (!formProps.title?.trim().length) {
			setFormValidState(state => ({ ...state, title: false }));
			isFormValid = false;
		} else {
			isFormValid = true;
		}
		if (!formProps.text?.trim().length) {
			setFormValidState(state => ({ ...state, text: false }));
			isFormValid = false;
		} else {
			isFormValid = true;
		}
		if (!formProps.date) {
			setFormValidState(state => ({ ...state, date: false }));
			isFormValid = false;
		} else {
			isFormValid = true;
		}
		if (!isFormValid) {
			return;
		}
		onSubmit(formProps);
	};

	return (
		<form className='journal-form' onSubmit={addJournalItem}>
			<input type='text' name='title' className={`input ${formValidState.title ? '' : 'invalid'}`} />
			<input type='date' name='date' className={`input ${formValidState.date ? '' : 'invalid'}`} />
			<input type='text' name='tag' />
			<textarea name="text" id="" cols="30" rows="10" className={`input ${formValidState.text ? '' : 'invalid'}`} ></textarea>
			<Button text="Сохранить" />
		</form>
	);
}

export default JournalForm;