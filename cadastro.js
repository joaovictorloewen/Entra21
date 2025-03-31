document.addEventListener("DOMContentLoaded", function () {
    const clienteForm = document.getElementById("clienteForm");
    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const telefone = document.getElementById("telefone");
    const cep = document.getElementById("cep");
    const endereco = document.getElementById("endereco");
    const bairro = document.getElementById("bairro");
    const cidade = document.getElementById("cidade");
    const estado = document.getElementById("estado");
    const clienteIndex = document.getElementById("clienteIndex");
    const salvarBtn = document.getElementById("salvarBtn");

    function carregarClientes() {
        return JSON.parse(localStorage.getItem("clientes")) || [];
    }

    function salvarClientes(clientes) {
        localStorage.setItem("clientes", JSON.stringify(clientes));
    }

    function buscarCEP() {
        const cepValor = cep.value.replace("-", "");
        if (cepValor.length === 8) {
            fetch(`https://viacep.com.br/ws/${cepValor}/json/`)
                .then(response => response.json())
                .then(data => {
                    if (!data.erro) {
                        endereco.value = data.logradouro;
                        bairro.value = data.bairro;
                        cidade.value = data.localidade;
                        estado.value = data.uf;
                    } else {
                        alert("CEP não encontrado!");
                    }
                })
                .catch(() => alert("Erro ao buscar o CEP!"));
        }
    }

    function adicionarOuEditarCliente(event) {
        event.preventDefault();
        let clientes = carregarClientes();
        const index = clienteIndex.value;

        const cliente = {
            nome: nome.value,
            email: email.value,
            telefone: telefone.value,
            endereco: {
                cep: cep.value,
                logradouro: endereco.value,
                bairro: bairro.value,
                localidade: cidade.value,
                uf: estado.value
            }
        };

        if (index === "") {
            clientes.push(cliente);
        } else {
            clientes[index] = cliente;
        }

        salvarClientes(clientes);
        window.location.href = "lista.html";
    }

    function carregarClienteParaEdicao() {
        const params = new URLSearchParams(window.location.search);
        const index = params.get("edit");
        if (index !== null) {
            const clientes = carregarClientes();
            const cliente = clientes[index];
            if (cliente) {
                nome.value = cliente.nome;
                email.value = cliente.email;
                telefone.value = cliente.telefone;
                cep.value = cliente.endereco.cep;
                endereco.value = cliente.endereco.logradouro;
                bairro.value = cliente.endereco.bairro;
                cidade.value = cliente.endereco.localidade;
                estado.value = cliente.endereco.uf;
                clienteIndex.value = index;
                salvarBtn.textContent = "Atualizar";
            }
        }
    }

    cep.addEventListener("blur", buscarCEP);
    clienteForm.addEventListener("submit", adicionarOuEditarCliente);
    carregarClienteParaEdicao();
});
