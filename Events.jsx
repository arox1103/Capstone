import React, { useState, useEffect } from 'react';
import EventList from '../components/Events/EventList';
import { getAllEvents } from '../services/api';

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await getAllEvents();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  return (
    <div>
      <h2>Events</h2>
      <EventList events={events} />
    </div>
  );
};

export default Events;
