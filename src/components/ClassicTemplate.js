import React from 'react';
import './ClassicTemplate.css';

const ClassicTemplate = React.forwardRef((props, ref) => {
  const { resume, onPhotoClick } = props;

  if (!resume) {
    return <div>Loading resume...</div>;
  }

  const { personalInfo, summary, experience, education, skills } = resume;

  return (
    <div className="resume-container classic-template" ref={ref}>
      <header className="resume-header">
        {resume.profilePhoto && (
          <img 
            src={resume.profilePhoto} 
            alt="Profile" 
            className="profile-photo" 
            onClick={onPhotoClick} 
            style={{ cursor: 'pointer' }} 
            crossOrigin="anonymous" // Fix for CORS
          />
        )}
        <h1>{personalInfo.name}</h1>
        <p>{personalInfo.email} | {personalInfo.phone} | {personalInfo.address}</p>
      </header>
      <section className="resume-section">
        <h2>Summary</h2>
        <p>{summary}</p>
      </section>
      <section className="resume-section">
        <h2>Experience</h2>
        {experience.map((exp, index) => (
          <div key={index} className="job">
            <h3>{exp.role} at {exp.company}</h3>
            <span>{exp.startDate} - {exp.endDate}</span>
            <p>{exp.description}</p>
          </div>
        ))}
      </section>
      <section className="resume-section">
        <h2>Education</h2>
        {education.map((edu, index) => (
          <div key={index} className="education-item">
            <h3>{edu.degree} from {edu.institution}</h3>
            <span>Graduated: {edu.gradYear}</span>
          </div>
        ))}
      </section>
      <section className="resume-section">
        <h2>Skills</h2>
        <ul className="skills-list">
          {skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </section>
    </div>
  );
});

export default ClassicTemplate;