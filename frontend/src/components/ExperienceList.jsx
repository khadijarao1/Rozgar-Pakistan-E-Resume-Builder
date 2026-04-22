import React, { useState, useEffect } from 'react';
import ExperienceTable from './ExperienceTable';

function ExperienceList({ userID, userName }) {
  const [experience, setExperience] = useState([]);
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [yearsWorked, setYearsWorked] = useState('');

  const fetchExperience = () => {
    fetch(`http://localhost:5000/api/getExp?userID=${userID}`)
      .then(res => res.json())
      .then(data => setExperience(data));
  };

  useEffect(() => {
    fetchExperience();
  }, [userID]);

  function handleSave() {
    if (!jobTitle || !companyName || !yearsWorked) return;
    fetch('http://localhost:5000/api/addExp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        UserID: userID,
        JobTitle: jobTitle,
        CompanyName: companyName,
        YearsWorked: parseInt(yearsWorked)
      })
    })
      .then(res => res.json())
      .then(() => {
        setJobTitle('');
        setCompanyName('');
        setYearsWorked('');
        fetchExperience();
      });
  }

  return (
    <div className="exp-wrap">
      <div className="welcome-bar">
        <div className="welcome-avatar">{userName.charAt(0)}</div>
        <div className="welcome-text">
          <h2>Hello, {userName}</h2>
          <p>Your professional experience dashboard</p>
        </div>
      </div>

      <div className="card">
        <div className="card-head">
          <h3>Work Experience</h3>
        </div>
        <ExperienceTable data={experience} />
      </div>

      <div className="card">
        <div className="card-head">
          <h3>Add New Experience</h3>
        </div>
        <div className="add-form-grid">
          <div className="form-group">
            <label>Job Title</label>
            <input
              placeholder="e.g. Software Engineer"
              value={jobTitle}
              onChange={e => setJobTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Company Name</label>
            <input
              placeholder="e.g. Systems Ltd"
              value={companyName}
              onChange={e => setCompanyName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Years</label>
            <input
              type="number"
              placeholder="2"
              value={yearsWorked}
              onChange={e => setYearsWorked(e.target.value)}
            />
          </div>
          <button className="btn-save" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default ExperienceList;
