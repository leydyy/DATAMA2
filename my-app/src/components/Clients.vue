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
        <h1>DRIVE WITH CONFIDENCE,<br />INSURE WITH US!</h1>
        <form @submit.prevent="handleSubmit">
          <h2>Personal Information</h2>

          <div class="form-group" v-for="field in formFields" :key="field.id">
            <label :for="field.id">{{ field.label }}</label>
            <input
              :type="field.type"
              :id="field.id"
              v-model="formData[field.model]"
              @input="validateInput(field.model)"
              required
            />
            <small v-if="errors[field.model]" class="error">{{ errors[field.model] }}</small>
          </div>

          <button type="submit" :disabled="hasErrors">Proceed</button>
        </form>

        <div v-if="submissionMessage" class="submission-message">
          {{ submissionMessage }}
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import supabase from "@/supabase";

export default {
  data() {
    return {
      formData: {
        full_name: "",
        occupation: "",
        email: "",
        phone: "",
        full_address: ""
      },
      formFields: [
        { id: "full_name", label: "Full Name", type: "text", model: "full_name" },
        { id: "occupation", label: "Occupation", type: "text", model: "occupation" },
        { id: "email", label: "Email", type: "email", model: "email" },
        { id: "phone", label: "Phone Number", type: "tel", model: "phone" },
        { id: "full_address", label: "Full Address", type: "text", model: "full_address" }
      ],
      errors: {}, // Store validation errors
      submissionMessage: "",
      router: useRouter()
    };
  },

  computed: {
    hasErrors() {
      return Object.keys(this.errors).length > 0;
    }
  },

  methods: {
    scrollToForm() {
      const formSection = document.getElementById("form-section");
      formSection.scrollIntoView({ behavior: "smooth" });
    },

    validateInput(field) {
      const value = this.formData[field];

      if (field === "full_name" || field === "occupation") {
        if (!/^[A-Za-z ]+$/.test(value)) {
          this.errors[field] = "Only letters and spaces allowed.";
        } else {
          delete this.errors[field];
        }
      } else if (field === "phone") {
        if (!/^[0-9]{11}$/.test(value)) {
          this.errors[field] = "Phone number must be exactly 11 digits.";
        } else {
          delete this.errors[field];
        }
      } else if (field === "email") {
        if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value)) {
          this.errors[field] = "Enter a valid email address.";
        } else {
          delete this.errors[field];
        }
      }
    },

    async handleSubmit() {
      if (this.hasErrors) {
        this.submissionMessage = "❌ Please correct the errors before submitting.";
        return;
      }

      console.log("🚀 Submitting Data:", this.formData);

      // Insert into motorcar_client and return the new ID
      const { data, error } = await supabase
        .from("motorcar_client")
        .insert([this.formData])
        .select("id")  // ✅ Fetch the inserted client's ID
        .single();  // ✅ Ensure only one record is returned

      if (error) {
        console.error("❌ Submission Error:", error);
        alert(`❌ Error: ${error.message}`);
        this.submissionMessage = "❌ Submission failed. Please try again.";
        return;
      }

      if (!data || !data.id) {
        console.error("❌ No ID returned from Supabase.");
        this.submissionMessage = "❌ Submission failed: No ID returned.";
        return;
      }

      const clientId = data.id;
      console.log("✅ New Client ID:", clientId);

      // Redirect to Motorcar.vue with client_id in query params
      this.$router.push({ name: "Motorcar", query: { client_id: clientId } });
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

.error {
  color: red;
  font-size: 14px;
}

button:disabled {
  background-color: gray;
  cursor: not-allowed;
}

header {
  background-image: url("https://wallpaperaccess.com/full/1125168.jpg");
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

.submission-message {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}
</style>
