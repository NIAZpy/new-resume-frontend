import React, { useState, useRef } from 'react';
import html2pdf from 'html2pdf.js';
import useResumeStore from '../stores/resumeStore';
import ClassicTemplate from './ClassicTemplate';
import ModernTemplate from './ModernTemplate';
import ImageModal from './ImageModal';
import './ResumeDisplay.css';

const ResumeDisplay = () => {
  const { resume, error, isLoading } = useResumeStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const resumeRef = useRef(null);

  const handlePhotoClick = () => {
    if (resume.profilePhoto) {
      setIsModalOpen(true);
    }
  };

  const handleDownload = () => {
    console.log("Initiating PDF download process");
    const element = resumeRef.current;
    if (!element) {
      console.error("Resume element not found.");
      alert("Error: Resume content not found. Please try again.");
      return;
    }

    console.log("Generating PDF...");

    const opt = {
      margin: 0,
      filename: `${resume.personalInfo.name || 'resume'} - Resume.pdf`,
      image: { type: 'png', quality: 1 },
      html2canvas: {
        scale: 3,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        scrollX: 0,
        scrollY: 0,
        onclone: (clonedDoc) => {
          const link = clonedDoc.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap';
          clonedDoc.head.appendChild(link);

          clonedDoc.documentElement.style.margin = '0';
          clonedDoc.body.style.margin = '0';
          clonedDoc.body.style.background = '#ffffff';

          const resumeElement = clonedDoc.querySelector('.modern-template') || clonedDoc.querySelector('.classic-template');
          if (resumeElement) {
            resumeElement.classList.add('pdf-export-view');
            resumeElement.style.boxShadow = 'none';
            resumeElement.style.border = 'none';
            resumeElement.style.margin = '0';
            resumeElement.style.width = '210mm';
            resumeElement.style.minHeight = '297mm';

            const mainContent = clonedDoc.querySelector('.modern-main-content') || resumeElement;
            try {
              const resumeTop = resumeElement.getBoundingClientRect().top;
              const pageHeightPx = Math.round(resumeElement.offsetWidth * (297 / 210));
              const candidates = mainContent.querySelectorAll('.main-header, .modern-section, .work-experience-item, .resume-section, .job, .education-item, h2, h3, p, ul');
              for (let i = 0; i < candidates.length; i++) {
                const el = candidates[i];
                const top = el.getBoundingClientRect().top - resumeTop;
                if (top > pageHeightPx - 10) {
                  const spacer = clonedDoc.createElement('div');
                  spacer.className = 'pdf-page-break-spacer';
                  spacer.style.pageBreakBefore = 'always';
                  spacer.style.breakBefore = 'page';
                  spacer.style.height = '12mm';
                  spacer.style.width = '100%';
                  spacer.style.display = 'block';
                  mainContent.insertBefore(spacer, el);
                  break;
                }
              }
            } catch (e) {
              // noop if measurement fails
            }
          }
        }
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['css'], before: '.pdf-page-break-spacer' }
    };

    html2pdf().from(element).set(opt).save()
      .then(() => {
        console.log('PDF generated and saved successfully.');
      })
      .catch((err) => {
        console.error('PDF generation failed:', err);
        alert('Failed to generate PDF. Please check the console for more details.');
      });
  };

  if (isLoading) {
    return <div className="resume-container"><p>Loading...</p></div>;
  }
  if (error) {
    return <div className="resume-container"><p className="error-message">{error}</p></div>;
  }
  if (!resume) {
    return <div className="resume-container"><p>No resume data found.</p></div>;
  }

  return (
    <div>
      <div className="download-btn-container">
        <button onClick={handleDownload} className="btn-download">Download as PDF</button>
      </div>
      
      <div className="resume-container">
        {resume.template === 'classic' ? (
          <ClassicTemplate ref={resumeRef} resume={resume} onPhotoClick={handlePhotoClick} />
        ) : (
          <ModernTemplate ref={resumeRef} resume={resume} onPhotoClick={handlePhotoClick} />
        )}
      </div>

      {isModalOpen && <ImageModal src={resume.profilePhoto} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default ResumeDisplay;