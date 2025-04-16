<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <q-page class="q-pa-none">
      <!-- Hero Section -->
      <div 
        class="relative-position q-mb-md"
        style="height: 400px; overflow: hidden;"
      >
        <q-img
          src="/src/assets/background.jpeg"
          style="height: 100%; width: 100%; object-fit: cover; background-position: center;
    filter: blur(7px);
    z-index: -1;
    opacity: 0.95;"
        />
        <div class="absolute-top-left text-white" style="padding: 2rem;">
  <div class="text-h1 q-mb-md" style="font-weight: 400">Adelux</div>
  <div class="text-subtitle1 q-mb-md" style="max-width: 600px;">
    Discover the essence of modern masculinity. From timeless fashion to essential grooming, <strong>Adelux</strong> curates the finest for today’s man.
  </div>
  <q-btn
    flat
    label="Explore the Collection"
    class="text-white text-subtitle2 q-my-xl"
    icon="arrow_downward"
  />
</div>
</div>
<!-- Header -->
<div class="row items-center justify-between q-pa-md">
  <div>
    <div class="text-h4">Shop with Us</div>
    <div class="text-subtitle2 text-grey-6">
      Quality meets style — browse our curated selection of men’s essentials.
    </div>
  </div>
  <div class="q-gutter-md">
    <!-- You can add filters, sort dropdowns, or buttons here later -->
  </div>
</div>


      <div v-if="cart.length" class="q-pa-md bg-grey-2 rounded-borders fixed-bottom right-0 q-mb-md z-index-10" style="width: 400px; bottom: 20px; right: 20px; z-index: 999;">
  <div class="text-subtitle1 q-mb-sm">Cart Summary:</div>
  <ul class="q-pl-md">
    <li v-for="(item, index) in cart" :key="index" class="q-gutter-md">
      <div class="row items-center justify-between">
        <div>
          {{ item.name }} — {{ item.quantity }} x ${{ item.price }} = ${{ item.quantity * item.price }}
        </div>
        <div class="row items-center">
          <!-- Decrease Quantity Button -->
          <q-btn 
            flat 
            icon="remove" 
            @click="decrease(index)" 
            color="negative"
            size="sm"
            class="q-mr-xs"
          />
          <!-- Increase Quantity Button (Optional) -->
          <q-btn 
            flat 
            icon="add" 
            @click="increase(index)" 
            color="primary"
            size="sm"
          />
        </div>
      </div>
    </li>
  </ul>
  <div class="text-weight-bold q-mt-sm">
    Total: ${{ cart.reduce((acc, item) => acc + (item.price * item.quantity), 0) }}
  </div>

  <!-- Buttons for clearing cart and placing order -->
  <div class=" q-gutter-md row justify-between">
    <q-btn 
      v-if="cart.length > 0" 
      flat 
      label="Clear Cart" 
      icon="delete" 
      @click="cart = []" 
      color="red"
      class="q-mt-md"
    />
    <q-btn 
      v-if="cart.length > 0" 
      flat 
      label="Order" 
      icon="shop" 
      @click="sendOrder" 
      color="secondary"
      class="q-mt-md"
    />
  </div>
</div>


<!-- Product Grid -->
<div class="row q-pa-md q-col-gutter-md q-row-gutter-lg" style="z-index: 1;">
  <div
    v-for="(item, index) in products"
    :key="index"
    class="col-xs-12 col-sm-6 col-md-3 col-lg-3"
  >
    <q-card class="q-pa-md">
      <q-img
        :src="item.image"
        ratio="1"
        class="rounded"
      />
      <q-card-section>
        <div class="text-subtitle1">{{ item.name }}</div>
        <div class="text-bold text-primary">${{ item.price }}</div>
      </q-card-section>
      <q-card-actions>
        <q-btn @click="decreaseQty(index)" flat round icon="remove" />
        <div class="q-px-sm">{{ item.quantity }}</div>
        <q-btn @click="increaseQty(index)" flat round icon="add" />
      </q-card-actions>
      <q-card-actions class="justify-end q-mx-sm">
        <q-btn @click="addToCart(item)" color="secondary" unelevated
          label="Add to cart" icon="shopping_cart" />
      </q-card-actions>
    </q-card>
  </div>
</div>
    </q-page>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { api } from 'src/boot/axios'
  import { useQuasar } from 'quasar'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const $q = useQuasar()
  const products = ref([
    {
      name: 'FASHINTY Men Classical France Style Warm Wool Coat',
      price: 300,
      quantity: 1,
      image: "/src/assets/Coat.jpg"
    },
    {
      name: 'Nike Logo Black White Unisex Hoodie For Men',
      price: 70,
      quantity: 1,
      image: '/src/assets/Nike Black.jpg'
    },
    {
      name: "Men's Hollowed-out Waterproof Luminous Square Watch",
      price: 50,
      quantity: 1,
      image: "/src/assets/Watch.jpg"
    },
    {
      name: 'Men Letter Graphic Long Sleeve Casual Color Block Sweatshirt Without Necklace',
      price: 60,
      quantity: 1,
      image: '/src/assets/Men Letter Graphic.jpg'
    },
    {
      name: 'kkboxly  Stylish Collage Chest Pocket Plaid Pattern Casual Long Sleeve Button Up Shirt',
      price: 80,
      quantity: 1,
      image: '/src/assets/kkboxly Shirt.jpg'
    },
    {
      name: 'VLOVELAW  Spring and Autumn Sweater Hoodie Zipper Multi-Pocket Pullover',
      price: 60,
      quantity: 1,
      image: '/src/assets/VLOVELAW Spring.jpg'
    },
    {
      name: 'Man Split Leather Shoe',
      price: 50,
      quantity: 1,
      image: '/src/assets/Man Split Leather.jpg'
    },
    {
      name: 'AIR MAX DN PLUS(SUPREME) A VISTA',
      price: 40,
      quantity: 1,
      image: '/src/assets/AIR MAX.jpg'
    },
    {
      name: 'Sapato Social Masculino Lustro Blackstone @10',
      price: 100,
      quantity: 1,
      image: '/src/assets/Sapato Social.jpg'
    },
    {
      name: 'Sapato Social Masculino Lustro Blackstone',
      price: 70,
      quantity: 1,
      image: '/src/assets/Sapato Social.jpg'
    },
    {
      name: 'Winter Boot Buckle Metrosexual Shoes Korean Style',
      price: 80,
      quantity: 1,
      image: '/src/assets/Winter.jpg'
    },
    {
      name: 'Blue Black Custom Air Force 1',
      price: 100,
      quantity: 1,
      image: '/src/assets/Blue Black Custom Air Force 1.jpg'
    }
  ])

  const decrease = (index) => {
  if (cart.value[index].quantity > 1) {
    cart.value[index].quantity -= 1
  } else {
    cart.value.splice(index, 1);
  }
}

const increase= (index) => {
  cart.value[index].quantity += 1;
}

  
  const increaseQty = (index) => {
    products.value[index].quantity += 1
  }
  
  const decreaseQty = (index) => {
    if (products.value[index].quantity > 1) {
      products.value[index].quantity -= 1
    }
  }

  const cart = ref([])

const addToCart = (item) => {
  const existing = cart.value.find(i => i.name === item.name)
  if (existing) {
    existing.quantity += item.quantity
  } else {
    cart.value.push({ ...item })
  }
  $q.notify({
      type: 'info',
      message: 'Item Added to Cart',
      position: 'left'
    })
}
const sendOrder = async () => {
  try {
    const total = cart.value.reduce((acc, item) => acc + (item.price * item.quantity), 0)

    const payload = {
      items: cart.value,
      total
    }

    const res = await api.post('/orders', payload)
    console.log('Order sent successfully:', res.data)
  } catch (err) {
    console.error('Failed to send order:', err)
  }
  $q.notify({
      type: 'positive',
      message: 'Order Sent, Checkout Now to get up to 30% Discount',
      position: 'top'
    })
    router.push('/order')
}

  </script>
  
  <style scoped>
  .text-white {
    color: rgb(240, 231, 231);
  }
  </style>
  