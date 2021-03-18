<template>
  <div>
    <div class="pd-3 mb-1 border-bot">
      <Sumario/>
      <h5>
        <b>Plugar programa de bonificação</b>
      </h5>
      <h6 class="txt mb-3">
        Escolha abaixo o que melhor atende seus anseios, estrategias de mkt e bla bla bla:
      </h6>
      <div class="columns is-mobile pt-0">
        <div class="column is-1 plus pr-0 pt-0">
          <i class="fas fa-plus-circle"></i>
        </div>
        <div class="column pl-0 pt-0">
          <div class="card-funcionalidade pd-1">
            <div class="columns">
              <div class="column is-1 pr-0 pl-0 text-align-center">
                <img class="logo-funcionalidades" src="https://s2.logaster.com/static/v3/img/logo_design/pt/logo_on_white_background.png"/>
              </div>
              <div class="column is-9 pr-0">
                Xurebs é um programa de benefícios que agrega mais de 300 empresas, como bancos, supermercados, livrarias, cinemas, postos de gasolinas drogarias, etc. Consiste basicamente no acúmulo de pontos através de compras nestes estabelecimentos, para serem trocados por prêmios e serviços oferecidos.
              </div>
              <div class="column text-align-center pl-0 pt-2">
                <span class="font-8">De </span><strike>199,90<span class="font-8">/mês</span></strike><br>
                <span class="font-8">por apenas</span><br>
                <b>R$ 99,90<span class="font-8">/mês</span></b>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="columns is-mobile pt-0">
        <div class="column is-1 plus pr-0 pt-0">
          <i class="fas fa-plus-circle"></i>
        </div>
        <div class="column pl-0 pt-0">
          <div class="card-funcionalidade pd-1">
            <div class="columns">
              <div class="column is-1 pr-0 pl-0 text-align-center">
                <img class="logo-funcionalidades" src="https://s2.logaster.com/static/v3/img/logo_design/pt/logo_on_white_background.png"/>
              </div>
              <div class="column is-9 pr-0">
                Tico Tico é um programa de benefícios que agrega mais de 300 empresas, como bancos, supermercados, livrarias, cinemas, postos de gasolinas drogarias, etc. Consiste basicamente no acúmulo de pontos através de compras nestes estabelecimentos, para serem trocados por prêmios e serviços oferecidos.
              </div>
              <div class="column text-align-center pl-0 pt-2">
                <span class="font-8">De </span><strike>199,90<span class="font-8">/mês</span></strike><br>
                <span class="font-8">por apenas</span><br>
                <b>R$ 99,90<span class="font-8">/mês</span></b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <a @click="troca_tab(true)" class="button is-link is-rounded float-right">{{tab_details.atual_page == 5 ? 'Finalizar' : 'Avançar'}}</a>
  </div>
</template>

<script>
  import Sumario from '~/components/sumario';
  export default {
    name: 'Planos',
    props: {
      tab_details: {
        atual_page: ''
      }
    },
    components:{
      Sumario
    },
    methods:{
      troca_tab(sentido){
        this.$emit('troca_tab', sentido);
      }
    }
  }
</script>

<style scoped>
  .card-funcionalidade{
    font-size: 10pt;
    border-radius: 10px;
    border: 1px #dbdbdb solid;
    border-collapse:separate;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
  }
  .plus{
    color: #dbdbdb;
    display: flex;
    align-items: center;
    font-size: 20pt;
  }
  .logo-funcionalidades{
    padding-left: 10px;
    padding-top: 10px;
  }
  .font-8{
    font-size: 8pt;
  }
</style>
