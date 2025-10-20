import React from 'react';
import './Awards.css';

const Awards = ({ awards, setAwards }) => {
  const handleAddAward = () => {
    setAwards([...awards, { name: '', date: '' }]);
  };

  const handleRemoveAward = (index) => {
    const newAwards = [...awards];
    newAwards.splice(index, 1);
    setAwards(newAwards);
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newAwards = [...awards];
    newAwards[index][name] = value;
    setAwards(newAwards);
  };

  return (
    <div className="awards-container">
      <h3>Awards & Certifications</h3>
      {awards.map((award, index) => (
        <div key={index} className="award-entry">
          <input
            type="text"
            name="name"
            placeholder="Award or Certification Name"
            value={award.name}
            onChange={(e) => handleChange(e, index)}
          />
          <input
            type="text"
            name="date"
            placeholder="Date Received"
            value={award.date}
            onChange={(e) => handleChange(e, index)}
          />
          <button type="button" onClick={() => handleRemoveAward(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddAward}>
        Add Award
      </button>
    </div>
  );
};

export default Awards;
