<template>
  <v-layout row>
    <v-flex xs12 sm12 >
        <v-container fluid grid-list-sm>
          <v-layout row wrap>
            <v-flex v-for="(product,i) in products" :key="i" xs10 offset-xs1 sm6 offset-sm0 md3 offset-md0>
              <router-link :to= "`/products/${product._id}`" >
              <Product :name='product.name' :img='product.images[0]' :markPrice='product.mark_price' :salePrice='product.sale_price' :saleMsg='product.sale_msg'></Product>
              </router-link>
              </v-flex>
          </v-layout>
        </v-container>
        <div class="loader">
         <v-btn fab v-if='loading' :loading="loading"  color="info">
        <v-icon dark>cached</v-icon>
        </v-btn>
         </div>
        <div id="bottom"></div>
        <div class="end" v-if='noMoreItems'>
          <h4 class="headline font-weight-light">That's it...</h4> </div>
    </v-flex>
  </v-layout>
</template>



<script>
import axios from 'axios';
import scrollMonitor from 'scrollmonitor';
import Product from './Product.vue';
export default {
  name: 'Home',
  data () {
    return {
      counter:1,
      loading: false,
      products: [],
      name: '',
      img: '',
      saleMsg: '',
      markPrice: '',
      salePrice: '',
      noMoreItems: false
    }
  },
  components: {
    Product
  },

  mounted() {
    let elem = document.getElementById('bottom');
    let watcher = scrollMonitor.create(elem);
    watcher.enterViewport(()=>{
      this.loading = true;
      axios.get(`https://assignment-appstreet.herokuapp.com/api/v1/products?page=${this.counter}`)
    .then(res => {
      if(res.data.products.length === 0){
        this.loading = false;
           watcher.destroy();
        this.noMoreItems = true;
      }else{
        this.products = this.products.concat(res.data.products)
        this.loading = false;
      }
      
      
    })
    .catch( err => console.log(err))
      this.counter = this.counter+1
    })
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

a {
  text-decoration: none;
}
.loader {
  text-align: center;
}
.end {
  text-align: center;
}
</style>
