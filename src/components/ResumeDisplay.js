import React from 'react';
import useResumeStore from '../stores/resumeStore';
import ClassicTemplate from './ClassicTemplate';
import './ResumeDisplay.css';
import '../print.css';

const ResumeDisplay = () => {
  const { resume, error, isLoading } = useResumeStore();

  const handleDownload = () => {
    const originalTitle = document.title;
    if (resume && resume.personalInfo && resume.personalInfo.name) {
      document.title = `${resume.personalInfo.name} - Resume`;
    }

    window.print();

    // Restore the original title after printing
    document.title = originalTitle;
  };

  if (isLoading) {
    return <div className="resume-container"><p>Loading...</p></div>;
  }

  if (error) {
    return <div className="resume-container"><p className="error-message">{error}</p></div>;
  }

  if (!resume) {
    return (
      <div className="resume-container">
        <p>No resume data found. Please create one on your dashboard.</p>
      </div>
    );
  }

  const renderTemplate = () => {
    if (resume.template === 'classic') {
      return <ClassicTemplate resume={resume} />;
    }

    // --- Default Template Fallback ---
    const { personalInfo, summary, experience, education, skills, projects, links, awards } = resume;
    return (
      <div className={`resume-display-container template-default`}>
        <header className="resume-header">
          {personalInfo && (
            <>
              <h1>{personalInfo.name}</h1>
              <p>{personalInfo.email} | {personalInfo.phone}</p>
              <p>{personalInfo.address}</p>
              {links && links.length > 0 && (
                <div className="resume-links">
                  {links.map((link, index) => (
                    <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">{link.name || 'Link'}</a>
                  ))}
                </div>
              )}
            </>
          )}
        </header>

        {summary && <section className="resume-section"><h2>Summary</h2><p>{summary}</p></section>}

        {experience && experience.length > 0 && (
          <section className="resume-section">
            <h2>Experience</h2>
            {experience.map((job, index) => (
              <div key={index} className="resume-item">
                <h3>{job.title} at {job.company}</h3>
                <p className="item-sub-heading">{job.location} | {job.startDate} - {job.endDate}</p>
                <ul>
                  {job.description && job.description.split('\n').map((desc, i) => desc && <li key={i}>{desc}</li>)}
                </ul>
              </div>
            ))}
          </section>
        )}

        {education && education.length > 0 && (
          <section className="resume-section">
            <h2>Education</h2>
            {education.map((edu, index) => (
              <div key={index} className="resume-item">
                <h3>{edu.institution}</h3>
                <p className="item-sub-heading">{edu.degree} in {edu.fieldOfStudy}</p>
                <p>{edu.startDate} - {edu.endDate}</p>
              </div>
            ))}
          </section>
        )}

        {skills && skills.length > 0 && (
          <section className="resume-section">
            <h2>Skills</h2>
            <ul className="skills-list">
              {skills.map((skill, index) => <li key={index}>{skill}</li>)}
            </ul>
          </section>
        )}

        {projects && projects.length > 0 && (
          <section className="resume-section">
            <h2>Projects</h2>
            {projects.map((project, index) => (
              <div key={index} className="resume-item">
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer">View Project</a>}
              </div>
            ))}
          </section>
        )}

        {awards && awards.length > 0 && (
          <section className="resume-section">
            <h2>Awards and Certifications</h2>
            {awards.map((award, index) => (
              <div key={index} className="resume-item">
                <h3>{award.name}</h3>
                <p>Issued by: {award.issuer}</p>
                <p>Date: {award.date}</p>
              </div>
            ))}
          </section>
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="download-btn-container">
        <button onClick={handleDownload} className="btn-download">Download as PDF</button>
      </div>
      <div className="resume-container">
        {renderTemplate()}
      </div>
    </div>
  );
};

export default ResumeDisplay;