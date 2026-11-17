
const CHAVE = "petShopEriwaDados";

function carregarDados() {
    try {
        const dados = JSON.parse(localStorage.getItem(CHAVE));

        return {
            clientes: Array.isArray(dados?.clientes) ? dados.clientes : [],
            pets: Array.isArray(dados?.pets) ? dados.pets : [],
            agendamentos: Array.isArray(dados?.agendamentos)
                ? dados.agendamentos : []
        };
    } catch {
        return {
            clientes: [],
            pets: [],
            agendamentos: []
        };
    }
}

const dados = carregarDados();

function salvarDados() {
    localStorage.setItem(CHAVE, JSON.stringify(dados));
}

function gerarId() {
    return Date.now().toString(36) +
        Math.random().toString(36).slice(2);
}

function escapar(texto) {
    return String(texto).replace(/[&<>"']/g, caractere => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[caractere]);
}

function mostrarMensagem(texto) {
    const mensagem = document.getElementById("mensagem");
    mensagem.textContent = texto;
    mensagem.style.display = "block";

    setTimeout(() => {
        mensagem.style.display = "none";
    }, 2500);
}

// CLIENTES

document.getElementById("formCliente")
.addEventListener("submit", function(event) {
    event.preventDefault();

    const id = document.getElementById("clienteId").value;
    const nome = document.getElementById("nomeCliente").value.trim();
    const telefone = document.getElementById("telefoneCliente").value.trim();

    if (!nome || !telefone) return;

    if (id) {
        const cliente = dados.clientes.find(c => c.id === id);

        if (!cliente) return;

        cliente.nome = nome;
        cliente.telefone = telefone;

        mostrarMensagem("Cliente atualizado!");
    } else {
        dados.clientes.push({
            id: gerarId(),
            nome,
            telefone
        });

        mostrarMensagem("Cliente cadastrado!");
    }

    salvarDados();
    this.reset();
    document.getElementById("clienteId").value = "";
    document.getElementById("botaoCliente").textContent =
        "Cadastrar cliente";

    atualizarTela();
});

function editarCliente(id) {
    const cliente = dados.clientes.find(c => c.id === id);
    if (!cliente) return;

    document.getElementById("clienteId").value = id;
    document.getElementById("nomeCliente").value = cliente.nome;
    document.getElementById("telefoneCliente").value = cliente.telefone;

    document.getElementById("botaoCliente").textContent =
        "Salvar alterações";

    document.getElementById("formCliente")
        .scrollIntoView({ behavior: "smooth" });
}

function excluirCliente(id) {
    const possuiPet = dados.pets.some(p => p.tutorId === id);

    if (possuiPet) {
        mostrarMensagem("Exclua ou transfira os pets antes.");
        return;
    }

    if (!confirm("Deseja excluir este cliente?")) return;

    dados.clientes = dados.clientes.filter(c => c.id !== id);

    salvarDados();
    atualizarTela();
    mostrarMensagem("Cliente excluído!");
}

// PETS

document.getElementById("formPet")
.addEventListener("submit", function(event) {
    event.preventDefault();

    const id = document.getElementById("petId").value;
    const nome = document.getElementById("nomePet").value.trim();
    const especie = document.getElementById("especiePet").value;
    const tutorId = document.getElementById("tutorPet").value;

    if (!nome || !especie || !tutorId) return;

    if (id) {
        const pet = dados.pets.find(p => p.id === id);
        if (!pet) return;

        pet.nome = nome;
        pet.especie = especie;
        pet.tutorId = tutorId;

        mostrarMensagem("Pet atualizado!");
    } else {
        dados.pets.push({
            id: gerarId(),
            nome,
            especie,
            tutorId
        });

        mostrarMensagem("Pet cadastrado!");
    }

    salvarDados();
    this.reset();
    document.getElementById("petId").value = "";
    document.getElementById("botaoPet").textContent =
        "Cadastrar pet";

    atualizarTela();
});

function editarPet(id) {
    const pet = dados.pets.find(p => p.id === id);
    if (!pet) return;

    document.getElementById("petId").value = id;
    document.getElementById("nomePet").value = pet.nome;
    document.getElementById("especiePet").value = pet.especie;
    document.getElementById("tutorPet").value = pet.tutorId;

    document.getElementById("botaoPet").textContent =
        "Salvar alterações";

    document.getElementById("formPet")
        .scrollIntoView({ behavior: "smooth" });
}

function excluirPet(id) {
    const possuiAgendamento = dados.agendamentos.some(
        a => a.petId === id && a.status === "Ativo"
    );

    if (possuiAgendamento) {
        mostrarMensagem("Cancele o agendamento antes de excluir.");
        return;
    }

    if (!confirm("Deseja excluir este pet?")) return;

    dados.pets = dados.pets.filter(p => p.id !== id);

    salvarDados();
    atualizarTela();
    mostrarMensagem("Pet excluído!");
}

// AGENDAMENTOS

document.getElementById("formAgendamento")
.addEventListener("submit", function(event) {
    event.preventDefault();

    const petId = document.getElementById("petAgendamento").value;
    const servico = document.getElementById("servicoAgendamento").value;
    const data = document.getElementById("dataAgendamento").value;
    const horario = document.getElementById("horarioAgendamento").value;

    const pet = dados.pets.find(p => p.id === petId);

    if (!pet || !servico || !data || !horario) {
        mostrarMensagem("Preencha todos os campos!");
        return;
    }

    const dataHora = new Date(`${data}T${horario}`);
    if (Number.isNaN(dataHora.getTime()) || dataHora <= new Date()) {
        mostrarMensagem("Escolha uma data e horário futuros.");
        return;
    }

    const conflito = dados.agendamentos.some(a =>
        a.status === "Ativo" &&
        a.data === data &&
        a.horario === horario
    );

    if (conflito) {
        mostrarMensagem("Este horário já está reservado.");
        return;
    }

    dados.agendamentos.push({
        id: gerarId(),
        petId,
        servico,
        data,
        horario,
        status: "Ativo"
    });

    salvarDados();
    this.reset();
    atualizarTela();
    mostrarMensagem("Agendamento realizado!");
});

function cancelarAgendamento(id) {
    if (!confirm("Deseja cancelar este agendamento?")) return;

    const agendamento = dados.agendamentos.find(a => a.id === id);

    if (!agendamento) return;

    agendamento.status = "Cancelado";

    salvarDados();
    atualizarTela();
    mostrarMensagem("Agendamento cancelado!");
}

function excluirAgendamento(id) {
    if (!confirm("Deseja excluir este registro?")) return;

    dados.agendamentos = dados.agendamentos.filter(a => a.id !== id);

    salvarDados();
    atualizarTela();
    mostrarMensagem("Registro excluído!");
}

// ATUALIZAÇÃO DA TELA

function renderizarClientes() {
    const lista = document.getElementById("listaClientes");

    if (dados.clientes.length === 0) {
        lista.innerHTML = '<p class="empty">Nenhum cliente cadastrado.</p>';
        return;
    }

    lista.innerHTML = dados.clientes.map(c => `
        <div class="record">
            <div>
                <strong>${escapar(c.nome)}</strong>
                <small>Telefone: ${escapar(c.telefone)}</small>
            </div>
            <div class="actions">
                <button onclick="editarCliente('${c.id}')">Editar</button>
                <button class="delete" onclick="excluirCliente('${c.id}')">
                    Excluir
                </button>
            </div>
        </div>
    `).join("");
}

function renderizarPets() {
    const lista = document.getElementById("listaPets");

    if (dados.pets.length === 0) {
        lista.innerHTML = '<p class="empty">Nenhum pet cadastrado.</p>';
        return;
    }

    lista.innerHTML = dados.pets.map(p => {
        const tutor = dados.clientes.find(c => c.id === p.tutorId);

        return `
            <div class="record">
                <div>
                    <strong>${escapar(p.nome)}</strong>
                    <small>
                        ${escapar(p.especie)} |
                        Tutor: ${escapar(tutor?.nome || "Não encontrado")}
                    </small>
                </div>
                <div class="actions">
                    <button onclick="editarPet('${p.id}')">Editar</button>
                    <button class="delete" onclick="excluirPet('${p.id}')">
                        Excluir
                    </button>
                </div>
            </div>
        `;
    }).join("");
}

function renderizarAgendamentos() {
    const lista = document.getElementById("listaAgendamentos");

    const agendamentos = [...dados.agendamentos].sort((a, b) =>
        (a.data + a.horario).localeCompare(b.data + b.horario)
    );

    if (agendamentos.length === 0) {
        lista.innerHTML = '<p class="empty">Nenhum agendamento registrado.</p>';
        return;
    }

    lista.innerHTML = agendamentos.map(a => {
        const pet = dados.pets.find(p => p.id === a.petId);
        const dataFormatada = a.data.split("-").reverse().join("/");

        return `
            <div class="record">
                <div>
                    <strong>${escapar(pet?.nome || "Pet removido")} - ${escapar(a.servico)}</strong>
                    <small>
                        ${dataFormatada} às ${escapar(a.horario)}
                        | ${escapar(a.status)}
                    </small>
                </div>
                <div class="actions">
                    ${a.status === "Ativo" ? `
                        <button class="cancel"
                            onclick="cancelarAgendamento('${a.id}')">
                            Cancelar
                        </button>
                    ` : ""}
                    <button class="delete"
                        onclick="excluirAgendamento('${a.id}')">
                        Excluir
                    </button>
                </div>
            </div>
        `;
    }).join("");
}

function atualizarSeletores() {
    const tutorSelect = document.getElementById("tutorPet");
    const petSelect = document.getElementById("petAgendamento");

    const tutorAtual = tutorSelect.value;
    const petAtual = petSelect.value;

    tutorSelect.innerHTML =
        '<option value="">Selecione um cliente</option>' +
        dados.clientes.map(c =>
            `<option value="${c.id}">${escapar(c.nome)}</option>`
        ).join("");

    petSelect.innerHTML =
        '<option value="">Selecione um pet</option>' +
        dados.pets.map(p => {
            const tutor = dados.clientes.find(c => c.id === p.tutorId);

            return `<option value="${p.id}">
                ${escapar(p.nome)} - ${escapar(tutor?.nome || "Sem tutor")}
            </option>`;
        }).join("");

    if (dados.clientes.some(c => c.id === tutorAtual)) {
        tutorSelect.value = tutorAtual;
    }

    if (dados.pets.some(p => p.id === petAtual)) {
        petSelect.value = petAtual;
    }
}

function atualizarPainel() {
    document.getElementById("totalClientes").textContent =
        dados.clientes.length;

    document.getElementById("totalPets").textContent =
        dados.pets.length;

    document.getElementById("totalAgendamentos").textContent =
        dados.agendamentos.filter(a => a.status === "Ativo").length;
}

function atualizarTela() {
    atualizarPainel();
    atualizarSeletores();
    renderizarClientes();
    renderizarPets();
    renderizarAgendamentos();
}

atualizarTela();
