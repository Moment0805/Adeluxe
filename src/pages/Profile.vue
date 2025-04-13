<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <q-page class="q-pa-md">
    <q-card>
      <q-card-section>
        <div class="text-h6">My Profile</div>
        <div v-if="user">
          <p>Email: {{ user.email }}</p>
          <p>Phone number: {{ user.phone}}</p>
          <p>Created at: {{ user.createdAt }}</p>
        </div>
        <q-btn label="Refresh" @click="getUser" color="primary"/>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from 'boot/axios'

const user = ref(null)

const getUser = async () => { 
  try {
    const res = await api.get('/users/me') 
    user.value = res.data
  } catch (err) {
    console.error('Failed to fetch profile:', err)
  }
}

onMounted(getUser)
</script>
