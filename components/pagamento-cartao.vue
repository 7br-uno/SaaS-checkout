<template>
  <div class="cartao-container">
    <div class="columns">
      <div class="c column is-12">
        <div class="card" :class="{transform: rotateCard }">
          <div class="front" :style="{background: cards[cartaoSelecionado].cor}">
            <div class="type">
              <img class="bankid" :src="cartao.banco.img">
            </div>
            <span style="border-radius: 7px; left: 30px;" class="chip"></span>
            <span class="card_number">{{numeroCartao}}</span>
            <div class="date">{{vencimentoCartao.mes}} / {{vencimentoCartao.ano}}</div>
            <span class="fullname">{{nomeCartao}}</span>
          </div>
          <div class="back" :style="{background: cards[cartaoSelecionado].cor}">
            <div class="magnetic"></div>
            <div class="bar"></div>
            <span class="seccode">{{cvcCartao}}</span>
            <!--            <span style="border-radius: 7px; bottom: -190px;" class="chip"></span>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cartao: {
      numero: '',
      nome: '',
      sobrenome: '',
      vencimento: '',
      cvc: '',
      banco: {
        img: '',
        nome: ''
      }
    },
    rotateCard: false
  },
  data() {
    return {
      cards: [
        {
          nome: 'mastercard',
          cor: '#72237c',
          src: 'https://i.imgur.com/GQlI2H6.png'
        },
        {
          nome: 'visa',
          cor: '#00285f',
          src: 'https://i.imgur.com/dhK4mWb.png'
        },
        {
          nome: 'dinersclub',
          cor: '#AFB6C6',
          src: 'https://i.imgur.com/9R7wqXQ.png'
        },
        {
          nome: 'americanExpress',
          cor: '#C0E7ED',
          src:
            'https://i.imgur.com/GOq5hHV.png'
        },
        {
          nome: 'elo',
          cor: '#231F20',
          src: 'https://i.imgur.com/edbZs5p.png'
        },
        {
          nome: 'outro',
          cor: '#ccc',
          src: ''
        }
      ],
      cartaoSelecionado: 5
    }
  },
  methods: {
    ccvFocus() {
      this.rotateCard = true
    },
    ccvBlur() {
      this.rotateCard = false
    }
  },
  watch: {
    'cartao.numero'() {
      // console.log(Iugu.utils.getBrandByCreditCardNumber(this.cartao.numero.replace(/\s/g, '')));

      if (
        !Iugu.utils.getBrandByCreditCardNumber(
          this.cartao.numero.replace(/\s/g, '')
        )
      ) {
        this.cartaoSelecionado = 5
      } else if (
        Iugu.utils.getBrandByCreditCardNumber(
          this.cartao.numero.replace(/\s/g, '')
        ) == 'mastercard'
      ) {
        this.cartaoSelecionado = 0
      } else if (
        Iugu.utils.getBrandByCreditCardNumber(
          this.cartao.numero.replace(/\s/g, '')
        ) == 'visa'
      ) {
        this.cartaoSelecionado = 1
      } else if (
        Iugu.utils.getBrandByCreditCardNumber(
          this.cartao.numero.replace(/\s/g, '')
        ) == 'diners'
      ) {
        this.cartaoSelecionado = 2
      } else if (
        Iugu.utils.getBrandByCreditCardNumber(
          this.cartao.numero.replace(/\s/g, '')
        ) == 'amex'
      ) {
        this.cartaoSelecionado = 3
      } else if (
        Iugu.utils.getBrandByCreditCardNumber(
          this.cartao.numero.replace(/\s/g, '')
        ) == 'elo'
      ) {
        this.cartaoSelecionado = 4
      } else {
        this.cartaoSelecionado = 5
      }

      if (this.cartaoSelecionado != 5) {
        this.cartao.banco.img = this.cards[this.cartaoSelecionado].src
      } else {
        this.cartao.banco.img = ''
      }
    },
    'cartao.cvc'() {}
  },
  computed: {
    numeroCartao() {
      if (this.cartao.numero.length === 0) {
        return '**** **** **** ****'
      } else {
        return this.cartao.numero
      }
    },
    nomeCartao() {
      if (this.cartao.nome.length === 0) {
        return 'SEU NOME'
      } else {
        return this.cartao.nome + ' ' + this.cartao.sobrenome
      }
    },
    vencimentoCartao() {
      if (this.cartao.vencimento.length === 0) {
        return '10/2020'
      } else {
        return this.cartao.vencimento
      }
    },
    cvcCartao() {
      if (this.cartao.cvc.length === 0) {
        return '***'
      } else {
        return this.cartao.cvc
      }
    }
  }
}
</script>

<style>
.cartao-container .c {
  -webkit-perspective: 1000;
  perspective: 1000;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
}

.cartao-container .c .card {
  position: relative;
  width: 260px;
  height: 190px;
  margin-bottom: 85px;
  margin-right: 10px;
  border-radius: 17px;
  box-shadow: 10px 15px 20px -10px rgba(0, 0, 0, 0.1);
  transition: all 1s;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  margin: auto;
}

@media screen and (min-width: 769px) {
  .cartao-container .c .card {
    margin-right: 0;
  }
}

.cartao-container .c .card .front {
  position: absolute;

  border-radius: 17px;
  padding: 50px;
  width: 100%;
  height: 100%;
  transform: translateZ(1px);
  -webkit-transform: translateZ(1px);
  transition: background 0.3s;
  z-index: 50;
  background-image: repeating-linear-gradient(
      45deg,
      rgba(255, 255, 255, 0) 1px,
      rgba(255, 255, 255, 0.03) 2px,
      rgba(255, 255, 255, 0.04) 3px,
      rgba(255, 255, 255, 0.05) 4px
    ),
    -webkit-linear-gradient(-245deg, rgba(255, 255, 255, 0) 40%, rgba(
            255,
            255,
            255,
            0.2
          )
          70%, rgba(255, 255, 255, 0) 90%);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}
.cartao-container .c .card .front .type {
  position: absolute;
  width: 75px;
  height: 45px;
  top: 20px;
  right: 20px;
}
.cartao-container .c .card .front .type img {
  width: 80%;
  float: right;
}
.cartao-container .c .card .front .card_number {
  position: absolute;
  font-size: 15px;
  font-weight: 900;
  top: 100px;
  left: 30px;
  font-family: 'Nunito', sans-serif !important;
  transition: color 0.5s;
  text-align: center;
  -webkit-transition: color 0.3s ease-in;
  transition: color 0.3s ease-in;
  background-color: #f7f7f7;
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0.1em, #999),
    color-stop(0.7em, #fff)
  );
  background: -webkit-linear-gradient(top, #999 0.1em, #fff 0.7em);
  background: linear-gradient(180deg, #999 0.1em, #fff 0.7em);
  -webkit-background-clip: text;
  background-clip: text;
  letter-spacing: 1px;
  -webkit-filter: drop-shadow(0 1px 1px #000);
  filter: drop-shadow(0 1px 1px black);
  -webkit-text-fill-color: transparent;
}
.cartao-container .c .card .front .date {
  position: absolute;
  bottom: 40px;
  right: 15px;
  width: 90px;
  height: 35px;
  top: 150px;
  transition: color 0.5s;
  position: absolute;
  font-size: 12px;
  font-weight: 900;
  font-family: 'Nunito', sans-serif !important;
  transition: color 0.5s;
  text-align: center;
  -webkit-transition: color 0.3s ease-in;
  transition: color 0.3s ease-in;
  background-color: #f7f7f7;
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0.1em, #999),
    color-stop(0.7em, #fff)
  );
  background: -webkit-linear-gradient(top, #999 0.1em, #fff 0.7em);
  background: linear-gradient(180deg, #999 0.1em, #fff 0.7em);
  -webkit-background-clip: text;
  background-clip: text;
  letter-spacing: 1px;
  -webkit-filter: drop-shadow(0 1px 1px #000);
  filter: drop-shadow(0 1px 1px black);
  -webkit-text-fill-color: transparent;
}
.cartao-container .c .card .front .fullname {
  line-height: inherit;
  position: absolute;
  font-size: 12px;
  font-weight: 900px;
  top: 133px;
  left: 25px;
  transition: color 0.5s;
  text-transform: uppercase;
  font-family: 'Nunito', sans-serif !important;
  transition: color 0.5s;
  text-align: left;
  -webkit-transition: color 0.3s ease-in;
  transition: color 0.3s ease-in;
  background-color: #f7f7f7;
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0.1em, #999),
    color-stop(0.7em, #fff)
  );
  background: -webkit-linear-gradient(top, #999 0.1em, #fff 0.7em);
  background: linear-gradient(180deg, #999 0.1em, #fff 0.7em);
  -webkit-background-clip: text;
  background-clip: text;
  letter-spacing: 0px;
  -webkit-filter: drop-shadow(0 1px 1px #000);
  filter: drop-shadow(0 1px 1px black);
  -webkit-text-fill-color: transparent;
}
.cartao-container .c .card .back {
  position: absolute;
  width: 100%;
  border-radius: 17px;
  height: 100%;
  background: var(--card-color);
  -webkit-transform: rotateY(180deg);
  transform: rotateY(180deg);
}
.cartao-container .c .card .back .magnetic {
  position: absolute;
  width: 100%;
  height: 50px;
  background: rgba(0, 0, 0, 0.7);
  margin-top: 25px;
}
.cartao-container .c .card .back .bar {
  position: absolute;
  width: 60%;
  height: 30px;
  background: rgba(255, 255, 255, 0.7);
  left: 10px;
  margin-top: 100px;
}
.cartao-container .c .card .back .seccode {
  font-size: 13px;
  color: #fff;
  font-weight: 500;
  position: absolute;
  top: 100px;
  right: 40px;
}
.cartao-container .c .card .back .chip {
  bottom: 45px;
  left: 10px;
}
.cartao-container .c .card .back .disclaimer {
  position: absolute;
  width: 65%;
  left: 80px;
  color: #f1f1f1;
  font-size: 8px;
  bottom: 55px;
}
.cartao-container .c label {
  padding-left: 8px;
  font-size: 14px;
  color: rgb(145, 145, 145);
}
.cartao-container .c .ccv {
  width: 40%;
}
.cartao-container .c .buy {
  width: 260px;
  height: 50px;
  position: relative;
  display: block;
  margin: 20px auto;
  border-radius: 10px;
  border: none;
  background: #42c2df;
  color: white;
  font-size: 20px;
  transition: background 0.4s;
  cursor: pointer;
}
.cartao-container .c .buy i {
  font-size: 20px;
}
.cartao-container .c .buy:hover {
  background: #3594a9;
  transition: background 0.4s;
}
.chip {
  position: absolute;
  width: 55px;
  height: 40px;
  background: #bbb;
  border-radius: 7px !important;
}
.chip:after {
  content: '';
  display: block;
  width: 35px;
  height: 25px;
  border-radius: 4px !important;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  background: #ddd;
}

.transform {
  transform: rotatey(180deg);
}
</style>
