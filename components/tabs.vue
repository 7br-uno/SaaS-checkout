<template>
  <div class="tabs is-fullwidth is-medium mb-0">
    <ul>
<!--      <li v-bind:class="{'is-active': tab_details.atual_page == 1}">-->
<!--        <a class="pt-2 pb-2 tab-a">-->
<!--          <span class="icon is-small"><i class="fas fa-sliders-h" aria-hidden="true"></i></span>-->
<!--          <span>Planos</span>-->
<!--        </a>-->
<!--      </li>-->
      <li v-bind:class="{'is-active': tab_details.atual_page == 2}">
        <a v-bind:class="{'inativo': estou_inativo(2)}" class="pt-2 pb-2 tab-a">
          <span class="icon is-small"><i class="far fa-address-card" aria-hidden="true"></i></span>
          <span>Dados</span>
        </a>
      </li>
<!--      <li v-bind:class="{'is-active': tab_details.atual_page == 3}">-->
<!--        <a v-bind:class="{'inativo': estou_inativo(3)}" class="pt-2 pb-2 tab-a">-->
<!--          <span class="icon is-small"><i class="fas fa-file-signature" aria-hidden="true"></i></span>-->
<!--          <span>Termo de adesão</span>-->
<!--        </a>-->
<!--      </li>-->
      <li v-bind:class="{'is-active': tab_details.atual_page == 3}">
        <a v-bind:class="{'inativo': estou_inativo(3)}" class="pt-2 pb-2 tab-a">
          <span class="icon is-small"><i class="fas fa-cash-register" aria-hidden="true"></i></span>
          <span>Pagamento</span>
        </a>
      </li>
      <li v-bind:class="{'is-active': tab_details.atual_page == 4}">
        <a v-bind:class="{'inativo': estou_inativo(4)}" class="pt-2 pb-2 tab-a">
          <span class="icon is-small"><i class="fas fa-shopping-bag" aria-hidden="true"></i></span>
          <span>Confirmação da compra</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'Tabs',
    props: {
      tab_details: {
        atual_page: ''
      }
    },
    data(){
      return {

      }
    },
    methods:{
      ir_para_a_tab(tab){
        this.$emit('attTab', tab);
      },
      estou_inativo(tab){
        if(tab == 2){
          if(!this.data_steps._02_Dados._status && this.tab_details.atual_page != tab) return true;
            return false;
        }else if(tab == 3){
          if(!this.data_steps._02_Dados._status && this.tab_details.atual_page != tab) return true;
          return false;
        }else if(tab == 4){
          // if(!this.data_steps._03_Termo._status && this.tab_details.atual_page != tab) return true;
          if(!this.data_steps._04_Pagamento._status && this.tab_details.atual_page != tab) return true;
          return false;
        }else if(tab == 5){
          if(!this.data_steps._04_Pagamento._status && this.tab_details.atual_page != tab) return true;
          return false;
        }
      }
    },
    computed:{
      data_steps(){
        return this.$store.state.core.data_steps;
      }
    }
  }
</script>

<style>
  .tabs li.is-active a{
    color: #3273dc;
  }
  .tabs a{
    color: #3273dc;
  }
  .tabs a:hover{
    border-bottom-color: transparent;
    color: #3273dc;
  }
  .tabs li.is-active a {
    border-bottom-color: #3273dc;
  }
  .tab-a{
    font-size: 11pt;
    cursor: default !important;
  }
  .mb-0{
    margin-bottom: 0px;
  }
  .inativo{
    color: #bbbbbb !important;
  }
</style>
