import './App.css';
import Button from './components/Button/Button';
import CardButton from './components/CardButton/CardButton';
import JournalItem from './components/JournalItem/JournalItem';

function App() {
  const data = [
    {
      title: 'Our title',
      text: 'Some big text and other text',
      data: new Date()
    },
    {
      title: 'Our title 2 AAA',
      text: 'Some big AAA text and other text aaa',
      data: new Date()
    }
  ];

  return (
    <>
      <h1>Start Project</h1>
      <p>some text here</p>
      <Button />
      <CardButton>
        <JournalItem
          title={data[0].title}
          text={data[0].text}
          date={data[0].date}
        />
      </CardButton>
      <CardButton>
        <JournalItem
          title={data[1].title}
          text={data[1].text}
          date={data[1].date}
        />
      </CardButton>
    </>
  );
}

export default App;
