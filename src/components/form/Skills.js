import React, { useState } from 'react';
import './Skills.css';

const Skills = ({ skills, setSkills }) => {
  const [skillInput, setSkillInput] = useState('');

  const handleAddSkill = () => {
    if (skillInput.trim() !== '') {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (index) => {
    const newSkills = [...skills];
    newSkills.splice(index, 1);
    setSkills(newSkills);
  };

  return (
    <div className="skills-container">
      <h3>Skills</h3>
      <div className="skills-input-container">
        <input
          type="text"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          placeholder="Add a skill"
        />
        <button type="button" onClick={handleAddSkill}>Add</button>
      </div>
      <div className="skills-list">
        {skills.map((skill, index) => (
          <div key={index} className="skill-item">
            {skill}
            <button type="button" onClick={() => handleRemoveSkill(index)}>
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
