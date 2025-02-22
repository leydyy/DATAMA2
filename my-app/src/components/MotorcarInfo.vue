<template>
    <section id="form-section">
        <div class="form-container">
          <form>
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
        variant: '',
        plate_num: '',
        vehicle_value: ''
      },
      formFields: [
        { id: 'year_model', label: 'Year Model', type: 'text', model: 'year_model' },
        { id: 'brand', label: 'Brand', type: 'text', model: 'brand' },
        { id: 'model', label: 'Model', type: 'text', model: 'model' },
        { id: 'variant', label: 'Variant', type: 'text', model: 'variant' },
        { id: 'plate_num', label: 'Plate Number', type: 'text', model: 'plate_num' },
        { id: 'vehicle_value', label: 'Vehicle Value', type: 'text', model: 'vehicle_value' }
      ]
    };
  },
    async handleSubmit() {
  console.log('Form submitted:', this.formData);

  const { data, error } = await supabase
    .from('motorcar_client')
    .insert([this.formData]);

  if (error) {
    console.error('Error inserting data:', error);
    alert('Failed to submit the form. Please try again.');
  } else {
    console.log('Data inserted successfully:', data);
    alert('Your information has been submitted successfully!');
    // Reset form
    this.formData = {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      address: ''
    };
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