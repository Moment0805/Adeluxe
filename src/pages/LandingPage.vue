<template>
    <div class="landing-page">
      <!-- Hero Section -->
      <q-page class="q-pa-md flex flex-center relative-position">
        <!-- Background image -->
        <q-img
          src="/src/assets/shoe.jpg"
          style="height: 70vh; width: 100%; background-position: center;
          filter: blur(7px);
          z-index: -1;
          opacity: 0.95;"
        />
        
        <!-- Text on the background -->
        <div class="landing-hero-text absolute-center text-white">
          <div class="text-h3 text-bold text-center q-mb-sm">Welcome to Adelux</div>
          <div class="text-subtitle1 text-center q-mb-md">
            Discover premium men’s fashion, lifestyle essentials, and timeless style curated just for you.
          </div>
          
          <!-- Centered Get Started Button -->
          <div class="q-mt-xl flex justify-center">
            <q-btn
              label="Get Started"
              color="primary"
              size="md"
              unelevated
              @click="$router.push('/register')"
              class="full-width"
            />
          </div>
        </div>
      </q-page>
    
      <!-- Features/Benefits Section -->
      <div class="q-pa-xl bg-white">
        <div class="row q-col-gutter-md q-pb-lg justify-center">
          <div class="col-xs-12 col-sm-6 col-md-4">
            <q-card class="q-pa-md text-center">
              <q-icon name="checkroom" size="48px" color="primary" />
              <div class="text-subtitle1 text-bold q-mt-sm">Stylish Apparel</div>
              <div class="text-caption">Carefully selected pieces that elevate your wardrobe effortlessly.</div>
            </q-card>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-4">
            <q-card class="q-pa-md text-center">
              <q-icon name="spa" size="48px" color="primary" />
              <div class="text-subtitle1 text-bold q-mt-sm">Grooming Essentials</div>
              <div class="text-caption">High-quality products to keep you fresh, clean, and confident.</div>
            </q-card>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-4">
            <q-card class="q-pa-md text-center">
              <q-icon name="local_shipping" size="48px" color="primary" />
              <div class="text-subtitle1 text-bold q-mt-sm">Fast Delivery</div>
              <div class="text-caption">Get your order fast and reliably, right at your doorstep.</div>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // nothing here for now
  </script>
  
  <style scoped>
  .landing-page {
    min-height: 100vh;
     background: linear-gradient(90deg, #39342d, #0a1531); 
  }
  
  .landing-hero-text {
    position: absolute;
    top: 30%; /* Move the text closer to the top */
    left: 50%;
    transform: translate(-50%, 0); /* Keep text centered horizontally and slightly move it up vertically */
    text-align: center;
  }
  
  .landing-hero-card {
    max-width: 600px;
    width: 100%;
    background-color: white;
    color: #1e293b;
    border-radius: 16px;
  }
  </style>
  
