<template>
  <div class="ShoppingCart">
    <span v-if="products.length == 0">No hay productos</span>
    <span v-else>Productos en el carrito: {{ products.length }}</span>
    <div v-for="product in products" :key="product.id">
      {{ product.name }}
      <img v-bind:src="product.image" />
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore /* mapGetters */ } from "vuex";

export default {
  name: "ShoppingCart",
  setup() {
    const store = useStore();
    return {
      // access a state in computed function
      products: computed(() => {
        return store.getters["getCart"];
      }),
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1 {
  color: green;
}
img {
  width: -webkit-fill-available;
}
.ShoppingCart {
  width: 30vw;
  padding-top: 2em;
}
</style>
