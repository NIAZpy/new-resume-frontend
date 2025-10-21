import React from 'react';
import './ModernTemplate.css';

const normalizeUrl = (url) => {
  if (!url) return '';
  if (/^(mailto:|tel:)/i.test(url)) return url;
  const hasProtocol = /^https?:\/\//i.test(url);
  if (hasProtocol) return url;
  if (url.startsWith('www.')) return `https://${url}`;
  return `https://${url}`;
};

const ModernTemplate = React.forwardRef(function ModernTemplate(props, ref) {
  const { resume, onPhotoClick } = props;
  const { personalInfo, summary, experience, education, skills } = resume;
  const github = (personalInfo && (personalInfo.github || personalInfo.githubUrl || personalInfo.githubURL || personalInfo.gitHub || personalInfo.github_link || personalInfo.githubLink)) || '';
  const linkedin = (personalInfo && (personalInfo.linkedin || personalInfo.linkedinUrl || personalInfo.linkedIn || personalInfo.linkedInUrl)) || '';
  const portfolio = (personalInfo && (personalInfo.portfolio || personalInfo.portfolioUrl || personalInfo.website || personalInfo.site || personalInfo.web)) || '';

  return (
    <div className="modern-template new-design" ref={ref}>
      <div className="modern-sidebar">
        {personalInfo && (
          <div className="sidebar-header">
            <h1 className="name">{personalInfo.name}</h1>
            {(experience && experience.length > 0) && (
              <p className="role">{experience[0].title}</p>
            )}
          </div>
        )}

        {resume.profilePhoto && (
          <img 
            src={resume.profilePhoto} 
            alt="Profile" 
            className="profile-photo" 
            onClick={onPhotoClick} 
            style={{ cursor: 'pointer' }} 
            crossOrigin="anonymous"
          />
        )}

        {personalInfo && (
          <section className="modern-section contact-info">
            <h3>Contact</h3>
            <ul className="contact-list">
              {personalInfo.email && (
                <li>
                  <span className="icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24"><path fill="currentColor" d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 3.5l-8 5-8-5V6l8 5 8-5V7.5z"/></svg>
                  </span>
                  <a className="ci" href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
                </li>
              )}
              {personalInfo.phone && (
                <li>
                  <span className="icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24"><path fill="currentColor" d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.05-.24c1.12.37 2.33.57 3.54.57a1 1 0 011 1V21a1 1 0 01-1 1A17.91 17.91 0 012 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.21.2 2.42.57 3.54a1 1 0 01-.24 1.05l-2.21 2.2z"/></svg>
                  </span>
                  <a className="ci" href={`tel:${personalInfo.phone}`}>{personalInfo.phone}</a>
                </li>
              )}
              {personalInfo.address && (
                <li>
                  <span className="icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/></svg>
                  </span>
                  <span className="ci">{personalInfo.address}</span>
                </li>
              )}
              {github && (
                <li>
                  <span className="icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24"><path fill="currentColor" d="M10.59 13.41a1.98 1.98 0 010-2.82l3.54-3.54a2 2 0 112.83 2.83l-1.06 1.06-1.41-1.41 1.06-1.06a.5.5 0 00-.7-.7l-3.54 3.54a.5.5 0 000 .7l1.06 1.06-1.41 1.41-1.06-1.06zM3.52 21.48a5 5 0 010-7.07l3.54-3.54 1.41 1.41-3.54 3.54a3 3 0 004.24 4.24l3.54-3.54 1.41 1.41-3.54 3.54a5 5 0 01-7.06 0zm9.9-16.97l-3.54 3.54 1.41 1.41 3.54-3.54a3 3 0 014.24 4.24l-3.54 3.54 1.41 1.41 3.54-3.54a5 5 0 00-7.06-7.06z"/></svg>
                  </span>
                  <a className="ci" href={normalizeUrl(github)} target="_blank" rel="noreferrer">GitHub</a>
                </li>
              )}
              {linkedin && (
                <li>
                  <span className="icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24"><path fill="currentColor" d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4v16h-4V8zm7 0h3.8v2.2h.05c.53-1 1.83-2.2 3.76-2.2 4.02 0 4.76 2.65 4.76 6.1V24h-4v-7.7c0-1.84-.04-4.2-2.56-4.2-2.56 0-2.95 2-2.95 4.07V24h-3.8V8z"/></svg>
                  </span>
                  <a className="ci" href={normalizeUrl(linkedin)} target="_blank" rel="noreferrer">LinkedIn</a>
                </li>
              )}
              {portfolio && (
                <li>
                  <span className="icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 2c2.5 0 4.74 1.17 6.18 3H5.82A8 8 0 0112 4zm-8 8c0-.7.1-1.37.29-2h15.42a8.07 8.07 0 010 4H4.29A8 8 0 014 12zm1.82 5h12.36A8 8 0 0112 20a8 8 0 01-6.18-3z"/></svg>
                  </span>
                  <a className="ci" href={normalizeUrl(portfolio)} target="_blank" rel="noreferrer">Portfolio</a>
                </li>
              )}
            </ul>
          </section>
        )}

        {summary && (
          <section className="modern-section">
            <div className="section-label inverse">Professional Summary</div>
            <p className="sidebar-paragraph">{summary}</p>
          </section>
        )}

        {resume.languages && resume.languages.length > 0 && (
          <section className="modern-section">
            <h3>Languages</h3>
            <ul className="language-list">
              {resume.languages.map((lng, idx) => (
                <li key={idx}>{typeof lng === 'string' ? lng : `${lng.name}${lng.level ? ` (${lng.level})` : ''}`}</li>
              ))}
            </ul>
          </section>
        )}
      </div>

      <div className="modern-main-content">
        {education && education.length > 0 && (
          <section className="modern-section">
            <div className="section-label">Education</div>
            {education.map((edu, index) => (
              <div key={index} className="education-item">
                <h4>{edu.degree}</h4>
                <p>{edu.institution}</p>
                <p className="education-dates">{edu.startDate} - {edu.endDate}</p>
              </div>
            ))}
          </section>
        )}

        {skills && skills.length > 0 && (
          <section className="modern-section">
            <div className="section-label">Core Skills</div>
            <ul className="modern-skills-list new-skills-layout">
              {skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </section>
        )}

        {resume.projects && resume.projects.length > 0 && (
          <section className="modern-section">
            <h3>Projects</h3>
            {resume.projects.map((p, i) => (
              <div key={i} className="project-item">
                <h4>{p.title}</h4>
                {(p.startDate || p.endDate) && (
                  <p className="experience-dates">{[p.startDate, p.endDate].filter(Boolean).join(' - ')}</p>
                )}
                {p.description && (
                  <ul>
                    {p.description.split('\n').map((line, idx) => line && <li key={idx}>{line}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {experience && experience.length > 0 && (
          <section className="modern-section">
            <div className="section-label">Professional Experience</div>
            {experience.map((job, index) => (
              <div key={index} className="modern-item work-experience-item">
                <div className="experience-header">
                  <h4>{job.title}</h4>
                  <p className="experience-dates">{job.startDate} - {job.endDate}</p>
                </div>
                <h5><span className="company">{job.company}</span>{job.location ? `, ${job.location}` : ''}</h5>
                <ul>
                  {job.description && job.description.split('\n').map((desc, i) => desc && <li key={i}>{desc}</li>)}
                </ul>
              </div>
            ))}
          </section>
        )}

        {resume.certifications && resume.certifications.length > 0 && (
          <section className="modern-section">
            <div className="section-label">Certifications</div>
            <ul className="cert-list">
              {resume.certifications.map((c, i) => (
                <li key={i}>{typeof c === 'string' ? c : (c.name || c.title)}</li>
              ))}
            </ul>
          </section>
        )}
      </div>

    </div>
  );
});

export default ModernTemplate;