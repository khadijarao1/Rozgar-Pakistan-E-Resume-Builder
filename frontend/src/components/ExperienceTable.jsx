import React from 'react';

function ExperienceTable({ data }) {
  if (!data || data.length === 0) {
    return <div className="empty-state">No experience records yet. Add one below!</div>;
  }

  return (
    <table className="exp-table">
      <thead>
        <tr>
          <th>Job Title</th>
          <th>Company</th>
          <th>Years Worked</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map((job) => (
          <tr key={job.ExpID}>
            <td><strong>{job.JobTitle}</strong></td>
            <td>{job.CompanyName}</td>
            <td>{job.YearsWorked} {job.YearsWorked === 1 ? 'yr' : 'yrs'}</td>
            <td>
              <span className={job.IsCurrentJob ? 'badge badge-yes' : 'badge badge-no'}>
                {job.IsCurrentJob ? 'Current' : 'Past'}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ExperienceTable;
