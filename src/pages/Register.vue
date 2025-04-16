<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <q-page class="register-page flex flex-center">
    <q-inner-loading :showing="loading">
  <q-spinner color="primary" size="50px" />
</q-inner-loading>
      <q-card class="q-pa-md shadow-10 bg-white text-dark" style="width: 400px; max-width: 90vw; border-radius: 20px;">
        <q-card-section class="text-center">
          <div class="text-h5 q-mb-xs">Create Your Account</div>
          <div class="text-subtitle2 text-grey-7 q-mb-md">Sign up to get started</div>
  
          <q-form @submit.prevent="handleRegister" class="q-gutter-md">
             <q-input
              v-model="name"
              label="Username"
              type="text"
              outlined
              dense
              rounded
              required
            />
             <q-input
              v-model="email"
              label="Email"
              type="email"
              outlined
              dense
              rounded
              required
            />
             <q-input
              v-model="password"
              label="Password"
              type="password"
              outlined
              dense
              rounded
              required
            />
            <q-input
              v-model="phone"
              label="Mobile Number"
              type="tel"
              outlined
              dense
              rounded
              required
            />
  
            <q-btn
              label="Sign Up"
              type="submit"
              class="full-width q-mt-md"
              style="background: linear-gradient(to right, #11eb, #0077ff); color: white;"
              rounded
              unelevated
            />
             <q-btn flat label="Already have an account? Login" @click="$router.push('/login')" class="" />
          </q-form>
        </q-card-section>
      </q-card>
    </q-page>
  </template>
  
  
  <script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

const $q = useQuasar()
const router = useRouter()

const phone = ref('')
const name = ref('')
const email = ref('')
const password = ref('')
const loading = ref(true)

const handleRegister = async () => {
  loading.value = true
  try {
     await axios.post('https://backend-adeluxe.onrender.com/auth/register', {
      email: email.value,
      password: password.value,
      phone: phone.value,
      name: name.value,
    })

    $q.notify({
      type: 'positive',
      message: 'Registration successful!',
      position: 'top'
    })

    router.push('/login') 
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: error.response?.data?.message || 'Registration failed',
      position: 'top'
    })
  } finally {
    loading.value = false
  }
}
</script>
  
  <style scoped>
  .register-page {
    position: relative;
    min-height: 100vh;
    overflow: hidden;
  }
  
  .register-page::before {
    content: "";
    position: absolute;
    top: 0; left: 0;
    width: 100%;
    height: 100%;
    background-image: url('/images/background.jpeg'); 

    background-position: center;
    filter: blur(7px);
    z-index: -1;
    opacity: 0.95;
  }
  </style>
  
