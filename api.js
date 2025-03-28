function validarFormulario(event) {
    event.preventDefault();

    let nome = document.getElementById("nome").value.trim();
    let email = document.getElementById("email").value.trim();
    let idade = document.getElementById("idade").value.trim();
    let telefone = document.getElementById("telefone").value.trim();
    let cep = document.getElementById("cep").value.trim();

    if (!nome || !email || !idade || !telefone || !cep) {
        alert("Preencha todos os campos corretamente!");
        return false;
    }

    if (!/^[0-9]{8}$/.test(cep)) {
        alert("O CEP deve conter exatamente 8 números!");
        return false;
    }

    buscarCEP();
}

function formatarCEP() {
    let cep = document.getElementById("cep").value;
    document.getElementById("cep").value = cep.replace(/\D/g, "").slice(0, 8);
}

function buscarCEP() {
    let cep = document.getElementById("cep").value.trim();

    if (cep.length !== 8 || isNaN(cep)) {
        document.getElementById("resultado").innerHTML = "<p style='color: red;'>CEP inválido!</p>";
        return;
    }

    let url = `https://viacep.com.br/ws/${cep}/json/`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                document.getElementById("resultado").innerHTML = "<p style='color: red;'>CEP não encontrado.</p>";
            } else {
                document.getElementById("resultado").innerHTML = `
                    <p><strong>Nome:</strong> ${document.getElementById("nome").value}</p>
                    <p><strong>E-mail:</strong> ${document.getElementById("email").value}</p>
                    <p><strong>Idade:</strong> ${document.getElementById("idade").value}</p>
                    <p><strong>Telefone:</strong> ${document.getElementById("telefone").value}</p>
                    <p><strong>CEP:</strong> ${data.cep}</p>
                    <p><strong>Rua:</strong> ${data.logradouro}</p>
                    <p><strong>Bairro:</strong> ${data.bairro}</p>
                    <p><strong>Cidade:</strong> ${data.localidade}</p>
                    <p><strong>Estado:</strong> ${data.uf}</p>
                `;
            }
        })
        .catch(error => {
            document.getElementById("resultado").innerHTML = "<p style='color: red;'>Erro ao buscar o CEP.</p>";
            console.error("Erro:", error);
        });
}
