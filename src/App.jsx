import './App.css';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';
import JournalList from './components/JournalList/JournalList';
import Body from './layouts/Body/Body';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import { UserContextProvider } from './context/user.context';
import { useLocalStorage } from './hooks/use-localstorage.hook';

function mapItems(items) {
	if (!items) {
		return [];
	}
	return items.map(i => ({
		...i,
		date: new Date(i.date)
	}));
}

function App() {
	const [items, setItems] = useLocalStorage('data');

	const addItem = item => {
		console.log(items);
		setItems([mapItems(items), {
			// text: item.text,
			// title: item.title,
			...item,
			date: new Date(item.date),
			id: items ? Math.max(...items.map(i => i.id)) + 1 : 1
		}]);
	};

	return (
		<UserContextProvider>
			<div className='app'>
				<LeftPanel>
					<Header />
					<JournalAddButton />
					<JournalList items={mapItems(items)} />
				</LeftPanel>
				<Body>
					<JournalForm onSubmit={addItem} />
				</Body>
			</div>
		</UserContextProvider>
	);
}

export default App;