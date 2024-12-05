import React, { useState, useEffect } from 'react';
import EventFilters from './EventFilters';
import EventTable from './EventTable';
import EventChart from './EventChart';
import EventAggregationFilter from './EventAggregationFilter';

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [eventTypeFilter, setEventTypeFilter] = useState('');
  const [timestampFilter, setTimestampFilter] = useState('');
  const [eventTypes, setEventTypes] = useState([]);
  const [aggregationFilter, setAggregationFilter] = useState(''); // New state for aggregation filter
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch events
  useEffect(() => {
    fetch("http://127.0.0.1:8001/events")
      .then((response) => response.json())
      .then((data) => {
        const formattedEvents = data.watchdog_events.map(event => ({
          id: event[0],
          event_type: event[1],
          file_name: event[2],
          file_count: event[3],
          timestamp: event[4],
        }));
        setEvents(formattedEvents);
        setFilteredEvents(formattedEvents);
        setEventTypes([...new Set(formattedEvents.map(event => event.event_type))]);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch events.");
        setLoading(false);
      });
  }, []);

  // Apply filters
  const filterEvents = () => {
    let filtered = [...events];

    // Filter by event type
    if (eventTypeFilter) {
      filtered = filtered.filter(event => event.event_type === eventTypeFilter);
    }

    // Filter by timestamp
    if (timestampFilter) {
      filtered = filtered.filter(event => event.timestamp.includes(timestampFilter));
    }

    // Handle aggregation filter logic
    if (aggregationFilter) {
      filtered = aggregateDataByTime(filtered, aggregationFilter);
    }

    setFilteredEvents(filtered);
  };

  // Aggregation logic
  const aggregateDataByTime = (data, timeFrame) => {
    return data.reduce((acc, event) => {
      const date = new Date(event.timestamp);
      let key;

      if (timeFrame === 'hourly') {
        key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}`;
      } else if (timeFrame === 'monthly') {
        key = `${date.getFullYear()}-${date.getMonth() + 1}`;
      } else if (timeFrame === 'yearly') {
        key = `${date.getFullYear()}`;
      }

      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(event);

      return acc;
    }, {});
  };

  // Loading or error handling
  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">File Events</h1>

      {/* Filters */}
      <EventFilters
        eventTypes={eventTypes}
        eventTypeFilter={eventTypeFilter}
        setEventTypeFilter={setEventTypeFilter}
        timestampFilter={timestampFilter}
        setTimestampFilter={setTimestampFilter}
        aggregationFilter={aggregationFilter}
        setAggregationFilter={setAggregationFilter}
        filterEvents={filterEvents}
      />

      {/* Aggregation Filter */}
      <EventAggregationFilter 
        aggregationFilter={aggregationFilter}
        setAggregationFilter={setAggregationFilter}
      />

      {/* Event Table */}
      <EventTable filteredEvents={filteredEvents} />

      {/* Event Chart */}
      <EventChart filteredEvents={filteredEvents} />
    </div>
  );
};

export default Dashboard;
