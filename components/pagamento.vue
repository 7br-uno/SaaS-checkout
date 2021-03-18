<template>
  <div>
    <transition name="slide">
      <b-notification
        v-if="isShow"
        class="txt-notification"
        type="is-warning"
        has-icon
        :closable=false
        role="alert">
        Atenção, algo está errado:<br>
        <div class="desc-notf" v-for="msg in erro_msgs" :key="msg.id">
          - {{msg}}
        </div>
      </b-notification>
    </transition>
    <div class="pd-3 mb-1 border-bot" v-bind:class="{'loading_disabled' : loaging}">
      <div v-if="loaging" class="loading_popup loader"></div>
      <div class="columns">
        <div class="column is-12 pr-2">
          <h1 class="h1">Pagamento</h1>
          <p class="txt pb-1">Escolha a forma de pagamento e preencha todos os campos corretamente.</p>
          <FormaPagamento :forma_pagamento="pagamento.formaDePagamento" v-on:altera_forma_pag="altera_forma_pag"/>
        </div>
      </div>
      <div v-if="pagamento.formaDePagamento != ''" class="columns">
        <div class="column hide-on-mobile pr-2">
          <Cartao v-if="pagamento.formaDePagamento == 'cartao'" :cartao="pagamento.cartao" :rotateCard="rotateCard"/>
          <Boleto v-if="pagamento.formaDePagamento == 'boleto'" :boleto="pagamento.boleto"/>
        </div>
        <div class="column">
          <FormCartao v-if="pagamento.formaDePagamento == 'cartao'" :prop_erros="erros" v-on:attDados="atualiza_dados_cartao" class="form-pagamento-cartao" v-on:rotateCard="gira_cartao"/>
          <FormBoleto v-if="pagamento.formaDePagamento == 'boleto'" :prop_erros="erros" v-on:attDados="atualiza_dados_boleto" v-on:status_CEP="atualiza_status_cep"/>
        </div>
        <div class="column is-hidden-tablet-only">
          <Sumario :hide_voucher_actions="false"/>
        </div>
      </div>
      <div v-if="pagamento.formaDePagamento != ''" class="columns">
        <div class="column is-hidden-mobile is-hidden-desktop sumario-tablet">
          <Sumario :hide_voucher_actions="false"/>
        </div>
      </div>
    </div>
    <a @click="loaging ? '' : troca_tab(false)" :disabled="loaging" v-if="tab_details.atual_page >= 3" class="button is-rounded is-light">Voltar</a>
    <a @click="troca_tab(true)" v-bind:class="{'is-loading' : loaging}" class="button is-link is-rounded float-right">{{tab_details.atual_page == 5 ? 'Finalizar' : 'Avançar'}}</a>
  </div>
</template>

<script>
  import Boleto from '~/components/pagamento-boleto';
  import FormBoleto from '~/components/pagamento-form-boleto';
  import Cartao from '~/components/pagamento-cartao';
  import FormaPagamento from '~/components/forma-de-pagamento';
  import FormCartao from '~/components/pagamento-form-cartao';
  import Sumario from '~/components/sumario';
  import TheMask from '~/plugins/vue-the-mask';
  import Validators from '~/helpers/validators';
  export default {
    name: 'Pagamento',
    props: {
      tab_details: {
        atual_page: ''
      }
    },
    data(){
      return {
        erros: [],
        erro_msgs: [],
        loaging: false,
        isShow: false,
        statusCEP: true,
        pagamento: {
          valorTotal: 0,
          formaDePagamento: 'cartao',
          cartao: {
            numero: "",
            nome: "",
            sobrenome: "",
            vencimento: {
              mes: "05",
              ano: "2019"
            },
            cvc: "",
            banco: {
              img: "",
              nome: ""
            },
            token: ""
          },
          boleto: {
            name: "",
            cpf_cnpj: "",
            phone_prefix: "",
            phone: "",
            email: "",
            address: {
              street: "",
              number: "",
              district: "",
              city: "",
              state: "",
              zip_code: "",
              adjunct: ""
            }
          },
          carrinho: ""
        },
        rotateCard: false
      }
    },
    components:{
      Sumario,
      TheMask,
      Boleto,
      FormBoleto,
      Cartao,
      FormCartao,
      FormaPagamento
    },
    mounted(){
      if(this._04_Pagamento._status){
        this.pagamento.formaDePagamento = this._04_Pagamento.formaDePagamento;
      }
    },
    methods:{
      atualiza_dados_boleto(data){
        this.pagamento.boleto = data;
      },
      atualiza_dados_cartao(data){
        this.pagamento.cartao = data;
      },
      gira_cartao(data){
        this.rotateCard = data;
      },
      atualiza_status_cep(data){
        data ? this.statusCEP = false : this.statusCEP = true;
      },
      altera_forma_pag(forma){
        this.pagamento.formaDePagamento = forma;
      },
      alertar_erro(){
        for (var i = 0; i < this.erros.length; i++){
          this.erro_msgs.push(this.erros[i].msg);
        }
        this.isShow = true;
      },
      troca_tab(sentido){
        if(sentido){
          this.loaging = true;
          this.erros = [];
          this.erro_msgs = [];
          this.isShow = false;
          this.erros = Validators.validar_form_04_Pagamento(this.pagamento);
          if(this.erros && this.erros.length > 0){
            this.loaging = false;
            this.alertar_erro();
            return;
          }
          if(!this.statusCEP){
            this.erros.push({campo: 'zip_code', msg: 'CEP inválido, corrija-o antes de avançar.'});
            this.loaging = false;
            this.alertar_erro();
            return;
          }
          if(this.pagamento.formaDePagamento == 'cartao'){
            this.cria_token_de_pagamento()
              .then(response =>{
                this.grava_04_Pagamento(sentido);
              }).catch(response =>{
                this.erros.push({campo: 'token', msg:'Erro ao criar token de pagamento. Verifique se os dados do cartão estão corretos e tente novamente.'})
                this.alertar_erro();
                this.loaging = false;
                return;
              });
          }else{
            this.grava_04_Pagamento(sentido);
          }
        }else{
          this.grava_04_Pagamento(sentido);
        }
      },
      cria_token_de_pagamento(){
        return new Promise((resolve, reject) => {
          Iugu.setAccountID("FB652F89EBF94FA1B8398885A13D4434");
          // Iugu.setTestMode(process.env.IUGU_SET_TEST_MODE);
          Iugu.setup();
          let cc = Iugu.CreditCard(
            this.pagamento.cartao.numero.replace(/ /g, ""),
            this.pagamento.cartao.vencimento.mes,
            this.pagamento.cartao.vencimento.ano,
            this.pagamento.cartao.nome,
            this.pagamento.cartao.sobrenome,
            this.pagamento.cartao.cvc
          );
          Iugu.createPaymentToken(cc, response => {
            if(response.errors) {
              console.log(response.errors);
              reject();
            }else{
              this.pagamento.cartao.token = response.id;
              resolve();
            }
          });
        });
      },
      grava_04_Pagamento(sentido){
        this.$store.dispatch('core/grava_04_Pagamento', this.pagamento)
          .then(response => {
            this.$emit('troca_tab', sentido);
            this.loaging = false;
          }).catch(response => {
            this.loaging = false;
          });
      }
    },
    computed:{
      _04_Pagamento(){
        return this.$store.state.core.data_steps._04_Pagamento;
      }
    }
  }
</script>

<style scoped>
  .h1{
    font-size: 14pt;
  }
  .slide-enter-active {
    -moz-transition-duration: 0.1s;
    -webkit-transition-duration: 0.1s;
    -o-transition-duration: 0.1s;
    transition-duration: 0.1s;
    -moz-transition-timing-function: ease-in;
    -webkit-transition-timing-function: ease-in;
    -o-transition-timing-function: ease-in;
    transition-timing-function: ease-in;
  }

  .slide-leave-active {
    -moz-transition-duration: 0.1s;
    -webkit-transition-duration: 0.1s;
    -o-transition-duration: 0.1s;
    transition-duration: 0.1s;
    -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
    -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
    -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
    transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  }

  .slide-enter-to, .slide-leave {
    max-height: 100px;
    overflow: hidden;
  }

  .slide-enter, .slide-leave-to {
    overflow: hidden;
    max-height: 0;
  }
  @media screen and (max-width: 500px){
    .hide-on-mobile{
      display: none;
    }
  }
  @media screen and (min-width: 769px){
    .form-pagamento-cartao {
      max-width: 260px;
    }
  }
  @media screen and (min-width: 769px) and (max-width: 1088px) {
    .sumario-tablet{
      max-width: 580px;
      margin: 0 auto;
    }
  }
</style>
