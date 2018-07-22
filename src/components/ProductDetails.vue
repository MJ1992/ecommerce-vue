<template>
    <div v-if='loading' class="loader"> 
    <v-btn fab v-if='loading' :loading="loading"  color="info" >
        <v-icon dark>cached</v-icon>
    </v-btn>
   </div> 
  <v-card v-else raised tile>       
  <v-layout  row wrap class="mt-5" >
    <v-flex xs12 sm12 md6  class="text-xs-center slider" flat  >
        <v-card  raised width='400px' class="imageCard elevation-8 mt-2 mb-2" >
             <carousel :per-page="1">
                <slide v-for="(image,i) in selectedProduct.images" :key='i' class="slider">
                <img class="img-responsive  image"
                  :src="image"  alt=""/>
                </slide>
            </carousel>
        
       </v-card>
      
    </v-flex>
    <v-flex xs12 sm12 md5 >
        <div class="details">
    	<h3 class="product-title">{{selectedProduct.name}}</h3>
        
		<p class="product-description">{{productDesc}}</p>
        <v-divider></v-divider>
		<div class="price"><span class="salePrice">Rs. {{selectedProduct.sale_price|price}} &nbsp;</span> 
        <span class="mktPrice">Rs.{{selectedProduct.mark_price |price}}</span>
        <br>
        <span class="saving">You save Rs.{{this.save |price }} ({{selectedProduct.sale_msg}})</span>
        <span class="condition">*Local taxes included (wherever applicable)</span>

        </div>
		<v-divider></v-divider>
        <div class="storages ">
            <h4 class="storages mb-3">Storage</h4>  
			 <span  class="storage" @click='changeStorage(storage._id)' :class="{ active:selectedStorage.name===storage.name}"  v-for='(storage,i) in storages' :key='i'>{{storage.name}}</span>
		
        </div>
		<div class="colors mt-4">
            <h4 class="colors">colors</h4>  
				 <span  class="color" @click='changeColor(color._id)' :class="{ active:selectedColor.name===color.name}" v-for='(color,i) in colors' :key='i'>{{color.name}}</span>
		</div>
        <v-divider></v-divider>
		<div class="action">
			<v-btn color="primary" dark>Add to Cart</v-btn>
			<button ></button>
		</div>
        </div>
    </v-flex>
    
  </v-layout>
  </v-card>
</template>


<script>
import axios from 'axios';
import { Carousel, Slide } from 'vue-carousel';
export default {
  name: 'ProductDetails',
  data () {
      return {
          productDesc : '',
          AllData: '',
          options: [],
          attributes: [],
          selected_options_ids : [] ,
          product_variations:[],
            loading: true    
      }
  },
  components: {
    Carousel,
    Slide
  },
  filters: {
      price(value) {
          value = value|| 0
          return value.toFixed(2);
      }
  },
  computed: {
      save() {
          return (this.selectedProduct.mark_price-this.selectedProduct.sale_price);
      },
      storages() {
          let storage = [];
          let storageId = this.attributes.filter((attribute)=>{
              return attribute.name === "Storage"
          })
          this.options.forEach((option)=>{
              if(option.attrib_id === storageId[0]._id){
                  storage.push(option);
                  
              }
              
          });
          return storage

      },
      colors() {
          let color = [];
          let colorId = this.attributes.filter((attribute)=>{
              return attribute.name === "Colour"
          })
          this.options.forEach((option)=>{
              if(option.attrib_id === colorId[0]._id){
                  color.push(option);
              }
              
          });
          return color

      },
      selectedProduct() {
          let selProduct = {}
          this.product_variations.forEach(product=> {
              if( product.sign.every(id => this.selected_options_ids.indexOf(id) !== -1)){
                  selProduct = product
              }
          })
          if(selProduct._id){
              this.$router.replace({path: `/products/${selProduct._id}`}) 
          }
          
          return selProduct
      },
      selectedColor() {
          let selColor = ''
          this.selected_options_ids.forEach(option=>{
               
              this.colors.forEach(color=>{
                  if(color._id ===option){
                      selColor = color;
                      
              }
            })    
          })
          return selColor
      },
      selectedStorage() {
          let selStorage = ''
          this.selected_options_ids.forEach(option=>{
              this.storages.forEach(storage=>{
                  if(storage._id ===option){
                      selStorage = storage;
              }
            })    
          })
          return selStorage
      }
  },
  methods: {
      changeStorage(value) {
          this.selected_options_ids[this.selected_options_ids.indexOf(this.selectedStorage._id)] = value;
          this.selected_options_ids = [...this.selected_options_ids]
      },
      changeColor(value) {
          this.selected_options_ids[this.selected_options_ids.indexOf(this.selectedColor._id)] = value;
          this.selected_options_ids = [...this.selected_options_ids]
      }
  },
  created() {
    axios.get(`https://assignment-appstreet.herokuapp.com/api/v1/products/${this.$route.params.productId}`)
    .then(res => {
      this.AllData = res.data
      this.productDesc = res.data.primary_product.desc
      this.attributes = res.data.attributes
      this.options = res.data.options
      this.selected_options_ids = res.data.selected_option_ids
      this.product_variations = res.data.product_variations
      this.loading =false;
    })
    .catch( err => console.log(err))
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.loader {
    min-height: 300px;
    display: flex;
  justify-content: center;
  align-items: center;
}


.details{
    margin-left: 10px !important;
    margin-right: 10px !important;
    margin-top: 20px !important;
}
h1, h2 {
  font-weight: normal;
}


.product-title,  .storages, .colors {
  text-transform: UPPERCASE;
  font-weight: bold; }


.product-title,.price, .product-description,  .storages  {
  margin-top: 10px; 
  margin-bottom: 10px; }
.image {
    max-height: 90%;
    max-width: 90%;
}
.slider {
    display: flex;
  justify-content: center;
  align-items: center;
  min-height: 350px;
}
.imageCard {
    border-radius:7.5%;
}
.storages {
margin-right: 10px; }
  
.storage  {
    margin-top: 0;
    margin-left: 0;
    margin-right: 10px;
    border: 0.5px dashed lightgray;
  padding: 5px;
  border-radius: 0.1px;
  cursor: pointer;
}
.color {
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
  margin-bottom: 10px;
  margin-top: 10px;
  border: 0.5px dashed lightgray;
  padding: 3.5px;
  border-radius: 0.5px;
  cursor: pointer; }
  
.action button{
    background-color: #324558 !important;
    margin-top: 10px;
    margin-left: 0;
    
}
.price span{
    margin-top: 10px;
    margin-left: 0;
    
}
.salePrice {
    font-weight: bold;
}
.mktPrice {
    font-weight: 500;
    color:darkgray;
    margin-left: 5px;
    text-decoration: line-through;
    text-transform: none
}
.saving {
    font-weight: 500;
    font-size: 0.8em;
    color: #2FADA1;
    display: block;
    text-transform: none;
}
.condition {
    font-weight: 400;
    font-size: 0.7em;
    text-transform: none;
}
.active {
    border: 0.5px solid #2c3e50;
    border-radius: 8%;
   background-color: #2c3e50 !important;
   color: #FFF;
   font-weight: 500;
}
@media screen and (max-width: 525px){
    .slider {
    display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
 
  
}
.imageCard {
    border-radius:0%;
    margin-top: 0 !important;
    -webkit-box-shadow: none !important;
  -moz-box-shadow: none !important;
  box-shadow: none !important;
}
    
}


</style>
