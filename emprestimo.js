/*
    O usuario faz o emprestimo hoje.
    Caso ele gere o boleto na data do emprestimo(hoje) ate ao meio dia o boleto e gerado para o hoje +1
    caso ele gere apos ao meio dia o boleto fica para hoje + 2
    sendo gerado no sabado ou domingo será gerado para o proximo dia util
    se for sabado até meio dia gera para proximo dia util
    se for domingo gera para prox dia util + 1
*/




function fazerEmprestimo(boleto){
    const vencimento = boleto.setDate(boleto.getDate() + 2)
    return new Date(vencimento)
}


function verificaDiaSemanaDoBoleto(boleto){

    const boletoGerado = fazerEmprestimo(boleto)

    const dias = ['domingo','segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado']

    console.log('\nData do boleto gerado no dia do emprestimo: ' + new Date(boletoGerado).toLocaleString() + ' ' + dias[boletoGerado.getDay()] )


    const horas = boletoGerado.getHours()
    const diaDaSemana = dias[boletoGerado.getDay()]

    let novaData = new Date()
   
    if(dias[new Date(novaData).getDay()] === 'sabado' || diaDaSemana === 'sabado' && horas < 12){

       novaData = boletoGerado.setDate(boletoGerado.getDate() + 2)

    }else if(dias[new Date(novaData).getDay()] === 'domingo' || diaDaSemana === 'domingo' && horas < 12){

        novaData = boletoGerado.setDate(boletoGerado.getDate() + 1)

    }else{
        novaData = boletoGerado        
    }

    console.log(
    `    ----------------------------------
    Nova data gerada: ${new Date(novaData).toLocaleString()} - ${dias[new Date(novaData).getDay()]}
    `)
}



const dataEmprestimo = new Date()

verificaDiaSemanaDoBoleto(dataEmprestimo)



module.exports = {fazerEmprestimo}