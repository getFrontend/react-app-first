import './JournalItem.css';

function JournalItem({ title, text, date }) {
  const formatedDate = new Intl.DateTimeFormat('ua-UA').format(date);

  return (
    <>
      <h2 className="journal-item__title">{title}</h2>
      <div className="journal-item__content">
        <p className="journal-item__date">{formatedDate}</p>
        <p className="journal-item__text">{text}</p>
      </div>
    </>
  );
}

export default JournalItem;
