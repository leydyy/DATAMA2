import { createStore } from 'vuex';

export default createStore({
  state: {
    client: null,
    submissionMessage: ''
  },
  mutations: {
    SET_CLIENT(state, client) {
      state.client = client;
    },
    SET_SUBMISSION_MESSAGE(state, message) {
      state.submissionMessage = message;
    }
  },
  actions: {
    async saveClient({ commit }, client) {
      // Check for empty fields
      for (const key in client) {
        if (!client[key].trim()) {
          commit('SET_SUBMISSION_MESSAGE', '❌ Please fill out all fields before submitting.');
          return;
        }
      }
      
      console.log('Submitting client data:', client);
      
      const { data, error } = await supabase.from('motorcar_client').insert([client]);
      
      if (error) {
        console.error('Error inserting data:', error);
        commit('SET_SUBMISSION_MESSAGE', '❌ Failed to submit the form. Please try again.');
      } else {
        console.log('Data inserted successfully:', data);
        commit('SET_CLIENT', client);
        commit('SET_SUBMISSION_MESSAGE', '✅ Your information has been submitted successfully!');
      }
    }
  },
  getters: {
    getClient: (state) => state.client,
    getSubmissionMessage: (state) => state.submissionMessage
  }
});