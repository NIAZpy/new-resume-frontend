import React from 'react';
import './PersonalInfo.css';

const PersonalInfo = ({ personalInfo, setPersonalInfo }) => {
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPersonalInfo({ ...personalInfo, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="personal-info-container">
      <h3>Personal Information</h3>
      <form>
        <div className="photo-upload-container">
          {personalInfo.photo && <img src={personalInfo.photo} alt="Profile" className="profile-photo-preview" />}
          <label htmlFor="photo-upload" className="photo-upload-label">Upload Photo</label>
          <input id="photo-upload" type="file" accept="image/*" onChange={handlePhotoChange} />
        </div>
        <input
          type="text"
          placeholder="Full Name"
          value={personalInfo.fullName}
          onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={personalInfo.email}
          onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={personalInfo.phone}
          onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
        />
      </form>
    </div>
  );
};

export default PersonalInfo;
