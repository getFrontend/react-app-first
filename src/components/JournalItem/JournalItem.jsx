import './JournalItem.css';

function JournalItem() {

  return (
    <div className="journal-item">
      <h2 className="journal-item__title">Header</h2>
      <div className="journal-item__content">
        <p className="journal-item__date">1</p>
        <p className="journal-item__text">2</p>
      </div>
    </div>
  );
}

export default JournalItem;
