<template>
  <div>
    <transition name="slide">
      <b-notification
        v-if="isShow"
        class="txt-notification"
        type="is-warning"
        has-icon
        :closable="false"
        role="alert"
      >
        Atenção, algo está errado:
        <br>
        <div class="desc-notf" v-for="msg in erro_msgs" :key="msg.id"> - {{msg}}</div>
      </b-notification>
    </transition>
    <div class="pd-3 mb-1 border-bot" v-bind:class="{'loading_disabled' : loaging}">
      <div v-if="loaging" class="loading_popup loader"></div>
      <div class="columns">
        <div class="column is-8 pr-2">
          <h1 class="h1">Preencha os dados da corretora</h1>
          <p
            class="txt pb-3"
          >É hora de construir sua rede de influenciadores e multiplicar o seu negócio.</p>
          <div class="columns mb-0">
            <div class="column is-12">
              <div class="control has-icons-left has-icons-right">
                <input
                  v-model="corretora.comprador_nome"
                  v-bind:class="{'is-warning' : corretora.comprador_nome_error && !corretora.comprador_nome.length > 0}"
                  class="input is-small is-rounded"
                  type="text"
                  name="nome"
                  placeholder="Seu nome"
                >
                <span class="icon is-small is-left">
                  <i class="fas fa-user"></i>
                </span>
                <span class="icon is-small is-right">
                  <i v-if="corretora.comprador_nome.length > 0" class="fas fa-check-circle"></i>
                  <i
                    v-if="corretora.comprador_nome_error && !corretora.comprador_nome.length > 0"
                    class="warning-color fas fa-exclamation-circle"
                  ></i>
                </span>
              </div>
            </div>
          </div>
          <div class="columns mb-0">
            <div class="column is-7">
              <div class="control has-icons-left has-icons-right">
                <input
                  v-model="corretora.nome_fantasia"
                  v-bind:class="{'is-warning' : corretora.nome_fantasia_error && !corretora.nome_fantasia.length > 0}"
                  class="input is-small is-rounded"
                  type="text"
                  name="nome-fantasia"
                  placeholder="Nome da corretora"
                >
                <span class="icon is-small is-left">
                  <i class="fas fa-briefcase"></i>
                </span>
                <span class="icon is-small is-right">
                  <i v-if="corretora.nome_fantasia.length > 0" class="fas fa-check-circle"></i>
                  <i
                    v-if="corretora.nome_fantasia_error && !corretora.nome_fantasia.length > 0"
                    class="warning-color fas fa-exclamation-circle"
                  ></i>
                </span>
              </div>
            </div>
            <div class="column is-5 pl-0">
              <div class="control has-icons-left has-icons-right">
                <input
                  v-model="corretora.cpf_cnpj"
                  v-bind:class="{'is-warning' : (validade_cpf_cnpj == 'invalid' || corretora.cpf_cnpj_error) && validade_cpf_cnpj != 'valid'}"
                  class="input is-small is-rounded"
                  type="text"
                  name="cnpj"
                  placeholder="CNPJ ou CPF"
                  v-mask="['##.###.###/####-##', '###.###.###-##']"
                >
                <span class="icon is-small is-left">
                  <i class="fas fa-briefcase"></i>
                </span>
                <span class="icon is-small is-right">
                  <i v-if="validade_cpf_cnpj == 'valid'" class="fas fa-check-circle"></i>
                  <i
                    v-if="(validade_cpf_cnpj == 'invalid' || corretora.cpf_cnpj_error) && validade_cpf_cnpj != 'valid'"
                    class="warning-color fas fa-exclamation-circle"
                  ></i>
                </span>
              </div>
            </div>
          </div>
          <div class="columns mb-0">
            <div class="column is-5">
              <div class="control has-icons-left has-icons-right">
                <input
                  v-model="corretora.telefone"
                  v-bind:class="{'is-warning' : (validade_telefone == 'invalid' || corretora.telefone_error) && validade_telefone != 'valid'}"
                  class="input is-small is-rounded"
                  type="tel"
                  name="telefone"
                  placeholder="Telefone"
                  v-mask="['(##) ####-####', '(##) #####-####']"
                >
                <span class="icon is-small is-left">
                  <i class="fas fa-phone"></i>
                </span>
                <span class="icon is-small is-right">
                  <i v-if="validade_telefone == 'valid'" class="fas fa-check-circle"></i>
                  <i
                    v-if="(validade_telefone == 'invalid' || corretora.telefone_error) && validade_telefone != 'valid'"
                    class="warning-color fas fa-exclamation-circle"
                  ></i>
                </span>
              </div>
            </div>
            <div class="column is-7 pl-0">
              <div class="control has-icons-left has-icons-right">
                <input
                  v-model="corretora.email"
                  v-bind:class="{'is-warning' : (validade_email == 'invalid' || corretora.email_error) && validade_email != 'valid'}"
                  class="input is-small is-rounded"
                  type="email"
                  name="email"
                  placeholder="E-mail"
                >
                <span class="icon is-small is-left">
                  <i class="fas fa-at"></i>
                </span>
                <span class="icon is-small is-right">
                  <i v-if="validade_email == 'valid'" class="fas fa-check-circle"></i>
                  <i
                    v-if="(validade_email == 'invalid' || corretora.email_error) && validade_email != 'valid'"
                    class="warning-color fas fa-exclamation-circle"
                  ></i>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-4">
          <Sumario :hide_voucher_actions="false"/>
        </div>
      </div>
      <label v-bind:class="{'checkbox-error' : !corretora.aceito && corretora.aceito_error}" class="checkbox">
        <input v-model="corretora.aceito" type="checkbox">
        <span class="txt">
          Declaro que li e aceito o
          <a class="is-link" @click="modal_termo = true" href="#">termo de adesão</a>.
        </span>
        <i
          v-if="!corretora.aceito && corretora.aceito_error"
          class="warning-color fas fa-exclamation-circle"
        ></i>
      </label>
      <div v-bind:class="{'is-active' : modal_termo}" class="modal">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">TERMO DE USO E POLÍTICA DE PRIVACIDADE</p>
            <button @click="modal_termo = false" class="delete" aria-label="close"></button>
          </header>
          <section class="modal-card-body">
            <Termo/>
          </section>
          <footer class="modal-card-foot text-align-right">
            <button @click="modal_termo = false" class="button">Fechar</button>
            <a href="https://policies.google.com/terms?print" target="blank" class="button">Imprimir</a>
          </footer>
        </div>
      </div>
    </div>
    <a
      @click="loaging ? '' : troca_tab(false)"
      :disabled="loaging"
      v-if="tab_details.atual_page >= 3"
      class="button is-rounded is-light"
    >Voltar</a>
    <a
      @click="troca_tab(true)"
      v-bind:class="{'is-loading' : loaging}"
      class="button is-link is-rounded float-right"
    >{{tab_details.atual_page == 5 ? 'Finalizar' : 'Avançar'}}</a>
  </div>
</template>

<script>
import Sumario from '~/components/sumario'
import Validators from '~/helpers/validators'
import Termo from '~/components/termo-de-adesao'

export default {
  name: 'Dados',
  props: {
    tab_details: {
      atual_page: ''
    }
  },
  data() {
    return {
      modal_termo: false,
      loaging: false,
      isShow: false,
      erros: [],
      erro_msgs: [],
      corretora: {
        comprador_nome: '',
        comprador_nome_error: false,
        nome_fantasia: '',
        nome_fantasia_error: false,
        email: '',
        email_error: false,
        telefone: '',
        telefone_error: false,
        cpf_cnpj: '',
        cpf_cnpj_error: false,
        aceito: false,
        aceito_error: false
      }
    }
  },
  components: {
    Sumario,
    Termo
  },
  mounted() {
    this.corretora.comprador_nome = this._02_Dados.comprador_nome
    this.corretora.nome_fantasia = this._02_Dados.nome_fantasia
    this.corretora.email = this._02_Dados.email
    this.corretora.telefone = this._02_Dados.telefone
    this.corretora.cpf_cnpj = this._02_Dados.cpf_cnpj
    this.corretora.aceito = this._02_Dados.aceito
  },
  methods: {
    alertar_erro() {
      for (var i = 0; i < this.erros.length; i++) {
        this.erro_msgs.push(this.erros[i].msg)
        if (this.erros[i].campo == 'nome')
          this.corretora.comprador_nome_error = true
        if (this.erros[i].campo == 'fantasia')
          this.corretora.nome_fantasia_error = true
        if (this.erros[i].campo == 'email') this.corretora.email_error = true
        if (this.erros[i].campo == 'telefone')
          this.corretora.telefone_error = true
        if (this.erros[i].campo == 'cpf_cnpj')
          this.corretora.cpf_cnpj_error = true
        if (this.erros[i].campo == 'aceito') this.corretora.aceito_error = true
      }
      this.isShow = true
    },
    troca_tab(sentido) {
      if (sentido) {
        this.loaging = true;
        this.erros, this.erro_msgs = [];
        this.isShow = false;
        this.erros = Validators.validar_form_02_Dados(this.corretora);
        if(this.erros.length > 0){
          this.loaging = false;
          this.alertar_erro();
          return;
        }else{
          this.$store.dispatch('core/valida_autenticidade', this.corretora)
            .then(response => {
              if (this._02_Dados.autenticidade.cpf_cnpj) {
                this.erros.push({
                  campo: 'cpf_cnpj',
                  msg:
                    'O CPF ou CNPJ informado pertence a um cliente cadastrado em nossa base. Entre em contato conosco para reativar sua conta'
                })
              }
              if (this._02_Dados.autenticidade.email) {
                this.erros.push({
                  campo: 'email',
                  msg:
                    'O email informado pertence a um cliente cadastrado em nossa base. Entre em contato conosco para reativar sua conta'
                })
              }
              if (this.erros && this.erros.length > 0) {
                this.loaging = false
                this.alertar_erro()
                return
              }
              this.$store
                .dispatch('core/grava_02_Dados', this.corretora)
                .then(response => {
                  this.notifica_inicio_da_compra()
                  this.$emit('troca_tab', sentido)
                  this.loaging = false
                })
                .catch(response => {
                  this.loaging = false
                })
            })
            .catch(response => {
              console.log(response)
              //notifica erro ao validar autenticidade
            })
        }        
      } else {
        this.$store
          .dispatch('core/grava_02_Dados', this.corretora)
          .then(response => {
            this.$emit('troca_tab', sentido)
          })
      }
    },
    notifica_inicio_da_compra() {
      this.$store
        .dispatch('core/notifica_inicio_da_compra', this.corretora)
        .then(response => {})
    }
  },
  computed: {
    _02_Dados() {
      return this.$store.state.core.data_steps._02_Dados
    },
    validade_cpf_cnpj() {
      if (this.corretora.cpf_cnpj) {
        if (
          this.corretora.cpf_cnpj.length < 14 ||
          (this.corretora.cpf_cnpj.length > 14 &&
            this.corretora.cpf_cnpj.length < 18)
        ) {
          return 'incomplete'
        } else if (Validators.CNPJorCPFisValid(this.corretora.cpf_cnpj)) {
          return 'valid'
        } else {
          return 'invalid'
        }
      }
    },
    validade_email() {
      return Validators.validar_email(this.corretora.email)
    },
    validade_telefone() {
      return Validators.validar_telefone(this.corretora.telefone)
    }
  }
}
</script>

<style scoped>
.pt-6px {
  padding-top: 6px;
}
.input.is-small {
  font-size: 0.85rem !important;
}
.control.has-icons-left .input.is-small ~ .icon,
.control.has-icons-left
  .taginput
  .is-small.taginput-container.is-focusable
  ~ .icon,
.taginput
  .control.has-icons-left
  .is-small.taginput-container.is-focusable
  ~ .icon,
.control.has-icons-left .select.is-small ~ .icon,
.control.has-icons-right .input.is-small ~ .icon,
.control.has-icons-right
  .taginput
  .is-small.taginput-container.is-focusable
  ~ .icon,
.taginput
  .control.has-icons-right
  .is-small.taginput-container.is-focusable
  ~ .icon,
.control.has-icons-right .select.is-small ~ .icon {
  font-size: 0.85rem !important;
}
.h1 {
  font-size: 14pt;
}
.warning-color {
  color: #ffdd57;
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

.slide-enter-to,
.slide-leave {
  max-height: 100px;
  overflow: hidden;
}

.slide-enter,
.slide-leave-to {
  overflow: hidden;
  max-height: 0;
}

.modal-card-body {
  padding: 0px;
}

.checkbox-error{
  border: solid 1px #ffdd57;
  border-radius: 15px;
  padding-top: 5px;
  padding-right: 5px;
  padding-left: 8px;
  padding-bottom: 6px;
}
</style>
