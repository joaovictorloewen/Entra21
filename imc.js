function calcularIMC() {
    let peso = parseFloat(document.getElementById("peso").value)
    let altura = parseFloat(document.getElementById("altura").value)
    let sexo = document.getElementById("sexo").value

    if (!peso || !altura || altura <= 0) {
        document.getElementById("resultado").textContent = 'Por favor, insira valores válidos.'
        return;
    }

    let imc = peso / (altura * altura)
    let classificacao = ''

    if (sexo === "homem") {
        if (imc < 20.7) {
            classificacao = 'Abaixo do peso';
            cor = 'green';
        } else if (imc < 26.4) {
            classificacao = 'Peso normal';
            cor = 'blue';
        } else if (imc < 31.1) {
            classificacao = 'Sobrepeso';
            cor = 'orange';
        } else {
            classificacao = 'Obesidade';
            cor = 'red';
        }
    } else {
        if (imc < 19.1) {
            classificacao = 'Abaixo do peso';
            cor = 'green';
        } else if (imc < 25.8) {
            classificacao = 'Peso normal';
            cor = 'blue';
        } else if (imc < 32.3) {
            classificacao = 'Sobrepeso';
            cor = 'orange';
        } else {
            classificacao = 'Obesidade';
            cor = 'red';
        }
    }

    document.getElementById('resultado').textContent = `IMC: ${imc.toFixed(2)} - ${classificacao}`
    document.getElementById('resultado').style.color = cor
}