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
        <div class="column is-12">
          <h1 class="h1">Detalhes da sua compra</h1>
          <p class="txt">Confira os dados da sua compra. Agora é só confirmar, inovar e vender mais!</p>
        </div>
      </div>
      <div class="columns">
        <div class="column is-6 is-offset-1">
          <Sumario :hide_voucher_actions="true"/>
        </div>
        <div class="column is-4 text-align-center">
          <h1 class="h2 pb-1">Detalhes do pagamento</h1>
          <p class="txt"><b>Proximo vencimento</b></p>
          <p class="txt pb-1">
            <span v-if="gratuidade_por_periodo">
              {{ new Date() | moment("add", (30 * gratuidade_por_periodo).toString() + " days").format("DD/MM/YYYY") }}
            </span>
            <span v-if="!gratuidade_por_periodo">
              {{ new Date() | moment("DD/MM/YYYY") }}
            </span>
          </p>
          <p class="txt"><b>Forma de pagamento</b></p>
          <div v-if="_04_Pagamento.formaDePagamento == 'cartao'">
            <p class="txt">Cartão de crédito</p>
            <p class="txt">
              <i v-if="bandeira(_04_Pagamento.cartao.numero) == 'visa'" class="fab fa-cc-visa"></i>
              <i v-if="bandeira(_04_Pagamento.cartao.numero) == 'mastercard'" class="fab fa-cc-mastercard"></i>
              <i v-if="bandeira(_04_Pagamento.cartao.numero) == 'diners'" class="fab fa-cc-diners-club"></i>
              <i v-if="bandeira(_04_Pagamento.cartao.numero) == 'amex'" class="fab fa-cc-amex"></i>
              <i v-if="bandeira(_04_Pagamento.cartao.numero) == ''" class="far fa-credit-card"></i>
              <span v-if="bandeira(_04_Pagamento.cartao.numero) == 'elo'"><b>elo</b></span>
              **** **** **** {{_04_Pagamento.cartao.numero.slice(15)}}
            </p>
          </div>
          <div v-if="_04_Pagamento.formaDePagamento == 'boleto'">
            <p class="txt">
              <i class="fas fa-barcode"></i>
              Boleto bancário
            </p>
            <p class="txt">
              <i v-if="bandeira(_04_Pagamento.cartao.numero) == 'amex'" class="fab fa-cc-amex"></i>
              <a @click="modal_dados_boleto = true" href="#">Ver dados de cobrança</a>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div v-bind:class="{'is-active' : modal_dados_boleto}" class="modal">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Dados de cobrança - Boleto bancário</p>
          <button @click="modal_dados_boleto = false" class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <b>Nome:</b> {{_04_Pagamento.boleto.name}}<br>
          <b>CPF ou CNPJ:</b> {{_04_Pagamento.boleto.cpf_cnpj}}<br>
          <b>Telefone:</b> {{_04_Pagamento.boleto.phone_prefix +' '+ _04_Pagamento.boleto.phone}}<br>
          <b>E-mail:</b> {{_04_Pagamento.boleto.email}}<br>
          <b>Endereço:</b> {{_04_Pagamento.boleto.address.street}}, Nº {{_04_Pagamento.boleto.address.number}} - {{_04_Pagamento.boleto.address.adjunct}} / {{_04_Pagamento.boleto.address.district}}, {{_04_Pagamento.boleto.address.city}}-{{_04_Pagamento.boleto.address.state}}, {{_04_Pagamento.boleto.address.zip_code}}.
        </section>
        <footer class="modal-card-foot text-align-right">
          <button @click="modal_dados_boleto = false" class="button">Fechar</button>
        </footer>
      </div>
    </div>
    <a @click="loaging ? '' : troca_tab(false)" :disabled="loaging" v-if="tab_details.atual_page >= 3" class="button is-rounded is-light">Voltar</a>
    <a @click="troca_tab(true)" v-bind:class="{'is-loading' : loaging}" class="button is-link is-rounded float-right">Confirmar</a>
  </div>
</template>
<script>
  import Sumario from '~/components/sumario';
  export default {
    name: 'Confirmacao',
    props: {
      tab_details: {
        atual_page: ''
      }
    },
    components:{
      Sumario
    },
    data(){
      return{
        isShow: false,
        erro_msgs: [],
        loaging: false,
        modal_dados_boleto: false,
        data:{}
      }
    },
    methods:{
      troca_tab(sentido){
        this.erro_msgs = [];
        this.isShow = false;
        if(sentido){
          this.loaging = true;
          var action = '';
          if(this._04_Pagamento.formaDePagamento == 'cartao'){
            action = 'core/finaliza_compra_CC';
          }else{
            action = 'core/finaliza_compra_BB';
          }
          this.data._01_Planos = this._01_Planos;
          this.data._02_Dados = this._02_Dados;
          this.data._04_Pagamento = this._04_Pagamento;
          this.$store.dispatch(action, this.data)
            .then(response => {
              let data_cadastro = {};
              data_cadastro._01_Planos = this._01_Planos;
              data_cadastro._02_Dados = this._02_Dados;
              data_cadastro._04_Pagamento = this._04_Pagamento;
              data_cadastro._05_Confirmacao = this._05_Confirmacao;
              this.$store.dispatch('core/cadastra_corretor', data_cadastro)
                .then(response => {
                  this.direciona();
                })
                .catch(response => {
                  this.erro_msgs.push('Algo não funcionou como esperado no momento do cadastro dos seus dados em nossa base. Por favor, entre em contato conosco para finalizar.');
                  this.isShow = true;
                  console.log(response)
                  this.loaging = false;
                })
            }).catch(response => {
              this.erro_msgs.push('Algo não funcionou como esperado ao finalizar sua adesão. Por favor, entre em contato conosco para finalizar.');
              this.isShow = true;
              console.log(response)
              this.loaging = false;
            });
        }else{
          this.$emit('troca_tab', sentido);
        }
      },
      bandeira(numero) {
        return Iugu.utils.getBrandByCreditCardNumber(numero.replace(/\s/g, ''));
      },
      direciona(){
        window.location.href = process.env.URL_BROKER+"login?jwt=" + this._05_Confirmacao.jwt;
      }
    },
    computed:{
      _01_Planos(){
        return this.$store.state.core.data_steps._01_Planos;
      },
      _02_Dados(){
        return this.$store.state.core.data_steps._02_Dados;
      },
      _04_Pagamento(){
        return this.$store.state.core.data_steps._04_Pagamento;
      },
      _05_Confirmacao(){
        return this.$store.state.core.data_steps._05_Confirmacao;
      },
      gratuidade_por_periodo(){
        for(var i = 0; i < this.$store.state.core.data_steps._01_Planos.voucher_vantagens.length; i++ ){
          if(this.$store.state.core.data_steps._01_Planos.voucher_vantagens[i].periodo != 0){
            return this.$store.state.core.data_steps._01_Planos.voucher_vantagens[i].periodo;
          }else{
            return false;
          }
        }
      }
    }
  }
</script>
<style scoped>
  .h1{
    font-size: 14pt;
  }
  .h2{
    font-size: 13pt;
  }
</style>
