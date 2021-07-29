<template>
  <div class="productList">
    <h1>{{ msg }}</h1>
    <div v-for="product in products" :key="product.id">
       {{product.name}} 
    </div>

  </div>
</template>

<script>
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "ProductList",
  setup(){
    /*
      Mejoramos la testeabilidad del componente, por contra somos más verbosos.
    */
    //const store = useStore() // para acceder al store, getters etc
    const route = useRoute() // para acceder al router, parámetros URL etc

    const products = ref([]) // Reactivo explicitamente
    
    const getProducts = async () => {
      try{
        const productsFetched = await fetch("http://localhost:3000/products");
        let res = await productsFetched.json();
        console.log(res)
        products.value = res;
        
      } catch(e){
        console.log(e)
      }
    }

    // SI CAMBIA UN REF DE LO QUE USA UN COMPUTED, ESTE SE VUELVE A EJECUTAR
    const productsAvailable = computed(() => {
      return products.value.filter(
        product => product.price > 0
      )
    })

    onMounted(() => { 
      getProducts()
    })

    // Que cosas observo su cambio y que efecto lanzo cuando esto cambie
    watch(() => route.query, getProducts)

    // Exponemos lo que queremos al template y además no todo tiene por que ser reactivo
    return {
      products: productsAvailable
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  h1 {
    color: red;
  }
</style>
