import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Workouts API endpoint:', endpoint);
        console.log('Fetched workouts data:', data);
        setWorkouts(data.results || data);
      })
      .catch(err => console.error('Error fetching workouts:', err));
  }, [endpoint]);

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="card-title text-primary mb-4">Workouts</h2>
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map((workout, idx) => (
              <tr key={workout.id || idx}>
                <td>{workout.name || 'N/A'}</td>
                <td>{workout.type || '-'}</td>
                <td>
                  <button className="btn btn-info btn-sm me-2" data-bs-toggle="modal" data-bs-target="#workoutModal">Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Example Bootstrap Modal */}
        <div className="modal fade" id="workoutModal" tabIndex="-1" aria-labelledby="workoutModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="workoutModalLabel">Workout Details</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {/* Details would go here */}
                <form>
                  <div className="mb-3">
                    <label htmlFor="workoutName" className="form-label">Name</label>
                    <input type="text" className="form-control" id="workoutName" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="workoutType" className="form-label">Type</label>
                    <input type="text" className="form-control" id="workoutType" />
                  </div>
                  <button type="submit" className="btn btn-primary">Save</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workouts;
