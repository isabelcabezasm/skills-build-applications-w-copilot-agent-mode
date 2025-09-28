import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Users API endpoint:', endpoint);
        console.log('Fetched users data:', data);
        setUsers(data.results || data);
      })
      .catch(err => console.error('Error fetching users:', err));
  }, [endpoint]);

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="card-title text-secondary mb-4">Users</h2>
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user.id || idx}>
                <td>{user.username || 'N/A'}</td>
                <td>{user.email || '-'}</td>
                <td>
                  <button className="btn btn-info btn-sm me-2" data-bs-toggle="modal" data-bs-target="#userModal">Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Example Bootstrap Modal */}
        <div className="modal fade" id="userModal" tabIndex="-1" aria-labelledby="userModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="userModalLabel">User Details</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {/* Details would go here */}
                <form>
                  <div className="mb-3">
                    <label htmlFor="userName" className="form-label">Username</label>
                    <input type="text" className="form-control" id="userName" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="userEmail" className="form-label">Email</label>
                    <input type="email" className="form-control" id="userEmail" />
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

export default Users;
