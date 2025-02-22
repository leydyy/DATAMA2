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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from './lib/supabaseClient';

const formData = ref({
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  address: '',
});

const formFields = ref([
  { id: 'first_name', label: 'First Name', type: 'text', model: 'first_name' },
  { id: 'last_name', label: 'Last Name', type: 'text', model: 'last_name' },
  { id: 'email', label: 'Email', type: 'email', model: 'email' },
  { id: 'phone', label: 'Phone Number', type: 'tel', model: 'phone' },
  { id: 'address', label: 'Address', type: 'text', model: 'address' },
]);

const submissionMessage = ref(null); // Added submission message ref

function scrollToForm() {
  const formSection = document.getElementById('form-section');
  formSection.scrollIntoView({ behavior: 'smooth' });
}

async function handleSubmit() {
  console.log('Form submitted:', formData.value);

  const { data: { session }, error: sessionError } = await supabase.auth.getSession();

  if (sessionError) {
    console.error('Error getting session:', sessionError);
    return;
  }

  if (!session) {
    console.error('User not logged in.');
    return;
  }

  const { error } = await supabase
    .from('motor_insurance_quotes')
    .insert([{
      ...formData.value,
      user_id: session.user.id,
    }]);

  if (error) {
    console.error('Error inserting data:', error);
    submissionMessage.value = 'An error occurred. Please try again.'; // Error message
  } else {
    console.log('Data inserted successfully.');
    formData.value = {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      address: '',
    };
    submissionMessage.value = 'Your information has been submitted successfully!'; // Success message
    setTimeout(() => {
        submissionMessage.value = null; // clear the submissionMessage
    }, 3000);
  }
}

const instruments = ref([]);

async function getInstruments() {
  const { data, error } = await supabase.from('instruments').select();
  if (error) {
    console.error("Error fetching instruments:", error);
    return;
  }
  instruments.value = data;
}

onMounted(() => {
  getInstruments();
});

</script>

<style scoped>
/* ... (your existing styles) ... */
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