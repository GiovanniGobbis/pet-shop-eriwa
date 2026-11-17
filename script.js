// Pet Shop Eriwa

const petShop = {
    nome: "Pet Shop Eriwa",
    clientes: [],
    pets: [],
    agendamentos: []
};

function cadastrarCliente(nome, telefone) {
    const cliente = {
        id: petShop.clientes.length + 1,
        nome: nome,
        telefone: telefone
    };

    petShop.clientes.push(cliente);
    return cliente;
}

function cadastrarPet(nome, especie, tutor) {
    const pet = {
        id: petShop.pets.length + 1,
        nome: nome,
        especie: especie,
        tutor: tutor
    };

    petShop.pets.push(pet);
    return pet;
}

console.log("Sistema Pet Shop Eriwa iniciado!");
