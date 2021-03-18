<template>
  <div class="all">
    <div class="columns is-mobile is-centered">
      <div class="column is-half">
        <p class="bd-notification text-align-center is-primary mt-3">
          <img class="logo" src="https://www.naturaltech.com.br/images/seu-logo.png"/>
        </p>
      </div>
    </div>
    <div class="container pb-5">
      <div class="columns is-mobile">
        <div class="cartao column is-10 is-offset-1">
          <Tabs :tab_details="tab_details" v-on:attTab="ir_para_a_tab"/>
          <div class="transition">
            <transition name="slide-fade">
              <Dados :tab_details="tab_details" v-on:troca_tab="troca_tab" v-if="tab_details.atual_page == 2"/>
              <Pagamento :tab_details="tab_details" v-on:troca_tab="troca_tab" v-if="tab_details.atual_page == 3"/>
              <Confirmacao :tab_details="tab_details" v-on:troca_tab="troca_tab" v-if="tab_details.atual_page == 4"/>
            </transition>
          </div>
        </div>
      </div>
      <div class="columns is-mobile">
        <div class="column is-5 mt-1 display-dif is-offset-1">
          <div class="lockpad-div">
            <svg viewBox="0 0 100 100">
              <path y="50" class="lock-top" v-bind:class="loading_lock_pad" d="M64,50V18.7C64,12,58.9,6.6,52.6,6.6h-3.5c-6.3,0-11.3,5.4-11.3,12.1v25.9"/>
              <circle class="lock-outline" v-bind:class="loading_lock_pad" cx="50.9" cy="65.4" r="27" />
              <path class="lock-body" v-bind:class="loading_lock_pad" d="M50.9,41.4c-13.2,0-24,10.7-24,24c0,13.2,10.7,24,24,24c13.2,0,24-10.7,24-24C74.9,52.2,64.1,41.4,50.9,41.4z M56.2,61.9
                c-1.1,1.5-1.3,3-1.3,4.8c0.1,3,0.1,6.1,0,9.1c-0.1,2.8-1.6,4.4-4,4.5c-2.5,0.1-4.3-1.6-4.5-4.4c-0.1-1.9,0-3.9,0-5.8c0,0,0,0,0,0
                c0-1.4,0.1-2.8,0-4.2c-0.2-1.3-0.5-2.7-1.2-3.8c-1.5-2.7-1.1-6.3,1.1-8.3c2.4-2.2,6-2.3,8.6-0.2C57.3,55.5,58,59.2,56.2,61.9z"/>
              <path class="lock-spinner" v-bind:class="loading_lock_pad" d="M73.3,65.7c0,12.2-9.9,22.1-22.1,22.1">
                <animateTransform attributeType="xml"
                                  attributeName="transform"
                                  type="rotate"
                                  from="0 50.9 65.4"
                                  to="360 50.9 65.4"
                                  dur="0.8s"
                                  repeatCount="indefinite"
                />
              </path>
            </svg>
          </div>          
          <span v-if="loading_lock_pad == 'loaded'" class="ambiente"><b>AMBIENTE<br>SEGURO</b></span>       
        </div>
        <div class="column is-5 mt-1">
          <span class="float-right txt">Copyright © 2019, Sua Empresa.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Tabs from '~/components/tabs';
  import Planos from '~/components/planos';
  import Dados from '~/components/dados';
  import Termo from '~/components/termo-de-adesao';
  import Pagamento from '~/components/pagamento';
  import Confirmacao from '~/components/confirmacao';
  export default {
    data() {
      return {
        tab_details:{
          atual_page: 2
        },
        loading_lock_pad: 'loading'
      }
    },
    components:{
      Tabs,
      Planos,
      Dados,
      Pagamento,
      Confirmacao,
      Termo
    },
    methods:{
      troca_tab(sentido){
        if(sentido){
          if(this.tab_details.atual_page < 5){
            this.ir_para_a_tab(this.tab_details.atual_page + 1);
          }
        }else{
          if(this.tab_details.atual_page > 1){
            this.ir_para_a_tab(this.tab_details.atual_page - 1);
          }
        }
      },
      ir_para_a_tab(tab){
        this.tab_details.atual_page = tab;
      }
    },
    mounted(){
      this.$store.dispatch('core/busca_plano').then(response => {
        this.loading_lock_pad = 'loaded';
        this.$store.dispatch('core/aplicar_voucher', '1-MES-FREE');
      });
    },
    computed:{
      data_steps(){
        return this.$store.state.core.data_steps;
      }
    }
  }
</script>

<style>
  html {
    background-color: #f4f4f4;
  }
  .all{
    background-color: #f4f4f4;
    width: 100%;
  }
  .logo{
    max-width: 280px;
    width: 100%;
  }
  .text-align-center{
    text-align: center !important;
  }
  .text-align-right{
    text-align: right !important;
  }
  .cartao{
    background-color: white;
    border-radius: 7px;
    border: #dbdbdb 1px solid;
    box-shadow: 4px 4px 20px 0px #afafaf;
    padding-top: 0px;
  }
  .txt{
    font-size: 10pt;
  }
  .border-bot{
    border-bottom: 1px solid #dbdbdb;
  }
  .float-right{
    float: right;
  }
  .button.is-link{
    background-color: #3273dc;
    border-color: transparent;
    color: #fff;
    box-shadow: 2px 2px 8px 2px #3273dcb5;
  }
  .button.is-link:active, .button.is-link.is-active{
    background-color: #2366d1;
    border-color: transparent;
    color: #fff;
    box-shadow: 1px 1px 8px 2px #3273dcb5;
  }
  .button.is-link:hover, .button.is-link.is-hovered{
    background-color: #3273dc;
    border-color: transparent;
    color: #fff;
    box-shadow: 3px 3px 8px 2px #3273dcb5;
  }
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active em versões anteriores a 2.1.8 */ {
    transform: translateX(15px);
    opacity: 0;
  }
  .transition{
    -webkit-transition: height 8s; /* For Safari 3.1 to 6.0 */
    transition: height 8s;
  }
  .input:focus, .taginput .taginput-container.is-focusable:focus, .input.is-focused, .taginput .is-focused.taginput-container.is-focusable, .input:active, .taginput .taginput-container.is-focusable:active, .input.is-active, .taginput .is-active.taginput-container.is-focusable, .textarea:focus, .textarea.is-focused, .textarea:active, .textarea.is-active{
    border-color: #3273dc;
    border-top-color: rgb(50, 115, 220);
    border-right-color: rgb(50, 115, 220);
    border-bottom-color: rgb(50, 115, 220);
    border-left-color: rgb(50, 115, 220);
  }
  .select select:focus, .select select.is-focused, .select select:active, .select select.is-active{
    border-color: #3273dc;
  }
  a {
    color: #3273dc;
    cursor: pointer;
    text-decoration: none;
  }
  a:hover {
    color: #005baa;
    cursor: pointer;
    text-decoration: none;
  }
  .txt-notification{
    font-size: 10pt;
    margin-bottom: 0px !important;
  }
  .desc-notf{
    font-size: 8pt;
  }
  .loading_disabled{
    pointer-events: none;
    opacity: 0.5;
  }
  .loading_popup {
    position: absolute;
    width: 100px;
    height: 100px;
    z-index: 15;
    top: 35%;
    left: 50%;
    margin: -50px 0 0 -50px;
  }

  .lockpad-div{
    width: 45px;
  }

  .lock-top{
  fill: none;
  stroke: #21dc40;
  stroke-width: 5;
  stroke-linecap: round;
  stroke-miterlimit: 10;
  stroke-dasharray: 300;
  stroke-dashoffset: -30;
  transition: all 300ms ease-out;
}
.lock-top.loaded {
  stroke-dashoffset: 0;
  stroke: #21dc40
}
.lock-top.loaded ~ .lock-body {
  fill: #21dc40;
}
.lock-top.loading {
  stroke: #000;
  opacity: 0.3;
}

.lock-outline{
  fill: #fff;
}
.lock-body {
  fill: #21dc40;
  opacity: 1;
  transition: all 300ms ease-out;
}
.lock-body.loading{
  fill: #000 !important;
  opacity: 0.3;
}

.lock-spinner {
  fill: none;
  stroke: #000;
  stroke-width: 5;
  stroke-linecap: round;
  stroke-miterlimit: 10;
  opacity: 0;
  transition: opacity 200ms ease;
}
.lock-spinner.loading{
  opacity: 1;
}
.display-dif{
  display: inline-flex;
}
.ambiente{
  color: #21dc40;
  line-height: 1;
  margin-top: 6px;  
  font-size: 10.4pt;
}
</style>
