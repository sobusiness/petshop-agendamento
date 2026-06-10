const horaInicio = 9;
const horaFim = 17;
const diasFechados = [0, 3];
const horarioAlmoco = "12:00";
const telefoneWhatsappPetlyne = "5511957260772";

let dadosPreAgendamento = null;

const horariosPadrao = [];

for (let hora = horaInicio; hora <= horaFim; hora++) {
    horariosPadrao.push(`${hora.toString().padStart(2, "0")}:00`);

    if (hora < horaFim) {
        horariosPadrao.push(`${hora.toString().padStart(2, "0")}:30`);
    }
}

let agendamentosExistentes = [];
let servicosPrincipaisCliente = [];

const precosBanhoCaes = {
    "Pequeno": { "Curto": 45, "Médio": 50, "Longo": 60 },
    "Médio": { "Curto": 60, "Médio": 70, "Longo": 80 },
    "Grande": { "Curto": 80, "Médio": 90, "Longo": 100 }
};

const precosTosaCaes = {
    "Pequeno": { "Geral": 70, "Verão": 85, "Bebê": 95, "Tesoura": 110 },
    "Médio": { "Geral": 80, "Verão": 95, "Bebê": 110, "Tesoura": 125 },
    "Grande": { "Geral": 90, "Verão": 100, "Bebê": null, "Tesoura": 140 }
};

const precosHidratacaoCaes = {
    "Pequeno": 15,
    "Médio": 20,
    "Grande": 30
};

const precoTosaHigienicaAvulsa = 12;
const precoTratamentoAntiParasitas = 25;
const precoBanhoSecoGato = 80;

function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function gerarProtocolo() {
    const numero = Math.floor(10000 + Math.random() * 90000);
    return `LYNE-${numero}`;
}


function horarioParaMinutos(horario) {
    const [hora, minuto] = horario.split(":").map(Number);
    return hora * 60 + minuto;
}

function minutosParaHorario(minutos) {
    const hora = Math.floor(minutos / 60);
    const minuto = minutos % 60;
    return `${hora.toString().padStart(2, "0")}:${minuto.toString().padStart(2, "0")}`;
}

function obterSlotsBloqueadosPorPeriodo(horarioInicio, duracaoMinutos = 60) {
    const inicio = horarioParaMinutos(horarioInicio);
    const fim = inicio + Number(duracaoMinutos || 60);
    const slots = [];

    for (let minuto = inicio; minuto < fim; minuto += 30) {
        slots.push(minutosParaHorario(minuto));
    }

    return slots;
}

function calcularDuracaoAgendamentoMinutos() {
    const especie = document.getElementById("especie")?.value || "";
    const raca = (document.getElementById("raca")?.value || "").toLowerCase();
    const servicoPrincipal = document.getElementById("servicoPrincipal")?.value || "";
    const servicoFirebase = obterServicoPrincipalSelecionado();
    const nomeServico = (servicoFirebase?.nome || servicoPrincipal || "").toLowerCase();

    const ehGolden = raca.includes("golden");
    const ehBanhoGolden = ehGolden && nomeServico.includes("banho");
    const ehTrimmingGolden = ehGolden && nomeServico.includes("trimming");

    if (especie === "Cão" && (ehBanhoGolden || ehTrimmingGolden)) {
        return 120;
    }

    return 60;
}

function horarioEstaOcupadoPorPeriodo(horario, agendamentos) {
    const inicio = horarioParaMinutos(horario);
    const fim = inicio + calcularDuracaoAgendamentoMinutos();

    return agendamentos.some(agendamento => {
        const inicioExistente = horarioParaMinutos(agendamento.horario);
        const duracaoExistente = Number(agendamento.duracaoMinutos || 60);
        const fimExistente = inicioExistente + duracaoExistente;

        return inicio < fimExistente && fim > inicioExistente;
    });
}


function formatarTelefoneCelular(valor) {
    valor = valor.replace(/\D/g, "");

    if (valor.length > 11) valor = valor.slice(0, 11);
    if (valor.length <= 2) return valor;
    if (valor.length <= 7) return `(${valor.slice(0, 2)}) ${valor.slice(2)}`;

    return `(${valor.slice(0, 2)}) ${valor.slice(2, 7)}-${valor.slice(7, 11)}`;
}

document.getElementById("telefone").addEventListener("input", function () {
    this.value = formatarTelefoneCelular(this.value);
});

document.getElementById("especie").addEventListener("change", atualizarServicosPorEspecie);
document.getElementById("porte").addEventListener("change", atualizarResumoServicos);
document.getElementById("servicoPrincipal").addEventListener("change", controlarCamposServico);
document.getElementById("pelagem").addEventListener("change", atualizarResumoServicos);
document.getElementById("tipoTosa").addEventListener("change", atualizarResumoServicos);
document.getElementById("adicionalHidratacao").addEventListener("change", atualizarResumoServicos);
document.getElementById("adicionalTosaHigienica").addEventListener("change", atualizarResumoServicos);
document.getElementById("adicionalCorteUnha").addEventListener("change", atualizarResumoServicos);
document.getElementById("data").addEventListener("change", carregarHorariosDisponiveis);
document.getElementById("raca").addEventListener("input", carregarHorariosDisponiveis);
document.getElementById("servicoPrincipal").addEventListener("change", carregarHorariosDisponiveis);


async function carregarServicosPrincipaisCliente() {
    try {
        if (typeof db === "undefined") {
            servicosPrincipaisCliente = [];
            return;
        }

        const snapshot = await db.collection("servicos")
            .where("ativo", "==", true)
            .get();

        servicosPrincipaisCliente = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error("Erro ao carregar serviços principais:", error);
        servicosPrincipaisCliente = [];
    }
}

function obterServicosPrincipaisPorEspecie(especie) {
    return servicosPrincipaisCliente.filter(servico => {
        if (!servico.ativo) return false;
        return servico.especie === especie || servico.especie === "Ambos";
    });
}

function obterServicoPrincipalSelecionado() {
    const servicoPrincipal = document.getElementById("servicoPrincipal").value;

    if (!servicoPrincipal.startsWith("firebase:")) {
        return null;
    }

    const nome = servicoPrincipal.replace("firebase:", "");
    return { nome };
}

function montarOptionsServicosPrincipais(especie) {
    const servicos = obterServicosPrincipaisPorEspecie(especie);
    const nomesUnicos = [...new Set(servicos.map(servico => servico.nome).filter(Boolean))];

    if (nomesUnicos.length === 0) {
        if (especie === "Cão") {
            return `
                <option value="">Selecione</option>
                <option value="Banho">Banho</option>
                <option value="Tosa">Tosa</option>
            `;
        }

        if (especie === "Gato") {
            return `
                <option value="">Selecione</option>
                <option value="Banho a Seco">Banho a Seco</option>
            `;
        }

        return `<option value="">Selecione a espécie primeiro</option>`;
    }

    const options = nomesUnicos
        .map(nome => `<option value="firebase:${nome}">${nome}</option>`)
        .join("");

    return `<option value="">Selecione</option>${options}`;
}


function obterRegraPrecoServico(nomeServico, especie, porte, pelagem, tipoTosa) {
    const regras = servicosPrincipaisCliente.filter(servico => {
        const mesmaEspecie = servico.especie === especie || servico.especie === "Ambos";
        return servico.ativo && servico.nome === nomeServico && mesmaEspecie;
    });

    if (regras.length === 0) return null;

    const regraExata = regras.find(servico => {
        const porteOk = (servico.porte || "") === (porte || "");
        const pelagemOk = (servico.pelagem || "") === (pelagem || "");
        const tipoTosaOk = (servico.tipoTosa || "") === (tipoTosa || "");
        return porteOk && pelagemOk && tipoTosaOk;
    });

    if (regraExata) return regraExata;

    const regraFixa = regras.find(servico => {
        return !servico.porte && !servico.pelagem && !servico.tipoTosa;
    });

    return regraFixa || null;
}

function servicoPrecisaPelagem(nomeServico, especie) {
    return servicosPrincipaisCliente.some(servico => {
        const mesmaEspecie = servico.especie === especie || servico.especie === "Ambos";
        return servico.ativo && servico.nome === nomeServico && mesmaEspecie && !!servico.pelagem;
    });
}

function servicoPrecisaTipoTosa(nomeServico, especie) {
    return servicosPrincipaisCliente.some(servico => {
        const mesmaEspecie = servico.especie === especie || servico.especie === "Ambos";
        return servico.ativo && servico.nome === nomeServico && mesmaEspecie && !!servico.tipoTosa;
    });
}


function atualizarServicosPorEspecie() {
    const especie = document.getElementById("especie").value;
    const servicoPrincipal = document.getElementById("servicoPrincipal");
    const adicionalHidratacao = document.getElementById("adicionalHidratacao");
    const adicionalTosaHigienica = document.getElementById("adicionalTosaHigienica");
    const adicionalCorteUnha = document.getElementById("adicionalCorteUnha");

    servicoPrincipal.innerHTML = "";
    adicionalHidratacao.checked = false;
    adicionalTosaHigienica.checked = false;
    adicionalCorteUnha.checked = false;

    adicionalHidratacao.closest(".checkbox-line").style.display = "flex";
    adicionalTosaHigienica.closest(".checkbox-line").style.display = "flex";
    adicionalCorteUnha.closest(".checkbox-line").style.display = "flex";

    if (especie === "") {
        servicoPrincipal.innerHTML = `<option value="">Selecione a espécie primeiro</option>`;
        servicoPrincipal.disabled = true;
    }

    if (especie === "Cão") {
        servicoPrincipal.disabled = false;
        servicoPrincipal.innerHTML = montarOptionsServicosPrincipais("Cão");
    }

    if (especie === "Gato") {
        servicoPrincipal.disabled = false;
        servicoPrincipal.innerHTML = montarOptionsServicosPrincipais("Gato");

        adicionalHidratacao.closest(".checkbox-line").style.display = "none";
    }

    controlarCamposServico();
    atualizarResumoServicos();
}

function controlarCamposServico() {
    const especie = document.getElementById("especie").value;
    const servicoPrincipal = document.getElementById("servicoPrincipal").value;

    document.getElementById("areaPelagem").style.display = "none";
    document.getElementById("areaTipoTosa").style.display = "none";

    const servicoFirebase = obterServicoPrincipalSelecionado();

    if (servicoFirebase) {
        const nomeServico = servicoFirebase.nome;

        if (servicoPrecisaPelagem(nomeServico, especie)) {
            document.getElementById("areaPelagem").style.display = "block";
        } else {
            document.getElementById("pelagem").value = "";
        }

        if (servicoPrecisaTipoTosa(nomeServico, especie)) {
            document.getElementById("areaTipoTosa").style.display = "block";
        } else {
            document.getElementById("tipoTosa").value = "";
        }

        atualizarResumoServicos();
        return;
    }

    if (servicoPrincipal !== "Banho") {
        document.getElementById("pelagem").value = "";
    }

    if (servicoPrincipal !== "Tosa") {
        document.getElementById("tipoTosa").value = "";
    }

    if (especie === "Cão" && servicoPrincipal === "Banho") {
        document.getElementById("areaPelagem").style.display = "block";
    }

    if (especie === "Cão" && servicoPrincipal === "Tosa") {
        document.getElementById("areaTipoTosa").style.display = "block";
    }

    atualizarResumoServicos();
}

function calcularServicosSelecionados() {
    const especie = document.getElementById("especie").value;
    const porte = document.getElementById("porte").value;
    const servicoPrincipal = document.getElementById("servicoPrincipal").value;
    const pelagem = document.getElementById("pelagem").value;
    const tipoTosa = document.getElementById("tipoTosa").value;

    const itens = [];
    let total = 0;

    const servicoFirebase = obterServicoPrincipalSelecionado();

    if (servicoFirebase) {
        const regra = obterRegraPrecoServico(servicoFirebase.nome, especie, porte, pelagem, tipoTosa);

        if (regra) {
            const valor = Number(regra.preco || 0);
            const detalhes = [];

            if (regra.porte) detalhes.push(regra.porte);
            if (regra.pelagem) detalhes.push(`Pelo ${regra.pelagem}`);
            if (regra.tipoTosa) detalhes.push(regra.tipoTosa);

            const nomeResumo = detalhes.length > 0
                ? `${regra.nome} (${detalhes.join(" / ")})`
                : regra.nome;

            itens.push({ nome: nomeResumo, valor });
            total += valor;
        }
    }

    if (!servicoFirebase && especie === "Cão" && servicoPrincipal === "Banho" && porte && pelagem) {
        const valor = precosBanhoCaes[porte][pelagem];
        itens.push({ nome: `Banho (${porte} / Pelo ${pelagem})`, valor });
        total += valor;
    }

    if (!servicoFirebase && especie === "Cão" && servicoPrincipal === "Tosa" && porte && tipoTosa) {
        const valor = precosTosaCaes[porte][tipoTosa];

        if (valor !== null) {
            itens.push({ nome: `Tosa ${tipoTosa} (${porte})`, valor });
            total += valor;
        }
    }

    if (!servicoFirebase && especie === "Gato" && servicoPrincipal === "Banho a Seco") {
        itens.push({ nome: "Banho a Seco para Gato", valor: precoBanhoSecoGato });
        total += precoBanhoSecoGato;
    }

    if (especie === "Cão" && document.getElementById("adicionalHidratacao").checked && porte) {
        const valor = precosHidratacaoCaes[porte];
        itens.push({ nome: `Hidratação (${porte})`, valor });
        total += valor;
    }

    if (document.getElementById("adicionalTosaHigienica").checked) {
        itens.push({ nome: "Tosa Higiênica Avulsa", valor: precoTosaHigienicaAvulsa });
        total += precoTosaHigienicaAvulsa;
    }

    if (document.getElementById("adicionalCorteUnha").checked) {
        itens.push({ nome: "Tratamento Anti-Parasitas", valor: precoTratamentoAntiParasitas });
        total += precoTratamentoAntiParasitas;
    }

    return { itens, total };
}

function atualizarResumoServicos() {
    const resumo = calcularServicosSelecionados();
    const listaResumo = document.getElementById("listaResumo");
    const totalAgendamento = document.getElementById("totalAgendamento");

    listaResumo.innerHTML = "";

    const porte = document.getElementById("porte").value;
    const especie = document.getElementById("especie").value;
    const servicoPrincipal = document.getElementById("servicoPrincipal").value;
    const tipoTosa = document.getElementById("tipoTosa").value;

    if (especie === "Cão" && servicoPrincipal === "Tosa" && porte === "Grande" && tipoTosa === "Bebê") {
        listaResumo.innerHTML = `<p class="alerta-resumo">Tosa Bebê não está disponível para porte Grande.</p>`;
        totalAgendamento.textContent = formatarMoeda(0);
        return;
    }

    if (resumo.itens.length === 0) {
        listaResumo.innerHTML = "<p>Nenhum serviço selecionado.</p>";
        totalAgendamento.textContent = formatarMoeda(0);
        return;
    }

    resumo.itens.forEach(item => {
        const linha = document.createElement("div");
        linha.className = "resumo-item";
        linha.innerHTML = `<span>${item.nome}</span><strong>${formatarMoeda(item.valor)}</strong>`;
        listaResumo.appendChild(linha);
    });

    totalAgendamento.textContent = formatarMoeda(resumo.total);
}


async function buscarAgendamentosPorDataFirebase(dataSelecionada) {
    try {
        if (typeof db === "undefined") {
            return [];
        }

        const snapshot = await db.collection("agendamentos")
            .where("data", "==", dataSelecionada)
            .get();

        return snapshot.docs.map(doc => doc.data());
    } catch (error) {
        console.error("Erro ao buscar agendamentos no Firebase:", error);
        return [];
    }
}

async function carregarHorariosDisponiveis() {
    const dataSelecionada = document.getElementById("data").value;
    const selectHorario = document.getElementById("horario");

    selectHorario.innerHTML = "";

    if (!dataSelecionada) {
        selectHorario.innerHTML = "<option>Selecione uma data primeiro</option>";
        return;
    }

    const data = new Date(dataSelecionada + "T00:00:00");
    const diaSemana = data.getDay();

    if (diasFechados.includes(diaSemana)) {
        selectHorario.innerHTML = "<option>Petshop fechado neste dia</option>";
        return;
    }

    agendamentosExistentes = await buscarAgendamentosPorDataFirebase(dataSelecionada);

    let existeHorarioLivre = false;
    const duracaoSelecionada = calcularDuracaoAgendamentoMinutos();

    horariosPadrao.forEach(horario => {
        const option = document.createElement("option");

        if (horario === horarioAlmoco || horario === "12:30") {
            option.value = horario;
            option.textContent = `${horario} - Almoço`;
            option.disabled = true;
            selectHorario.appendChild(option);
            return;
        }

        const fimPrevisto = horarioParaMinutos(horario) + duracaoSelecionada;

        if (fimPrevisto > horarioParaMinutos(`${horaFim.toString().padStart(2, "0")}:00`)) {
            option.value = horario;
            option.textContent = `${horario} - Indisponível`;
            option.disabled = true;
            selectHorario.appendChild(option);
            return;
        }

        const ocupado = horarioEstaOcupadoPorPeriodo(horario, agendamentosExistentes);

        option.value = horario;
        option.textContent = ocupado ? `${horario} - Indisponível` : `${horario} - Disponível`;
        option.disabled = ocupado;

        if (!ocupado) existeHorarioLivre = true;

        selectHorario.appendChild(option);
    });

    if (!existeHorarioLivre) {
        selectHorario.innerHTML = "<option>Todos os horários estão indisponíveis</option>";
    }
}

function validarAgendamento() {
    const telefoneNumeros = document.getElementById("telefone").value.replace(/\D/g, "");
    const resumo = calcularServicosSelecionados();

    const camposObrigatorios = [
        "cliente",
        "telefone",
        "pet",
        "especie",
        "sexo",
        "raca",
        "porte",
        "observacaoPet",
        "servicoPrincipal",
        "data",
        "horario"
    ];

    for (const campo of camposObrigatorios) {
        if (document.getElementById(campo).value.trim() === "") {
            mostrarAlerta("Preencha todos os dados obrigatórios.");
            return false;
        }
    }

    if (telefoneNumeros.length !== 11) {
        mostrarAlerta("Digite um telefone celular válido com DDD. Exemplo: (11) 99999-9999");
        return false;
    }

    const especie = document.getElementById("especie").value;
    const servicoPrincipal = document.getElementById("servicoPrincipal").value;
    const porte = document.getElementById("porte").value;
    const pelagem = document.getElementById("pelagem").value;
    const tipoTosa = document.getElementById("tipoTosa").value;
    const horario = document.getElementById("horario").value;

    const servicoFirebase = obterServicoPrincipalSelecionado();

    if (servicoFirebase) {
        const nomeServico = servicoFirebase.nome;

        if (servicoPrecisaPelagem(nomeServico, especie) && pelagem === "") {
            mostrarAlerta("Selecione o tipo de pelagem.");
            return false;
        }

        if (servicoPrecisaTipoTosa(nomeServico, especie) && tipoTosa === "") {
            mostrarAlerta("Selecione o tipo de tosa.");
            return false;
        }

        const regra = obterRegraPrecoServico(nomeServico, especie, porte, pelagem, tipoTosa);

        if (!regra) {
            mostrarAlerta("Não existe preço cadastrado para esta combinação de serviço, porte, pelagem ou tipo de tosa.");
            return false;
        }
    }

    if (!servicoFirebase && especie === "Cão" && servicoPrincipal === "Banho" && pelagem === "") {
        mostrarAlerta("Selecione o tipo de pelagem.");
        return false;
    }

    if (!servicoFirebase && especie === "Cão" && servicoPrincipal === "Tosa" && tipoTosa === "") {
        mostrarAlerta("Selecione o tipo de tosa.");
        return false;
    }

    if (!servicoFirebase && especie === "Cão" && servicoPrincipal === "Tosa" && porte === "Grande" && tipoTosa === "Bebê") {
        mostrarAlerta("Tosa Bebê não está disponível para porte Grande.");
        return false;
    }

    if (resumo.itens.length === 0 || resumo.total <= 0) {
        mostrarAlerta("Selecione pelo menos um serviço válido.");
        return false;
    }

    if (
        horario === horarioAlmoco ||
        horario === "Petshop fechado neste dia" ||
        horario === "Todos os horários estão indisponíveis" ||
        horario === "Selecione uma data primeiro"
    ) {
        mostrarAlerta("Selecione um horário disponível.");
        return false;
    }

    return true;
}


function mostrarAlerta(mensagem) {
    document.getElementById("mensagemAlerta").textContent = mensagem;
    document.getElementById("popupAlerta").classList.add("ativo");
}

function fecharAlerta() {
    document.getElementById("popupAlerta").classList.remove("ativo");
}

function abrirPreviaAgendamento() {
    if (!validarAgendamento()) return;

    const resumo = calcularServicosSelecionados();
    const data = document.getElementById("data").value;
    const dataFormatada = new Date(data + "T00:00:00").toLocaleDateString("pt-BR");

    dadosPreAgendamento = {
        cliente: document.getElementById("cliente").value.trim(),
        telefone: document.getElementById("telefone").value.trim(),
        pet: document.getElementById("pet").value.trim(),
        especie: document.getElementById("especie").value,
        sexo: document.getElementById("sexo").value,
        raca: document.getElementById("raca").value.trim(),
        porte: document.getElementById("porte").value,
        observacaoPet: document.getElementById("observacaoPet").value,
        data,
        dataFormatada,
        horario: document.getElementById("horario").value,
        duracaoMinutos: calcularDuracaoAgendamentoMinutos(),
        resumo
    };

    const servicosHtml = resumo.itens.map(item => {
        return `${item.nome}: <strong>${formatarMoeda(item.valor)}</strong>`;
    }).join("<br>");

    document.getElementById("mensagemPrevia").innerHTML = `
        Cliente: <strong>${dadosPreAgendamento.cliente}</strong><br>
        Pet: <strong>${dadosPreAgendamento.pet}</strong><br>
        Espécie: <strong>${dadosPreAgendamento.especie}</strong><br>
        Sexo: <strong>${dadosPreAgendamento.sexo}</strong><br>
        Raça: <strong>${dadosPreAgendamento.raca}</strong><br>
        Porte: <strong>${dadosPreAgendamento.porte}</strong><br>
        Observação: <strong>${dadosPreAgendamento.observacaoPet}</strong><br><br>
        ${servicosHtml}<br><br>
        Total previsto: <strong>${formatarMoeda(resumo.total)}</strong><br>
        Data: <strong>${dataFormatada}</strong><br>
        Horário: <strong>${dadosPreAgendamento.horario}</strong>
    `;

    document.getElementById("popupPrevia").classList.add("ativo");
}

function fecharPrevia() {
    document.getElementById("popupPrevia").classList.remove("ativo");
}

function montarMensagemWhatsappAgendamento(dados, protocolo) {
    const servicosTexto = dados.resumo.itens
        .map(item => `- ${item.nome} - ${formatarMoeda(item.valor)}`)
        .join("\n");

    return (
`*Novo agendamento Petlyne*

*Protocolo:* ${protocolo}
*Nome Cliente:* ${dados.cliente}
*Data:* ${dados.dataFormatada}
*Horario:* ${dados.horario}
*Nome Pet:* ${dados.pet}
*Especie:* ${dados.especie}
*Sexo:* ${dados.sexo}
*Raca:* ${dados.raca}
*Porte:* ${dados.porte}

*Servico(s):*
${servicosTexto}

*Valor Total:* ${formatarMoeda(dados.resumo.total)}
*Observacoes:* ${dados.observacaoPet}`
    );
}

function atualizarBotaoWhatsappAgendamento(dados, protocolo) {
    const mensagem = montarMensagemWhatsappAgendamento(dados, protocolo);
    const url = `https://wa.me/${telefoneWhatsappPetlyne}?text=${encodeURIComponent(mensagem)}`;

    const botao = document.getElementById("botaoWhatsappAgendamento");
    botao.href = url;
}


async function salvarAgendamentoFirebase(dados, protocolo) {
    if (typeof db === "undefined") {
        console.warn("Firebase não encontrado. Agendamento não foi salvo no banco.");
        return;
    }

    const servicos = dados.resumo.itens.map(item => ({
        nome: item.nome,
        valor: item.valor
    }));

    await db.collection("agendamentos").add({
        protocolo: protocolo,
        cliente: dados.cliente,
        telefone: dados.telefone,
        pet: dados.pet,
        especie: dados.especie,
        sexo: dados.sexo,
        raca: dados.raca,
        porte: dados.porte,
        observacaoPet: dados.observacaoPet,
        data: dados.data,
        dataFormatada: dados.dataFormatada,
        horario: dados.horario,
        duracaoMinutos: dados.duracaoMinutos || calcularDuracaoAgendamentoMinutos(),
        servicos: servicos,
        valorTotal: dados.resumo.total,
        status: "Confirmado",
        criadoEm: firebase.firestore.FieldValue.serverTimestamp()
    });
}

async function confirmarAgendamentoFinal() {
    if (!dadosPreAgendamento) return;

    const protocolo = gerarProtocolo();

    try {
        await salvarAgendamentoFirebase(dadosPreAgendamento, protocolo);
    } catch (error) {
        console.error("Erro ao salvar agendamento no Firebase:", error);
        mostrarAlerta("Não foi possível salvar o agendamento. Tente novamente.");
        return;
    }

    agendamentosExistentes.push({
        data: dadosPreAgendamento.data,
        horario: dadosPreAgendamento.horario,
        duracaoMinutos: dadosPreAgendamento.duracaoMinutos || calcularDuracaoAgendamentoMinutos(),
        protocolo
    });

    fecharPrevia();

    atualizarBotaoWhatsappAgendamento(dadosPreAgendamento, protocolo);
    mostrarPopupConfirmacao(dadosPreAgendamento, protocolo);

    limparFormulario();
    carregarHorariosDisponiveis();

    dadosPreAgendamento = null;
}

function mostrarPopupConfirmacao(dados, protocolo) {
    const servicosHtml = dados.resumo.itens.map(item => {
        return `${item.nome}: <strong>${formatarMoeda(item.valor)}</strong>`;
    }).join("<br>");

    document.getElementById("mensagemConfirmacao").innerHTML = `
        Protocolo: <strong>${protocolo}</strong><br><br>
        <strong>${dados.cliente}</strong>, o agendamento do pet <strong>${dados.pet}</strong> foi confirmado.<br><br>
        ${servicosHtml}<br><br>
        Total previsto: <strong>${formatarMoeda(dados.resumo.total)}</strong><br>
        Data: <strong>${dados.dataFormatada}</strong><br>
        Horário: <strong>${dados.horario}</strong>
    `;

    document.getElementById("popupConfirmacao").classList.add("ativo");
}

function fecharPopup() {
    document.getElementById("popupConfirmacao").classList.remove("ativo");
}

function limparFormulario() {
    document.getElementById("cliente").value = "";
    document.getElementById("telefone").value = "";
    document.getElementById("pet").value = "";
    document.getElementById("especie").value = "";
    document.getElementById("sexo").value = "";
    document.getElementById("raca").value = "";
    document.getElementById("porte").value = "";
    document.getElementById("observacaoPet").value = "";
    document.getElementById("servicoPrincipal").innerHTML = `<option value="">Selecione a espécie primeiro</option>`;
    document.getElementById("servicoPrincipal").disabled = true;
    document.getElementById("pelagem").value = "";
    document.getElementById("tipoTosa").value = "";
    document.getElementById("adicionalHidratacao").checked = false;
    document.getElementById("adicionalTosaHigienica").checked = false;
    document.getElementById("adicionalCorteUnha").checked = false;
    document.getElementById("data").value = "";
    document.getElementById("horario").innerHTML = "<option>Selecione uma data primeiro</option>";
    document.getElementById("areaPelagem").style.display = "none";
    document.getElementById("areaTipoTosa").style.display = "none";

    atualizarResumoServicos();
}

async function iniciarPagina() {
    const servicoPrincipal = document.getElementById("servicoPrincipal");
    servicoPrincipal.innerHTML = `<option value="">Selecione a espécie primeiro</option>`;
    servicoPrincipal.disabled = true;

    await carregarServicosPrincipaisCliente();
    atualizarResumoServicos();
}

iniciarPagina();
