import React from 'react';
import './Preview.css';

const Preview = ({ personalInfo, summary, experience, education, skills, projects, links, awards }) => {
  return (
    <div className="preview-container">
      <div className="resume-header">
        {personalInfo.photo && <img src={personalInfo.photo} alt="Profile" className="resume-photo" />}
        <h2>{personalInfo.fullName || 'Your Name'}</h2>
        <div className="contact-info">
          <p>{personalInfo.email || 'your.email@example.com'}</p>
          <p>{personalInfo.phone || '123-456-7890'}</p>
          {links.map((link, index) => (
            <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">{link.label}</a>
          ))}
        </div>
      </div>
      <div className="resume-section">
        <h3>Summary</h3>
        <p>{summary || 'A brief summary of your career objectives and qualifications...'}</p>
      </div>
      <div className="resume-section">
        <h3>Work Experience</h3>
        {experience.map((exp, index) => (
          <div key={index} className="resume-entry">
            <h4>{exp.title || 'Job Title'}</h4>
            <p>
              {exp.company || 'Company Name'} | {exp.startDate || 'Start Date'} - {exp.endDate || 'End Date'}
            </p>
            <p>{exp.description || 'Job description goes here.'}</p>
          </div>
        ))}
      </div>
      <div className="resume-section">
        <h3>Projects</h3>
        {projects.map((project, index) => (
          <div key={index} className="resume-entry">
            <h4>{project.name || 'Project Name'}</h4>
            <p>{project.description || 'Project description...'}</p>
            {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer">View Project</a>}
          </div>
        ))}
      </div>
      <div className="resume-section">
        <h3>Education</h3>
        {education.map((edu, index) => (
          <div key={index} className="resume-entry">
            <h4>{edu.degree || 'Degree'}</h4>
            <p>
              {edu.institution || 'Institution'} | {edu.startDate || 'Start Date'} - {edu.endDate || 'End Date'}
            </p>
          </div>
        ))}
      </div>
      <div className="resume-section">
        <h3>Skills</h3>
        <div className="skills-preview">
          {skills.map((skill, index) => (
            <span key={index} className="skill-tag">
              {skill}
            </span>
          ))}
        </div>
      </div>
      <div className="resume-section">
        <h3>Awards & Certifications</h3>
        {awards.map((award, index) => (
          <div key={index} className="resume-entry">
            <h4>{award.name || 'Award Name'}</h4>
            <p>{award.date || 'Date Received'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Preview;




