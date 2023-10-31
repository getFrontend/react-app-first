import './JournalForm.css';
import Button from '../Button/Button';
import { useEffect, useReducer } from 'react';
import classNames from 'classnames';
import { INITIAL_STATE, formReducer } from './JournalForm.state';

function JournalForm({ onSubmit }) {
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
	const { isValid, isFormReadyToSubmit, values } = formState;


	useEffect(() => {
		let timerId;
		if (!isValid.title || !isValid.data || !isValid.text) {
			timerId = setTimeout(() => {
				dispatchForm({ type: 'RESET_VALIDITY' });
			}, 2000);
		}
		return () => {
			clearTimeout(timerId);
		};
	}, [isValid]);

	useEffect(() => {
		if (isFormReadyToSubmit) {
			onSubmit(values);
			dispatchForm({ type: 'CLEAR' });
		}
	}, [isFormReadyToSubmit, onSubmit, values]);

	const onChange = (e) => {
		dispatchForm({ type: 'SET_VALUE', payload: { [e.target.name]: e.target.value } });
	};

	const addJournalItem = (e) => {
		e.preventDefault();
		dispatchForm({ type: 'SUBMIT' });
	};

	return (
		<form className='journal-form' onSubmit={addJournalItem}>
			<input type='text' onChange={onChange} value={values.title} name='title' className={classNames('input', {
				'invalid': !isValid.title
			})} />
			<input type='date' onChange={onChange} value={values.date} name='date' className={`input ${isValid.date ? '' : 'invalid'}`} />
			<input type='text' name='tag' />
			<textarea name="text" onChange={onChange} value={values.text} cols="30" rows="10" className={`input ${isValid.text ? '' : 'invalid'}`} ></textarea>
			<Button text="Сохранить" />
		</form>
	);
}

export default JournalForm;