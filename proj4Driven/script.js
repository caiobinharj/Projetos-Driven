function seletor1(classe){
    const botao_preselecionado=document.querySelector(".selecionado1");
    if(botao_preselecionado){
           botao_preselecionado.classList.remove("selecionado1");
    }
    classe.classList.add("selecionado1");
}

function seletor2(classe){
    const botao_preselecionado=document.querySelector(".selecionado2");
    if(botao_preselecionado){
        botao_preselecionado.classList.remove("selecionado2");
    }
    classe.classList.add("selecionado2");
}

function seletor3(classe){
    const botao_preselecionado=document.querySelector(".selecionado3");
    if(botao_preselecionado){
        botao_preselecionado.classList.remove("selecionado3");
    }
    classe.classList.add("selecionado3");
}

function calculaTotal(n1, n2, n3) {
    n1 = parseFloat(n1);
    n2 = parseFloat(n2);
    n3 = parseFloat(n3);
    let total = n1 + n2 + n3;
    return total.toFixed(2);
}

function fechar_pedido(){
    let botao1=document.querySelector(".selecionado1");
    let botao2=document.querySelector(".selecionado2");
    let botao3=document.querySelector(".selecionado3");
    let prato1 = botao1.querySelector(':nth-child(2)');
    let prato2 = botao2.querySelector(':nth-child(2)');
    let prato3 = botao3.querySelector(':nth-child(2)');
    let preco1 = botao1.querySelector(':nth-child(4)');
    let preco2 = botao2.querySelector(':nth-child(4)');
    let preco3 = botao3.querySelector(':nth-child(4)');
    let reft1 = document.querySelector('.t1');
    let reft2 = document.querySelector('.t2');
    let reft3 = document.querySelector('.t3');
    let refp1 = document.querySelector('.p1');
    let refp2 = document.querySelector('.p2');
    let refp3 = document.querySelector('.p3');
    let reftotal = document.querySelector('.total');

    var stringGigante = `Olá, gostaria de fazer um pedido:
- Prato: ${prato1.innerHTML}\n-Bebida: ${prato2.innerHTML}\n- Sobremesa: ${prato3.innerHTML}\nTotal: ${calculaTotal(preco1.innerHTML, preco2.innerHTML, preco3.innerHTML)}`;

    stringGigante = encodeURIComponent(stringGigante);
    const meulink = document.querySelector('a');
    meulink.href = "https://wa.me/5521998326272/?text=" + stringGigante;

    reft1.innerHTML = prato1.innerHTML;
    reft2.innerHTML = prato2.innerHTML;
    reft3.innerHTML = prato3.innerHTML;
    refp1.innerHTML = preco1.innerHTML;
    refp2.innerHTML = preco2.innerHTML;
    refp3.innerHTML = preco3.innerHTML;
    reftotal.innerHTML=calculaTotal(preco1.innerHTML, preco2.innerHTML, preco3.innerHTML);


    if(botao1&&botao2&&botao3){
        let texto_alterado=document.querySelector(".textobotao");
        texto_alterado.innerHTML="Fechar Pedido";
        let botao_final = document.querySelector(".botao");
        botao_final.classList.add("atualizado");
    }

}

function fecharCompra(){
    let botao_final = document.querySelector(".botao");
    if (botao_final.classList.contains("atualizado")){
        const ref1 = document.querySelector(".mae");
        ref1.classList.add("opaco");
        const ref2 = document.querySelector(".quadradofim");
        ref2.classList.remove("escondido");
    }
}

function cancelarCompra(){
    const ref1 = document.querySelector(".mae");
    ref1.classList.remove("opaco");
    const ref2 = document.querySelector(".quadradofim");
    ref2.classList.add("escondido");
}


