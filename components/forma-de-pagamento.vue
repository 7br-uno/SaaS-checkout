<template>
  <div class="text-align-center">
    <a @click="pagamento('cartao')" class="button is-large pd-25px mg-1" v-bind:class="{'is-link': forma_pag == 'cartao'}">
      <span class="icon is-medium">
        <i class="far fa-credit-card"></i>
      </span>
      <span class="btn-form-pg">Cartão de Crédito</span>
    </a>
    <a @click="pagamento('boleto')" class="button is-large pd-25px mg-1" v-bind:class="{'is-link': forma_pag == 'boleto'}">
      <span class="icon is-medium">
        <i class="fas fa-barcode"></i>
      </span>
      <span class="btn-form-pg">Boleto Bancário</span>
    </a>
  </div>
</template>
<script>
  export default {
    props:{
      forma_pagamento: ''
    },
    data(){
      return{
        forma_pag: ''
      }
    },
    mounted(){
      this.forma_pag = this.forma_pagamento;
    },
    methods:{
      pagamento(forma){
        this.forma_pag = forma;
        this.$emit('altera_forma_pag', forma);
      }
    },
    watch:{
      forma_pagamento: function() {
        this.forma_pag = this.forma_pagamento;
      }
    }
  }
</script>
<style scoped>
  .h1{
    font-size: 14pt;
  }
  .btn-form-pg{
    font-size: 12pt;
  }
  .button.is-large{
    font-size: 1rem;
  }
</style>
