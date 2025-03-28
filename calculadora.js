function adicionar(valor) {
    document.getElementById("display").value += valor;
}

function limpar() {
    document.getElementById("display").value = "";
}

function calcular() {
    try {
        document.getElementById("display").value = eval(document.getElementById("display").value);
    } catch {
        document.getElementById("display").value = "Erro";
    }
}

function trocarSinal() {
    let display = document.getElementById("display");
    let valor = display.value;

    if (valor !== "" && valor !== '0') {
        if (valor.startsWith("-")) {
            display.value = valor.substring(1);
        } else {
            display.value = "-" + valor;
        }
    }
}

function porcentagem(){
    let display = document.getElementById("display");
    let valor = display.value;

    if (valor !== "" && !isNaN(valor)) {
        display.value = parseFloat(valor) / 100;
    } else {
        display.value = "Erro";
    }

}

function apagarum(){
    let display = document.getElementById("display");
    let valor = display.value;

    if (valor.length > 0) {
        display.value = valor.slice(0, -1);
    }
}