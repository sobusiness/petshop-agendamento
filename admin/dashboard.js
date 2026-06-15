let agendamentos = [];
let servicosAdmin = [];
let pacotesAdmin = [];
let bloqueiosAgenda = [];
let mesBloqueioReferencia = new Date();
let diasSelecionadosBloqueio = [];
let filtroAgendaPeriodo = "todos";
let filtroFaturamentoAtual = "todos";

let chartFaturamentoDia = null;
let chartEspecie = null;
let chartServico = null;

const horasAgenda = [];

for (let hora = 9; hora <= 17; hora++) {
    horasAgenda.push(`${hora.toString().padStart(2, "0")}:00`);

    if (hora < 17) {
        horasAgenda.push(`${hora.toString().padStart(2, "0")}:30`);
    }
}

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
    await carregarPacotesAdmin();
    await carregarBloqueiosAgenda();
    renderizarAgenda();
    atualizarFaturamento();
    renderizarServicosAdmin();
    renderizarPacotes();
    preencherHorariosBloqueio();
    renderizarCalendarioBloqueios();
    atualizarTextoDiasSelecionados();
    renderizarBloqueiosAgenda();
    configurarMascaraTelefonePacote();
    preencherHorariosPacote();
    atualizarPreviaPacote();
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
    if (secao === "dias-horarios") botoes[2].classList.add("active");
    if (secao === "pacotes") botoes[3].classList.add("active");
    if (secao === "servicos") botoes[4].classList.add("active");
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

async function carregarPacotesAdmin() {
    const snapshot = await db.collection("pacotes").orderBy("criadoEm", "desc").get();

    pacotesAdmin = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
}

async function carregarBloqueiosAgenda() {
    const snapshot = await db.collection("bloqueiosAgenda").orderBy("data", "asc").get();

    bloqueiosAgenda = snapshot.docs.map(doc => ({
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

function obterDatasAgendaAberta() {
    const datas = new Set();

    agendamentos.forEach(item => {
        if (item.data && agendamentoBateFiltroProtocolo(item)) {
            datas.add(item.data);
        }
    });

    bloqueiosAgenda.forEach(item => {
        if (item.status === "Ativo" && item.data) {
            datas.add(item.data);
        }
    });

    if (datas.size === 0) {
        datas.add(hojeISO());
    }

    return Array.from(datas).sort();
}

function obterDatasAgendaPorPeriodo() {
    const hoje = hojeISO();

    if (filtroAgendaPeriodo === "hoje") {
        return [hoje];
    }

    if (filtroAgendaPeriodo === "ultimos7") {
        const inicio = adicionarDias(hoje, -6);
        return Array.from({ length: 7 }, (_, index) => adicionarDias(inicio, index));
    }

    if (filtroAgendaPeriodo === "ultimos15") {
        const inicio = adicionarDias(hoje, -14);
        return Array.from({ length: 15 }, (_, index) => adicionarDias(inicio, index));
    }

    return obterDatasAgendaAberta();
}

function formatarDataCurta(dataISO) {
    return new Date(dataISO + "T00:00:00").toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit"
    });
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

function horariosSobrepostos(inicioA, duracaoA, inicioB, duracaoB) {
    const aInicio = horarioParaMinutos(inicioA);
    const aFim = aInicio + Number(duracaoA || 60);
    const bInicio = horarioParaMinutos(inicioB);
    const bFim = bInicio + Number(duracaoB || 60);

    return aInicio < bFim && aFim > bInicio;
}

function existeConflitoHorario(data, horario, duracaoMinutos = 60, ignorarAgendamentoId = null) {
    return agendamentos.some(item => {
        if (item.id === ignorarAgendamentoId) return false;
        if (item.data !== data) return false;

        return horariosSobrepostos(horario, duracaoMinutos, item.horario, Number(item.duracaoMinutos || 60));
    });
}


function existeBloqueioHorario(data, horario, duracaoMinutos = 60, ignorarBloqueioId = null) {
    return bloqueiosAgenda.some(bloqueio => {
        if (bloqueio.id === ignorarBloqueioId) return false;
        if (bloqueio.status !== "Ativo") return false;
        if (bloqueio.data !== data) return false;

        const duracaoBloqueio = horarioParaMinutos(bloqueio.fim) - horarioParaMinutos(bloqueio.inicio);

        return horariosSobrepostos(horario, duracaoMinutos, bloqueio.inicio, duracaoBloqueio);
    });
}

function obterBloqueioHorario(data, horario) {
    return bloqueiosAgenda.find(bloqueio => {
        if (bloqueio.status !== "Ativo") return false;
        if (bloqueio.data !== data) return false;

        const duracaoBloqueio = horarioParaMinutos(bloqueio.fim) - horarioParaMinutos(bloqueio.inicio);

        return horariosSobrepostos(horario, 30, bloqueio.inicio, duracaoBloqueio);
    });
}

function existeConflitoAgendaOuBloqueio(data, horario, duracaoMinutos = 60) {
    return existeConflitoHorario(data, horario, duracaoMinutos) || existeBloqueioHorario(data, horario, duracaoMinutos);
}


function obterOpcoesHorarioPacote() {
    return horasAgenda.filter(horario => horario !== "12:00" && horario !== "12:30");
}

function datasPacoteParaValidacao() {
    const tipo = document.getElementById("pacoteTipo")?.value || "Mensal";
    const primeiroBanhoInput = document.getElementById("pacotePrimeiroBanho");
    const primeiroBanho = primeiroBanhoInput?.value || primeiroBanhoInput?.getAttribute("value") || "";

    if (!primeiroBanho) return [];

    return calcularDatasPacote(tipo, primeiroBanho);
}

function preencherHorariosPacote() {
    const select = document.getElementById("pacoteHorario");
    if (!select) return;

    const valorAtual = select.value;
    const datas = datasPacoteParaValidacao();
    const temDatas = datas.length > 0;

    select.innerHTML = `<option value="">Horário</option>`;

    obterOpcoesHorarioPacote().forEach(horario => {
        const option = document.createElement("option");
        option.value = horario;

        if (!temDatas) {
            option.textContent = `${horario} - Selecione o primeiro banho`;
            option.disabled = true;
        } else {
            const conflito = existeConflitoPacote(datas, horario);
            const ocupado = conflito.length > 0;

            option.textContent = ocupado ? `${horario} - Indisponível` : `${horario} - Disponível`;
            option.disabled = ocupado;
        }

        select.appendChild(option);
    });

    const opcaoAtual = Array.from(select.options).find(option => option.value === valorAtual && !option.disabled);
    select.value = opcaoAtual ? valorAtual : "";
}

function atualizarHorariosPacoteDisponiveis() {
    preencherHorariosPacote();
    atualizarPreviaPacote();
}

function obterFiltroProtocoloAgenda() {
    return (document.getElementById("filtroProtocoloAgenda")?.value || "").trim().toLowerCase();
}

function agendamentoBateFiltroProtocolo(agendamento) {
    const filtro = obterFiltroProtocoloAgenda();
    if (!filtro) return true;

    return (agendamento.protocolo || "").toLowerCase().includes(filtro);
}




let scrollAgendaTravado = false;
let scrollAgendaConfigurado = false;

function obterElementosScrollAgenda() {
    return {
        top: document.getElementById("agendaScrollTop"),
        bottom: document.getElementById("agendaScrollBottom"),
        content: document.getElementById("agendaScrollTopContent"),
        grid: document.getElementById("calendarioAgenda")
    };
}

function sincronizarScrollAgenda(origem) {
    const { top, bottom } = obterElementosScrollAgenda();
    if (!top || !bottom || scrollAgendaTravado) return;

    scrollAgendaTravado = true;

    if (origem === "top") {
        bottom.scrollLeft = top.scrollLeft;
    } else {
        top.scrollLeft = bottom.scrollLeft;
    }

    requestAnimationFrame(() => {
        scrollAgendaTravado = false;
    });
}

function configurarScrollSuperiorAgenda() {
    const { top, bottom } = obterElementosScrollAgenda();
    if (!top || !bottom || scrollAgendaConfigurado) return;

    top.addEventListener("scroll", () => sincronizarScrollAgenda("top"), { passive: true });
    bottom.addEventListener("scroll", () => sincronizarScrollAgenda("bottom"), { passive: true });

    scrollAgendaConfigurado = true;
}

function atualizarScrollSuperiorAgenda() {
    const { top, bottom, content, grid } = obterElementosScrollAgenda();
    if (!top || !bottom || !content || !grid) return;

    configurarScrollSuperiorAgenda();

    const larguraGrid = grid.scrollWidth;
    const larguraMinima = bottom.clientWidth + 1;
    const larguraFinal = Math.max(larguraGrid, larguraMinima);

    content.style.width = `${larguraFinal}px`;
    grid.style.width = `${larguraFinal}px`;

    top.scrollLeft = bottom.scrollLeft;

    requestAnimationFrame(() => {
        content.style.width = `${Math.max(grid.scrollWidth, bottom.clientWidth + 1)}px`;
        top.scrollLeft = bottom.scrollLeft;
    });
}

function moverScrollAgenda(delta) {
    const { bottom, top } = obterElementosScrollAgenda();
    if (!bottom || !top) return;

    bottom.scrollLeft += delta;
    top.scrollLeft = bottom.scrollLeft;
}


function renderizarAgenda() {
    const calendario = document.getElementById("calendarioAgenda");
    const filtroInfo = document.getElementById("agendaFiltroInfo");

    calendario.innerHTML = "";

    const datas = obterDatasAgendaPorPeriodo();

    calendario.style.gridTemplateColumns = `90px repeat(${datas.length}, minmax(170px, 1fr))`;

    calendario.appendChild(criarCelula("Hora", "agenda-cell agenda-header"));

    datas.forEach(data => {
        calendario.appendChild(criarCelula(formatarDataCurta(data), "agenda-cell agenda-header"));
    });

    horasAgenda.forEach(hora => {
        calendario.appendChild(criarCelula(hora, "agenda-cell agenda-hour"));

        datas.forEach(data => {
            const cell = criarCelula("", "agenda-cell");

            if (hora === "12:00" || hora === "12:30") {
                cell.innerHTML = `<div class="agenda-event"><strong>Almoço</strong></div>`;
            } else {
                const agendamento = agendamentos.find(item =>
                    item.data === data &&
                    agendamentoBateFiltroProtocolo(item) &&
                    horariosSobrepostos(hora, 30, item.horario, Number(item.duracaoMinutos || 60))
                );

                if (agendamento) {
                    const servicos = Array.isArray(agendamento.servicos)
                        ? agendamento.servicos.map(s => s.nome).join(", ")
                        : "Serviço não informado";

                    const status = agendamento.status || "Confirmado";
                    const statusClasse = status === "Concluído" ? "status-concluido" : "status-confirmado";
                    const ehInicio = agendamento.horario === hora;

                    cell.innerHTML = `
                        <div class="agenda-event ${!ehInicio ? "agenda-event-bloqueio" : ""}">
                            <div class="agenda-event-header">
                                <strong>${ehInicio ? (agendamento.pet || "Pet") : "Horário bloqueado"}</strong>
                                <span class="status-badge ${statusClasse}">${ehInicio ? status : "Bloqueado"}</span>
                            </div>
                            <div class="agenda-event-info">
                                ${ehInicio ? `<span class="agenda-protocolo">${agendamento.protocolo || ""}</span><br>` : ""}
                                ${ehInicio ? servicos + "<br>" : `Continuação de ${agendamento.horario}<br>`}
                                ${ehInicio ? (agendamento.especie || "") + "<br>" : ""}
                                ${ehInicio ? (agendamento.observacaoPet || "") : ""}
                            </div>
                            ${ehInicio ? `
                                <div class="agenda-duration-control">
                                    <label>Duração</label>
                                    <select onchange="atualizarDuracaoAgendamento('${agendamento.id}', this.value)">
                                        <option value="30" ${Number(agendamento.duracaoMinutos || 60) === 30 ? "selected" : ""}>30 min</option>
                                        <option value="60" ${Number(agendamento.duracaoMinutos || 60) === 60 ? "selected" : ""}>1h</option>
                                        <option value="90" ${Number(agendamento.duracaoMinutos || 60) === 90 ? "selected" : ""}>1h30</option>
                                        <option value="120" ${Number(agendamento.duracaoMinutos || 60) === 120 ? "selected" : ""}>2h</option>
                                        <option value="150" ${Number(agendamento.duracaoMinutos || 60) === 150 ? "selected" : ""}>2h30</option>
                                        <option value="180" ${Number(agendamento.duracaoMinutos || 60) === 180 ? "selected" : ""}>3h</option>
                                    </select>
                                </div>
                                <div class="agenda-event-actions">
                                    <button onclick="concluirAgendamento('${agendamento.id}')">Concluir</button>
                                    <button class="secondary-button" onclick="cancelarAgendamento('${agendamento.id}')">Cancelar</button>
                                </div>
                            ` : ""}
                        </div>
                    `;
                } else {
                    const bloqueio = obterBloqueioHorario(data, hora);

                    if (bloqueio) {
                        const ehInicioBloqueio = bloqueio.inicio === hora;

                        cell.innerHTML = `
                            <div class="agenda-event agenda-event-bloqueio-temporario">
                                <div class="agenda-event-header">
                                    <strong>${ehInicioBloqueio ? "Ausência Temporária" : "Horário bloqueado"}</strong>
                                    <span class="status-badge status-inativo">Bloqueado</span>
                                </div>
                                <div class="agenda-event-info">
                                    ${ehInicioBloqueio ? `${bloqueio.inicio} até ${bloqueio.fim}<br>${bloqueio.motivo || "Ausência Temporária"}` : `Continuação até ${bloqueio.fim}`}
                                </div>
                            </div>
                        `;
                    }
                }
            }

            calendario.appendChild(cell);
        });
    });

    const textosPeriodo = {
        todos: "Exibindo agenda aberta com todas as datas cadastradas.",
        hoje: "Exibindo agendamentos de hoje.",
        ultimos7: "Exibindo últimos 7 dias.",
        ultimos15: "Exibindo últimos 15 dias."
    };

    filtroInfo.textContent = textosPeriodo[filtroAgendaPeriodo] || textosPeriodo.todos;

    setTimeout(atualizarScrollSuperiorAgenda, 0);
    setTimeout(atualizarScrollSuperiorAgenda, 250);
}

function criarCelula(conteudo, classe) {
    const div = document.createElement("div");
    div.className = classe;
    div.innerHTML = conteudo;
    return div;
}

function filtrarAgendamentosHoje() {
    filtroAgendaPeriodo = "hoje";
    renderizarAgenda();
}

function filtrarAgendaPeriodo(periodo) {
    filtroAgendaPeriodo = periodo;
    renderizarAgenda();
}

function limparFiltroAgendamentos() {
    filtroAgendaPeriodo = "todos";

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


function obterPacotesAtivosFaturamento() {
    return pacotesAdmin.filter(pacote => pacote.status === "Ativo");
}

function distribuirValorPacotePorVisitas(pacote) {
    const visitas = Array.isArray(pacote.visitas) ? pacote.visitas : [];
    const quantidade = visitas.length || Number(pacote.quantidadeTotal || 1) || 1;
    const valorPorVisita = Number(pacote.valorPacote || 0) / quantidade;

    return visitas.map(visita => ({
        data: visita.data,
        especie: pacote.especie || "Cão",
        valor: valorPorVisita,
        servico: `Pacote ${pacote.tipo || ""}`.trim()
    }));
}

function obterLancamentosPacotesFaturamento() {
    return obterPacotesAtivosFaturamento().flatMap(distribuirValorPacotePorVisitas);
}

function agruparPorDiaComPacotes(dados) {
    const resultado = agruparPorCampo(dados, "data");

    obterLancamentosPacotesFaturamento().forEach(item => {
        if (!item.data) return;
        resultado[item.data] = (resultado[item.data] || 0) + Number(item.valor || 0);
    });

    return resultado;
}

function agruparPorEspecieComPacotes(dados) {
    const resultado = agruparPorCampo(dados, "especie");

    obterLancamentosPacotesFaturamento().forEach(item => {
        const chave = item.especie || "Não informado";
        resultado[chave] = (resultado[chave] || 0) + Number(item.valor || 0);
    });

    return resultado;
}



function obterResumoPacotesRealizados() {
    return pacotesAdmin.reduce((acc, pacote) => {
        const visitas = Array.isArray(pacote.visitas) ? pacote.visitas : [];
        const realizadas = visitas.filter(visita => visita.status === "Realizado").length;

        // A quantidade continua refletindo os banhos realmente realizados.
        acc.quantidade += realizadas;

        // Como pacote normalmente é pago no fechamento, o valor entra no faturamento
        // quando estiver Ativo ou Concluído. Não entra se estiver Inativo.
        if (pacote.status === "Ativo" || pacote.status === "Concluído") {
            acc.valor += Number(pacote.valorPacote || 0);
        }

        return acc;
    }, { quantidade: 0, valor: 0 });
}

function atualizarFaturamento() {
    const dados = obterAgendamentosFiltradosFaturamento();

    const resumoPacotesRealizados = obterResumoPacotesRealizados();

    const quantidadeAgendamentos = dados.length;
    const valorAgendamentos = dados.reduce((acc, item) => acc + Number(item.valorTotal || 0), 0);

    const quantidade = quantidadeAgendamentos + resumoPacotesRealizados.quantidade;
    const valorTotal = valorAgendamentos + resumoPacotesRealizados.valor;
    const ticketMedio = quantidade > 0 ? valorTotal / quantidade : 0;

    const pacotesAtivos = pacotesAdmin.filter(pacote => pacote.status === "Ativo");
    const valorPacotes = pacotesAtivos.reduce((acc, pacote) => acc + Number(pacote.valorPacote || 0), 0);

    document.getElementById("kpiAtendimentos").textContent = quantidade;
    document.getElementById("kpiValorTotal").textContent = formatarMoeda(valorTotal);
    document.getElementById("kpiTicketMedio").textContent = formatarMoeda(ticketMedio);

    const kpiPacotesAtivos = document.getElementById("kpiPacotesAtivos");
    const kpiValorPacotes = document.getElementById("kpiValorPacotes");

    if (kpiPacotesAtivos) kpiPacotesAtivos.textContent = pacotesAtivos.length;
    if (kpiValorPacotes) kpiValorPacotes.textContent = formatarMoeda(valorPacotes);

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

    pacotesAdmin
        .filter(pacote => pacote.status === "Ativo" || pacote.status === "Concluído")
        .forEach(pacote => {
            const nome = `Pacote ${pacote.tipo || ""}`.trim();
            resultado[nome] = (resultado[nome] || 0) + Number(pacote.valorPacote || 0);
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
    const porDia = agruparPorDiaComPacotes(dados);
    const porEspecie = agruparPorEspecieComPacotes(dados);
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




function preencherHorariosBloqueio() {
    const inicio = document.getElementById("bloqueioInicio");
    const fim = document.getElementById("bloqueioFim");

    if (!inicio || !fim) return;

    inicio.innerHTML = "";
    fim.innerHTML = "";

    obterOpcoesHorarioPacote().forEach(horario => {
        const optInicio = document.createElement("option");
        optInicio.value = horario;
        optInicio.textContent = horario;
        inicio.appendChild(optInicio);
    });

    horasAgenda
        .filter(horario => horario !== "12:00" && horario !== "12:30")
        .forEach(horario => {
            const optFim = document.createElement("option");
            optFim.value = horario;
            optFim.textContent = horario;
            fim.appendChild(optFim);
        });

    inicio.value = "09:00";
    fim.value = "12:00";
}

function obterNomeMes(data) {
    return data.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
}

function dataISOAnoMesDia(ano, mes, dia) {
    return `${ano}-${String(mes + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
}

function mudarMesBloqueio(delta) {
    mesBloqueioReferencia.setMonth(mesBloqueioReferencia.getMonth() + delta);
    renderizarCalendarioBloqueios();
}

function atualizarTextoDiasSelecionados() {
    const texto = document.getElementById("diasSelecionadosBloqueio");
    if (!texto) return;

    if (diasSelecionadosBloqueio.length === 0) {
        texto.textContent = "Nenhum dia selecionado.";
        return;
    }

    const datasFormatadas = [...diasSelecionadosBloqueio]
        .sort()
        .map(data => formatarDataCurta(data));

    texto.textContent = datasFormatadas.join(", ");
}

function selecionarDataBloqueio(dataISO) {
    const input = document.getElementById("bloqueioData");
    if (input) input.value = dataISO;

    if (diasSelecionadosBloqueio.includes(dataISO)) {
        diasSelecionadosBloqueio = diasSelecionadosBloqueio.filter(data => data !== dataISO);
    } else {
        diasSelecionadosBloqueio.push(dataISO);
    }

    atualizarTextoDiasSelecionados();
    renderizarCalendarioBloqueios();
}

function selecionarDataManualBloqueio() {
    const dataISO = document.getElementById("bloqueioData").value;
    if (!dataISO) return;

    if (!diasSelecionadosBloqueio.includes(dataISO)) {
        diasSelecionadosBloqueio.push(dataISO);
    }

    atualizarTextoDiasSelecionados();
    renderizarCalendarioBloqueios();
}

function limparSelecaoDiasBloqueio() {
    diasSelecionadosBloqueio = [];
    const input = document.getElementById("bloqueioData");
    if (input) input.value = "";

    atualizarTextoDiasSelecionados();
    renderizarCalendarioBloqueios();
}

function renderizarCalendarioBloqueios() {
    const container = document.getElementById("calendarioBloqueios");
    const titulo = document.getElementById("tituloMesBloqueio");

    if (!container || !titulo) return;

    const ano = mesBloqueioReferencia.getFullYear();
    const mes = mesBloqueioReferencia.getMonth();
    const selecionada = document.getElementById("bloqueioData")?.value || "";

    titulo.textContent = obterNomeMes(mesBloqueioReferencia);

    container.innerHTML = "";

    ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].forEach(dia => {
        const header = document.createElement("div");
        header.className = "bloqueio-dia-header";
        header.textContent = dia;
        container.appendChild(header);
    });

    const primeiroDia = new Date(ano, mes, 1).getDay();
    const totalDias = new Date(ano, mes + 1, 0).getDate();

    for (let i = 0; i < primeiroDia; i++) {
        const vazio = document.createElement("div");
        vazio.className = "bloqueio-dia vazio";
        container.appendChild(vazio);
    }

    for (let dia = 1; dia <= totalDias; dia++) {
        const dataISO = dataISOAnoMesDia(ano, mes, dia);
        const bloqueiosDia = bloqueiosAgenda.filter(b => b.status === "Ativo" && b.data === dataISO);

        const celula = document.createElement("button");
        celula.type = "button";
        celula.className = `bloqueio-dia ${(selecionada === dataISO || diasSelecionadosBloqueio.includes(dataISO)) ? "selecionado" : ""} ${bloqueiosDia.length ? "com-bloqueio" : ""}`;
        celula.onclick = () => selecionarDataBloqueio(dataISO);

        celula.innerHTML = `
            <strong>${dia}</strong>
            ${bloqueiosDia.length ? `<span>${bloqueiosDia.length} bloqueio(s)</span>` : ""}
        `;

        container.appendChild(celula);
    }
}

async function salvarBloqueioAgenda() {
    const dataCampo = document.getElementById("bloqueioData").value;
    const datas = diasSelecionadosBloqueio.length > 0 ? [...diasSelecionadosBloqueio] : [dataCampo].filter(Boolean);
    const inicio = document.getElementById("bloqueioInicio").value;
    const fim = document.getElementById("bloqueioFim").value;
    const motivo = document.getElementById("bloqueioMotivo").value.trim() || "Ausência Temporária";

    if (datas.length === 0 || !inicio || !fim) {
        await mostrarAvisoAdmin({
            titulo: "Campos obrigatórios",
            mensagem: "Selecione pelo menos um dia, o horário inicial e o horário final do bloqueio.",
            icone: "⚠️"
        });
        return;
    }

    await criarBloqueiosAgenda(datas, inicio, fim, motivo);
}

async function bloquearDiasSelecionadosDiaTodo() {
    const dataCampo = document.getElementById("bloqueioData").value;
    const datas = diasSelecionadosBloqueio.length > 0 ? [...diasSelecionadosBloqueio] : [dataCampo].filter(Boolean);
    const motivo = document.getElementById("bloqueioMotivo").value.trim() || "Ausência Temporária";

    if (datas.length === 0) {
        await mostrarAvisoAdmin({
            titulo: "Nenhum dia selecionado",
            mensagem: "Selecione um ou mais dias no calendário antes de bloquear o dia todo.",
            icone: "⚠️"
        });
        return;
    }

    await criarBloqueiosAgenda(datas, "09:00", "17:30", motivo, true);
}

async function criarBloqueiosAgenda(datas, inicio, fim, motivo, diaTodo = false) {
    const duracao = horarioParaMinutos(fim) - horarioParaMinutos(inicio);

    if (duracao <= 0) {
        await mostrarAvisoAdmin({
            titulo: "Horário inválido",
            mensagem: "O horário final precisa ser maior que o horário inicial.",
            icone: "⚠️"
        });
        return;
    }

    const conflitos = [];

    datas.forEach(data => {
        if (existeConflitoHorario(data, inicio, duracao)) {
            conflitos.push(formatarDataCurta(data));
        }
    });

    if (conflitos.length > 0) {
        await mostrarAvisoAdmin({
            titulo: "Bloqueio não permitido",
            mensagem: `Existem agendamentos avulsos ou pacotes nos seguintes dias/horários: ${conflitos.join(", ")}. Cancele ou remaneje antes de bloquear.`,
            icone: "⚠️"
        });
        return;
    }

    const duplicados = [];

    datas.forEach(data => {
        if (existeBloqueioHorario(data, inicio, duracao)) {
            duplicados.push(formatarDataCurta(data));
        }
    });

    if (duplicados.length > 0) {
        await mostrarAvisoAdmin({
            titulo: "Bloqueio duplicado",
            mensagem: `Já existe ausência temporária cadastrada nesse período para: ${duplicados.join(", ")}.`,
            icone: "⚠️"
        });
        return;
    }

    const batch = db.batch();

    datas.forEach(data => {
        const ref = db.collection("bloqueiosAgenda").doc();

        batch.set(ref, {
            data,
            inicio,
            fim,
            motivo,
            diaTodo,
            status: "Ativo",
            criadoEm: firebase.firestore.FieldValue.serverTimestamp()
        });
    });

    await batch.commit();

    document.getElementById("bloqueioMotivo").value = "";
    limparSelecaoDiasBloqueio();

    await carregarBloqueiosAgenda();

    renderizarAgenda();
    renderizarBloqueiosAgenda();
    renderizarCalendarioBloqueios();
    preencherHorariosPacote();

    await mostrarAvisoAdmin({
        titulo: "Agenda bloqueada",
        mensagem: datas.length === 1
            ? "O período foi bloqueado com sucesso."
            : `${datas.length} dias/períodos foram bloqueados com sucesso.`,
        icone: "✅"
    });
}

function renderizarBloqueiosAgenda() {
    const lista = document.getElementById("listaBloqueiosAgenda");
    if (!lista) return;

    const bloqueios = bloqueiosAgenda
        .filter(b => b.status === "Ativo")
        .sort((a, b) => `${a.data} ${a.inicio}`.localeCompare(`${b.data} ${b.inicio}`));

    if (bloqueios.length === 0) {
        lista.innerHTML = `<p class="empty-state">Nenhum bloqueio cadastrado.</p>`;
        return;
    }

    lista.innerHTML = bloqueios.map(bloqueio => `
        <div class="bloqueio-card">
            <div>
                <strong>${formatarDataCurta(bloqueio.data)} — ${bloqueio.inicio} até ${bloqueio.fim}</strong>
                <span>${bloqueio.diaTodo ? "Dia todo — " : ""}${bloqueio.motivo || "Ausência Temporária"}</span>
            </div>
            <button class="secondary-button" onclick="excluirBloqueioAgenda('${bloqueio.id}')">Desbloquear</button>
        </div>
    `).join("");
}

async function excluirBloqueioAgenda(id) {
    const confirmar = await mostrarConfirmacaoAdmin({
        titulo: "Desbloquear horário",
        mensagem: "Deseja remover este bloqueio e liberar novamente esse período para agendamentos?",
        icone: "🔓",
        textoConfirmar: "Desbloquear",
        textoCancelar: "Voltar"
    });

    if (!confirmar) return;

    await db.collection("bloqueiosAgenda").doc(id).delete();
    await carregarBloqueiosAgenda();

    renderizarAgenda();
    renderizarBloqueiosAgenda();
    renderizarCalendarioBloqueios();
    preencherHorariosPacote();
}


function mostrarAvisoAdmin({ titulo, mensagem, icone = "ℹ️", textoConfirmar = "OK" }) {
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

        btnCancelar.style.display = "none";
        modal.classList.add("ativo");

        const fechar = () => {
            modal.classList.remove("ativo");
            btnCancelar.style.display = "";
            btnConfirmar.onclick = null;
            resolve(true);
        };

        btnConfirmar.onclick = fechar;
    });
}

function configurarMascaraTelefonePacote() {
    const input = document.getElementById("pacoteTelefone");
    if (!input) return;

    input.addEventListener("input", () => {
        input.value = formatarTelefonePacote(input.value);
    });
}

function formatarTelefonePacote(valor) {
    const numeros = valor.replace(/\D/g, "").slice(0, 11);

    if (numeros.length <= 2) return numeros;
    if (numeros.length <= 7) return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;

    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
}

function gerarProtocoloPacote() {
    return `PACK-${Math.floor(10000 + Math.random() * 90000)}`;
}

function calcularDatasPacote(tipo, primeiroBanho) {
    if (!tipo || !primeiroBanho) return [];

    const quantidade = tipo === "Mensal" ? 4 : 2;
    const intervaloDias = tipo === "Mensal" ? 7 : 14;
    const datas = [];

    for (let i = 0; i < quantidade; i++) {
        datas.push(adicionarDias(primeiroBanho, i * intervaloDias));
    }

    return datas;
}

function atualizarPreviaPacote() {
    const tipo = document.getElementById("pacoteTipo")?.value || "Mensal";
    const primeiroBanho = document.getElementById("pacotePrimeiroBanho")?.value || "";
    const horario = document.getElementById("pacoteHorario")?.value || "";
    const dataFimInput = document.getElementById("pacoteDataFim");
    const previa = document.getElementById("pacotePreviaDatas");
    const selectHorarioPacote = document.getElementById("pacoteHorario");

    if (primeiroBanho && selectHorarioPacote && Array.from(selectHorarioPacote.options).some(option => option.textContent.includes("Selecione o primeiro banho"))) {
        preencherHorariosPacote();
    }

    if (!previa || !dataFimInput) return;

    const datas = calcularDatasPacote(tipo, primeiroBanho);

    if (datas.length === 0) {
        dataFimInput.value = "";
        previa.textContent = "Preencha o tipo, data do primeiro banho e horário.";
        return;
    }

    dataFimInput.value = formatarDataCurta(datas[datas.length - 1]);

    previa.innerHTML = datas.map((data, index) => {
        return `<span>${index + 1}º banho: ${formatarDataCurta(data)} ${horario ? "às " + horario : ""}</span>`;
    }).join("");
}

function existeConflitoPacote(datas, horario) {
    return datas
        .map(data => {
            const agendamento = agendamentos.find(item => {
                if (item.data !== data) return false;
                return horariosSobrepostos(horario, 60, item.horario, Number(item.duracaoMinutos || 60));
            });

            if (agendamento) return { data, horario, agendamento };

            const bloqueio = bloqueiosAgenda.find(item => {
                if (item.status !== "Ativo") return false;
                if (item.data !== data) return false;
                const duracaoBloqueio = horarioParaMinutos(item.fim) - horarioParaMinutos(item.inicio);
                return horariosSobrepostos(horario, 60, item.inicio, duracaoBloqueio);
            });

            return bloqueio ? { data, horario, bloqueio } : null;
        })
        .filter(Boolean);
}

async function salvarPacote() {
    const nomeCliente = document.getElementById("pacoteNomeCliente").value.trim();
    const telefone = document.getElementById("pacoteTelefone").value.trim();
    const nomePet = document.getElementById("pacoteNomePet").value.trim();
    const tipo = document.getElementById("pacoteTipo").value;
    const dataInicio = document.getElementById("pacoteDataInicio").value;
    const primeiroBanho = document.getElementById("pacotePrimeiroBanho").value;
    const horario = document.getElementById("pacoteHorario").value;
    const valorPacote = Number(document.getElementById("pacoteValor").value || 0);

    if (!nomeCliente || !telefone || !nomePet || !tipo || !dataInicio || !primeiroBanho || !horario || !valorPacote) {
        await mostrarAvisoAdmin({
            titulo: "Campos obrigatórios",
            mensagem: "Preencha todos os campos do pacote antes de cadastrar.",
            icone: "⚠️"
        });
        return;
    }

    const datas = calcularDatasPacote(tipo, primeiroBanho);
    const conflitos = existeConflitoPacote(datas, horario);

    if (conflitos.length > 0) {
        const mensagem = conflitos.map(item => `${formatarDataCurta(item.data)} às ${item.horario}`).join(", ");
        await mostrarAvisoAdmin({
            titulo: "Horário indisponível",
            mensagem: `Não foi possível cadastrar o pacote. Já existe agendamento nos horários: ${mensagem}`,
            icone: "⚠️"
        });
        preencherHorariosPacote();
        return;
    }

    const protocolo = gerarProtocoloPacote();
    const valorPorVisita = valorPacote / datas.length;

    const visitas = datas.map((data, index) => ({
        numero: index + 1,
        data,
        horario,
        status: "Pendente",
        agendamentoId: null
    }));

    const pacoteRef = await db.collection("pacotes").add({
        protocolo,
        nomeCliente,
        telefone,
        nomePet,
        tipo,
        valorPacote,
        dataInicio,
        primeiroBanho,
        dataFim: datas[datas.length - 1],
        horario,
        quantidadeTotal: visitas.length,
        quantidadeRealizada: 0,
        quantidadePendente: visitas.length,
        status: "Ativo",
        renovacaoEnviada: false,
        visitas,
        criadoEm: firebase.firestore.FieldValue.serverTimestamp()
    });

    const visitasAtualizadas = [];

    for (const visita of visitas) {
        const agendamentoRef = await db.collection("agendamentos").add({
            protocolo: `${protocolo}-${visita.numero}`,
            cliente: nomeCliente,
            telefone,
            pet: nomePet,
            especie: "Cão",
            sexo: "",
            raca: "",
            porte: "",
            observacaoPet: `Banho ${visita.numero}/${visitas.length} do pacote ${protocolo}`,
            data: visita.data,
            dataFormatada: formatarDataCurta(visita.data),
            horario: visita.horario,
            duracaoMinutos: 60,
            servicos: [{ nome: `Pacote ${tipo}`, valor: valorPorVisita }],
            valorTotal: valorPorVisita,
            status: "Pacote",
            origem: "pacote",
            pacoteId: pacoteRef.id,
            visitaNumero: visita.numero,
            criadoEm: firebase.firestore.FieldValue.serverTimestamp()
        });

        visitasAtualizadas.push({
            ...visita,
            agendamentoId: agendamentoRef.id
        });
    }

    await pacoteRef.update({ visitas: visitasAtualizadas });

    document.getElementById("pacoteNomeCliente").value = "";
    document.getElementById("pacoteTelefone").value = "";
    document.getElementById("pacoteNomePet").value = "";
    document.getElementById("pacoteTipo").value = "Mensal";
    document.getElementById("pacoteDataInicio").value = "";
    document.getElementById("pacotePrimeiroBanho").value = "";
    document.getElementById("pacoteHorario").value = "";
    document.getElementById("pacoteDataFim").value = "";
    document.getElementById("pacoteValor").value = "";

    await carregarAgendamentos();
    await carregarPacotesAdmin();

    renderizarAgenda();
    renderizarPacotes();
    atualizarFaturamento();
    atualizarPreviaPacote();

    await mostrarAvisoAdmin({
        titulo: "Pacote cadastrado",
        mensagem: "Pacote cadastrado com sucesso.",
        icone: "✅"
    });
}

function obterPacotesFiltrados() {
    const busca = (document.getElementById("filtroPacoteCliente")?.value || "").trim().toLowerCase();
    const status = document.getElementById("filtroPacoteStatus")?.value || "";

    return pacotesAdmin.filter(pacote => {
        const buscaOk = !busca ||
            (pacote.nomeCliente || "").toLowerCase().includes(busca) ||
            (pacote.telefone || "").toLowerCase().includes(busca) ||
            (pacote.protocolo || "").toLowerCase().includes(busca);

        const statusOk = !status || pacote.status === status;

        return buscaOk && statusOk;
    });
}


function gerarOptionsHorarioVisitaPacote(horarioAtual) {
    return obterOpcoesHorarioPacote()
        .map(horario => `<option value="${horario}" ${horario === horarioAtual ? "selected" : ""}>${horario}</option>`)
        .join("");
}


function renderizarPacotes() {
    const lista = document.getElementById("listaPacotesAdmin");
    if (!lista) return;

    const pacotes = obterPacotesFiltrados();

    lista.innerHTML = "";

    if (pacotes.length === 0) {
        lista.innerHTML = `<p class="empty-state">Nenhum pacote encontrado.</p>`;
        return;
    }

    pacotes.forEach(pacote => {
        const visitas = Array.isArray(pacote.visitas) ? pacote.visitas : [];
        const realizadas = visitas.filter(v => v.status === "Realizado").length;
        const pendentes = visitas.length - realizadas;
        const ultimaVisita = visitas[visitas.length - 1];

        const div = document.createElement("div");
        div.className = "pacote-card";

        div.innerHTML = `
            <div class="pacote-card-header">
                <div>
                    <strong>${pacote.nomeCliente || "Cliente"}</strong>
                    <span>${pacote.protocolo || ""}</span>
                </div>

                <span class="status-badge ${pacote.status === "Concluído" ? "status-concluido" : pacote.status === "Ativo" ? "status-confirmado" : "status-inativo"}">${pacote.status || "Ativo"}</span>
            </div>

            <div class="pacote-edit-grid pacote-edit-grid-v2">
                <label>
                    <span>Cliente</span>
                    <input type="text" id="pacote-nome-${pacote.id}" value="${pacote.nomeCliente || ""}">
                </label>

                <label>
                    <span>Telefone</span>
                    <input type="text" id="pacote-telefone-${pacote.id}" value="${pacote.telefone || ""}">
                </label>

                <label>
                    <span>Pet</span>
                    <input type="text" id="pacote-pet-${pacote.id}" value="${pacote.nomePet || ""}">
                </label>

                <label>
                    <span>Valor do Pacote</span>
                    <input type="number" id="pacote-valor-${pacote.id}" value="${pacote.valorPacote || 0}" step="0.01">
                </label>

                <label>
                    <span>Status</span>
                    <select id="pacote-status-${pacote.id}">
                        <option value="Ativo" ${pacote.status === "Ativo" ? "selected" : ""}>Ativo</option>
                        <option value="Inativo" ${pacote.status === "Inativo" ? "selected" : ""}>Inativo</option>
                        <option value="Concluído" ${pacote.status === "Concluído" ? "selected" : ""} disabled>Concluído automaticamente</option>
                    </select>
                </label>
            </div>

            <div class="pacote-info-grid">
                <div><span>Tipo</span><strong>${pacote.tipo}</strong></div>
                <div><span>Início</span><strong>${formatarDataCurta(pacote.dataInicio)}</strong></div>
                <div><span>Primeiro banho</span><strong>${formatarDataCurta(pacote.primeiroBanho)} às ${pacote.horario}</strong></div>
                <div><span>Fim</span><strong>${formatarDataCurta(pacote.dataFim)}</strong></div>
                <div><span>Valor</span><strong>${formatarMoeda(pacote.valorPacote || 0)}</strong></div>
                <div><span>Realizados</span><strong>${realizadas}</strong></div>
                <div><span>Pendentes</span><strong>${pendentes}</strong></div>
            </div>

            <div class="pacote-visitas">
                ${visitas.map(visita => `
                    <div class="pacote-visita ${visita.status === "Realizado" ? "realizada" : ""}">
                        <div>
                            <strong>${visita.numero}º banho</strong>
                            <div class="pacote-visita-edicao">
                                <label>
                                    <span>Data</span>
                                    <input type="date" id="visita-data-${pacote.id}-${visita.numero}" value="${visita.data || ""}">
                                </label>
                                <label>
                                    <span>Horário</span>
                                    <select id="visita-horario-${pacote.id}-${visita.numero}">
                                        ${gerarOptionsHorarioVisitaPacote(visita.horario)}
                                    </select>
                                </label>
                            </div>
                        </div>
                        <div class="pacote-visita-actions">
                            <button onclick="atualizarVisitaPacote('${pacote.id}', ${visita.numero})">Salvar Data</button>
                            <button onclick="alternarStatusVisitaPacote('${pacote.id}', ${visita.numero})">
                                ${visita.status === "Realizado" ? "Marcar Pendente" : "Marcar Realizado"}
                            </button>
                        </div>
                    </div>
                `).join("")}
            </div>

            <div class="pacote-renovacao">
                <span>Último banho: ${ultimaVisita ? formatarDataCurta(ultimaVisita.data) + " às " + ultimaVisita.horario : "-"}</span>
                <button class="whatsapp-renovacao ${pacote.renovacaoEnviada ? "renovacao-enviada" : ""}" onclick="enviarRenovacaoPacote('${pacote.id}')">
                    <i class="fa-brands fa-whatsapp whatsapp-mini-icon"></i>
                    ${pacote.renovacaoEnviada ? "Renovação já enviada" : "Enviar renovação WhatsApp"}
                </button>
            </div>

            <div class="pacote-actions">
                <button onclick="atualizarPacote('${pacote.id}')">Salvar Alterações</button>
                <button class="secondary-button" onclick="excluirPacote('${pacote.id}')">Excluir Pacote</button>
            </div>
        `;

        lista.appendChild(div);
    });
}

async function atualizarPacote(id) {
    const pacoteAtual = pacotesAdmin.find(item => item.id === id);

    const nomeCliente = document.getElementById(`pacote-nome-${id}`).value.trim();
    const telefone = document.getElementById(`pacote-telefone-${id}`).value.trim();
    const nomePet = document.getElementById(`pacote-pet-${id}`).value.trim();
    const valorPacote = Number(document.getElementById(`pacote-valor-${id}`).value || 0);
    const statusSelecionado = document.getElementById(`pacote-status-${id}`).value;

    const status = pacoteAtual?.status === "Concluído" ? "Concluído" : statusSelecionado;

    await db.collection("pacotes").doc(id).update({
        nomeCliente,
        telefone,
        nomePet,
        valorPacote,
        status,
        atualizadoEm: firebase.firestore.FieldValue.serverTimestamp()
    });

    await carregarPacotesAdmin();
    renderizarPacotes();
    atualizarFaturamento();
}


async function atualizarVisitaPacote(pacoteId, visitaNumero) {
    const pacote = pacotesAdmin.find(item => item.id === pacoteId);
    if (!pacote) return;

    const visitas = Array.isArray(pacote.visitas) ? pacote.visitas : [];
    const visitaAtual = visitas.find(visita => Number(visita.numero) === Number(visitaNumero));

    if (!visitaAtual) return;

    const novaData = document.getElementById(`visita-data-${pacoteId}-${visitaNumero}`).value;
    const novoHorario = document.getElementById(`visita-horario-${pacoteId}-${visitaNumero}`).value;

    if (!novaData || !novoHorario) {
        await mostrarAvisoAdmin({
            titulo: "Campos obrigatórios",
            mensagem: "Informe a data e o horário deste banho do pacote.",
            icone: "⚠️"
        });
        return;
    }

    const agendamentoId = visitaAtual.agendamentoId || null;

    if (existeConflitoHorario(novaData, novoHorario, 60, agendamentoId) || existeBloqueioHorario(novaData, novoHorario, 60)) {
        await mostrarAvisoAdmin({
            titulo: "Horário indisponível",
            mensagem: "Não foi possível alterar este banho. Já existe agendamento ou bloqueio nesse horário.",
            icone: "⚠️"
        });
        return;
    }

    const novasVisitas = visitas.map(visita => {
        if (Number(visita.numero) !== Number(visitaNumero)) return visita;

        return {
            ...visita,
            data: novaData,
            horario: novoHorario
        };
    });

    const visitasOrdenadas = [...novasVisitas].sort((a, b) => Number(a.numero) - Number(b.numero));
    const primeiraVisita = visitasOrdenadas[0];
    const ultimaVisita = visitasOrdenadas[visitasOrdenadas.length - 1];

    await db.collection("pacotes").doc(pacoteId).update({
        visitas: novasVisitas,
        primeiroBanho: primeiraVisita?.data || pacote.primeiroBanho,
        dataFim: ultimaVisita?.data || pacote.dataFim,
        horario: primeiraVisita?.horario || pacote.horario,
        atualizadoEm: firebase.firestore.FieldValue.serverTimestamp()
    });

    if (agendamentoId) {
        await db.collection("agendamentos").doc(agendamentoId).update({
            data: novaData,
            dataFormatada: formatarDataCurta(novaData),
            horario: novoHorario,
            atualizadoEm: firebase.firestore.FieldValue.serverTimestamp()
        });
    }

    await carregarAgendamentos();
    await carregarPacotesAdmin();

    renderizarAgenda();
    renderizarPacotes();
    atualizarFaturamento();
    preencherHorariosPacote();

    await mostrarAvisoAdmin({
        titulo: "Banho atualizado",
        mensagem: "A data e o horário deste banho foram atualizados na agenda.",
        icone: "✅"
    });
}


async function alternarStatusVisitaPacote(pacoteId, visitaNumero) {
    const pacote = pacotesAdmin.find(item => item.id === pacoteId);
    if (!pacote) return;

    const visitas = Array.isArray(pacote.visitas) ? pacote.visitas : [];

    const novasVisitas = visitas.map(visita => {
        if (visita.numero !== visitaNumero) return visita;

        return {
            ...visita,
            status: visita.status === "Realizado" ? "Pendente" : "Realizado"
        };
    });

    const realizadas = novasVisitas.filter(v => v.status === "Realizado").length;
    const pendentes = novasVisitas.length - realizadas;

    const statusAutomatico = novasVisitas.length > 0 && realizadas === novasVisitas.length
        ? "Concluído"
        : (pacote.status === "Concluído" && pendentes > 0 ? "Ativo" : pacote.status || "Ativo");

    await db.collection("pacotes").doc(pacoteId).update({
        visitas: novasVisitas,
        quantidadeRealizada: realizadas,
        quantidadePendente: pendentes,
        status: statusAutomatico,
        concluidoEm: statusAutomatico === "Concluído" ? firebase.firestore.FieldValue.serverTimestamp() : null,
        atualizadoEm: firebase.firestore.FieldValue.serverTimestamp()
    });

    await carregarPacotesAdmin();
    renderizarPacotes();
    atualizarFaturamento();
}

async function enviarRenovacaoPacote(pacoteId) {
    const pacote = pacotesAdmin.find(item => item.id === pacoteId);
    if (!pacote) return;

    const numero = (pacote.telefone || "").replace(/\D/g, "");
    const mensagemTexto = `Olá, ${pacote.nomeCliente}, aqui é da Petlyne, tudo bem?\n\nInformamos que o seu pacote ${pacote.tipo} contratado em ${formatarDataCurta(pacote.dataInicio)}, finalizará em ${formatarDataCurta(pacote.dataFim)}.\n\nAproveite e renove o pacote para manter os cuidados do seu pet em dia!`;
    const mensagem = encodeURIComponent(mensagemTexto);

    await db.collection("pacotes").doc(pacoteId).update({
        renovacaoEnviada: true,
        renovacaoEnviadaEm: firebase.firestore.FieldValue.serverTimestamp()
    });

    await carregarPacotesAdmin();
    renderizarPacotes();

    window.open(`https://wa.me/55${numero}?text=${mensagem}`, "_blank");
}

async function excluirPacote(id) {
    const confirmar = await mostrarConfirmacaoAdmin({
        titulo: "Excluir pacote",
        mensagem: "Deseja excluir este pacote e liberar os horários vinculados a ele?",
        icone: "🗑️",
        textoConfirmar: "Excluir",
        textoCancelar: "Voltar"
    });

    if (!confirmar) return;

    const pacote = pacotesAdmin.find(item => item.id === id);
    const visitas = pacote && Array.isArray(pacote.visitas) ? pacote.visitas : [];

    for (const visita of visitas) {
        if (visita.agendamentoId) {
            await db.collection("agendamentos").doc(visita.agendamentoId).delete();
        }
    }

    await db.collection("pacotes").doc(id).delete();

    await carregarAgendamentos();
    await carregarPacotesAdmin();

    renderizarAgenda();
    renderizarPacotes();
    atualizarFaturamento();
}

function limparFiltrosPacotes() {
    document.getElementById("filtroPacoteCliente").value = "";
    document.getElementById("filtroPacoteStatus").value = "";
    renderizarPacotes();
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



async function atualizarDuracaoAgendamento(id, novaDuracao) {
    const agendamento = agendamentos.find(item => item.id === id);
    if (!agendamento) return;

    const duracao = Number(novaDuracao || 60);

    if (existeConflitoHorario(agendamento.data, agendamento.horario, duracao, id) || existeBloqueioHorario(agendamento.data, agendamento.horario, duracao)) {
        await mostrarAvisoAdmin({
            titulo: "Conflito de agenda",
            mensagem: "Não foi possível estender este atendimento, pois o novo período conflita com outro agendamento.",
            icone: "⚠️"
        });
        renderizarAgenda();
        return;
    }

    await db.collection("agendamentos").doc(id).update({
        duracaoMinutos: duracao,
        atualizadoEm: firebase.firestore.FieldValue.serverTimestamp()
    });

    await carregarAgendamentos();
    renderizarAgenda();
    preencherHorariosPacote();
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
