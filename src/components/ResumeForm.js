import React, { useState, useEffect } from 'react';
import ImageCropper from './ImageCropper';
import './ResumeForm.css';

const ResumeForm = ({ existingResume }) => {
  const [imageToCrop, setImageToCrop] = useState(null);
  const [resumeData, setResumeData] = useState({
    personalInfo: { name: '', email: '', phone: '', address: '', github: '', linkedin: '', portfolio: '' },
    summary: '',
    experience: [{ company: '', role: '', startDate: '', endDate: '', description: '' }],
    education: [{ institution: '', degree: '', gradYear: '' }],
    skills: [''],
    languages: [''],
    projects: [{ title: '', description: '', startDate: '', endDate: '', tech: '', link: '' }],
    template: 'classic', // Add template to the state
  });

  useEffect(() => {
    if (existingResume) {
      setResumeData({
        personalInfo: {
          name: existingResume.personalInfo?.name || '',
          email: existingResume.personalInfo?.email || '',
          phone: existingResume.personalInfo?.phone || '',
          address: existingResume.personalInfo?.address || '',
          github: existingResume.personalInfo?.github || existingResume.personalInfo?.githubUrl || existingResume.personalInfo?.githubLink || '',
          linkedin: existingResume.personalInfo?.linkedin || existingResume.personalInfo?.linkedinUrl || existingResume.personalInfo?.linkedIn || '',
          portfolio: existingResume.personalInfo?.portfolio || existingResume.personalInfo?.portfolioUrl || existingResume.personalInfo?.website || existingResume.personalInfo?.site || '',
        },
        summary: existingResume.summary || '',
        experience: existingResume.experience && existingResume.experience.length > 0 ? existingResume.experience : [{ company: '', role: '', startDate: '', endDate: '', description: '' }],
        education: existingResume.education && existingResume.education.length > 0 ? existingResume.education : [{ institution: '', degree: '', gradYear: '' }],
        skills: existingResume.skills && existingResume.skills.length > 0 ? existingResume.skills : [''],
        languages: Array.isArray(existingResume.languages) && existingResume.languages.length > 0 ? existingResume.languages : [''],
        projects: Array.isArray(existingResume.projects) && existingResume.projects.length > 0 ? existingResume.projects : [{ title: '', description: '', startDate: '', endDate: '', tech: '', link: '' }],
        template: existingResume.template || 'classic',
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

  const handleLanguageChange = (e, index) => {
    const list = [...resumeData.languages];
    list[index] = e.target.value;
    setResumeData(prev => ({ ...prev, languages: list }));
  };

  const addLanguage = () => {
    setResumeData(prev => ({ ...prev, languages: [...prev.languages, ''] }));
  };

  const removeLanguage = (index) => {
    const list = [...resumeData.languages];
    list.splice(index, 1);
    setResumeData(prev => ({ ...prev, languages: list }));
  };

  const handleProjectChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...resumeData.projects];
    list[index][name] = value;
    setResumeData(prev => ({ ...prev, projects: list }));
  };

  const addProject = () => {
    setResumeData(prev => ({ ...prev, projects: [...prev.projects, { title: '', description: '', startDate: '', endDate: '', tech: '', link: '' }] }));
  };

  const removeProject = (index) => {
    const list = [...resumeData.projects];
    list.splice(index, 1);
    setResumeData(prev => ({ ...prev, projects: list }));
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

  const onFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImageToCrop(reader.result);
      });
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoUpload = async (croppedImageBlob) => {
    const formData = new FormData();
    formData.append('profilePhoto', croppedImageBlob, 'profile.jpg');

    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:3001/api/resume/photo', {
        method: 'POST',
        headers: {
          'x-auth-token': token,
        },
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        alert('Photo uploaded successfully!');
        setResumeData(prev => ({ ...prev, profilePhoto: result.profilePhoto }));
        setImageToCrop(null); // Close the cropper
      } else {
        throw new Error(result.msg || 'Failed to upload photo.');
      }
    } catch (error) {
      console.error('Error uploading photo:', error);
      alert(`Error: ${error.message}`);
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
      {imageToCrop && (
        <ImageCropper 
          imageSrc={imageToCrop} 
          onCropComplete={handlePhotoUpload} 
          onCancel={() => setImageToCrop(null)} 
        />
      )}
      <h3>Template</h3>
      <div className="form-section">
        <select name="template" value={resumeData.template} onChange={(e) => setResumeData(prev => ({...prev, template: e.target.value}))}>
          <option value="classic">Classic</option>
          <option value="modern">Modern</option>
          <option value="creative">Creative</option>
        </select>
      </div>

      <h3>Profile Photo</h3>
      <div className="form-section photo-section">
        {resumeData.profilePhoto && <img src={resumeData.profilePhoto} alt="Profile" className="profile-photo-preview" />}
        <input type="file" name="profilePhoto" onChange={onFileChange} accept="image/*" />
      </div>

      <h3>Personal Information</h3>
      <div className="form-section">
        <input name="name" value={resumeData.personalInfo.name} onChange={(e) => setResumeData(prev => ({...prev, personalInfo: {...prev.personalInfo, name: e.target.value}}))} placeholder="Full Name" />
        <input name="email" value={resumeData.personalInfo.email} onChange={(e) => setResumeData(prev => ({...prev, personalInfo: {...prev.personalInfo, email: e.target.value}}))} placeholder="Email" />
        <input name="phone" value={resumeData.personalInfo.phone} onChange={(e) => setResumeData(prev => ({...prev, personalInfo: {...prev.personalInfo, phone: e.target.value}}))} placeholder="Phone" />
        <input name="address" value={resumeData.personalInfo.address} onChange={(e) => setResumeData(prev => ({...prev, personalInfo: {...prev.personalInfo, address: e.target.value}}))} placeholder="Address" />
        <input name="github" value={resumeData.personalInfo.github} onChange={(e) => setResumeData(prev => ({...prev, personalInfo: {...prev.personalInfo, github: e.target.value}}))} placeholder="GitHub URL or handle" />
        <input name="linkedin" value={resumeData.personalInfo.linkedin} onChange={(e) => setResumeData(prev => ({...prev, personalInfo: {...prev.personalInfo, linkedin: e.target.value}}))} placeholder="LinkedIn URL or handle" />
        <input name="portfolio" value={resumeData.personalInfo.portfolio} onChange={(e) => setResumeData(prev => ({...prev, personalInfo: {...prev.personalInfo, portfolio: e.target.value}}))} placeholder="Portfolio URL" />
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

      <h3>Languages</h3>
      <div className="form-section skills-section">
        {resumeData.languages.map((lang, index) => (
          <div key={index} className="skill-item">
            <input value={lang} onChange={(e) => handleLanguageChange(e, index)} placeholder="e.g., English (Fluent)" />
            <button type="button" onClick={() => removeLanguage(index)} className="btn-remove-skill">×</button>
          </div>
        ))}
      </div>
      <button type="button" onClick={addLanguage} className="btn-add">+ Add Language</button>

      <h3>Projects</h3>
      {resumeData.projects.map((p, index) => (
        <div key={index} className="form-section dynamic-section">
          <input name="title" value={p.title || ''} onChange={(e) => handleProjectChange(e, index)} placeholder="Project Title" />
          <input name="startDate" value={p.startDate || ''} onChange={(e) => handleProjectChange(e, index)} placeholder="Start Date (e.g., 05/2025)" />
          <input name="endDate" value={p.endDate || ''} onChange={(e) => handleProjectChange(e, index)} placeholder="End Date (e.g., 06/2025 or Present)" />
          <input name="tech" value={p.tech || p.stack || ''} onChange={(e) => handleProjectChange(e, index)} placeholder="Tech Stack (optional)" />
          <input name="link" value={p.link || ''} onChange={(e) => handleProjectChange(e, index)} placeholder="Link (GitHub or Live)" />
          <textarea name="description" value={p.description || ''} onChange={(e) => handleProjectChange(e, index)} placeholder="Key points (one per line)" className="full-width-grid" />
          <button type="button" onClick={() => removeProject(index)} className="btn-remove">Remove</button>
        </div>
      ))}
      <button type="button" onClick={addProject} className="btn-add">+ Add Project</button>

      <div className="form-actions">
        <button type="submit" className="btn-submit-resume">Save Resume</button>
        <button type="button" onClick={handleDownload} className="btn-download-resume">Download Resume</button>
      </div>
    </form>
  );
};

export default ResumeForm;