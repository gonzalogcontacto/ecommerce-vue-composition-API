<template>
  <div class="home">
    <ProductList msg="Listado de productos!" />
    <ShoppingCart />
  </div>
</template>

<script>
// @ is an alias to /src
import ProductList from "@/components/ProductList.vue";
import ShoppingCart from "@/components/ShoppingCart.vue";

export default {
  name: "Home",
  components: {
    ProductList,
    ShoppingCart,
  },
};
</script>

<style scoped>
.home {
  display: flex;
}
</style>
