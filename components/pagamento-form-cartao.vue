<template>
  <div>
    <div class="columns mb-0">
      <div class="column is-12 pt-0">
        <div class="field">
          <label class="label-field">
            Número do Cartão de Crédito:
          </label>
          <div class="control has-icons-right">
            <input class="input is-small is-rounded" type="text" name="cc-number" placeholder="1111 2222 3333 4444" v-mask="'#### #### #### ####'" label="Número do Cartão de Crédito" v-model="cartao.numero">
            <span class="icon is-small is-right">
              <i v-if="cc_valid" class="fas fa-check"></i>
              <i v-for="prop_erro in prop_erros" v-if="prop_erro.campo == 'numero' && !cc_valid" class="warning-color fas fa-exclamation-circle"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="columns mb-0">
      <div class="column is-5 tablet-padding pt-5x">
        <div class="field">
          <label class="label-field">
            Nome:
          </label>
          <div class="control has-icons-right">
            <input class="input is-small is-rounded" type="text" name="given-name" placeholder="Bruno" v-model="cartao.nome">
            <span class="icon is-small is-right">
              <i v-if="cartao.nome && cartao.nome.length > 0" class="fas fa-check"></i>
              <i v-for="prop_erro in prop_erros" v-if="prop_erro.campo == 'nome' && cartao.nome.length == 0" class="warning-color fas fa-exclamation-circle"></i>
            </span>
          </div>
        </div>
      </div>
      <div class="column is-7 pt-5x">
        <div class="field">
          <label class="label-field">
            Sobrenome:
          </label>
          <div class="control has-icons-right">
            <input class="input is-small is-rounded" type="text" name="family-name" placeholder="Neves Pereira" v-model="cartao.sobrenome">
            <span class="icon is-small is-right">
              <i v-if="cartao.sobrenome && cartao.sobrenome.length > 0" class="fas fa-check"></i>
              <i v-for="prop_erro in prop_erros" v-if="prop_erro.campo == 'sobrenome' && cartao.sobrenome.length == 0" class="warning-color fas fa-exclamation-circle"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="columns mb-0">
      <div class="column is-6 tablet-padding pt-5x">
        <div class="field">
          <label class="label-field">
            Mês de vencimento:
          </label>
          <div v-bind:class="{'is-warning' : !cc_venc_valid}" class="select is-rounded is-small wd-100p">
            <select v-model="cartao.vencimento.mes" class="wd-100p">
              <option>01</option>
              <option>02</option>
              <option>03</option>
              <option>04</option>
              <option>05</option>
              <option>06</option>
              <option>07</option>
              <option>08</option>
              <option>09</option>
              <option>10</option>
              <option>11</option>
              <option>12</option>
            </select>
          </div>
        </div>
      </div>
      <div class="column is-6 pt-5x">
        <div class="field">
          <label class="label-field">
            Ano de vencimento:
          </label>
          <div v-bind:class="{'is-warning' : !cc_venc_valid}" class="select is-rounded is-small wd-100p">
            <select v-model="cartao.vencimento.ano" class="wd-100p">
              <option>2019</option>
              <option>2020</option>
              <option>2021</option>
              <option>2022</option>
              <option>2023</option>
              <option>2024</option>
              <option>2025</option>
              <option>2026</option>
              <option>2027</option>
              <option>2028</option>
              <option>2029</option>
              <option>2030</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="columns mb-0">
      <div class="column is-8 pt-5x">
        <div class="field">
          <label class="label-field">
            Código verificador:
          </label>
          <div class="control has-icons-right">
            <input class="input is-small is-rounded" type="text" name="cc-cvc" placeholder="123" v-mask="'####'" v-model="cartao.cvc" @focus="rotateCard = true" @blur="rotateCard = false">
            <span class="icon is-small is-right">
              <i v-if="cartao.cvc && cartao.cvc.length >= 3" class="fas fa-check"></i>
              <i v-for="prop_erro in prop_erros" v-if="prop_erro.campo == 'cvc' && cartao.cvc.length < 3" class="warning-color fas fa-exclamation-circle"></i>
            </span>
          </div>
        </div>
      </div>
      <div class="column is-8 txt-small a-wit">
        <a @click="modal_cvv = true" href="#">O que é isso?</a>
      </div>
      <div v-bind:class="{'is-active' : modal_cvv}" class="modal">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Código de verificação</p>
            <button @click="modal_cvv = false" class="delete" aria-label="close"></button>
          </header>
          <section class="modal-card-body">
            <b>O que é código de verificação do meu cartão (CVV)?</b><br>
            <span class="txt">
              CVV é um código de segurança de 3 dígitos, impresso no verso de cartões de crédito.<br>
              Importante: Em cartões American Express você encontra o CVV com 4 dígitos e na frente.
            </span>
          </section>
          <footer class="modal-card-foot">
            <button @click="modal_cvv = false" class="button">Fechar</button>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Validators from '~/helpers/validators';
  export default {
    name: 'FormCartao',
    props:{
      prop_erros: {}
    },
    data(){
      return{
        modal_cvv: false,
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
        rotateCard: false,
        cc_valid: false,
        cc_venc_valid: false,
        first_color_mes: true,
        first_color_ano: true
      }
    },
    mounted(){
      this.cartao.numero = this._04_Pagamento.cartao.numero;
      this.cartao.nome = this._04_Pagamento.cartao.nome;
      this.cartao.sobrenome = this._04_Pagamento.cartao.sobrenome;
      this.cartao.vencimento.mes = this._04_Pagamento.cartao.vencimento.mes;
      this.cartao.vencimento.ano = this._04_Pagamento.cartao.vencimento.ano;
      this.cartao.cvc = this._04_Pagamento.cartao.cvc;
    },
    methods:{
      valida_data_venc(){
        this.cc_venc_valid = Iugu.utils.validateExpiration(this.cartao.vencimento.mes, this.cartao.vencimento.ano);
      }
    },
    watch:{
      'cartao.numero': function() {
        this.$emit('attDados', this.cartao);
        this.cc_valid = Iugu.utils.validateCreditCardNumber(this.cartao.numero);
      },
      'cartao.nome': function() {
        this.$emit('attDados', this.cartao);
      },
      'cartao.sobrenome': function() {
        this.$emit('attDados', this.cartao);
      },
      'cartao.vencimento.mes': function() {
        this.$emit('attDados', this.cartao);
        this.valida_data_venc();
      },
      'cartao.vencimento.ano': function() {
        this.$emit('attDados', this.cartao);
        this.valida_data_venc();
      },
      'cartao.cvc': function() {
        this.$emit('attDados', this.cartao);
      },
      rotateCard: function() {
        this.$emit('rotateCard', this.rotateCard);
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
  .warning-color{
    color: #ffdd57;
  }
  .txt-small{
    font-size: 8pt;
  }
  .a-wit{
    margin: auto;
  }
  .label-field{
    margin-bottom: 5px;
    font-size: 10pt;
  }
  @media screen and (min-width: 769px){
    .tablet-padding{
      padding-right: 0px;
    }
  }
</style>
