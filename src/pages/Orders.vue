<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="q-pa-lg row q-col-gutter-xl">
    <div class="col-12">
      <q-inner-loading :showing="loading">
        <q-spinner color="primary" size="50px" />
      </q-inner-loading>

      <div class="text-h5 q-mb-md">Your Orders</div>

      <q-table
        flat
        :rows="cart"
        :columns="columns"
        row-key="name"
        hide-pagination
      >
        <template v-slot:body-cell-product="props">
          <div class="row items-center q-gutter-sm">
            <q-img :src="props.row.image" contain style="width: 60px; height: 60px;" />
            <div>
              <div class="text-bold">{{ props.row.name }}</div>
              <div class="text-grey-7 text-caption">{{ props.row.platform }}</div>
            </div>
          </div>
        </template>
      </q-table>

      <template v-if="!cart.length">
        <div class="text-center q-my-lg text-grey-6">
          You have no past orders.
        </div>
      </template>

      <div class="q-mt-lg">
        <q-btn flat label="← Back to Home" @click="$router.push('/welcome')" />
      </div>
    </div>
  </div>
</template>

  
 <script setup>
import { ref, onMounted } from 'vue'
import { api } from 'boot/axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const cart = ref([])
const loading = ref(true)

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

const columns = [
  { name: 'product', label: 'Product Details', field: 'name' },
  { name: 'quantity', label: 'Quantity', field: 'quantity' },
  { name: 'price', label: 'Price', field: row => `£${row.price}`, sortable: true },
  { name: 'total', label: 'Total', field: row => `£${(row.price * row.quantity).toFixed(2)}` }
]

onMounted(fetchOrders)
</script>

  