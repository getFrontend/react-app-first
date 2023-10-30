import './JournalForm.css';
import Button from '../Button/Button';
import { useEffect, useState } from 'react';
import classNames from 'classnames';

const INITIAL_STATE = {
	title: true,
	text: true,
	date: true
};

function JournalForm({ onSubmit }) {
	const [formValidState, setFormValidState] = useState(
		INITIAL_STATE
	);

	useEffect(() => {
		let timerId;
		if (!formValidState.title ||
			!formValidState.data ||
			!formValidState.text
		) {
			timerId = setTimeout(() => {
				setFormValidState(INITIAL_STATE);
			}, 2000);
		}
		return () => {
			clearTimeout(timerId);
		};
	}, [formValidState]);

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
			<input type='text' name='title' className={classNames('input', {
				'invalid': !formValidState.title
			})} />
			<input type='date' name='date' className={`input ${formValidState.date ? '' : 'invalid'}`} />
			<input type='text' name='tag' />
			<textarea name="text" id="" cols="30" rows="10" className={`input ${formValidState.text ? '' : 'invalid'}`} ></textarea>
			<Button text="Сохранить" />
		</form>
	);
}

export default JournalForm;