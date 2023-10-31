import './JournalForm.css';
import Button from '../Button/Button';
import { useEffect, useReducer } from 'react';
import classNames from 'classnames';
import { INITIAL_STATE, formReducer } from './JournalForm.state';

// const INITIAL_STATE = {
// 	title: true,
// 	text: true,
// 	date: true
// };

function JournalForm({ onSubmit }) {
	// const [formValidState, setFormValidState] = useState(
	// 	INITIAL_STATE
	// );
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
	const { isValid, isFormReadyToSubmit, values } = formState;


	useEffect(() => {
		let timerId;
		if (!isValid.title ||
			!isValid.data ||
			!isValid.text
		) {
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
		}
	}, [isFormReadyToSubmit]);

	const addJournalItem = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const formProps = Object.fromEntries(formData);
		dispatchForm({ type: 'SUBMIT', payload: formProps });
	};

	return (
		<form className='journal-form' onSubmit={addJournalItem}>
			<input type='text' name='title' className={classNames('input', {
				'invalid': !isValid.title
			})} />
			<input type='date' name='date' className={`input ${isValid.date ? '' : 'invalid'}`} />
			<input type='text' name='tag' />
			<textarea name="text" id="" cols="30" rows="10" className={`input ${isValid.text ? '' : 'invalid'}`} ></textarea>
			<Button text="Сохранить" />
		</form>
	);
}

export default JournalForm;