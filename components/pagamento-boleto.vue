<template>
  <div class="boleto">
    <header>
      <h1 class="text-align-center">Informações para o boleto</h1>
    </header>
    <section>
      <label>
        <b>Nome Completo:</b> {{boleto.name}}<br>
        <b>CPF/CNPJ:</b> {{boleto.cpf_cnpj}}<br>
        <b>Telefone:</b> {{boleto.phone_prefix}} {{boleto.phone}}<br>
        <b>Email:</b> {{boleto.email}}<br>
        <b>CEP:</b> {{boleto.address.zip_code}}<br>
        <b>Rua:</b> {{boleto.address.street}}<br>
        <b>Número:</b> {{boleto.address.number}}<br>
        <b>Bairro:</b> {{boleto.address.district}}<br>
        <b>Cidade:</b> {{boleto.address.city}}<br>
        <b>Estado:</b> {{boleto.address.state}}<br>
        <b>Complemento:</b> {{boleto.address.adjunct}}<br>
      </label>
    </section>
    <footer>
      <img src="~/static/images/barra.png" class="codigo-de-barras" alt="">
    </footer>
  </div>
</template>

<script>
  export default {
    name: 'Boleto',
    props: {
      boleto: {
        nome: "",
        cpf_cnpj: "",
        phone_prefix: "",
        phone: "",
        email: "",
        address: {
          zip_code: "",
          street: "",
          number: "",
          district: "",
          city: "",
          state: "",
          adjunct: "",
        }
      }
    },
    data(){
      return{

      }
    }
  }
</script>

<style scoped>
  .boleto {
    position: relative;
    max-width: 420px;
    margin-bottom: 85px;
    margin-right: 10px;
    border-radius: 7px;
    -webkit-box-shadow: 10px 15px 20px -10px rgba(0, 0, 0, 0.1);
    box-shadow: 10px 15px 20px -10px rgba(0, 0, 0, 0.1);
    -webkit-transition: all 1s;
    transition: all 1s;
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    margin: auto;
    background-color: rgb(247, 247, 247);
  }
  .boleto header {
    padding: 30px;
    background-color: #f2f2f2;
    border-radius: 10px 10px 0 0;
  }
  .boleto section {
    padding: 30px;
    text-transform: uppercase;
    font-size: 7pt;
    font-family: Arial, Helvetica, sans-serif;
  }
  .boleto section label {
    text-transform: uppercase;
  }
  .boleto header h1 {
    font-size: 15px;
    text-transform: uppercase;
  }
  .boleto footer {
    padding: 30px;
    border-top: dashed rgba(0, 0, 0, 0.3) 1px;
  }
  .codigo-de-barras {
    width: 100%;
    height: 54px;
    display: block;
  }
</style>
