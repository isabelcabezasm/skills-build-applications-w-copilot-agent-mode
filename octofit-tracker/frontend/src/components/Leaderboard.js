import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Leaderboard API endpoint:', endpoint);
        console.log('Fetched leaderboard data:', data);
        setLeaderboard(data.results || data);
      })
      .catch(err => console.error('Error fetching leaderboard:', err));
  }, [endpoint]);

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="card-title text-info mb-4">Leaderboard</h2>
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Score</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, idx) => (
              <tr key={entry.id || idx}>
                <td>{entry.name || 'N/A'}</td>
                <td>{entry.score || '-'}</td>
                <td>
                  <button className="btn btn-info btn-sm me-2" data-bs-toggle="modal" data-bs-target="#leaderboardModal">Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Example Bootstrap Modal */}
        <div className="modal fade" id="leaderboardModal" tabIndex="-1" aria-labelledby="leaderboardModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="leaderboardModalLabel">Leaderboard Entry</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {/* Details would go here */}
                <form>
                  <div className="mb-3">
                    <label htmlFor="entryName" className="form-label">Name</label>
                    <input type="text" className="form-control" id="entryName" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="entryScore" className="form-label">Score</label>
                    <input type="number" className="form-control" id="entryScore" />
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

export default Leaderboard;
