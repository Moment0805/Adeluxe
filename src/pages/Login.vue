<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="login-wrapper flex flex-center q-pa-md">
    <q-card class="login-card q-pa-lg">
      <div class="text-h5 text-bold q-mb-md text-center">Welcome!</div>
 <q-inner-loading :showing="loading">
  <q-spinner color="primary" size="50px" />
</q-inner-loading>
      <q-input
        filled
        label="Email"
        v-model="email"
        type="email"
        class="q-mb-md"
      />
       <q-input
    v-model="password"
    :type="isPwd ? 'password' : 'text'"
    label="Password"
    outlined
    dense
    rounded
    required
    :append-icon="isPwd ? 'visibility_off' : 'visibility'"
    @click:append="isPwd = !isPwd"
    class="q-mb-md"
  />

      <q-btn
        class="q-mt-md full-width"
        label="Login"
        :disable="!email || !password"
        color="primary"
        unelevated
        @click= handleLogin
        style="background: linear-gradient(90deg, #ff8a00, #e52e71); color: white;"
      />
       <q-btn flat label="Don't have an account yet? Sign up" @click="$router.push('/register')"/>
    </q-card>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const router = useRouter()
const email = ref('')
const password = ref('')
const isPwd = ref(true)
const $q = useQuasar()
const loading = ref(false) // loading state

const handleLogin = async () => {
  loading.value = true
  try {
    const response = 
    await axios.post('https://backend-adeluxe.onrender.com/auth/login', {
      email: email.value,
      password: password.value
    })
    console.log('Login clicked with', email.value, password.value)
  localStorage.setItem('access_token', response.data.access_token)
    console.log('Token saved:', response.data.access_token)
    console.log('Registration successful:', response.data
    )
    router.push('/welcome')
    } catch (error) {
    console.error('Login error:', error)
    if (error.response && error.response.status === 401) {
      $q.notify({
      type: 'negative',
      message: error.response?.data?.message || 'Incorrect credentials, please try again.',
      position: 'top'
      })
    } else {
      $q.notify({
        type: 'negative',
        message: 'An error occurred. Please try again later.',
        position: 'top'
      })
    }
    }
     finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-wrapper {
  min-height: 100vh;
   background: linear-gradient(90deg, #39342d, #0a1531); 
}

.login-card {
  width: 100%;
  max-width: 400px;
  background-color: rgba(243, 240, 240, 0.6);
  border-radius: 12px;
  backdrop-filter: blur(10px);
}
</style>
