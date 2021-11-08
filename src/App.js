import React, {useState, useEffect} from 'react'

import './App.css';

import Modal from './components/Modal'
import EventList from './components/EventList';
import NewEventForm from './components/NewEventForm';

function App() {
  const [showModal, setShowModal] = useState(false)
  const [showEvents, setShowEvents] = useState(true)
  const [events, setEvents] = useState([])

  console.log(events)
  
  useEffect(() => {
    fetch('http://localhost:3000/events')
      .then(response => response.json())
      .then(json => setEvents(json))
      .catch(err => console.log(err))
  }, [])
  
  const handleClose = () => {
    setShowModal(false)
  }
  
  const handleClick = (id) => {
    setEvents((prevEvents) => {
      return prevEvents.filter(event => id !== event.id)
    })
  }
  

  return (
    <div className="App">
      <h1 style={{ color: "red", paddingTop: "50px",}}>Weekend Events</h1>

      {showEvents && (
        <div>
          <button onClick={() => setShowEvents(false)}>Hide Events</button>
        </div>
      )}
      {!showEvents && (
        <div>
          <button onClick={() => setShowEvents(true)}>Show Events</button>
        </div>
      )}

      {showEvents && <EventList events={events} handleClick={handleClick} />}

      {showModal && (
        <Modal handleClose={handleClose}>
          <NewEventForm />
        </Modal>
      )}


      <div>
        <button onClick={() => setShowModal(true)}>Show Modal</button>
      </div>
    </div>
  );
}

export default App;
