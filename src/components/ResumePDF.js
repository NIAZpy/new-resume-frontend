import React from 'react';
import './ResumePDF.css'; // We'll create this simple CSS file next

const ResumePDF = React.forwardRef(({ resume }, ref) => {
  if (!resume) return null;

  const { personalInfo, summary, experience, education, skills } = resume;

  return (
    <div id="resume-pdf-content" ref={ref}>
      <div className="pdf-sidebar">
        {resume.profilePhoto && (
          <img src={resume.profilePhoto} className="pdf-profile-photo" alt="Profile" />
        )}
        <div className="pdf-section">
          <h3>Contact</h3>
          <p>{personalInfo.address}</p>
          <p>{personalInfo.phone}</p>
          <p>{personalInfo.email}</p>
        </div>
        <div className="pdf-section">
          <h3>Education</h3>
          {education.map((edu, index) => (
            <div key={index} className="pdf-education-item">
              <h4>{edu.degree}</h4>
              <p>{edu.institution}</p>
              <p className="pdf-dates">{edu.startDate} - {edu.endDate}</p>
            </div>
          ))}
        </div>
        <div className="pdf-section">
          <h3>Skills</h3>
          <ul className="pdf-skills-list">
            {skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="pdf-main-content">
        <div className="pdf-header">
          <h1>{personalInfo.name}</h1>
          {experience && experience.length > 0 && <h2>{experience[0].title}</h2>}
        </div>
        <div className="pdf-section">
          <h3>Profile</h3>
          <p>{summary}</p>
        </div>
        <div className="pdf-section">
          <h3>Work Experience</h3>
          {experience.map((job, index) => (
            <div key={index} className="pdf-work-item">
              <div className="pdf-work-header">
                <h4>{job.title}</h4>
                <p className="pdf-dates">{job.startDate} - {job.endDate}</p>
              </div>
              <h5>{job.company}, {job.location}</h5>
              <ul>
                {job.description && job.description.split('\n').map((desc, i) => desc && <li key={i}>{desc}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default ResumePDF;