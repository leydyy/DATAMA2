<template>
  <section id="form-section">
    <div class="form-container">
      <h1>DRIVE WITH CONFIDENCE,<br />INSURE WITH US!</h1>
      <form @submit.prevent="handleSubmit">
        <h2>Motor Car Information</h2>

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

        <button type="submit" :disabled="hasErrors">Submit</button>
      </form>

      <div v-if="submissionMessage" class="submission-message">
        {{ submissionMessage }}
      </div>
    </div>
  </section>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import supabase from "@/supabase";

export default {
  data() {
    return {
      clientId: null,
      formData: {
        year_model: "",
        brand: "",
        model: "",
        engine_cc: "",
        engine_num: "",
        chassis_num: "",
        plate_num: "",
        color: "",
        seating_capacity: "",
        mortgage: ""
      },
      formFields: [
        { id: "year_model", label: "Year Model", type: "text", model: "year_model" },
        { id: "brand", label: "Brand", type: "text", model: "brand" },
        { id: "model", label: "Model", type: "text", model: "model" },
        { id: "engine_cc", label: "Engine CC", type: "text", model: "engine_cc" },
        { id: "engine_num", label: "Engine Number", type: "text", model: "engine_num" },
        { id: "chassis_num", label: "Chassis Number", type: "text", model: "chassis_num" },
        { id: "plate_num", label: "Plate Number", type: "text", model: "plate_num" },
        { id: "color", label: "Vehicle Color", type: "text", model: "color" },
        { id: "seating_capacity", label: "Seating Capacity", type: "text", model: "seating_capacity" },
        { id: "mortgage", label: "Mortgage", type: "text", model: "mortgage" },
      ],
      errors: {},
      submissionMessage: ""
    };
  },

  computed: {
    hasErrors() {
      return Object.keys(this.errors).length > 0;
    }
  },

  created() {
    const route = useRoute();
    this.clientId = route.query.client_id;

    if (!this.clientId) {
      console.error("❌ Missing client_id in Motorcar.vue");
      alert("Error: Missing client_id. Please go back and try again.");
    } else {
      console.log("✅ Received client_id in Motorcar.vue:", this.clientId);
    }
  },

  setup() {
    const router = useRouter();
    return { router };
  },

  methods: {
    validateInput(field) {
      const value = this.formData[field];

      if (field === "year_model") {
        if (!/^\d{4}$/.test(value) || value < 1904 || value > 2025) {
          this.errors[field] = "Year must be between 1904 and 2025 (4 digits).";
        } else {
          delete this.errors[field];
        }
      } else if (["brand", "model", "color"].includes(field)) {
        if (!/^[A-Za-z ]+$/.test(value)) {
          this.errors[field] = "Only letters and spaces allowed.";
        } else {
          delete this.errors[field];
        }
      } else if (field === "plate_num") {
        if (!/^[A-Za-z0-9]{7}$/.test(value)) {
          this.errors[field] = "Plate number must be exactly 7 characters.";
        } else {
          delete this.errors[field];
        }
      } else if (field === "seating_capacity") {
        if (!/^\d+$/.test(value)) {
          this.errors[field] = "Only numbers allowed.";
        } else {
          delete this.errors[field];
        }
      } else if (field === "mortgage") {
        if (!/^\d{1,9}(\.\d{1,2})?$/.test(value)) {
          this.errors[field] = "Max 9 digits, up to 2 decimal places.";
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

      if (!this.clientId) {
        console.error("❌ Missing client_id. Cannot insert data.");
        this.submissionMessage = "❌ Error: Missing client ID.";
        return;
      }

      const submissionData = { ...this.formData, client_id: this.clientId };

      console.log("Submitting data:", submissionData);

      const { data, error } = await supabase
        .from("motorcar_motorcar_info")
        .insert([submissionData]);

      if (error) {
        console.error("❌ Error inserting data:", error);
        alert(`Submission Error: ${error.message}`);
        this.submissionMessage = "❌ Failed to submit the form.";
      } else {
        console.log("✅ Data inserted successfully:", data);
        this.submissionMessage = "✅ Your information has been submitted successfully!";

        // Reset form
        this.formData = {
          year_model: "",
          brand: "",
          model: "",
          engine_cc: "",
          engine_num: "",
          chassis_num: "",
          plate_num: "",
          color: "",
          seating_capacity: "",
          mortgage: ""
        };

        // Redirect to Home.vue after a short delay
        setTimeout(() => {
          this.router.push("/");
        }, 2000); // 2-second delay before redirect
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

input {
  width: calc(100% - 22px);
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
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
