import React from 'react';

const EventFilters = ({
  eventTypes,
  eventTypeFilter,
  setEventTypeFilter,
  timestampFilter,
  setTimestampFilter,
  aggregationFilter,
  setAggregationFilter,
  filterEvents
}) => {
  return (
    <div className="mb-4">
      <h3>Filters</h3>
      <div className="row">
        {/* Event Type Dropdown */}
        <div className="col">
          <select
            className="form-select"
            value={eventTypeFilter}
            onChange={(e) => setEventTypeFilter(e.target.value)}
          >
            <option value="">Select Event Type</option>
            {eventTypes.map((eventType, index) => (
              <option key={index} value={eventType}>
                {eventType}
              </option>
            ))}
          </select>
        </div>

        {/* Timestamp Input */}
        <div className="col">
          <input
            type="text"
            className="form-select"
            placeholder="yyyy-mm-dd"
            value={timestampFilter}
            onChange={(e) => setTimestampFilter(e.target.value)}
          />
        </div>

        {/* Aggregation Filter */}
        <div className="col">
          <select
            className="form-select"
            value={aggregationFilter}
            onChange={(e) => setAggregationFilter(e.target.value)}
          >
            <option value="">Select Aggregation</option>
            <option value="hourly">Hourly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        {/* Apply Filter Button */}
        <div className="col">
          <button className="btn btn-primary" onClick={(e) => { e.preventDefault(); filterEvents(); }}>
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventFilters;
