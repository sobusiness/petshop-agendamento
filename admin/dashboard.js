let agendamentos = [];
let servicosAdmin = [];
let filtroAgendaHoje = false;
let filtroFaturamentoAtual = "todos";

let chartFaturamentoDia = null;
let chartEspecie = null;
let chartServico = null;

const horasAgenda = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

auth.onAuthStateChanged(user => {
    if (!user) {
        window.location.href = "index.html";
        return;
    }

    iniciarDashboard();
});

async function iniciarDashboard() {
    await carregarAgendamentos();
    await carregarServicosAdmin();
    renderizarAgenda();
    atualizarFaturamento();
    renderizarServicosAdmin();
}

function sair() {
    auth.signOut();
}

function abrirSecao(secao) {
    document.querySelectorAll(".admin-section").forEach(item => item.classList.remove("active"));
    document.querySelectorAll(".tab-button").forEach(item => item.classList.remove("active"));

    document.getElementById(`secao-${secao}`).classList.add("active");

    const botoes = document.querySelectorAll(".tab-button");
    if (secao === "agendamentos") botoes[0].classList.add("active");
    if (secao === "faturamento") botoes[1].classList.add("active");
    if (secao === "servicos") botoes[2].classList.add("active");
}

async function carregarAgendamentos() {
    const snapshot = await db.collection("agendamentos").orderBy("data", "asc").get();
    agendamentos = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
}

async function carregarServicosAdmin() {
    const snapshot = await db.collection("servicos").orderBy("nome", "asc").get();

    servicosAdmin = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
}

function formatarMoeda(valor) {
    return Number(valor || 0).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function hojeISO() {
    const hoje = new Date();
    return hoje.toISOString().slice(0, 10);
}

function adicionarDias(dataBase, dias) {
    const data = new Date(dataBase + "T00:00:00");
    data.setDate(data.getDate() + dias);
    return data.toISOString().slice(0, 10);
}

function obterSemanaReferencia() {
    const hoje = hojeISO();
    return Array.from({ length: 7 }, (_, index) => adicionarDias(hoje, index));
}

function formatarDataCurta(dataISO) {
    return new Date(dataISO + "T00:00:00").toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit"
    });
}

function renderizarAgenda() {
    const calendario = document.getElementById("calendarioAgenda");
    const filtroInfo = document.getElementById("agendaFiltroInfo");

    calendario.innerHTML = "";

    const datas = filtroAgendaHoje ? [hojeISO()] : obterSemanaReferencia();

    calendario.style.gridTemplateColumns = `90px repeat(${datas.length}, minmax(160px, 1fr))`;

    calendario.appendChild(criarCelula("Hora", "agenda-cell agenda-header"));

    datas.forEach(data => {
        calendario.appendChild(criarCelula(formatarDataCurta(data), "agenda-cell agenda-header"));
    });

    horasAgenda.forEach(hora => {
        calendario.appendChild(criarCelula(hora, "agenda-cell agenda-hour"));

        datas.forEach(data => {
            const cell = criarCelula("", "agenda-cell");

            if (hora === "12:00") {
                cell.innerHTML = `<div class="agenda-event"><strong>Almoço</strong></div>`;
            } else {
                const agendamento = agendamentos.find(item => item.data === data && item.horario === hora);

                if (agendamento) {
                    const servicos = Array.isArray(agendamento.servicos)
                        ? agendamento.servicos.map(s => s.nome).join(", ")
                        : "Serviço não informado";

                    const status = agendamento.status || "Confirmado";
                    const statusClasse = status === "Concluído" ? "status-concluido" : "status-confirmado";

                    cell.innerHTML = `
                        <div class="agenda-event">
                            <div class="agenda-event-header">
                                <strong>${agendamento.pet || "Pet"}</strong>
                                <span class="status-badge ${statusClasse}">${status}</span>
                            </div>
                            <div class="agenda-event-info">
                                ${servicos}<br>
                                ${agendamento.especie || ""}<br>
                                ${agendamento.observacaoPet || ""}
                            </div>
                            <div class="agenda-event-actions">
                                <button class="mini-button concluir" onclick="concluirAgendamento('${agendamento.id}')">Concluir</button>
                                <button class="mini-button cancelar" onclick="cancelarAgendamento('${agendamento.id}')">Cancelar</button>
                            </div>
                        </div>
                    `;
                }
            }

            calendario.appendChild(cell);
        });
    });

    filtroInfo.textContent = filtroAgendaHoje
        ? `Exibindo agendamentos de hoje (${formatarDataCurta(hojeISO())})`
        : "Exibindo próximos 7 dias.";
}

function criarCelula(conteudo, classe) {
    const div = document.createElement("div");
    div.className = classe;
    div.innerHTML = conteudo;
    return div;
}

function filtrarAgendamentosHoje() {
    filtroAgendaHoje = true;
    renderizarAgenda();
}

function limparFiltroAgendamentos() {
    filtroAgendaHoje = false;
    renderizarAgenda();
}

function obterAgendamentosFiltradosFaturamento() {
    const hoje = hojeISO();
    const realizados = agendamentos.filter(item => item.status === "Concluído");

    if (filtroFaturamentoAtual === "hoje") {
        return realizados.filter(item => item.data === hoje);
    }

    if (filtroFaturamentoAtual === "7dias") {
        const inicio = adicionarDias(hoje, -6);
        return realizados.filter(item => item.data >= inicio && item.data <= hoje);
    }

    if (filtroFaturamentoAtual === "30dias") {
        const inicio = adicionarDias(hoje, -29);
        return realizados.filter(item => item.data >= inicio && item.data <= hoje);
    }

    if (filtroFaturamentoAtual === "personalizado") {
        const inicio = document.getElementById("dataInicioFaturamento").value;
        const fim = document.getElementById("dataFimFaturamento").value;

        if (!inicio || !fim) return realizados;

        return realizados.filter(item => item.data >= inicio && item.data <= fim);
    }

    return realizados;
}

function filtrarFaturamento(tipo) {
    filtroFaturamentoAtual = tipo;
    atualizarFaturamento();
}

function limparFiltroFaturamento() {
    filtroFaturamentoAtual = "todos";
    document.getElementById("dataInicioFaturamento").value = "";
    document.getElementById("dataFimFaturamento").value = "";
    atualizarFaturamento();
}

function atualizarFaturamento() {
    const dados = obterAgendamentosFiltradosFaturamento();

    const quantidade = dados.length;
    const valorTotal = dados.reduce((acc, item) => acc + Number(item.valorTotal || 0), 0);
    const ticketMedio = quantidade > 0 ? valorTotal / quantidade : 0;

    document.getElementById("kpiAtendimentos").textContent = quantidade;
    document.getElementById("kpiValorTotal").textContent = formatarMoeda(valorTotal);
    document.getElementById("kpiTicketMedio").textContent = formatarMoeda(ticketMedio);

    renderizarGraficos(dados);
}

function agruparPorCampo(dados, campo) {
    return dados.reduce((acc, item) => {
        const chave = item[campo] || "Não informado";
        acc[chave] = (acc[chave] || 0) + Number(item.valorTotal || 0);
        return acc;
    }, {});
}

function agruparServicos(dados) {
    const resultado = {};

    dados.forEach(item => {
        if (!Array.isArray(item.servicos)) return;

        item.servicos.forEach(servico => {
            resultado[servico.nome] = (resultado[servico.nome] || 0) + Number(servico.valor || 0);
        });
    });

    return resultado;
}

function renderizarGraficos(dados) {
    const porDia = agruparPorCampo(dados, "data");
    const porEspecie = agruparPorCampo(dados, "especie");
    const porServico = agruparServicos(dados);

    if (chartFaturamentoDia) chartFaturamentoDia.destroy();
    if (chartEspecie) chartEspecie.destroy();
    if (chartServico) chartServico.destroy();

    chartFaturamentoDia = new Chart(document.getElementById("graficoFaturamentoDia"), {
        type: "bar",
        data: {
            labels: Object.keys(porDia).map(formatarDataCurta),
            datasets: [{ label: "Faturamento", data: Object.values(porDia), backgroundColor: "#d65a7e" }]
        },
        options: { responsive: true, plugins: { legend: { display: false } } }
    });

    chartEspecie = new Chart(document.getElementById("graficoEspecie"), {
        type: "doughnut",
        data: {
            labels: Object.keys(porEspecie),
            datasets: [{ data: Object.values(porEspecie), backgroundColor: ["#d65a7e", "#ad8b78", "#8a8383", "#e987a2"] }]
        },
        options: { responsive: true }
    });

    chartServico = new Chart(document.getElementById("graficoServico"), {
        type: "bar",
        data: {
            labels: Object.keys(porServico),
            datasets: [{ label: "Valor", data: Object.values(porServico), backgroundColor: "#b94a6a" }]
        },
        options: { responsive: true, plugins: { legend: { display: false } } }
    });
}


async function concluirAgendamento(id) {
    const confirmar = confirm("Deseja marcar este agendamento como concluído? Ele passará a contar no faturamento.");

    if (!confirmar) return;

    await db.collection("agendamentos").doc(id).update({
        status: "Concluído",
        concluidoEm: firebase.firestore.FieldValue.serverTimestamp()
    });

    await carregarAgendamentos();
    renderizarAgenda();
    atualizarFaturamento();
}

async function cancelarAgendamento(id) {
    const confirmar = confirm("Deseja cancelar e excluir este agendamento? Esta ação não poderá ser desfeita.");

    if (!confirmar) return;

    await db.collection("agendamentos").doc(id).delete();

    await carregarAgendamentos();
    renderizarAgenda();
    atualizarFaturamento();
}


async function salvarServico() {
    const nome = document.getElementById("nomeServico").value.trim();
    const preco = Number(document.getElementById("precoServico").value);
    const especie = document.getElementById("especieServico").value;
    const tipoPreco = document.getElementById("tipoPrecoServico").value;

    if (!nome || !preco) {
        alert("Preencha nome e preço do serviço.");
        return;
    }

    await db.collection("servicos").add({
        nome,
        preco,
        especie,
        tipoPreco,
        ativo: true,
        criadoEm: firebase.firestore.FieldValue.serverTimestamp()
    });

    document.getElementById("nomeServico").value = "";
    document.getElementById("precoServico").value = "";
    document.getElementById("especieServico").value = "Cão";

    await carregarServicosAdmin();
    renderizarServicosAdmin();
}

function renderizarServicosAdmin() {
    const lista = document.getElementById("listaServicosAdmin");
    lista.innerHTML = "";

    if (servicosAdmin.length === 0) {
        lista.innerHTML = "<p>Nenhum serviço cadastrado ainda.</p>";
        return;
    }

    servicosAdmin.forEach(servico => {
        const div = document.createElement("div");
        div.className = "service-item";

        div.innerHTML = `
            <input type="text" value="${servico.nome || ""}" id="nome-${servico.id}">
            <input type="number" value="${servico.preco || 0}" step="0.01" id="preco-${servico.id}">
            <select id="especie-${servico.id}">
                <option value="Cão" ${servico.especie === "Cão" ? "selected" : ""}>Cão</option>
                <option value="Gato" ${servico.especie === "Gato" ? "selected" : ""}>Gato</option>
                <option value="Ambos" ${servico.especie === "Ambos" ? "selected" : ""}>Ambos</option>
            </select>
            <button onclick="atualizarServico('${servico.id}')">Salvar</button>
            <button class="secondary-button" onclick="excluirServico('${servico.id}')">Excluir</button>
        `;

        lista.appendChild(div);
    });
}

async function atualizarServico(id) {
    const nome = document.getElementById(`nome-${id}`).value.trim();
    const preco = Number(document.getElementById(`preco-${id}`).value);
    const especie = document.getElementById(`especie-${id}`).value;

    await db.collection("servicos").doc(id).update({
        nome,
        preco,
        especie,
        atualizadoEm: firebase.firestore.FieldValue.serverTimestamp()
    });

    await carregarServicosAdmin();
    renderizarServicosAdmin();
}

async function excluirServico(id) {
    if (!confirm("Deseja realmente excluir este serviço?")) return;

    await db.collection("servicos").doc(id).delete();

    await carregarServicosAdmin();
    renderizarServicosAdmin();
}
