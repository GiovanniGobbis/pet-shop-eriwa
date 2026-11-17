
const agendamentos = [];

function adicionarAgendamento() {
    const pet = document.getElementById("petAgendamento").value;
    const tutor = document.getElementById("tutorAgendamento").value;
    const servico = document.getElementById("servicoAgendamento").value;
    const data = document.getElementById("dataAgendamento").value;
    const horario = document.getElementById("horarioAgendamento").value;

    if (!pet || !tutor || !servico || !data || !horario) {
        alert("Preencha todos os campos do agendamento!");
        return;
    }

    const agendamento = {
        pet,
        tutor,
        servico,
        data,
        horario
    };

    agendamentos.push(agendamento);

    const lista = document.getElementById("listaAgendamentos");
    const item = document.createElement("li");

    item.textContent = `${pet} - ${tutor} - ${servico} - ${data} às ${horario}`;

    lista.appendChild(item);

    document.getElementById("petAgendamento").value = "";
    document.getElementById("tutorAgendamento").value = "";
    document.getElementById("servicoAgendamento").value = "";
    document.getElementById("dataAgendamento").value = "";
    document.getElementById("horarioAgendamento").value = "";

    alert("Agendamento realizado com sucesso!");
}

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
