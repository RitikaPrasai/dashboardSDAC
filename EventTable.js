import React from 'react';

const EventTable = ({ filteredEvents }) => {
  return (
    <div className="mb-4">
      <h3>Event List</h3>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Event Type</th>
            <th>File Name</th>
            <th>File Count</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
              <tr key={index}>
                <td>{event.id}</td>
                <td>{event.event_type}</td>
                <td>{event.file_name}</td>
                <td>{event.file_count}</td>
                <td>{event.timestamp}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No events found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EventTable;
