import './JournalForm.css';
import Button from '../Button/Button';
import { useState } from 'react';

function JournalForm({ onSubmit }) {
	const [formVailState, setFormValidState] = useState(
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
			<input type='text' name='title' style={{ border: formVailState.title ? '1px solid transparent' : '1px solid orange' }} />
			<input type='date' name='date' style={{ border: formVailState.date ? '1px solid transparent' : '1px solid orange' }} />
			<input type='text' name='tag' />
			<textarea name="text" id="" cols="30" rows="10" style={{border: formVailState.text ? '1px solid transparent' : '1px solid orange'}}></textarea>
			<Button text="Сохранить" />
		</form>
	);
}

export default JournalForm;