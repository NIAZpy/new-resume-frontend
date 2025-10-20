import React, { useState, useEffect } from 'react';
import './ResumeForm.css';

const ResumeForm = ({ existingResume }) => {
  const [resumeData, setResumeData] = useState({
    personalInfo: { name: '', email: '', phone: '', address: '' },
    summary: '',
    experience: [{ company: '', role: '', startDate: '', endDate: '', description: '' }],
    education: [{ institution: '', degree: '', gradYear: '' }],
    skills: [''],
  });

  useEffect(() => {
    if (existingResume) {
      setResumeData({
        personalInfo: existingResume.personalInfo || { name: '', email: '', phone: '', address: '' },
        summary: existingResume.summary || '',
        experience: existingResume.experience && existingResume.experience.length > 0 ? existingResume.experience : [{ company: '', role: '', startDate: '', endDate: '', description: '' }],
        education: existingResume.education && existingResume.education.length > 0 ? existingResume.education : [{ institution: '', degree: '', gradYear: '' }],
        skills: existingResume.skills && existingResume.skills.length > 0 ? existingResume.skills : [''],
      });
    }
  }, [existingResume]);

  const handleInputChange = (e, section, index) => {
    const { name, value } = e.target;
    const list = [...resumeData[section]];
    list[index][name] = value;
    setResumeData(prev => ({ ...prev, [section]: list }));
  };

  const handleSkillChange = (e, index) => {
    const list = [...resumeData.skills];
    list[index] = e.target.value;
    setResumeData(prev => ({ ...prev, skills: list }));
  };

  const addSectionItem = (section) => {
    const newItem = section === 'experience'
      ? { company: '', role: '', startDate: '', endDate: '', description: '' }
      : section === 'education'
      ? { institution: '', degree: '', gradYear: '' }
      : '';
    setResumeData(prev => ({ ...prev, [section]: [...prev[section], newItem] }));
  };

  const removeSectionItem = (section, index) => {
    const list = [...resumeData[section]];
    list.splice(index, 1);
    setResumeData(prev => ({ ...prev, [section]: list }));
  };

  const handleDownload = () => {
    // We need to navigate to the resume display page to print it.
    if (existingResume && existingResume._id) {
      const printWindow = window.open(`/resume/${existingResume._id}`);
      printWindow.onload = () => {
        printWindow.print();
      };
    } else {
      alert('Please save your resume before downloading.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to save a resume.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token, // Include the token for authentication
        },
        body: JSON.stringify(resumeData),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Resume saved successfully!');
      } else {
        throw new Error(result.message || 'Failed to save resume.');
      }
    } catch (error) {
      console.error('Error saving resume:', error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="resume-form">
      <h3>Personal Information</h3>
      <div className="form-section">
        <input name="name" value={resumeData.personalInfo.name} onChange={(e) => setResumeData(prev => ({...prev, personalInfo: {...prev.personalInfo, name: e.target.value}}))} placeholder="Full Name" />
        <input name="email" value={resumeData.personalInfo.email} onChange={(e) => setResumeData(prev => ({...prev, personalInfo: {...prev.personalInfo, email: e.target.value}}))} placeholder="Email" />
        <input name="phone" value={resumeData.personalInfo.phone} onChange={(e) => setResumeData(prev => ({...prev, personalInfo: {...prev.personalInfo, phone: e.target.value}}))} placeholder="Phone" />
        <input name="address" value={resumeData.personalInfo.address} onChange={(e) => setResumeData(prev => ({...prev, personalInfo: {...prev.personalInfo, address: e.target.value}}))} placeholder="Address" />
      </div>

      <h3>Professional Summary</h3>
      <div className="form-section full-width">
        <textarea value={resumeData.summary} onChange={(e) => setResumeData(prev => ({...prev, summary: e.target.value}))} placeholder="A brief summary of your career..." />
      </div>

      <h3>Work Experience</h3>
      {resumeData.experience.map((exp, index) => (
        <div key={index} className="form-section dynamic-section">
          <input name="company" value={exp.company} onChange={(e) => handleInputChange(e, 'experience', index)} placeholder="Company" />
          <input name="role" value={exp.role} onChange={(e) => handleInputChange(e, 'experience', index)} placeholder="Role" />
          <input name="startDate" value={exp.startDate} onChange={(e) => handleInputChange(e, 'experience', index)} placeholder="Start Date (e.g., Jan 2020)" />
          <input name="endDate" value={exp.endDate} onChange={(e) => handleInputChange(e, 'experience', index)} placeholder="End Date (e.g., Present)" />
          <textarea name="description" value={exp.description} onChange={(e) => handleInputChange(e, 'experience', index)} placeholder="Key responsibilities and achievements..." className="full-width-grid" />
          <button type="button" onClick={() => removeSectionItem('experience', index)} className="btn-remove">Remove</button>
        </div>
      ))}
      <button type="button" onClick={() => addSectionItem('experience')} className="btn-add">+ Add Experience</button>

      <h3>Education</h3>
      {resumeData.education.map((edu, index) => (
        <div key={index} className="form-section dynamic-section">
          <input name="institution" value={edu.institution} onChange={(e) => handleInputChange(e, 'education', index)} placeholder="Institution" />
          <input name="degree" value={edu.degree} onChange={(e) => handleInputChange(e, 'education', index)} placeholder="Degree" />
          <input name="gradYear" value={edu.gradYear} onChange={(e) => handleInputChange(e, 'education', index)} placeholder="Graduation Year" />
          <button type="button" onClick={() => removeSectionItem('education', index)} className="btn-remove">Remove</button>
        </div>
      ))}
      <button type="button" onClick={() => addSectionItem('education')} className="btn-add">+ Add Education</button>

      <h3>Skills</h3>
      <div className="form-section skills-section">
        {resumeData.skills.map((skill, index) => (
          <div key={index} className="skill-item">
            <input value={skill} onChange={(e) => handleSkillChange(e, index)} placeholder="e.g., JavaScript" />
            <button type="button" onClick={() => removeSectionItem('skills', index)} className="btn-remove-skill">×</button>
          </div>
        ))}
      </div>
      <button type="button" onClick={() => addSectionItem('skills')} className="btn-add">+ Add Skill</button>

      <div className="form-actions">
        <button type="submit" className="btn-submit-resume">Save Resume</button>
        <button type="button" onClick={handleDownload} className="btn-download-resume">Download Resume</button>
      </div>
    </form>
  );
};

export default ResumeForm;