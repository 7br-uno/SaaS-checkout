function validar_CNPJ(c){
  var b = [6,5,4,3,2,9,8,7,6,5,4,3,2];

  if((c = c.replace(/[^\d]/g,"")).length != 14)
    return 'incomplete';

  if(/0{14}/.test(c))
    return 'invalid';

  for (var i = 0, n = 0; i < 12; n += c[i] * b[++i]);
  if(c[12] != (((n %= 11) < 2) ? 0 : 11 - n))
    return 'invalid';

  for (var i = 0, n = 0; i <= 12; n += c[i] * b[i++]);
  if(c[13] != (((n %= 11) < 2) ? 0 : 11 - n))
    return 'invalid';

  return 'valid';
}

function CNPJorCPFisValid(cpf_cnpj) {
  if (cpf_cnpj.replace(/[^\d]+/g, "").length == 11){
    var strCPF = cpf_cnpj.replace(/[^\d]+/g, "");
    var Soma;
    var Resto;
    Soma = 0;
    if (strCPF == "00000000000") return false;

    for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

    Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
  }else if (cpf_cnpj.replace(/[^\d]+/g, "").length == 14){
    var confirm = cpf_cnpj.replace(/[^\d]+/g, "");

    if (confirm.length != 14) return false;

    // Elimina CNPJs invalidos conhecidos
    if (
      confirm == "00000000000000" ||
      confirm == "11111111111111" ||
      confirm == "22222222222222" ||
      confirm == "33333333333333" ||
      confirm == "44444444444444" ||
      confirm == "55555555555555" ||
      confirm == "66666666666666" ||
      confirm == "77777777777777" ||
      confirm == "88888888888888" ||
      confirm == "99999999999999"
    )
      return false;

    // Valida DVs
    var tamanho = confirm.length - 2;
    var numeros = confirm.substring(0, tamanho);
    var digitos = confirm.substring(tamanho);
    var soma = 0;
    var pos = tamanho - 7;
    var i;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0)) return false;

    tamanho = tamanho + 1;
    numeros = confirm.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1)) return false;

    return true;
  }
  return false;
}

function validar_email(email) {
  if(email.length == 0){
    return 'incomplete';
  }
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(re.test(String(email).toLowerCase())){
    return 'valid';
  }else{
    return 'invalid';
  }
}

//Função que valida telefone + DDD
function validar_telefone(telefone) {
  if(telefone.length == 0){
    return 'incomplete'
  }else if(telefone.length >= 14){
    return 'valid';
  }else{
    return 'invalid';
  }
}

function validar_vazio(campo){
  if(campo && campo.length > 0){
    return true
  }else{
    return false
  }
}

function validar_form_02_Dados(dados){
  var erros = [];
  if(!validar_vazio(dados.comprador_nome)){
    erros.push({campo: 'nome', msg: 'Informe o seu nome'});
  }
  if(!validar_vazio(dados.nome_fantasia)){
    erros.push({campo: 'fantasia', msg: 'Informe o nome fantasia da corretora'});
  }
  if(validar_email(dados.email) == 'incomplete' || validar_email(dados.email) == 'invalid'){
    erros.push({campo: 'email', msg: 'Informe o email da corretora'});
  }
  if(validar_telefone(dados.telefone) == 'incomplete' || validar_telefone(dados.telefone) == 'invalid'){
    erros.push({campo: 'telefone', msg: 'Informe o telefone da corretora'});
  }
  if(!CNPJorCPFisValid(dados.cpf_cnpj)){
    erros.push({campo: 'cpf_cnpj', msg: 'Informe corretamente o seu CPF ou o CNPJ da corretora'});
  }
  if(!dados.aceito){
    erros.push({campo: 'aceito', msg: 'Você precisa aceitar nosso termo de adesão'});
  }
  return erros;
}

function validar_form_04_Pagamento(dados){
  if(dados.formaDePagamento == 'cartao'){
    let erros = [];
    if(!Iugu.utils.validateCreditCardNumber(dados.cartao.numero)){
      erros.push({campo: 'numero', msg: 'Informe corretamente o número do cartão de crédito'});
    }
    if(!validar_vazio(dados.cartao.nome)){
      erros.push({campo: 'nome', msg: 'Informe o seu nome'});
    }
    if(!validar_vazio(dados.cartao.sobrenome)){
      erros.push({campo: 'sobrenome', msg: 'Informe o seu sobrenome'});
    }
    if(!Iugu.utils.validateExpiration(dados.cartao.vencimento.mes, dados.cartao.vencimento.ano)) {
      erros.push({campo: 'vencimento', msg: 'Informe corretamente a data do vencimento'});
    }
    if(!dados.cartao.cvc || dados.cartao.cvc.length < 3){
      erros.push({campo: 'cvc', msg: 'Informe corretamente o código verificador'});
    }
    return erros;
  }else if(dados.formaDePagamento == 'boleto'){
    let erros = [];
    if(!validar_vazio(dados.boleto.name)){
      erros.push({campo: 'name', msg: 'Informe o nome'});
    }
    if(!CNPJorCPFisValid(dados.boleto.cpf_cnpj)){
      erros.push({campo: 'cpf_cnpj', msg: 'Informe corretamente o CPF ou CNPJ'});
    }
    if(!dados.boleto.phone_prefix || dados.boleto.phone_prefix.length <= 3){
      erros.push({campo: 'phone_prefix', msg: 'Informe o DDD do telefone'});
    }
    if(!dados.boleto.phone || dados.boleto.phone.length < 9){
      erros.push({campo: 'phone', msg: 'Informe o telefone'});
    }
    if(validar_email(dados.boleto.email) == 'incomplete' || validar_email(dados.boleto.email) == 'invalid'){
      erros.push({campo: 'email', msg: 'Informe o email'});
    }
    if(!validar_vazio(dados.boleto.address.street)){
      erros.push({campo: 'street', msg: 'Informe a rua'});
    }
    if(!validar_vazio(dados.boleto.address.number)){
      erros.push({campo: 'number', msg: 'Informe o número'});
    }
    if(!validar_vazio(dados.boleto.address.district)){
      erros.push({campo: 'district', msg: 'Informe o bairro'});
    }
    if(!validar_vazio(dados.boleto.address.city)){
      erros.push({campo: 'city', msg: 'Informe a cidade'});
    }
    if(!validar_vazio(dados.boleto.address.state)){
      erros.push({campo: 'state', msg: 'Informe o estado'});
    }
    if(!validar_vazio(dados.boleto.address.zip_code)){
      erros.push({campo: 'zip_code', msg: 'Informe o CEP'});
    }
    return erros;
  }
}

export default {
  validar_CNPJ,
  validar_email,
  validar_telefone,
  validar_form_02_Dados,
  validar_form_04_Pagamento,
  CNPJorCPFisValid
};
