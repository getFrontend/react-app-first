import './JournalForm.css';
import Button from '../Button/Button';
import { useContext, useEffect, useReducer, useRef } from 'react';
import { INITIAL_STATE, formReducer } from './JournalForm.state';
import Input from '../Input/Input';
import { UserContext } from '../../context/user.context';

function JournalForm({ onSubmit }) {
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
	const { isValid, isFormReadyToSubmit, values } = formState;
	const titleRef = useRef();
	const dateRef = useRef();
	const textRef = useRef();
	const { userId } = useContext(UserContext);

	const focusError = (isValid) => {
		switch (true) {
			case !isValid.title:
				titleRef.current.focus();
				break;
			case !isValid.date:
				dateRef.current.focus();
				break;
			case !isValid.text:
				textRef.current.focus();
				break;
		}
	};

	useEffect(() => {
		let timerId;
		if (!isValid.title || !isValid.data || !isValid.text) {
			focusError(isValid);
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

	useEffect(() => {
		dispatchForm({ type: 'SET_VALUE', payload: { userId } });
	}, [userId]);

	const onChange = (e) => {
		dispatchForm({ type: 'SET_VALUE', payload: { [e.target.name]: e.target.value } });
	};

	const addJournalItem = (e) => {
		e.preventDefault();
		dispatchForm({ type: 'SUBMIT' });
	};

	return (
		<form className='journal-form' onSubmit={addJournalItem}>
			<Input type='text' ref={titleRef} onChange={onChange} value={values.title} name='title' isValid={!isValid.title} />
			<Input type='date' ref={dateRef} onChange={onChange} value={values.date} name='date' isValid={!isValid.date} />
			<Input type='text' name='tag' />
			<textarea name="text" ref={textRef} onChange={onChange} value={values.text} cols="30" rows="10" className={`input ${isValid.text ? '' : 'invalid'}`} ></textarea>
			<Button text="Сохранить" />
		</form>
	);
}

export default JournalForm;