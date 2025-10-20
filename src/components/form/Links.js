import React from 'react';
import './Links.css';

const Links = ({ links, setLinks }) => {
  const handleAddLink = () => {
    setLinks([...links, { label: '', url: '' }]);
  };

  const handleRemoveLink = (index) => {
    const newLinks = [...links];
    newLinks.splice(index, 1);
    setLinks(newLinks);
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newLinks = [...links];
    newLinks[index][name] = value;
    setLinks(newLinks);
  };

  return (
    <div className="links-container">
      <h3>Links</h3>
      {links.map((link, index) => (
        <div key={index} className="link-entry">
          <input
            type="text"
            name="label"
            placeholder="Label (e.g., Portfolio, LinkedIn)"
            value={link.label}
            onChange={(e) => handleChange(e, index)}
          />
          <input
            type="text"
            name="url"
            placeholder="URL"
            value={link.url}
            onChange={(e) => handleChange(e, index)}
          />
          <button type="button" onClick={() => handleRemoveLink(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddLink}>
        Add Link
      </button>
    </div>
  );
};

export default Links;
