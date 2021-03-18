<template>
  <div>
    <div class="columns mb-0">
      <div class="column is-12 pt-0">
        <div class="field">
          <label class="label-field">
            Nome:
          </label>
          <div class="control has-icons-right">
            <input class="input is-small is-rounded" type="text" name="nome" placeholder="Bruno Neves Pereira" label="Nome Completo" v-model="boleto.name" required>
            <span class="icon is-small is-right">
              <i v-if="boleto.name && boleto.name.length > 0" class="fas fa-check"></i>
              <i v-for="prop_erro in prop_erros" v-if="prop_erro.campo == 'name' && boleto.name.length == 0" class="warning-color fas fa-exclamation-circle"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="columns mb-0">
      <div class="column is-12 pt-0">
        <div class="field">
          <label class="label-field">
            CPF ou CNPJ:
          </label>
          <div class="control has-icons-right">
            <input class="input is-small is-rounded" type="text" name="cpf" placeholder="012.345.678-99" label="CPF ou CNPJ" v-model="boleto.cpf_cnpj" v-mask="['###.###.###-##', '##.###.###/####-##']" required>
            <span class="icon is-small is-right">
              <i v-if="CNPJorCPFisValid == 'valid'" class="fas fa-check"></i>
              <i v-if="prop_erro.campo == 'cpf_cnpj' && CNPJorCPFisValid != 'valid'" v-for="prop_erro in prop_erros" class="warning-color fas fa-exclamation-circle"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="columns mb-0">
      <div class="column is-4 tablet-padding pt-5x">
        <div class="field">
          <label class="label-field">
            DDD:
          </label>
          <div class="control has-icons-right">
            <input class="input is-small is-rounded" type="text" name="prefixo" placeholder="(11)" v-model="boleto.phone_prefix" v-mask="'(##)'" required>
            <span class="icon is-small is-right">
              <i v-if="boleto.phone_prefix && boleto.phone_prefix.length > 3" class="fas fa-check"></i>
              <i v-for="prop_erro in prop_erros" v-if="prop_erro.campo == 'phone_prefix' && boleto.phone_prefix.length <= 2" class="warning-color fas fa-exclamation-circle"></i>
            </span>
          </div>
        </div>
      </div>
      <div class="column is-8 pt-5x">
        <div class="field">
          <label class="label-field">
            Telefone:
          </label>
          <div class="control has-icons-right">
            <input class="input is-small is-rounded" type="text" name="telefone" placeholder="91234-5487" v-model="boleto.phone" v-mask="['####-####', '#####-####']" required>
            <span class="icon is-small is-right">
              <i v-if="boleto.phone && boleto.phone.length > 8" class="fas fa-check"></i>
              <i v-for="prop_erro in prop_erros" v-if="prop_erro.campo == 'phone' && boleto.phone.length <= 8" class="warning-color fas fa-exclamation-circle"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="columns mb-0">
      <div class="column is-12 pt-0">
        <div class="field">
          <label class="label-field">
            E-mail:
          </label>
          <div class="control has-icons-right">
            <input class="input is-small is-rounded" type="text" name="email" placeholder="seu@email.com" label="email" v-model="boleto.email" required>
            <span class="icon is-small is-right">
              <i v-if="validade_email == 'valid'" class="fas fa-check"></i>
              <i v-if="prop_erro.campo == 'email' && validade_email != 'valid'" v-for="prop_erro in prop_erros" class="warning-color fas fa-exclamation-circle"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="columns mb-0">
      <div class="column is-12 pt-0">
        <div class="field">
          <label class="label-field">
            CEP:
          </label>
          <div v-bind:class="{'is-loading' : buscando_cep}" class="control has-icons-right">
            <input class="input is-small is-rounded" type="text" name="cep" placeholder="01234-567" label="CEP" v-model="boleto.address.zip_code" v-mask="'#####-###'" required>
            <span class="icon is-small is-right">
              <i v-if="boleto.address.zip_code && boleto.address.zip_code.length > 8 && !buscando_cep && cep_status" class="fas fa-check"></i>
              <i v-for="prop_erro in prop_erros" v-if="prop_erro.campo == 'zip_code' && !cep_status" class="warning-color fas fa-exclamation-circle"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="columns mb-0">
      <div class="column is-8 tablet-padding pt-5x">
        <div class="field">
          <label class="label-field">
            Rua:
          </label>
          <div class="control has-icons-right">
            <input class="input is-small is-rounded" type="text" name="street" placeholder="Rua Guaianases" v-model="boleto.address.street" required>
            <span class="icon is-small is-right">
              <i v-if="boleto.address.street && boleto.address.street.length > 0" class="fas fa-check"></i>
              <i v-for="prop_erro in prop_erros" v-if="prop_erro.campo == 'street' && boleto.address.street < 1" class="warning-color fas fa-exclamation-circle"></i>
            </span>
          </div>
        </div>
      </div>
      <div class="column is-4 pt-5x">
        <div class="field">
          <label class="label-field">
            Número:
          </label>
          <div class="control has-icons-right">
            <input class="input is-small is-rounded" type="text" name="number" placeholder="1227" v-model="boleto.address.number" required>
            <span class="icon is-small is-right">
              <i v-if="boleto.address.number && boleto.address.number.length > 0" class="fas fa-check"></i>
              <i v-for="prop_erro in prop_erros" v-if="prop_erro.campo == 'number' && boleto.address.number < 1" class="warning-color fas fa-exclamation-circle"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="columns mb-0">
      <div class="column is-6 tablet-padding pt-5x">
        <div class="field">
          <label class="label-field">
            Bairro:
          </label>
          <div class="control has-icons-right">
            <input class="input is-small is-rounded" type="text" name="district" placeholder="Campos Elíseos" v-model="boleto.address.district" required>
            <span class="icon is-small is-right">
              <i v-if="boleto.address.district && boleto.address.district.length > 0" class="fas fa-check"></i>
              <i v-for="prop_erro in prop_erros" v-if="prop_erro.campo == 'district' && boleto.address.district < 1" class="warning-color fas fa-exclamation-circle"></i>
            </span>
          </div>
        </div>
      </div>
      <div class="column is-6 pt-5x">
        <div class="field">
          <label class="label-field">
            Cidade:
          </label>
          <div class="control has-icons-right">
            <input class="input is-small is-rounded" type="text" name="city" placeholder="São Paulo" v-model="boleto.address.city" required>
            <span class="icon is-small is-right">
              <i v-if="boleto.address.city && boleto.address.city.length > 0" class="fas fa-check"></i>
              <i v-for="prop_erro in prop_erros" v-if="prop_erro.campo == 'city' && boleto.address.city < 1" class="warning-color fas fa-exclamation-circle"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="columns mb-0">
      <div class="column is-3 tablet-padding pt-5x">
<!--        <div class="field">-->
<!--          <label class="label-field">-->
<!--            Estado:-->
<!--          </label>-->
<!--          <div class="control has-icons-right">-->
<!--            <input class="input is-small is-rounded" type="text" name="estado" placeholder="SP" v-model="boleto.address.state" required>-->
<!--            <span class="icon is-small is-right">-->
<!--              <i v-if="boleto.address.state && boleto.address.state.length > 0" class="fas fa-check"></i>-->
<!--              <i v-for="prop_erro in prop_erros" v-if="prop_erro.campo == 'state' && boleto.address.state < 1" class="warning-color fas fa-exclamation-circle"></i>-->
<!--            </span>-->
<!--          </div>-->
<!--        </div>-->
        <div class="field">
          <label class="label-field">
            Estado:
          </label>
          <div class="select is-rounded is-small w-100p">
            <select v-model="boleto.address.state" class="w-100p">
              <option value="AC">AC</option>
              <option value="AL">AL</option>
              <option value="AP">AP</option>
              <option value="AM">AM</option>
              <option value="BA">BA</option>
              <option value="CE">CE</option>
              <option value="DF">DF</option>
              <option value="ES">ES</option>
              <option value="GO">GO</option>
              <option value="MA">MA</option>
              <option value="MT">MT</option>
              <option value="MS">MS</option>
              <option value="MG">MG</option>
              <option value="PA">PA</option>
              <option value="PB">PB</option>
              <option value="PR">PR</option>
              <option value="PE">PE</option>
              <option value="PI">PI</option>
              <option value="RJ">RJ</option>
              <option value="RN">RN</option>
              <option value="RS">RS</option>
              <option value="RO">RO</option>
              <option value="RR">RR</option>
              <option value="SC">SC</option>
              <option value="SP">SP</option>
              <option value="SE">SE</option>
              <option value="TO">TO</option>
            </select>
          </div>
        </div>
      </div>
      <div class="column is-9 pt-5x">
        <div class="field">
          <label class="label-field">
            Complemento:
          </label>
          <div class="control has-icons-right">
            <input class="input is-small is-rounded" type="text" name="complemento" placeholder="Sala 2" v-model="boleto.address.adjunct" required>
            <span class="icon is-small is-right">
              <i v-if="false" class="fas fa-check"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Validators from '~/helpers/validators';
  import axios from "axios";
  const correioInstance = axios.create({
    headers: {
      Accept: "application/json"
    }
  });
  export default {
    name: 'Form-boleto',
    props:{
      prop_erros: {}
    },
    data(){
      return{
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
            state: "SP",
            zip_code: "",
            adjunct: ""
          }
        },
        buscando_cep: false,
        cep_status: false
      }
    },
    mounted(){
      if(!this._04_Pagamento._status){
        if(this._02_Dados.cpf_cnpj.length > 14){
          this.boleto.name = this._02_Dados.nome_fantasia;
        }else{
          this.boleto.name = this._02_Dados.comprador_nome;
        }
        this.boleto.cpf_cnpj = this._02_Dados.cpf_cnpj;
        this.boleto.phone_prefix = this._02_Dados.telefone;
        this.boleto.phone = this._02_Dados.telefone.slice(5);
        this.boleto.email = this._02_Dados.email;
      }else{
        this.boleto.name = this._04_Pagamento.boleto.name;
        this.boleto.cpf_cnpj = this._04_Pagamento.boleto.cpf_cnpj;
        this.boleto.phone_prefix = this._04_Pagamento.boleto.phone_prefix;
        this.boleto.phone = this._04_Pagamento.boleto.phone;
        this.boleto.email = this._04_Pagamento.boleto.email;
      }
      this.boleto.address.street = this._04_Pagamento.boleto.address.street;
      this.boleto.address.number = this._04_Pagamento.boleto.address.number;
      this.boleto.address.district = this._04_Pagamento.boleto.address.district;
      this.boleto.address.city = this._04_Pagamento.boleto.address.city;
      this.boleto.address.state = this._04_Pagamento.boleto.address.state;
      this.boleto.address.zip_code = this._04_Pagamento.boleto.address.zip_code;
      this.boleto.address.adjunct = this._04_Pagamento.boleto.address.adjunct;
    },
    methods:{
      buscar_cep(){
        this.buscando_cep = true;
        this.cep_status = true;
        correioInstance({
          method: "get",
          url:
            "https://viacep.com.br/ws/" +
            this.boleto.address.zip_code +
            "/json/"
        }).then(response => {
          this.$emit('status_CEP', response.data.erro);
          response.data.erro ? this.cep_status = false : this.cep_status = true;
          this.boleto.address.street = response.data.logradouro;
          this.boleto.address.district = response.data.bairro;
          this.boleto.address.city = response.data.localidade;
          this.boleto.address.state = response.data.uf;
          this.buscando_cep = false;
        }).catch(response=>{
          this.buscando_cep = false;
        });
      }

    },
    watch:{
      'boleto.name': function() {
        this.$emit('attDados', this.boleto);
      },
      'boleto.cpf_cnpj': function() {
        this.$emit('attDados', this.boleto);
      },
      'boleto.phone_prefix': function() {
        this.$emit('attDados', this.boleto);
      },
      'boleto.phone': function() {
        this.$emit('attDados', this.boleto);
      },
      'boleto.email': function() {
        this.$emit('attDados', this.boleto);
      },
      'boleto.address.zip_code': function() {
        this.$emit('attDados', this.boleto);
        if(this.boleto.address.zip_code.length == 9){
          this.buscar_cep();
        }
      },
      'boleto.address.street': function() {
        this.$emit('attDados', this.boleto);
      },
      'boleto.address.number': function() {
        this.$emit('attDados', this.boleto);
      },
      'boleto.address.district': function() {
        this.$emit('attDados', this.boleto);
      },
      'boleto.address.city': function() {
        this.$emit('attDados', this.boleto);
      },
      'boleto.address.state': function() {
        this.$emit('attDados', this.boleto);
      },
      'boleto.address.adjunct': function() {
        this.$emit('attDados', this.boleto);
      }
    },
    computed:{
      _04_Pagamento(){
        return this.$store.state.core.data_steps._04_Pagamento;
      },
      _02_Dados(){
        return this.$store.state.core.data_steps._02_Dados;
      },
      CNPJorCPFisValid(){
        if(this.boleto.cpf_cnpj){
          if( this.boleto.cpf_cnpj.length < 14 || (this.boleto.cpf_cnpj.length > 14 && this.boleto.cpf_cnpj.length < 18)){
            return 'incomplete'
          }else if(Validators.CNPJorCPFisValid(this.boleto.cpf_cnpj)){
            return 'valid'
          }else{
            return 'invalid'
          }
        }else{
          return 'incomplete'
        }
      },
      validade_email(){
        if(this.boleto.email){
          return Validators.validar_email(this.boleto.email);
        }else{
          return 'incomplete'
        }
      }
    }
  }
</script>

<style scoped>
  .warning-color{
    color: #ffdd57;
  }
  .control.is-loading::after{
    top: 0.34em !important;
    right: 0.50em !important;
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
  .w-100p{
    width: 100%;
  }
</style>
