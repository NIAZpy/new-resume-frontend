import React from 'react';
import './Experience.css';

const Experience = ({ experience, setExperience }) => {
  const handleAddExperience = () => {
    setExperience([...experience, { company: '', title: '', startDate: '', endDate: '', description: '' }]);
  };

  const handleRemoveExperience = (index) => {
    const newExperience = [...experience];
    newExperience.splice(index, 1);
    setExperience(newExperience);
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newExperience = [...experience];
    newExperience[index][name] = value;
    setExperience(newExperience);
  };

  return (
    <div className="experience-container">
      <h3>Work Experience</h3>
      {experience.map((exp, index) => (
        <div key={index} className="experience-entry">
          <input
            type="text"
            name="company"
            placeholder="Company"
            value={exp.company}
            onChange={(e) => handleChange(e, index)}
          />
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={exp.title}
            onChange={(e) => handleChange(e, index)}
          />
          <input
            type="text"
            name="startDate"
            placeholder="Start Date"
            value={exp.startDate}
            onChange={(e) => handleChange(e, index)}
          />
          <input
            type="text"
            name="endDate"
            placeholder="End Date"
            value={exp.endDate}
            onChange={(e) => handleChange(e, index)}
          />
          <textarea
            name="description"
            placeholder="Job Description"
            value={exp.description}
            onChange={(e) => handleChange(e, index)}
          />
          <button type="button" onClick={() => handleRemoveExperience(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddExperience}>
        Add Experience
      </button>
    </div>
  );
};

export default Experience;
