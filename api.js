function buscarCEP() {
    let cep = document.getElementById("cep").value.trim();

        if (cep.length !== 8 || isNaN(cep)) {
        alert("Digite um CEP válido com 8 números!");
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