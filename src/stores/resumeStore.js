import { create } from 'zustand';

const useResumeStore = create((set, get) => ({
  resume: null,
  error: null,
  isLoading: true,

  fetchMyResume: async () => {
    set({ isLoading: true, error: null });
    try {
      const token = localStorage.getItem('token');
      if (!token) return; // Not logged in

      const idResponse = await fetch('http://localhost:3001/api/my-resume-id', {
        headers: { 'x-auth-token': token },
      });

      if (!idResponse.ok) {
        set({ isLoading: false, resume: null }); // User may not have a resume yet
        return;
      }

      const { resumeId } = await idResponse.json();
      get().fetchResume(resumeId); // Call the other action to fetch the data

    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchResume: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication token not found.');

      // This is a placeholder for the actual API call
      const response = await fetch(`http://localhost:3001/api/resume/${id}`, {
        headers: { 'x-auth-token': token },
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.msg || 'Failed to fetch resume.');
      }

      const resumeData = await response.json();
      set({ resume: resumeData, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  updateTemplate: async (templateId) => {
    const { resume } = get();
    if (!resume) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3001/api/resume/template', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify({ template: templateId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || 'Failed to update template.');
      }

      // Update local state immediately for a seamless experience
      set(state => ({ resume: { ...state.resume, template: templateId } }));
      alert('Template updated successfully!');
    } catch (error) {
      console.error('Error updating template:', error);
      alert(`Error: ${error.message}`);
    }
  },
}));

export default useResumeStore;
