<template>
  <v-layout>
    <v-flex xs12 sm10 offset-sm1 class="mt-3">
      <v-card hover ripple tile>
        <v-card-media class="img-responsive image"
          :src="img"
          height="200px"
        ></v-card-media>

        <v-card-title primary-title>
          <div>
            <h3 class=" mb-2">{{name}}</h3>
            <v-divider></v-divider>
            <p class=" my-1">Rs.{{salePrice | price}} &nbsp; <span class="markPrice">Rs.{{markPrice}}</span> <span class="saleMsg"> ({{saleMsg}})</span></p>
            </div>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>


<script>
export default {
  name: 'Product',
  props: [ 'name','salePrice','markPrice','saleMsg','img'],
  filters: {
      price(value) {
          return value.toFixed(2);
      }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

.image {
    max-height: 90%;
    max-width: 90%;
    margin: 0 auto;
}
.markPrice {
    text-decoration: line-through;
    color: grey;
}
.saleMsg {
    font-size: .75em;
    color: #2FADA1;
}
</style>
