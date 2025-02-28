<template>
    <section id="form-section">
        <div class="form-container">
          <h1>DRIVE WITH CONFIDENCE,<br>INSURE WITH US!</h1>
          <form @submit.prevent="handleSubmit">
            <h2>Motor Car Information</h2>
            <div class="form-group" v-for="field in formFields" :key="field.id">
              <label :for="field.id">{{ field.label }}</label>
              <input :type="field.type" :id="field.id" v-model="formData[field.model]" required />
            </div>
            <button type="submit">Submit</button>
          </form>
          <div v-if="submissionMessage" class="submission-message">
            {{ submissionMessage }}
          </div>
        </div>
      </section>
</template>

<script>
import { supabase } from '../lib/supabaseClient';

export default {
  data() {
    return {
      formData: {
        year_model: '',
        brand: '',
        model: '',
        engine_cc: '',
        plate_num: '',
        color: '',
        seating_capacity: '',
        mortgage: ''
      },
      formFields: [
        { id: 'year_model', label: 'Year Model', type: 'text', model: 'year_model' },
        { id: 'brand', label: 'Brand', type: 'text', model: 'brand' },
        { id: 'model', label: 'Model', type: 'text', model: 'model' },
        { id: 'engine_cc', label: 'Engine CC', type: 'text', model: 'engine_cc' },
        { id: 'engine_num', label: 'Engine Number', type: 'text', model: 'engine_num' },
        { id: 'chassis_num', label: 'Chassis Number', type: 'text', model: 'chassis_num' },
        { id: 'color', label: 'Vehicle Color', type: 'text', model: 'color' },
        { id: 'seating_capacity', label: 'Seating Capacity', type: 'text', model: 'seating_capacity' },
        { id: 'mortgage', label: 'Mortgage', type: 'text', model: 'mortgage' }
      ],
      submissionMessage: '' // ✅ Ensure this is defined
    };
  },

  
  methods: {
    async handleSubmit() {
        // Check for empty fields
        for (const key in this.formData) {
            if (!this.formData[key].trim()) {
                this.submissionMessage = '❌ Please fill out all fields before submitting.';
                return;
            }
        }

        console.log('Form submitted:', this.formData);

        const { data, error } = await supabase
            .from('motorcar_motorcar_info')
            .insert([this.formData]);

        console.log('Supabase data:', data);
        console.log('Supabase error:', error);

        if (error) {
            this.submissionMessage = '❌ Failed to submit the form. Please try again.';
        } else {
            this.submissionMessage = '✅ Your information has been submitted successfully!';
            // Reset form
            this.formData = {
                year_model: '',
                brand: '',
                model: '',
                engine_cc: '',
                plate_num: '',
                color: '',
                seating_capacity: '',
                mortgage: ''
            };
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
}
.submission-message{
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
}
</style>