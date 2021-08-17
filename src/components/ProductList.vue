<template>
  <div class="productList">
    <Filters @filter="handlerFilter" @search="handlerSearch"/>
    Productos mostrados: {{products.length}}
    <div v-for="product in products" :key="product.id">
       <h1>{{product.name}}</h1>
       <img v-bind:src="product.image">
       <button @click="handlerWhislist(product)"> Agregar producto a whislist </button>
    </div>
  </div>
</template>

<script>

import { computed, onMounted, ref/*, watch*/ } from "vue";
//import { useRoute } from "vue-router";
import { useWhislist } from '../hooks/whislist';
import { useProducts } from '../hooks/products';
import Filters from "@/components/Filters.vue";

export default {
  name: "ProductList",
  components:{
    Filters
  },
  setup(){
    /*
      Mejoramos la testeabilidad del componente, por contra somos más verbosos.
    */
    //const store = useStore() // para acceder al store, getters etc
   // const route = useRoute() // para acceder al router, parámetros URL etc
    const { addProductToWhislist } = useWhislist()
    const { getProducts } = useProducts()

    const products = ref([]) // Reactivo explicitamente
    const filters = ref([]) // Reactivo explicitamente
    const searchQuery = ref("") // Reactivo explicitamente
    
    const handlerFilter = (newFilters) => {
        filters.value = newFilters
    }

     const handlerSearch = (query) => {
        searchQuery.value = query
    }

/*
    // SI CAMBIA UN REF DE LO QUE USA UN COMPUTED, ESTE SE VUELVE A EJECUTAR
    const productsAvailable = computed(() => {
      return products.value.filter(
        product => product.price > 0
      )
    })
*/
    const filteredProducts = computed(() => {
      let filteredProducts = products.value;

      if(searchQuery.value.length){
        filteredProducts = filteredProducts.filter(
          product => product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
      }

      if(filters.value.length){
        filteredProducts = filteredProducts.filter(
          product => product.category.find( category => filters.value.includes(category))
        )
      }

      console.log(filteredProducts)

      return filteredProducts
      
    })


    const handlerWhislist = (product) => {
      if(confirm('¿Estás seguro?')){
        addProductToWhislist(product)
        .then(() => alert('Producto guardado'))
        .catch(() => alert('Algo ha ido mal'))
      }
    }

    onMounted(async() => { 
      try{
        const productsFetched = await getProducts()
        products.value = productsFetched.data
      } catch(error){
        console.log(error)
        products.value = null
      }
        
    })

    // Que cosas observo su cambio y que efecto lanzo cuando esto cambie
    //watch(() => route.query, getProducts)

    // Exponemos lo que queremos al template y además no todo tiene por que ser reactivo
    return {
      products: filteredProducts,
      handlerWhislist,
      handlerFilter,
      handlerSearch
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  h1 {
    color: BLACK;
  }
</style>
