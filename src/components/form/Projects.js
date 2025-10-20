import React from 'react';
import './Projects.css';

const Projects = ({ projects, setProjects }) => {
  const handleAddProject = () => {
    setProjects([...projects, { name: '', description: '', link: '' }]);
  };

  const handleRemoveProject = (index) => {
    const newProjects = [...projects];
    newProjects.splice(index, 1);
    setProjects(newProjects);
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newProjects = [...projects];
    newProjects[index][name] = value;
    setProjects(newProjects);
  };

  return (
    <div className="projects-container">
      <h3>Projects</h3>
      {projects.map((project, index) => (
        <div key={index} className="project-entry">
          <input
            type="text"
            name="name"
            placeholder="Project Name"
            value={project.name}
            onChange={(e) => handleChange(e, index)}
          />
          <textarea
            name="description"
            placeholder="Project Description"
            value={project.description}
            onChange={(e) => handleChange(e, index)}
          />
          <input
            type="text"
            name="link"
            placeholder="Project Link (e.g., GitHub, Live Demo)"
            value={project.link}
            onChange={(e) => handleChange(e, index)}
          />
          <button type="button" onClick={() => handleRemoveProject(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddProject}>
        Add Project
      </button>
    </div>
  );
};

export default Projects;
