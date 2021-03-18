<template>
  <div class="sumario">
    <table class="table is-fullwidth is-hoverable">
      <thead>
      <tr class="header-table">
        <th>Produto</th>
        <th class="th-valor">Mensal.</th>
      </tr>
      </thead>
      <tfoot v-if="valor_total != null">
      <tr>
        <th class="text-align-right total">Total:</th>
        <th class="text-align-center">R$ {{valor_total}}</th>
      </tr>
      </tfoot>
      <tbody>
      <tr v-if="produtos == ''">
        <td class="tdLoading">
          <span class="pdl">
            <a class="nobdr button is-loading"></a> Carregando...
          </span>
        </td>
        <td>
        </td>
      </tr>
      <tr v-if="produtos != []" v-for="produto in produtos" v-bind:key="produto.id">
        <td>
          {{produto.nome}}
          <a v-if="produto.id != 0" @click="excluir_produto(produto.id)" class="button is-small is-danger is-outlined btn ml-1">
            <span class="icon">
              <i class="far fa-trash-alt"></i>
            </span>
          </a>
        </td>
        <td class="text-align-center">R$ {{produto.valor.toString().replace(".", ",")}}</td>
      </tr>
      <tr class="help-mouse" @click="modal_detalhes_voucher = true" v-if="voucher_nome != ''">
        <td>
          <b>Voucher</b>
          <div>
            <i class="fas fa-ticket-alt"></i> [<a @click="modal_detalhes_voucher = true" href="#"><u>{{voucher_nome}}</u></a>]
          </div>
          <div v-for="voucher_vantagem in voucher_vantagens" class="pl-4px detalhes-voucher">
            <span v-if="voucher_vantagens[voucher_vantagens.length -1] == voucher_vantagem">└</span>
            <span v-if="voucher_vantagens[voucher_vantagens.length -1] != voucher_vantagem">├</span>
            {{voucher_vantagem.descricao}}
          </div>
        </td>
        <td class="text-align-center td-desc-valor">
          <div class="detalhes-valor">
            <div class="detalhes-voucher" v-for="voucher_vantagem in voucher_vantagens">
              <span class="valor-do-desconto" v-if="!voucher_vantagem.valor_desconto == 0.00">R$ - {{voucher_vantagem.valor_desconto.toString().replace(".", ",")}}</span>
              <span class="valor-do-desconto" v-if="voucher_vantagem.valor_desconto == 0.00">&nbsp;</span>
            </div>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
    <div v-if="!hide_voucher_actions" class="columns is-mobile">
      <div v-if="!voucher_nome == ''" class="column pr-0">
        <a @click="excluir_voucher" class="button is-small is-fullwidth is-rounded is-outlined is-danger">
          <i class="far fa-trash-alt mr-1"></i>
          Excluir voucher
        </a>
      </div>
      <div class="column">
        <a @click="modal_voucher = true" class="button is-small is-fullwidth is-rounded is-outlined">
          <i class="fas fa-ticket-alt"></i>
          <span v-if="voucher_nome == ''" class="ml-1">Aplicar voucher</span>
        </a>
      </div>
    </div>
    <div v-bind:class="{'is-active' : modal_voucher}" class="modal">
      <div class="modal-background"></div>
      <div class="modal-card max-width-300px">
        <section class="modal-card-body pd-3">
          <div class="field">
            <div class="text-align-center pb-2">
              Digite o voucher abaixo:
            </div>
            <p v-bind:class="{'is-loading' : carregando_voucher}" class="control has-icons-left text-align-center has-icons-right">
              <input v-model="voucher" class="input is-rounded" v-bind:class="{'is-warning' : voucher_error}" type="text" placeholder="Voucher">
              <span class="icon is-small is-left">
                <i class="fas fa-ticket-alt"></i>
              </span>
              <span v-if="voucher_error" class="icon is-small is-right">
                <i class="fas fa-exclamation-circle warning-color"></i>
              </span>
              <span v-if="voucher_error" class="txt warning-color">Voucher inválido ou expirado.</span>
            </p>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button @click="modal_voucher = false" class="button is-rounded">Cancelar</button>
          <button @click="aplicar_voucher" v-bind:class="{'is-loading' : carregando_voucher}" class="button float-right is-link is-rounded">Aplicar</button>
        </footer>
      </div>
    </div>
    <div v-bind:class="{'is-active' : modal_detalhes_voucher}" class="modal">
      <div class="modal-background"></div>
      <div class="modal-card max-width-350px">
        <header class="modal-card-head">
          <p class="modal-card-title">Detalhes do voucher</p>
          <button @click="modal_detalhes_voucher = false" class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body pd-3 pt-0 pb-0">
          <div v-for="vantagem in voucher_vantagens">
            <div v-if="vantagem.periodo > 0 && vantagem.quanto == '100'" v-bind:class="{'div-vantagens' : voucher_vantagens.length > 0}">
              <p class="text-align-center"><b>Produto grátis por {{30 * vantagem.periodo}} dias</b></p>
             <div class="columns background-img">
                <div class="column is-3 txt is-mobile pl-0">
                  <span>Hoje</span>
                </div>
                <div class="column is-6 is-mobile pl-0 pt-7 color-green">
                  <b>{{30 * vantagem.periodo}} dias grátis</b>
                </div>
                <div class="column txt is-3 pl-0 is-mobile">
                  <span>{{ new Date() | moment("add", (30 * vantagem.periodo).toString() + " days").format("DD/MM/YY") }}</span>
                </div>
              </div>
              <p class="txt-vant">
                Enviaremos um lembrete por email <b>3 dias antes de seu período grátis terminar</b>.
                Cancele a qualquer momento antes de <b>{{ new Date() | moment("add", (30 * vantagem.periodo).toString() + " days").format("DD/MM/YYYY") }}</b> e você não será cobrado.
                <br><br><i><b>Atenção:</b> A gratuitidade é válida para o utilização do serviço e não contempla a aquisição de produtos dentro da plataforma.</i>
              </p>
            </div>
            <div v-if="vantagem.periodo == 0" v-bind:class="{'div-vantagens' : voucher_vantagens.length > 0}">
              <p class="text-align-center"><b>{{vantagem.quanto}}% de desconto no produto</b></p>
              <p class="text-align-center">
                <span class="font-small"><i>De <s v-for="este_produto in produtos"><span v-if="este_produto.id == '0'">R$ {{este_produto.valor.toString().replace(".", ",")}}</span>/mês</s> por</i></span>
              </p>
              <p class="text-align-center pb-1">
                <span class="font-small color-green"><b>R$</b></span><span class="font-big color-green"><b> {{valor_total}}</b></span><span class="font-small color-green"><b>/mês</b></span>
              </p>
              <p class="txt-vant">Desonto de {{vantagem.quanto}}% em todas as mensalidades do produto por tempo indeterminado.</p>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button @click="modal_detalhes_voucher = false" class="button is-rounded">Fechar</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
  import VueMoment from '~/plugins/vue-moment';
  export default {
    name: 'Sumario',
    props:{
      hide_voucher_actions:''
    },
    data(){
      return {
        modal_voucher: false,
        voucher: '',
        voucher_error: false,
        carregando_voucher: false,
        modal_detalhes_voucher: false
      }
    },
    methods:{
      excluir_produto(produto_id){
        this.$store.commit('core/excluir_produto', produto_id);
      },
      excluir_voucher(){
        this.$store.commit('core/excluir_voucher');
      },
      aplicar_voucher(){
        if(this.voucher == ''){
          this.voucher_error = true;
          return;
        }
        this.voucher_error = false;
        this.carregando_voucher = true;
        this.$store.dispatch('core/aplicar_voucher', this.voucher).then(response => {
          this.modal_detalhes_voucher = true;
          this.carregando_voucher = false;
          this.voucher = '';
          this.modal_voucher = false;
        }).catch(response=>{
          this.carregando_voucher = false;
          this.voucher_error = true;
        });
      }
    },
    computed: {
      produtos() {
        return this.$store.state.core.data_steps._01_Planos.produtos;
      },
      voucher_nome(){
        return this.$store.state.core.data_steps._01_Planos.voucher_nome;
      },
      voucher_vantagens(){
        return this.$store.state.core.data_steps._01_Planos.voucher_vantagens;
      },
      valor_total(){
        if(this.produtos.length > 0) {
          var soma = 0.00;
          var desconto = 0.00;
          for (var i = 0; i < this.produtos.length; i++) {
            soma = parseFloat(soma) + parseFloat(this.produtos[i].valor);
          }
          if(this.voucher_vantagens){
            for (var j = 0; j < this.voucher_vantagens.length; j++) {
              desconto = parseFloat(desconto) + parseFloat(this.voucher_vantagens[j].valor_desconto);
            }
          }
          return (soma - desconto).toFixed(2).toString().replace(".", ",");
        }
      }
    },
    watch:{
      modal_voucher: function () {
        if(!this.modal_voucher){
          this.voucher_error = false;
        }
      }
    }
  }
</script>

<style scoped>
  .table{
    font-size: 9pt;
    border-radius: 10px;
    border: 1px #dbdbdb solid;
    border-collapse:separate;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    margin-bottom: 5px;
  }
  .th-valor{
    width: 80px;
    text-align: center;
  }
  .total{
    font-weight: normal;
  }
  .btn{
    height: 18px;
  }
  .sumario{
    /*padding-bottom: 20px;*/
  }
  .detalhes-voucher{
    font-size: 7.5pt;
  }
  .td-desc-valor{
    position: relative;
  }
  .detalhes-valor{
    position: absolute;
    bottom: 4px;
    width: 75%;
  }
  .valor-do-desconto{
    color: red;
  }
  .max-width-300px{
    max-width: 300px;
  }
  .max-width-350px{
    max-width: 350px;
  }
  .modal-card-head, .modal-card-foot{
    justify-content: space-around;
  }
  .modal-card-title{
    font-size: 13pt;
  }
  .h1{
    font-size: 14pt;
  }
  .background-img{
    background-image: url("../static/images/lembrete_3_dias_restantes.png");
    /* background-image: url("../static/images/regua.png"); */
    background-repeat: no-repeat;
    background-size: 100%;
    min-height: 100px;
    max-width: 315px;
    background-position-y: bottom;
    padding-top: 13px;
  }
  .color-green{
    color: #149341;
  }
  .div-vantagens{
    border-bottom: solid 1px #f5f5f5;
    padding-bottom: 15px;
    padding-top: 15px;
  }
  .txt-vant{
    margin-top: 8px;
    font-size: 8.7pt;
    text-align: center;
  }
  .txt-vant i{
    font-size: 7.7pt;
  }
  .help-mouse {
    cursor: help;
  }
  .font-small{
    font-size: 10pt;
  }
  .font-medium{
    font-size: 15pt;
  }
  .font-big{
    font-size: 20pt;
  }
  .warning-color{
    color: #ffdd57;
  }
  .nobdr{
    background-color: transparent !important;
    border: none;
    height: 18px;
  }
  .tdLoading{
    text-align: center;
    width: 100%;
    height: 60px;
    padding-top: 20px;
  }
  .pdl{
    padding-left: 50px;
  }
</style>
