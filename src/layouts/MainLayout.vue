<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Adelux
        
        </q-toolbar-title>

        <div style="font-size: 7px">@Moment</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          <div class="text-h6">Menu</div>
        </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Home',
    caption: 'Momentux',
    icon: 'home',
    link: '/#/welcome'
  },
  {
    title: 'Profile',
    caption: 'my-Profile',
    icon: 'person',
    link: '/#/profile'
  },
  {
    title: 'Orders',
    caption: 'Check your orders',
    icon: 'shopping_cart',
    link: '/#/order'
  },
  {
    title: 'Help',
    caption: 'Chat with us',
    icon: 'chat',
    link: '"https://wa.me/2349131249936?text=Hello%20I%20have%20a%20question%20about%20my%20order'
  },
  {
    title: 'Logout',
    caption: 'Ja n ne',
    icon: 'logout',
    link: '/#/login',
    onClick: () => {
      localStorage.removeItem('access_token')
      window.location.href = '/#/login'
    }
  },
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
