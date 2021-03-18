import Ax from '../config/axios'

export const state = () => ({
  data_steps: {
    _01_Planos: {
      produtos: [],
      voucher_nome: '',
      voucher_vantagens: [],
      valor_total: 0,
      _status: false
    },
    _02_Dados: {
      comprador_nome: '',
      nome_fantasia: '',
      email: '',
      telefone: '',
      cpf_cnpj: '',
      aceito: false,
      autenticidade: {},
      _status: false
    },
    _03_Termo: {
      _status: false
    },
    _04_Pagamento: {
      valorTotal: 0,
      formaDePagamento: 'cartao',
      cartao: {
        numero: '',
        nome: '',
        sobrenome: '',
        vencimento: {
          mes: '01',
          ano: '2022'
        },
        cvc: '',
        banco: {
          img: '',
          nome: ''
        },
        token: ''
      },
      boleto: {
        name: '',
        cpf_cnpj: '',
        phone_prefix: '',
        phone: '',
        email: '',
        address: {
          street: '',
          number: '',
          district: '',
          city: '',
          state: '',
          zip_code: '',
          adjunct: ''
        }
      },
      _status: false
    },
    _05_Confirmacao: {
      customer_id: '',
      subscription_id: '',
      broker: '',
      jwt: '',
      _status: false
    }
  }
})

export const mutations = {
  aplicar_produto(state, payload) {
    state.data_steps._01_Planos.produtos = payload
  },
  excluir_produto(state, payload) {
    for (var i = 0; i < state.data_steps._01_Planos.produtos.length; i++) {
      if (state.data_steps._01_Planos.produtos[i].id === payload) {
        state.data_steps._01_Planos.produtos.splice(i, 1)
      }
    }
  },
  excluir_voucher(state) {
    state.data_steps._01_Planos.voucher_nome = ''
    state.data_steps._01_Planos.voucher_vantagens = []
  },
  aplicar_voucher(state, payload) {
    state.data_steps._01_Planos.voucher_nome = payload.codigo
    if (payload.primeira_parcela > 0) {
      if (payload.primeira_parcela == '1') {
        state.data_steps._01_Planos.voucher_vantagens.push({
          valor_desconto: 0.0,
          descricao: 'Primeiro mês grátis',
          periodo: payload.primeira_parcela,
          quanto: 100
        })
      } else {
        state.data_steps._01_Planos.voucher_vantagens.push({
          valor_desconto: 0.0,
          descricao: payload.primeira_parcela + ' mêses grátis',
          periodo: payload.primeira_parcela,
          quanto: 100
        })
      }
    }
    if (payload.valor > 1) {
      for (var j = 0; j < state.data_steps._01_Planos.produtos.length; j++) {
        if (state.data_steps._01_Planos.produtos[j].nome === 'Seu Produto') {
          var desconto = parseFloat(
            parseFloat(state.data_steps._01_Planos.produtos[j].valor) *
              parseFloat(payload.valor / 100)
          ) // desconto
          state.data_steps._01_Planos.voucher_vantagens.push({
            valor_desconto: parseFloat(
              Math.round(desconto * 100) / 100
            ).toFixed(2),
            descricao: payload.valor + '% de desconto',
            periodo: 0,
            quanto: payload.valor
          }) // desconto e descrição da vantagem
          state.data_steps._01_Planos.valor_total = (
            parseFloat(state.data_steps._01_Planos.produtos[j].valor) - desconto
          ).toFixed(2) // total
        }
      }
    }
  },
  grava_02_Dados(state, payload) {
    state.data_steps._02_Dados.comprador_nome = payload.comprador_nome
    state.data_steps._02_Dados.razao_social = payload.razao_social
    state.data_steps._02_Dados.nome_fantasia = payload.nome_fantasia
    state.data_steps._02_Dados.email = payload.email
    state.data_steps._02_Dados.telefone = payload.telefone
    state.data_steps._02_Dados.cpf_cnpj = payload.cpf_cnpj
    state.data_steps._02_Dados.aceito = true
    state.data_steps._02_Dados._status = true
  },
  grava_02_Dados_autenticidade(state, payload) {
    state.data_steps._02_Dados.autenticidade = payload
  },
  grava_03_Termo(state) {
    state.data_steps._03_Termo.aceito = true
    state.data_steps._03_Termo._status = true
  },
  grava_04_Pagamento(state, payload) {
    state.data_steps._04_Pagamento = payload
    state.data_steps._04_Pagamento._status = true
  },
  grava_05_Confirmacao(state, payload) {
    state.data_steps._05_Confirmacao.customer_id = payload.customer_id
    state.data_steps._05_Confirmacao.subscription_id = payload.subscription_id
    state.data_steps._05_Confirmacao._status = true
  },
  grava_05_Confirmacao_brokerEjwt(state, payload) {
    state.data_steps._05_Confirmacao.broker = payload.broker
    state.data_steps._05_Confirmacao.jwt = payload.jwt
  }
}

export const actions = {
  aplicar_voucher({ commit }, voucher) {
    return new Promise((resolve, reject) => {
      commit('excluir_voucher')
      commit('aplicar_voucher', {
        valor: 20,
        nome: 'Primeiro mês grátis',
        primeira_parcela: 1,
        exp: '2030-12-30',
        codigo: '1-MES-FREE'
      })
      resolve()
      // Ax.get('v1/voucher/codigo-valido', { params: { code: voucher } })
      //   .then(({ data }) => {
      //     commit('excluir_voucher')
      //     commit('aplicar_voucher', data)
      //     resolve()
      //   })
      //   .catch(error => {
      //     reject()
      //   })
    })
  },
  busca_plano({ commit }) {
    return new Promise((resolve, reject) => {
      // Ax.get('v2/payment/plan/identifier/plan_name')
      //   .then( response => {
      //     commit('aplicar_produto', [
      //       {
      //         id: 0,
      //         nome: response.data.name,
      //         plan_identifier: response.data.identifier,
      //         valor: (response.data.prices[0].value_cents/100).toFixed(2)
      //       }
      //     ])
      //     resolve();
      //   })      
      commit('aplicar_produto', [
        {id: 1, nome: 'Plano Top Lacrante', valor: '49.99'}
      ])
      resolve();
    })
  },
  grava_02_Dados({ commit }, dados) {
    return new Promise(resolve => {
      commit('grava_02_Dados', dados)
      resolve()
    })
  },
  grava_04_Pagamento({ commit }, dados) {
    return new Promise(resolve => {
      commit('grava_04_Pagamento', dados)
      resolve()
    })
  },
  finaliza_compra_CC({ commit }, dados) {
    return new Promise((resolve, reject) => {
      let voucher = {}
      var price_cents = 0
      var primeiro_mes = 0
      if (dados._01_Planos.voucher_nome != '') {
        for (var i = 0; i < dados._01_Planos.voucher_vantagens.length; i++) {
          price_cents =
            price_cents + dados._01_Planos.voucher_vantagens[i].valor_desconto
          primeiro_mes =
            primeiro_mes + dados._01_Planos.voucher_vantagens[i].periodo
        }
        voucher = {
          description: dados._01_Planos.voucher_nome,
          price_cents: price_cents * 100 * -1,
          quantity: 1,
          recurrent: true
        }
      }
      Ax.post('v2/payment/payment/withcreditcard', {
        email: dados._02_Dados.email,
        name: dados._02_Dados.nome_fantasia,
        cpf_cnpj: dados._02_Dados.cpf_cnpj,
        token_payment: dados._04_Pagamento.cartao.token,
        first_month: primeiro_mes,
        plan_identifier: dados._01_Planos.produtos[0].plan_identifier,
        voucher: voucher
      })
        .then(response => {
          commit('grava_05_Confirmacao', response.data)
          resolve()
        })
        .catch(response => {
          reject()
        })
    })
  },
  finaliza_compra_BB({ commit }, dados) {
    return new Promise((resolve, reject) => {
      var price_cents = 0
      var primeiro_mes = 0
      let voucher = {}
      if (dados._01_Planos.voucher_nome != '') {
        for (var i = 0; i < dados._01_Planos.voucher_vantagens.length; i++) {
          price_cents =
            price_cents + dados._01_Planos.voucher_vantagens[i].valor_desconto
          primeiro_mes =
            primeiro_mes + dados._01_Planos.voucher_vantagens[i].periodo
        }
        voucher = {
          description: dados._01_Planos.voucher_nome,
          price_cents: price_cents * 100 * -1,
          quantity: 1,
          recurrent: true
        }
      }
      Ax.post('v1/payment/payment/withbankslip', {
        email: dados._04_Pagamento.boleto.email,
        name: dados._04_Pagamento.boleto.name,
        cpf_cnpj: dados._04_Pagamento.boleto.cpf_cnpj,
        phone_prefix: dados._04_Pagamento.boleto.phone_prefix
          .slice(0, 3)
          .match(/\d/g)
          .join(''),
        phone: dados._04_Pagamento.boleto.phone,
        zip_code: dados._04_Pagamento.boleto.address.zip_code,
        number: dados._04_Pagamento.boleto.address.number,
        street: dados._04_Pagamento.boleto.address.street,
        city: dados._04_Pagamento.boleto.address.city,
        state: dados._04_Pagamento.boleto.address.state,
        district: dados._04_Pagamento.boleto.address.district,
        adjunct: dados._04_Pagamento.boleto.address.adjunct,
        first_month: primeiro_mes,
        plan_identifier: dados._01_Planos.produtos[0].plan_identifier,
        voucher: voucher
      })
        .then(response => {
          commit('grava_05_Confirmacao', response.data)
          resolve()
        })
        .catch(error => {
          reject()
        })
    })
  },
  cadastra_corretor({ commit }, dados) {
    return new Promise((resolve, reject) => {
      Ax.post('v2/brokers', {
        email: dados._02_Dados.email,
        name: dados._02_Dados.nome_fantasia,
        cpf_cnpj: dados._02_Dados.cpf_cnpj,
        phone: dados._02_Dados.telefone,
        zip_code: dados._04_Pagamento.boleto.address.zip_code,
        number: dados._04_Pagamento.boleto.address.number,
        street: dados._04_Pagamento.boleto.address.street,
        city: dados._04_Pagamento.boleto.address.city,
        state: dados._04_Pagamento.boleto.address.state,
        district: dados._04_Pagamento.boleto.address.district,
        adjunct: dados._04_Pagamento.boleto.address.adjunct,
        subscription_id: dados._05_Confirmacao.subscription_id,
        customer_id: dados._05_Confirmacao.customer_id,
        voucher: dados._01_Planos.voucher_nome
      })
        .then(response => {
          commit('grava_05_Confirmacao_brokerEjwt', response.data)
          resolve()
        })
        .catch(error => {
          reject()
        })
    })
  },
  valida_autenticidade({ commit }, dados) {
    return new Promise((resolve, reject) => {
      commit('grava_02_Dados_autenticidade', 
        {
          "cpf_cnpj": false,
          "email": false
        }
      )
      resolve()
      // Ax.post('v2/broker/check', {
      //   cpf_cnpj: dados.cpf_cnpj,
      //   email: dados.email
      // })
      //   .then(response => {
      //     commit('grava_02_Dados_autenticidade', response.data)
      //     resolve()
      //   })
      //   .catch(response => {
      //     console.log(response.data)
      //     reject()
      //   })
    })
  },
  notifica_inicio_da_compra({ commit }, dados) {
    return new Promise((resolve, reject) => {
      Ax.post('v2/broker/start-payment', {
        email: dados.email,
        name: dados.comprador_nome,
        broker_name: dados.nome_fantasia,
        cpf_cnpj: dados.cpf_cnpj,
        phone: dados.telefone
      }).then(response => {})
    })
  }
}
