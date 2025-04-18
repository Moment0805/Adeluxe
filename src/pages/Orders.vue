<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="q-pa-lg row q-col-gutter-xl">
      <!-- Shopping Cart -->
      <div class="col-12 col-md-8">
        <q-inner-loading :showing="loading">
  <q-spinner color="primary" size="50px" />
</q-inner-loading>
        <div class="text-h5 q-mb-md">Shopping Cart</div>
        
        <q-table
          flat
          :rows="cart"
          :columns="columns"
          row-key="name"
          hide-pagination
        >
          <template 
          v-slot:body-cell-product="props">
            <div class="row items-center q-gutter-sm">
              <q-img :src="props.row.image" contain style="width: 60px; height: 60px;" />
              <div>
                <div class="text-bold">{{ props.row.name }}</div>
                <div class="text-grey-7 text-caption">{{ props.row.platform }}</div>
                <q-btn flat color="red" label="Remove" @click="removeItem(props.row)" />
              </div>
            </div>
          </template>
        </q-table>
        <template v-if="!cart.length">
  <div class="text-center q-my-lg text-grey-6">
    Your cart is empty.
  </div>
</template>


  
        <div class="q-mt-lg">
          <q-btn flat label="← Continue Shopping" @click="$router.push('/welcome')" />
        </div>
      </div>
  
      <!-- Order Summary -->
      <div class="col-12 col-md-4">
        <div class="q-pa-md bg-grey-2 rounded-borders">
          <div class="text-h6 q-mb-md">Buy again, redeem Orders to get 30% discount</div>
  
          <div class="q-mb-sm row justify-between">
            <span>Items</span>
            <span>£{{ itemTotal.toFixed(2) }}</span>
          </div>
  
          <div class="q-mb-md">
            <q-select
              v-model="shipping"
              :options="shippingOptions"
              label="Shipping"
              dense
              outlined
            />
          </div>
  
          <div class="q-mb-sm">Promo Code</div>
          <q-input v-model="promoCode" dense outlined placeholder="Enter your code" />
          <q-btn color="pink" label="Apply" class="q-mt-sm full-width" />
  
          <q-separator class="q-my-md" />
  
          <div class="row justify-between text-bold text-h6">
            <span>Total Cost</span>
            <span>£{{ totalCost.toFixed(2) }}</span>
          </div>
  
          <q-btn
  :disable="cart.length === 0"
  color="primary"
  label="Checkout"
  @click="handleCheckout"
  class="q-mt-lg full-width"
/>

        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue'
  import { api } from 'boot/axios'
  import { useRouter } from 'vue-router'
  import { useQuasar } from 'quasar'

const router = useRouter()
const $q = useQuasar()
  
  const cart = ref([])
  const promoCode = ref('')
  const shipping = ref({ label: 'Standard Delivery - £5.00', value: 5.0 })
  const shippingOptions = [
    { label: 'Standard Delivery - £5.00', value: 5.0 },
    { label: 'Express Delivery - £10.00', value: 10.0 }
  ]
  
  const loading = ref(true) // loading state

const fetchOrders = async () => {
  loading.value = true
  try {
    const res = await api.get('/orders/me')
    if (Array.isArray(res.data)) {
      const allItems = res.data.flatMap(order => order.items)
      cart.value = allItems
    } else {
      console.warn("Unexpected response format:", res.data)
      cart.value = []
    }
  } catch (err) {
    console.error('Error fetching orders:', err)
    cart.value = []
  } finally {
    loading.value = false
  }
}


const removeItem = (item) => {
  const index = cart.value.findIndex(i => i.name === item.name && i.platform === item.platform)
  if (index !== -1) {
    cart.value.splice(index, 1)
  }
}
  
  const itemTotal = computed(() =>
    cart.value.reduce((acc, item) => acc + item.price * item.quantity, 0)
  )
  
  const totalCost = computed(() => itemTotal.value + (shipping.value?.value || 0))

  const columns = [
    { name: 'product', label: 'Product Details', field: 'name' },
    { name: 'quantity', label: 'Quantity', field: 'quantity' },
    { name: 'price', label: 'Price', field: row => `£${row.price}`, sortable: true },
    { name: 'total', label: 'Total', field: row => `£${(row.price * row.quantity).toFixed(2)}` }
  ]

const handleCheckout = async () => {
  try {
    const res = await api.post('/orders', payload)
    console.log('Order sent successfully:', res.data)
  } 
  $q.notify({
    type: 'positive',
    message: 'Checkout complete! Thank you for your purchase.',
    position: 'top'
  })

  router.push('/welcome') // redirect to welcome page
}

  
  onMounted(fetchOrders)
  </script>
  