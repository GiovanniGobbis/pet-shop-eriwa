
const clientes = [];
const pets = [];

function adicionarCliente() {
    const nome = document.getElementById("nomeCliente").value;
    const telefone = document.getElementById("telefoneCliente").value;

    if (!nome || !telefone) {
        alert("Preencha todos os campos do cliente!");
        return;
    }

    clientes.push({ nome, telefone });

    const lista = document.getElementById("listaClientes");
    const item = document.createElement("li");
    item.textContent = `${nome} - ${telefone}`;
    lista.appendChild(item);

    document.getElementById("nomeCliente").value = "";
    document.getElementById("telefoneCliente").value = "";
}

function adicionarPet() {
    const nome = document.getElementById("nomePet").value;
    const especie = document.getElementById("especiePet").value;
    const tutor = document.getElementById("tutorPet").value;

    if (!nome || !especie || !tutor) {
        alert("Preencha todos os campos do pet!");
        return;
    }

    pets.push({ nome, especie, tutor });

    const lista = document.getElementById("listaPets");
    const item = document.createElement("li");
    item.textContent = `${nome} - ${especie} - Tutor: ${tutor}`;
    lista.appendChild(item);

    document.getElementById("nomePet").value = "";
    document.getElementById("especiePet").value = "";
    document.getElementById("tutorPet").value = "";
}
