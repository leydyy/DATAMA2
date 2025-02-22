<template>
  <div>
    <header>
      <div class="header-content">
        <h1>MOTOR CAR<br>INSURANCE</h1>
        <button id="quote-button" @click="scrollToForm">REQUEST FOR A QUOTE</button>
      </div>
    </header>

    <section id="form-section">
      <div class="form-container">
        <h1>DRIVE WITH CONFIDENCE,<br>INSURE WITH US!</h1>
        <form @submit.prevent="handleSubmit">
          <h2>Personal Information</h2>
          <div class="form-group" v-for="field in personalFields" :key="field.id">
            <label :for="field.id">{{ field.label }}</label>
            <input :type="field.type" :id="field.id" v-model="personalData[field.model]" required />
          </div>

          <h2>Motor Car Information</h2>
          <div class="form-group" v-for="field in motorFields" :key="field.id">
            <label :for="field.id">{{ field.label }}</label>
            <input :type="field.type" :id="field.id" v-model="motorData[field.model]" required />
          </div>

          <button type="submit">Submit</button>
        </form>

        <div v-if="submissionMessage" class="submission-message">
          {{ submissionMessage }}
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { supabase } from './lib/supabaseClient';

export default {
  data() {
    return {
      personalData: {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        address: ''
      },
      motorData: {
        year_model: '',
        brand: '',
        model: '',
        variant: '',
        plate_num: '',
        vehicle_value: ''
      },
      personalFields: [
        { id: 'first_name', label: 'First Name', type: 'text', model: 'first_name' },
        { id: 'last_name', label: 'Last Name', type: 'text', model: 'last_name' },
        { id: 'email', label: 'Email', type: 'email', model: 'email' },
        { id: 'phone', label: 'Phone Number', type: 'tel', model: 'phone' },
        { id: 'address', label: 'Address', type: 'text', model: 'address' }
      ],
      motorFields: [
        { id: 'year_model', label: 'Year Model', type: 'text', model: 'year_model' },
        { id: 'brand', label: 'Brand', type: 'text', model: 'brand' },
        { id: 'model', label: 'Model', type: 'text', model: 'model' },
        { id: 'variant', label: 'Variant', type: 'text', model: 'variant' },
        { id: 'plate_num', label: 'Plate Number', type: 'text', model: 'plate_num' },
        { id: 'vehicle_value', label: 'Vehicle Value', type: 'text', model: 'vehicle_value' }
      ],
      submissionMessage: ''
    };
  },
  methods: {
    scrollToForm() {
      const formSection = document.getElementById('form-section');
      formSection.scrollIntoView({ behavior: 'smooth' });
    },

    async handleSubmit() {
      try {
        // Insert personal information
        const { data: personalData, error: personalError } = await supabase
          .from('motorcar_client')
          .insert([this.personalData])
          .select();

        if (personalError) throw personalError;
        if (!personalData || personalData.length === 0) throw new Error('No personal data returned.');

        const userId = personalData[0].id;

        // Insert motor car information with user_id as foreign key
        const motorDataWithUser = { ...this.motorData, user_id: userId };
        const { error: motorError } = await supabase
          .from('motorcar_motorcar_info')
          .insert([motorDataWithUser]);

        if (motorError) throw motorError;

        this.submissionMessage = 'Your information has been submitted successfully!';

        // Reset forms
        this.personalData = {
          first_name: '',
          last_name: '',
          email: '',
          phone: '',
          address: ''
        };

        this.motorData = {
          year_model: '',
          brand: '',
          model: '',
          variant: '',
          plate_num: '',
          vehicle_value: ''
        };

      } catch (error) {
        console.error('Submission error:', error);
        this.submissionMessage = `Failed to submit the form: ${error.message}`;
      }
    }
  }
};
</script>

<style scoped>
body {
  font-family: sans-serif;
  margin: 0;
  padding: 0;
}

header {
  background-image: url('https://wallpaperaccess.com/full/1125168.jpg');
  background-size: cover;
  background-position: center;
  color: white;
  padding: 20px;
  text-align: center;
}

.header-content {
  padding: 100px 0;
}

#quote-button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

#form-section {
  padding: 40px;
  background-color: #f8f9fa;
}

.form-container {
  max-width: 900px;
  margin: 0 auto;
  background-color: white;
  padding: 40px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 25px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
}

input[type="text"],
input[type="email"],
input[type="tel"] {
  width: calc(100% - 22px);
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
  color: #495057;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="tel"]:focus {
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

button[type="submit"] {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

.submission-message {
  margin-top: 10px;
  padding: 10px;
  border-radius: 5px;
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}
</style>
