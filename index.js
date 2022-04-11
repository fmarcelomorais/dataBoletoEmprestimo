/*
    O usuario faz o emprestimo hoje.
    Caso ele gere o boleto na data do emprestimo(hoje) ate ao meio dia o boleto e gerado para o hoje + 1 dia util
    caso ele gere apos ao meio dia o boleto fica para hoje + 2 dias uteis
    se for feriado gera para o prox dia util
    sendo gerado no sabado ou domingo será gerado para o proximo dia util
    se for sabado até meio dia gera para proximo dia util
    se for domingo gera para prox dia util + 1
*/


const axios = require('axios')
const token = '640|31v4OVHsFaVud8E2VVvB168wtNHZyiZf'


async function gerarBoleto(dataEmissaoBoleto){
   const ano = '2022'
   const state = 'CE'
   const dias = ['domingo','segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'] 
   let diaDaSemana = dias[new Date(dataEmissaoBoleto).getDay() + 1]
   const datas = await axios.get(`https://api.invertexto.com/v1/holidays/${ano}?token=${token}&state=${state}`)
   const feriados = await datas.data
   const feriado =  feriados.filter(feriado => feriado.date === dataEmissaoBoleto )
   
   let vencimentoBoleto = new Date(dataEmissaoBoleto)
   vencimentoBoleto.setDate(vencimentoBoleto.getDate() + 1)

   console.log('dia da emissao: '+ vencimentoBoleto.toLocaleString(), dias[new Date(vencimentoBoleto).getDay()])

   if(!feriado && diaDaSemana !== 'sabado' && diaDaSemana !== 'domingo' && horaDaEmissaoDoBoleto <= 12){
       vencimentoBoleto = vencimentoBoleto.setDate(vencimentoBoleto.getDate() + 1)
       diaDaSemana = dias[new Date(vencimentoBoleto).getDay()]
    }else if(!feriado && diaDaSemana !== 'sabado' && diaDaSemana !== 'domingo' && horaDaEmissaoDoBoleto > 12){
        vencimentoBoleto = vencimentoBoleto.setDate(vencimentoBoleto.getDate() + 2)
        diaDaSemana = dias[new Date(vencimentoBoleto).getDay()]
    }else if(feriado && horaDaEmissaoDoBoleto <= 12){
        vencimentoBoleto = vencimentoBoleto.setDate(vencimentoBoleto.getDate() + 1)
        diaDaSemana = dias[new Date(vencimentoBoleto).getDay()]
    }else if(feriado && horaDaEmissaoDoBoleto > 12){
        vencimentoBoleto = vencimentoBoleto.setDate(vencimentoBoleto.getDate() + 2)
        diaDaSemana = dias[new Date(vencimentoBoleto).getDay()]
    }else if(diaDaSemana === 'sabado' && horaDaEmissaoDoBoleto <= 12){
        vencimentoBoleto = vencimentoBoleto.setDate(vencimentoBoleto.getDate() + 2)
        diaDaSemana = dias[new Date(vencimentoBoleto).getDay()]
    }else if(diaDaSemana === 'sabado' && horaDaEmissaoDoBoleto > 12){
        vencimentoBoleto = vencimentoBoleto.setDate(vencimentoBoleto.getDate() + 3)
        diaDaSemana = dias[new Date(vencimentoBoleto).getDay()]
    }else if(diaDaSemana === 'domingo' && horaDaEmissaoDoBoleto <= 12){
        vencimentoBoleto = vencimentoBoleto.setDate(vencimentoBoleto.getDate() + 1)
        diaDaSemana = dias[new Date(vencimentoBoleto).getDay()]
    }else if(diaDaSemana === 'domingo' && horaDaEmissaoDoBoleto > 12){
        vencimentoBoleto = vencimentoBoleto.setDate(vencimentoBoleto.getDate() + 2)
        diaDaSemana = dias[new Date(vencimentoBoleto).getDay()]
    }else{
       vencimentoBoleto = vencimentoBoleto.setDate(vencimentoBoleto.getDate() + 2)
       diaDaSemana = dias[new Date(vencimentoBoleto).getDay()]
    }

   console.log('Vencimento do boleto ' + new Date(vencimentoBoleto).toLocaleString(), diaDaSemana)
   
}

const dataEmissaoBoleto = '2022-09-07'
const horaDaEmissaoDoBoleto = 13
gerarBoleto(dataEmissaoBoleto, horaDaEmissaoDoBoleto)

