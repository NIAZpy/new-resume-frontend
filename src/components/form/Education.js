import React from 'react';
import './Education.css';

const Education = ({ education, setEducation }) => {
  const handleAddEducation = () => {
    setEducation([...education, { institution: '', degree: '', startDate: '', endDate: '' }]);
  };

  const handleRemoveEducation = (index) => {
    const newEducation = [...education];
    newEducation.splice(index, 1);
    setEducation(newEducation);
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newEducation = [...education];
    newEducation[index][name] = value;
    setEducation(newEducation);
  };

  return (
    <div className="education-container">
      <h3>Education</h3>
      {education.map((edu, index) => (
        <div key={index} className="education-entry">
          <input
            type="text"
            name="institution"
            placeholder="Institution"
            value={edu.institution}
            onChange={(e) => handleChange(e, index)}
          />
          <input
            type="text"
            name="degree"
            placeholder="Degree"
            value={edu.degree}
            onChange={(e) => handleChange(e, index)}
          />
          <input
            type="text"
            name="startDate"
            placeholder="Start Date"
            value={edu.startDate}
            onChange={(e) => handleChange(e, index)}
          />
          <input
            type="text"
            name="endDate"
            placeholder="End Date"
            value={edu.endDate}
            onChange={(e) => handleChange(e, index)}
          />
          <button type="button" onClick={() => handleRemoveEducation(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddEducation}>
        Add Education
      </button>
    </div>
  );
};

export default Education;
