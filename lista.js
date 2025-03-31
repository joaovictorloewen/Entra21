document.addEventListener("DOMContentLoaded", function () {
    const clienteLista = document.getElementById("clienteLista");

    function carregarClientes() {
        return JSON.parse(localStorage.getItem("clientes")) || [];
    }

    function salvarClientes(clientes) {
        localStorage.setItem("clientes", JSON.stringify(clientes));
    }

    function listarClientes() {
        clienteLista.innerHTML = "";
        const clientes = carregarClientes();

        clientes.forEach((cliente, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${cliente.nome}</td>
                <td>${cliente.email}</td>
                <td>${cliente.telefone}</td>
                <td>
                    <a href="cadastro.html?edit=${index}" class="btn btn-warning btn-sm">Editar</a>
                    <button class="btn btn-danger btn-sm" onclick="excluirCliente(${index})">Excluir</button>
                </td>
            `;
            clienteLista.appendChild(row);
        });
    }

    function excluirCliente(index) {
        let clientes = carregarClientes();
        clientes.splice(index, 1);
        salvarClientes(clientes);
        listarClientes();
    }

    window.excluirCliente = excluirCliente;
    listarClientes();
});
