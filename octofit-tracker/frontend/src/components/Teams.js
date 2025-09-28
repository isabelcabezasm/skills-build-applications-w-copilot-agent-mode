import React, { useEffect, useState } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Teams API endpoint:', endpoint);
        console.log('Fetched teams data:', data);
        setTeams(data.results || data);
      })
      .catch(err => console.error('Error fetching teams:', err));
  }, [endpoint]);

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="card-title text-warning mb-4">Teams</h2>
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Members</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, idx) => (
              <tr key={team.id || idx}>
                <td>{team.name || 'N/A'}</td>
                <td>{team.members ? team.members.length : '-'}</td>
                <td>
                  <button className="btn btn-info btn-sm me-2" data-bs-toggle="modal" data-bs-target="#teamModal">Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Example Bootstrap Modal */}
        <div className="modal fade" id="teamModal" tabIndex="-1" aria-labelledby="teamModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="teamModalLabel">Team Details</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {/* Details would go here */}
                <form>
                  <div className="mb-3">
                    <label htmlFor="teamName" className="form-label">Name</label>
                    <input type="text" className="form-control" id="teamName" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="teamMembers" className="form-label">Members</label>
                    <input type="text" className="form-control" id="teamMembers" />
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

export default Teams;
