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


function obterFiltroProtocoloAgenda() {
    return (document.getElementById("filtroProtocoloAgenda")?.value || "").trim().toLowerCase();
}

function agendamentoBateFiltroProtocolo(agendamento) {
    const filtro = obterFiltroProtocoloAgenda();
    if (!filtro) return true;

    return (agendamento.protocolo || "").toLowerCase().includes(filtro);
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
                const agendamento = agendamentos.find(item =>
                    item.data === data &&
                    item.horario === hora &&
                    agendamentoBateFiltroProtocolo(item)
                );

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
                                <span class="agenda-protocolo">${agendamento.protocolo || ""}</span><br>
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

    const filtroProtocolo = document.getElementById("filtroProtocoloAgenda");
    if (filtroProtocolo) filtroProtocolo.value = "";

    renderizarAgenda();
}

function obterAgendamentosFiltradosFaturamento() {
    const hoje = hojeISO();
    const realizados = agendamentos.filter(item => item.status === "Concluído");

    let resultado = realizados;

    if (filtroFaturamentoAtual === "hoje") {
        resultado = realizados.filter(item => item.data === hoje);
    }

    if (filtroFaturamentoAtual === "7dias") {
        const inicio = adicionarDias(hoje, -6);
        resultado = realizados.filter(item => item.data >= inicio && item.data <= hoje);
    }

    if (filtroFaturamentoAtual === "30dias") {
        const inicio = adicionarDias(hoje, -29);
        resultado = realizados.filter(item => item.data >= inicio && item.data <= hoje);
    }

    if (filtroFaturamentoAtual === "personalizado") {
        const inicio = document.getElementById("dataInicioFaturamento").value;
        const fim = document.getElementById("dataFimFaturamento").value;

        if (inicio && fim) {
            resultado = realizados.filter(item => item.data >= inicio && item.data <= fim);
        }
    }

    return aplicarFiltrosAvancadosFaturamento(resultado);
}

function filtrarFaturamento(tipo) {
    filtroFaturamentoAtual = tipo;
    atualizarFaturamento();
}

function limparFiltroFaturamento() {
    filtroFaturamentoAtual = "todos";

    document.getElementById("dataInicioFaturamento").value = "";
    document.getElementById("dataFimFaturamento").value = "";

    const especie = document.getElementById("filtroEspecieFaturamento");
    const porte = document.getElementById("filtroPorteFaturamento");
    const servico = document.getElementById("filtroServicoFaturamento");

    if (especie) especie.value = "";
    if (porte) porte.value = "";
    if (servico) servico.value = "";

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




function criarGradienteBarra(chart, corInicial, corFinal) {
    const { ctx, chartArea } = chart;

    if (!chartArea) return corInicial;

    const gradiente = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradiente.addColorStop(0, corInicial);
    gradiente.addColorStop(1, corFinal);

    return gradiente;
}

function formatarMoedaGrafico(valor) {
    return Number(valor || 0).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function quebrarRotuloGrafico(label, limite = 18) {
    if (!label || label.length <= limite) return label;

    const palavras = String(label).split(" ");
    const linhas = [];
    let linhaAtual = "";

    palavras.forEach(palavra => {
        if ((linhaAtual + " " + palavra).trim().length > limite) {
            if (linhaAtual) linhas.push(linhaAtual);
            linhaAtual = palavra;
        } else {
            linhaAtual = `${linhaAtual} ${palavra}`.trim();
        }
    });

    if (linhaAtual) linhas.push(linhaAtual);

    return linhas.slice(0, 3);
}

function obterFiltrosFaturamentoAvancados() {
    return {
        especie: document.getElementById("filtroEspecieFaturamento")?.value || "",
        porte: document.getElementById("filtroPorteFaturamento")?.value || "",
        servico: (document.getElementById("filtroServicoFaturamento")?.value || "").trim().toLowerCase()
    };
}

function agendamentoTemServico(agendamento, filtroServico) {
    if (!filtroServico) return true;
    if (!Array.isArray(agendamento.servicos)) return false;

    const servicos = agendamento.servicos.map(servico => (servico.nome || "").toLowerCase());

    if (filtroServico === "banho") {
        return servicos.some(nome => nome.includes("banho"));
    }

    if (filtroServico === "tosa") {
        return servicos.some(nome => nome.includes("tosa") && !nome.includes("higiênica") && !nome.includes("higienica"));
    }

    if (filtroServico === "avulsos") {
        const termosAvulsos = [
            "hidratação",
            "hidratacao",
            "tosa higiênica",
            "tosa higienica",
            "tratamento anti-parasitas",
            "anti-parasitas",
            "anti parasitas",
            "corte de unha"
        ];

        return servicos.some(nome => termosAvulsos.some(termo => nome.includes(termo)));
    }

    return servicos.some(nome => nome.includes(filtroServico));
}

function aplicarFiltrosAvancadosFaturamento(dados) {
    const filtros = obterFiltrosFaturamentoAvancados();

    return dados.filter(item => {
        const especieOk = !filtros.especie || item.especie === filtros.especie;
        const porteOk = !filtros.porte || item.porte === filtros.porte;
        const servicoOk = agendamentoTemServico(item, filtros.servico);

        return especieOk && porteOk && servicoOk;
    });
}

const pluginRotulosValores = {
    id: "pluginRotulosValores",
    afterDatasetsDraw(chart) {
        const { ctx } = chart;

        ctx.save();
        ctx.font = "bold 12px Arial";
        ctx.fillStyle = "#4d3f43";

        chart.data.datasets.forEach((dataset, datasetIndex) => {
            const meta = chart.getDatasetMeta(datasetIndex);

            meta.data.forEach((element, index) => {
                const valor = Number(dataset.data[index] || 0);
                if (valor <= 0) return;

                const posicao = element.tooltipPosition();

                if (chart.config.type === "doughnut") {
                    const total = dataset.data.reduce((acc, item) => acc + Number(item || 0), 0);
                    const percentual = total > 0 ? ((valor / total) * 100).toFixed(1).replace(".", ",") : "0,0";

                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.fillText(`${percentual}%`, posicao.x, posicao.y);
                    return;
                }

                const texto = formatarMoedaGrafico(valor);

                if (chart.options.indexAxis === "y") {
                    ctx.textAlign = "left";
                    ctx.textBaseline = "middle";
                    ctx.fillText(texto, posicao.x + 8, posicao.y);
                } else {
                    ctx.textAlign = "center";
                    ctx.textBaseline = "bottom";
                    ctx.fillText(texto, posicao.x, posicao.y - 8);
                }
            });
        });

        ctx.restore();
    }
};

function opcoesGraficoBarras(tituloEixo = "Faturamento", horizontal = false) {
    if (horizontal) {
        return {
            indexAxis: "y",
            responsive: true,
            maintainAspectRatio: false,
            layout: { padding: { top: 16, right: 90, bottom: 8, left: 8 } },
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label(context) {
                            return `${context.dataset.label || tituloEixo}: ${formatarMoedaGrafico(context.raw)}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    grid: { color: "rgba(214, 90, 126, .14)" },
                    ticks: {
                        color: "#8a737b",
                        callback(value) { return formatarMoedaGrafico(value); }
                    }
                },
                y: {
                    grid: { display: false },
                    ticks: {
                        color: "#4d3f43",
                        font: { weight: "bold", size: 11 },
                        callback(value) {
                            return quebrarRotuloGrafico(this.getLabelForValue(value), 26);
                        }
                    }
                }
            }
        };
    }

    return {
        responsive: true,
        maintainAspectRatio: false,
        layout: { padding: { top: 34, right: 18, bottom: 14, left: 8 } },
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label(context) {
                        return `${context.dataset.label || tituloEixo}: ${formatarMoedaGrafico(context.raw)}`;
                    }
                }
            }
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: {
                    color: "#4d3f43",
                    font: { weight: "bold", size: 11 },
                    maxRotation: 0,
                    minRotation: 0,
                    autoSkip: false,
                    callback(value) {
                        return quebrarRotuloGrafico(this.getLabelForValue(value), 16);
                    }
                }
            },
            y: {
                beginAtZero: true,
                grid: { color: "rgba(214, 90, 126, .14)" },
                ticks: {
                    color: "#8a737b",
                    callback(value) { return formatarMoedaGrafico(value); }
                }
            }
        }
    };
}

function opcoesGraficoRosca() {
    return {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "62%",
        layout: { padding: 18 },
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    color: "#4d3f43",
                    font: { weight: "bold" },
                    padding: 18,
                    usePointStyle: true,
                    pointStyle: "circle"
                }
            },
            tooltip: {
                callbacks: {
                    label(context) {
                        const total = context.dataset.data.reduce((acc, item) => acc + Number(item || 0), 0);
                        const valor = Number(context.raw || 0);
                        const percentual = total > 0 ? ((valor / total) * 100).toFixed(1).replace(".", ",") : "0,0";
                        return `${context.label}: ${formatarMoedaGrafico(valor)} (${percentual}%)`;
                    }
                }
            }
        }
    };
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
            datasets: [{
                label: "Faturamento",
                data: Object.values(porDia),
                backgroundColor(context) {
                    return criarGradienteBarra(context.chart, "rgba(248, 191, 207, .94)", "rgba(185, 74, 106, .96)");
                },
                borderColor: "#b94a6a",
                borderWidth: 1,
                borderRadius: 16,
                borderSkipped: false,
                maxBarThickness: 54
            }]
        },
        options: opcoesGraficoBarras("Faturamento"),
        plugins: [pluginRotulosValores]
    });

    chartEspecie = new Chart(document.getElementById("graficoEspecie"), {
        type: "doughnut",
        data: {
            labels: Object.keys(porEspecie),
            datasets: [{
                data: Object.values(porEspecie),
                backgroundColor: [
                    "rgba(214, 90, 126, .92)",
                    "rgba(248, 191, 207, .94)",
                    "rgba(173, 139, 120, .82)",
                    "rgba(138, 131, 131, .82)"
                ],
                borderColor: "#fff",
                borderWidth: 5,
                hoverOffset: 8
            }]
        },
        options: opcoesGraficoRosca(),
        plugins: [pluginRotulosValores]
    });

    const servicosOrdenados = Object.entries(porServico).sort((a, b) => b[1] - a[1]);
    const usarHorizontal = servicosOrdenados.length >= 4;

    chartServico = new Chart(document.getElementById("graficoServico"), {
        type: "bar",
        data: {
            labels: servicosOrdenados.map(item => item[0]),
            datasets: [{
                label: "Valor",
                data: servicosOrdenados.map(item => item[1]),
                backgroundColor(context) {
                    return criarGradienteBarra(context.chart, "rgba(248, 191, 207, .92)", "rgba(150, 54, 83, .95)");
                },
                borderColor: "#963653",
                borderWidth: 1,
                borderRadius: 16,
                borderSkipped: false,
                maxBarThickness: 46
            }]
        },
        options: opcoesGraficoBarras("Valor", usarHorizontal),
        plugins: [pluginRotulosValores]
    });
}

function mostrarConfirmacaoAdmin({ titulo, mensagem, icone = "⚠️", textoConfirmar = "Confirmar", textoCancelar = "Cancelar" }) {
    return new Promise(resolve => {
        const modal = document.getElementById("modalConfirmacaoAdmin");
        const tituloEl = document.getElementById("modalConfirmacaoTitulo");
        const mensagemEl = document.getElementById("modalConfirmacaoMensagem");
        const iconeEl = document.getElementById("modalConfirmacaoIcone");
        const btnConfirmar = document.getElementById("btnConfirmarModalAdmin");
        const btnCancelar = document.getElementById("btnCancelarModalAdmin");

        tituloEl.textContent = titulo;
        mensagemEl.textContent = mensagem;
        iconeEl.textContent = icone;
        btnConfirmar.textContent = textoConfirmar;
        btnCancelar.textContent = textoCancelar;

        modal.classList.add("ativo");

        const fechar = resultado => {
            modal.classList.remove("ativo");
            btnConfirmar.onclick = null;
            btnCancelar.onclick = null;
            resolve(resultado);
        };

        btnConfirmar.onclick = () => fechar(true);
        btnCancelar.onclick = () => fechar(false);

        modal.onclick = event => {
            if (event.target === modal) fechar(false);
        };
    });
}


async function concluirAgendamento(id) {
    const confirmar = await mostrarConfirmacaoAdmin({
        titulo: "Concluir agendamento",
        mensagem: "Deseja marcar este agendamento como concluído? Ele passará a contar no faturamento.",
        icone: "✅",
        textoConfirmar: "Concluir",
        textoCancelar: "Voltar"
    });

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
    const confirmar = await mostrarConfirmacaoAdmin({
        titulo: "Cancelar agendamento",
        mensagem: "Deseja cancelar e excluir este agendamento? Esta ação não poderá ser desfeita.",
        icone: "🗑️",
        textoConfirmar: "Excluir",
        textoCancelar: "Voltar"
    });

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
    const porte = document.getElementById("porteServico").value;
    const pelagem = document.getElementById("pelagemServico").value;
    const tipoTosa = document.getElementById("tipoTosaServico").value;

    if (!nome || !preco) {
        alert("Preencha o nome do serviço e o preço.");
        return;
    }

    await db.collection("servicos").add({
        nome,
        preco,
        especie,
        porte,
        pelagem,
        tipoTosa,
        ativo: true,
        criadoEm: firebase.firestore.FieldValue.serverTimestamp()
    });

    document.getElementById("nomeServico").value = "";
    document.getElementById("precoServico").value = "";
    document.getElementById("especieServico").value = "Cão";
    document.getElementById("porteServico").value = "";
    document.getElementById("pelagemServico").value = "";
    document.getElementById("tipoTosaServico").value = "";

    await carregarServicosAdmin();
    renderizarServicosAdmin();
}


function valorFiltroServico(id) {
    const elemento = document.getElementById(id);
    return elemento ? elemento.value : "";
}

function campoBateFiltro(valorCampo, valorFiltro) {
    if (!valorFiltro) return true;
    if (valorFiltro === "__sem__") return !valorCampo;
    return valorCampo === valorFiltro;
}

function obterServicosAdminFiltrados() {
    const filtroNome = valorFiltroServico("filtroNomeServico").trim().toLowerCase();
    const filtroPorte = valorFiltroServico("filtroPorteServico");
    const filtroPelagem = valorFiltroServico("filtroPelagemServico");
    const filtroTipoTosa = valorFiltroServico("filtroTipoTosaServico");

    return servicosAdmin.filter(servico => {
        const nomeOk = !filtroNome || (servico.nome || "").toLowerCase().includes(filtroNome);
        const porteOk = campoBateFiltro(servico.porte || "", filtroPorte);
        const pelagemOk = campoBateFiltro(servico.pelagem || "", filtroPelagem);
        const tipoTosaOk = campoBateFiltro(servico.tipoTosa || "", filtroTipoTosa);

        return nomeOk && porteOk && pelagemOk && tipoTosaOk;
    });
}

function limparFiltrosServicos() {
    document.getElementById("filtroNomeServico").value = "";
    document.getElementById("filtroPorteServico").value = "";
    document.getElementById("filtroPelagemServico").value = "";
    document.getElementById("filtroTipoTosaServico").value = "";

    renderizarServicosAdmin();
}


function renderizarServicosAdmin() {
    const lista = document.getElementById("listaServicosAdmin");
    lista.innerHTML = "";

    const servicosFiltrados = obterServicosAdminFiltrados();

    if (servicosAdmin.length === 0) {
        lista.innerHTML = "<p>Nenhum serviço cadastrado ainda.</p>";
        return;
    }

    if (servicosFiltrados.length === 0) {
        lista.innerHTML = "<p>Nenhuma regra encontrada para os filtros selecionados.</p>";
        return;
    }

    const contador = document.createElement("div");
    contador.className = "service-filter-count";
    contador.textContent = `Exibindo ${servicosFiltrados.length} de ${servicosAdmin.length} regras cadastradas.`;
    lista.appendChild(contador);

    servicosFiltrados.forEach(servico => {
        const div = document.createElement("div");
        div.className = "service-item service-item-pricing";

        div.innerHTML = `
            <input type="text" value="${servico.nome || ""}" id="nome-${servico.id}">

            <select id="especie-${servico.id}">
                <option value="Cão" ${servico.especie === "Cão" ? "selected" : ""}>Cão</option>
                <option value="Gato" ${servico.especie === "Gato" ? "selected" : ""}>Gato</option>
                <option value="Ambos" ${servico.especie === "Ambos" ? "selected" : ""}>Ambos</option>
            </select>

            <select id="porte-${servico.id}">
                <option value="" ${!servico.porte ? "selected" : ""}>Sem porte</option>
                <option value="Pequeno" ${servico.porte === "Pequeno" ? "selected" : ""}>Pequeno</option>
                <option value="Médio" ${servico.porte === "Médio" ? "selected" : ""}>Médio</option>
                <option value="Grande" ${servico.porte === "Grande" ? "selected" : ""}>Grande</option>
            </select>

            <select id="pelagem-${servico.id}">
                <option value="" ${!servico.pelagem ? "selected" : ""}>Sem pelagem</option>
                <option value="Curto" ${servico.pelagem === "Curto" ? "selected" : ""}>Curto</option>
                <option value="Médio" ${servico.pelagem === "Médio" ? "selected" : ""}>Médio</option>
                <option value="Longo" ${servico.pelagem === "Longo" ? "selected" : ""}>Longo</option>
            </select>

            <select id="tipoTosa-${servico.id}">
                <option value="" ${!servico.tipoTosa ? "selected" : ""}>Sem tipo</option>
                <option value="Geral" ${servico.tipoTosa === "Geral" ? "selected" : ""}>Geral</option>
                <option value="Verão" ${servico.tipoTosa === "Verão" ? "selected" : ""}>Verão</option>
                <option value="Bebê" ${servico.tipoTosa === "Bebê" ? "selected" : ""}>Bebê</option>
                <option value="Tesoura" ${servico.tipoTosa === "Tesoura" ? "selected" : ""}>Tesoura</option>
            </select>

            <input type="number" value="${servico.preco || 0}" step="0.01" id="preco-${servico.id}">

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
    const porte = document.getElementById(`porte-${id}`).value;
    const pelagem = document.getElementById(`pelagem-${id}`).value;
    const tipoTosa = document.getElementById(`tipoTosa-${id}`).value;

    await db.collection("servicos").doc(id).update({
        nome,
        preco,
        especie,
        porte,
        pelagem,
        tipoTosa,
        ativo: true,
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
