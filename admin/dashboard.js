let agendamentos = [];
let servicosAdmin = [];
let pacotesAdmin = [];
let clientesAdmin = [];
let clienteSelecionadoAdminId = null;
let crmHistorico = [];
let crmCategoriaSelecionada = "todas";
let crmRegistrosCalculados = [];
let crmRegistrosPorChave = new Map();
const racasPorteGatosPetlyneAdmin = [{"raca": "Abissínio", "porte": "Único"}, {"raca": "American Bobtail", "porte": "Único"}, {"raca": "American Curl", "porte": "Único"}, {"raca": "American Shorthair", "porte": "Único"}, {"raca": "Angorá Turco", "porte": "Único"}, {"raca": "Azul Russo", "porte": "Único"}, {"raca": "Balinês", "porte": "Único"}, {"raca": "Bengal", "porte": "Único"}, {"raca": "Birmanês", "porte": "Único"}, {"raca": "Bobtail Japonês", "porte": "Único"}, {"raca": "Bombay", "porte": "Único"}, {"raca": "British Longhair", "porte": "Único"}, {"raca": "British Shorthair", "porte": "Único"}, {"raca": "Burmilla", "porte": "Único"}, {"raca": "Burmês", "porte": "Único"}, {"raca": "Chartreux", "porte": "Único"}, {"raca": "Chausie", "porte": "Único"}, {"raca": "Cornish Rex", "porte": "Único"}, {"raca": "Cymric", "porte": "Único"}, {"raca": "Devon Rex", "porte": "Único"}, {"raca": "Egyptian Mau", "porte": "Único"}, {"raca": "Exótico", "porte": "Único"}, {"raca": "Havana Brown", "porte": "Único"}, {"raca": "Himalaio", "porte": "Único"}, {"raca": "Khao Manee", "porte": "Único"}, {"raca": "Kurilian Bobtail", "porte": "Único"}, {"raca": "LaPerm", "porte": "Único"}, {"raca": "Maine Coon", "porte": "Único"}, {"raca": "Manx", "porte": "Único"}, {"raca": "Munchkin", "porte": "Único"}, {"raca": "Norueguês da Floresta", "porte": "Único"}, {"raca": "Ocicat", "porte": "Único"}, {"raca": "Oriental Longhair", "porte": "Único"}, {"raca": "Oriental Shorthair", "porte": "Único"}, {"raca": "Persa", "porte": "Único"}, {"raca": "Peterbald", "porte": "Único"}, {"raca": "Ragdoll", "porte": "Único"}, {"raca": "Savannah", "porte": "Único"}, {"raca": "Scottish Fold", "porte": "Único"}, {"raca": "Selkirk Rex", "porte": "Único"}, {"raca": "Sem Raça Definida (SRD)", "porte": "Único"}, {"raca": "Siamês", "porte": "Único"}, {"raca": "Siberiano", "porte": "Único"}, {"raca": "Singapura", "porte": "Único"}, {"raca": "Somali", "porte": "Único"}, {"raca": "Sphynx", "porte": "Único"}, {"raca": "Tonquinês", "porte": "Único"}, {"raca": "Toyger", "porte": "Único"}];
const racasPorteBanhoTosaAdmin = [{"raca": "Akita", "porte": "Grande"}, {"raca": "Akita Americano", "porte": "Grande"}, {"raca": "Alaskan Malamute", "porte": "Grande"}, {"raca": "American Pit Bull Terrier", "porte": "Médio"}, {"raca": "American Staffordshire Terrier", "porte": "Médio"}, {"raca": "Australian Shepherd", "porte": "Médio"}, {"raca": "Basset Hound", "porte": "Médio"}, {"raca": "Beagle", "porte": "Médio"}, {"raca": "Bernese Mountain Dog", "porte": "Grande"}, {"raca": "Bichon Frisé", "porte": "Pequeno"}, {"raca": "Border Collie", "porte": "Médio"}, {"raca": "Boston Terrier", "porte": "Pequeno"}, {"raca": "Boxer", "porte": "Grande"}, {"raca": "Buldogue Francês", "porte": "Pequeno"}, {"raca": "Bulldog Inglês", "porte": "Médio"}, {"raca": "Bullmastiff", "porte": "Grande"}, {"raca": "Cane Corso", "porte": "Grande"}, {"raca": "Cavalier King Charles Spaniel", "porte": "Pequeno"}, {"raca": "Chihuahua", "porte": "Pequeno"}, {"raca": "Chow Chow", "porte": "Médio"}, {"raca": "Cocker Spaniel Americano", "porte": "Médio"}, {"raca": "Cocker Spaniel Inglês", "porte": "Médio"}, {"raca": "Coton de Tuléar", "porte": "Pequeno"}, {"raca": "Dachshund (Salsicha)", "porte": "Pequeno"}, {"raca": "Dobermann", "porte": "Grande"}, {"raca": "Dogue Alemão", "porte": "Grande"}, {"raca": "Dogue de Bordeaux", "porte": "Grande"}, {"raca": "Dálmata", "porte": "Grande"}, {"raca": "Fila Brasileiro", "porte": "Grande"}, {"raca": "Fox Paulistinha (Terrier Brasileiro)", "porte": "Pequeno"}, {"raca": "Golden Retriever", "porte": "Grande"}, {"raca": "Greyhound", "porte": "Grande"}, {"raca": "Husky Siberiano", "porte": "Médio"}, {"raca": "Jack Russell Terrier", "porte": "Pequeno"}, {"raca": "Komondor", "porte": "Grande"}, {"raca": "Kuvasz", "porte": "Grande"}, {"raca": "Labrador Retriever", "porte": "Grande"}, {"raca": "Leonberger", "porte": "Grande"}, {"raca": "Lhasa Apso", "porte": "Pequeno"}, {"raca": "Maltês", "porte": "Pequeno"}, {"raca": "Mastiff", "porte": "Grande"}, {"raca": "Mastino Napolitano", "porte": "Grande"}, {"raca": "Papillon", "porte": "Pequeno"}, {"raca": "Pastor Alemão", "porte": "Grande"}, {"raca": "Pastor Belga", "porte": "Grande"}, {"raca": "Pequinês", "porte": "Pequeno"}, {"raca": "Pinscher", "porte": "Pequeno"}, {"raca": "Poodle Mini", "porte": "Pequeno"}, {"raca": "Poodle Standard", "porte": "Médio"}, {"raca": "Poodle Toy", "porte": "Pequeno"}, {"raca": "Pug", "porte": "Pequeno"}, {"raca": "Rhodesian Ridgeback", "porte": "Grande"}, {"raca": "Rottweiler", "porte": "Grande"}, {"raca": "Samoieda", "porte": "Médio"}, {"raca": "Schnauzer Miniatura", "porte": "Pequeno"}, {"raca": "Schnauzer Standard", "porte": "Médio"}, {"raca": "Sem Raça Grande", "porte": "Grande"}, {"raca": "Sem Raça Médio", "porte": "Médio"}, {"raca": "Sem Raça Pequeno", "porte": "Pequeno"}, {"raca": "Setter Inglês", "porte": "Médio"}, {"raca": "Setter Irlandês", "porte": "Médio"}, {"raca": "Shar Pei", "porte": "Médio"}, {"raca": "Shiba Inu", "porte": "Pequeno"}, {"raca": "Shih Tzu", "porte": "Pequeno"}, {"raca": "Spitz Alemão (Lulu da Pomerânia)", "porte": "Pequeno"}, {"raca": "Springer Spaniel", "porte": "Médio"}, {"raca": "São Bernardo", "porte": "Grande"}, {"raca": "Terra Nova", "porte": "Grande"}, {"raca": "Weimaraner", "porte": "Médio"}, {"raca": "West Highland White Terrier", "porte": "Pequeno"}, {"raca": "Whippet", "porte": "Médio"}, {"raca": "Wolfhound Irlandês", "porte": "Grande"}, {"raca": "Yorkshire Terrier", "porte": "Pequeno"}];
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
    await carregarClientesAdmin();
    await carregarHistoricoCRM();
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
    calcularCRM();
    renderizarCRM();
}

function sair() {
    auth.signOut();
}

function abrirSecao(secao) {
    document.querySelectorAll(".admin-section").forEach(item => item.classList.remove("active"));
    document.querySelectorAll(".tab-button").forEach(item => item.classList.remove("active"));

    document.getElementById(`secao-${secao}`).classList.add("active");

    const mapaSecoes = ["agendamentos", "faturamento", "dias-horarios", "clientes", "crm", "pacotes", "servicos"];
    const indice = mapaSecoes.indexOf(secao);
    const botoes = document.querySelectorAll(".tab-button");

    if (indice >= 0 && botoes[indice]) {
        botoes[indice].classList.add("active");
    }

    if (secao === "clientes") {
        carregarClientesAdmin();
        configurarMascaraNovoCliente();
    }

    if (secao === "crm") {
        atualizarCRM();
    }
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

                    const valorServico = formatarMoeda(Number(agendamento.valorTotal || 0));
                    const clienteAgenda = agendamento.cliente || "Cliente não informado";
                    const telefoneAgenda = agendamento.telefone || "Telefone não informado";

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
                                ${ehInicio ? `<span class="agenda-label">Cliente</span><strong>${clienteAgenda}</strong><br>` : ""}
                                ${ehInicio ? `<span class="agenda-label">Telefone</span><strong>${telefoneAgenda}</strong><br>` : ""}
                                ${ehInicio ? `<span class="agenda-label">Pet</span><strong>${agendamento.pet || "Pet"}</strong><br>` : ""}
                                ${ehInicio ? `<span class="agenda-protocolo">${agendamento.protocolo || ""}</span><br>` : ""}
                                ${ehInicio ? `<span class="agenda-label">Serviço</span>${servicos}<br>` : `Continuação de ${agendamento.horario}<br>`}
                                ${ehInicio ? `<span class="agenda-label">Valor</span><strong>${valorServico}</strong><br>` : ""}
                                ${ehInicio ? `<span class="agenda-label">Espécie</span>${agendamento.especie || ""}<br>` : ""}
                                ${ehInicio ? `<span class="agenda-label">Obs.</span>${agendamento.observacaoPet || ""}` : ""}
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





function normalizarTextoCliente(valor) {
    return (valor || "")
        .toString()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}

function normalizarTelefoneCliente(valor) {
    let numeros = (valor || "").replace(/\D/g, "");
    if (numeros.startsWith("55") && (numeros.length === 12 || numeros.length === 13)) {
        numeros = numeros.slice(2);
    }
    return numeros;
}

function telefoneBrasileiroValidoCliente(valor) {
    const numeros = normalizarTelefoneCliente(valor);
    return numeros.length === 10 || numeros.length === 11;
}

function variantesTelefoneCliente(valor) {
    const numeros = normalizarTelefoneCliente(valor);
    const variantes = new Set();
    if (numeros.length === 10 || numeros.length === 11) variantes.add(numeros);
    // Telefones celulares antigos podem estar salvos sem o nono dígito.
    if (numeros.length === 10) variantes.add(`${numeros.slice(0, 2)}9${numeros.slice(2)}`);
    if (numeros.length === 11 && numeros.charAt(2) === "9") variantes.add(`${numeros.slice(0, 2)}${numeros.slice(3)}`);
    return variantes;
}

function telefonesEquivalentesCliente(a, b) {
    const va = variantesTelefoneCliente(a);
    const vb = variantesTelefoneCliente(b);
    return Array.from(va).some(numero => vb.has(numero));
}

function criarClienteId(telefone, pet) {
    const tel = normalizarTelefoneCliente(telefone) || "semtelefone";
    const petNormalizado = normalizarTextoCliente(pet || "sempet")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    return `${tel}_${petNormalizado || "sempet"}`;
}

function chaveClientePet(item) {
    return `${normalizarTelefoneCliente(item.telefone)}|${normalizarTextoCliente(item.pet)}`;
}

function montarClienteAPartirAgendamento(item) {
    return {
        id: criarClienteId(item.telefone, item.pet),
        cliente: item.cliente || "",
        telefone: item.telefone || "",
        pet: item.pet || "",
        especie: item.especie || "",
        sexo: item.sexo || "",
        raca: item.raca || "",
        porte: item.porte || "",
        observacaoPet: item.observacaoPet || ""
    };
}

async function carregarClientesAdmin() {
    const mapa = new Map();
    const telefonesPetsJaSalvos = new Set();
    const clientesExcluidos = new Set();

    // Um cliente excluído do cadastro não deve ser recriado visualmente apenas
    // porque ainda existem agendamentos históricos vinculados a ele.
    try {
        const snapshotExcluidos = await db.collection("clientesExcluidos").get();
        snapshotExcluidos.docs.forEach(doc => {
            const dados = doc.data() || {};
            if (dados.chaveClientePet) clientesExcluidos.add(dados.chaveClientePet);
        });
    } catch (error) {
        console.warn("Coleção de clientes excluídos ainda não disponível:", error);
    }

    try {
        const snapshotClientes = await db.collection("clientes").get();

        snapshotClientes.docs.forEach(doc => {
            const data = { id: doc.id, ...doc.data(), origemCadastro: "clientes" };
            const chave = chaveClientePet(data);

            // Um cadastro principal existente sempre prevalece. Isso também
            // permite que um cliente volte a aparecer caso seja cadastrado novamente.
            mapa.set(chave, data);
            telefonesPetsJaSalvos.add(chave);
        });
    } catch (error) {
        console.warn("Coleção clientes ainda não disponível:", error);
    }

    try {
        agendamentos.forEach(agendamento => {
            const cliente = { ...montarClienteAPartirAgendamento(agendamento), origemCadastro: "agendamentos" };
            const chave = chaveClientePet(cliente);

            if (
                !clientesExcluidos.has(chave) &&
                !telefonesPetsJaSalvos.has(chave) &&
                !mapa.has(chave)
            ) {
                mapa.set(chave, cliente);
            }
        });
    } catch (error) {
        console.warn("Erro ao montar clientes a partir de agendamentos:", error);
    }

    clientesAdmin = Array.from(mapa.values())
        .filter(item => item.telefone || item.cliente || item.pet)
        .sort((a, b) => {
            const clienteA = `${a.cliente || ""} ${a.pet || ""}`;
            const clienteB = `${b.cliente || ""} ${b.pet || ""}`;

            return clienteA.localeCompare(clienteB);
        });

    renderizarClientesAdmin();
}

function clienteAdminBateFiltro(item) {
    const filtro = normalizarTextoCliente(document.getElementById("filtroClientes")?.value || "");

    if (!filtro) return true;

    return [
        item.cliente,
        item.telefone,
        item.pet,
        item.especie,
        item.raca
    ].some(valor => normalizarTextoCliente(valor).includes(filtro));
}

function optionSelecionada(valorAtual, valorOption) {
    return valorAtual === valorOption ? "selected" : "";
}


function obterListaRacasAdminPorEspecie(especie) {
    if (especie === "Gato") return racasPorteGatosPetlyneAdmin;
    if (especie === "Cão") return racasPorteBanhoTosaAdmin;
    return [];
}

function gerarOptionsRacasAdmin(racaAtual, especieAtual = "") {
    const lista = obterListaRacasAdminPorEspecie(especieAtual);

    return [
        `<option value="">${especieAtual ? "Selecione a raça" : "Selecione a espécie primeiro"}</option>`,
        ...lista.map(item =>
            `<option value="${item.raca}" ${optionSelecionada(racaAtual, item.raca)}>${item.raca}</option>`
        )
    ].join("");
}

function obterPortePorRacaAdmin(raca, especieAtual = "") {
    if (especieAtual === "Gato" && raca) {
        return "Único";
    }

    const lista = obterListaRacasAdminPorEspecie(especieAtual);

    const item = lista.find(registro =>
        (registro.raca || "").toLowerCase() === (raca || "").toLowerCase()
    );

    return item ? item.porte : "";
}

function atualizarRacasClienteAdmin(id) {
    const especie = document.getElementById(`cliente-especie-${id}`)?.value || "";
    const selectRaca = document.getElementById(`cliente-raca-${id}`);
    const campoPorte = document.getElementById(`cliente-porte-${id}`);

    if (!selectRaca) return;

    selectRaca.innerHTML = gerarOptionsRacasAdmin("", especie);

    if (campoPorte) campoPorte.value = "";
}

function atualizarPorteClienteAdmin(id) {
    const especie = document.getElementById(`cliente-especie-${id}`)?.value || "";
    const raca = document.getElementById(`cliente-raca-${id}`)?.value || "";
    const porte = obterPortePorRacaAdmin(raca, especie);

    const campoPorte = document.getElementById(`cliente-porte-${id}`);
    if (campoPorte) campoPorte.value = porte || "";
}



function alternarFormularioNovoCliente() {
    const formulario = document.getElementById("formNovoCliente");
    if (!formulario) return;

    const abrir = formulario.style.display === "none" || formulario.style.display === "";
    formulario.style.display = abrir ? "block" : "none";

    if (abrir) {
        configurarMascaraNovoCliente();
        document.getElementById("novoClienteNome")?.focus();
    }
}

function configurarMascaraNovoCliente() {
    const input = document.getElementById("novoClienteTelefone");
    if (!input || input.dataset.mascaraConfigurada === "true") return;

    input.addEventListener("input", () => {
        input.value = formatarTelefonePacote(input.value);
    });

    input.dataset.mascaraConfigurada = "true";
}

function atualizarRacasNovoCliente() {
    const especie = document.getElementById("novoClienteEspecie")?.value || "";
    const selectRaca = document.getElementById("novoClienteRaca");
    const campoPorte = document.getElementById("novoClientePorte");

    if (!selectRaca) return;

    selectRaca.innerHTML = gerarOptionsRacasAdmin("", especie);

    if (campoPorte) {
        campoPorte.value = "";
    }
}

function atualizarPorteNovoCliente() {
    const especie = document.getElementById("novoClienteEspecie")?.value || "";
    const raca = document.getElementById("novoClienteRaca")?.value || "";
    const porte = obterPortePorRacaAdmin(raca, especie);
    const campoPorte = document.getElementById("novoClientePorte");

    if (campoPorte) {
        campoPorte.value = porte || "";
    }
}

function limparFormularioNovoCliente() {
    ["novoClienteNome", "novoClienteTelefone", "novoClientePet"].forEach(id => {
        const campo = document.getElementById(id);
        if (campo) campo.value = "";
    });

    ["novoClienteEspecie", "novoClienteSexo", "novoClienteObservacao"].forEach(id => {
        const campo = document.getElementById(id);
        if (campo) campo.value = "";
    });

    const selectRaca = document.getElementById("novoClienteRaca");
    const campoPorte = document.getElementById("novoClientePorte");

    if (selectRaca) {
        selectRaca.innerHTML = `<option value="">Selecione a espécie primeiro</option>`;
    }

    if (campoPorte) {
        campoPorte.value = "";
    }
}

async function gravarNovoCliente() {
    const dados = {
        cliente: document.getElementById("novoClienteNome")?.value.trim() || "",
        telefone: document.getElementById("novoClienteTelefone")?.value.trim() || "",
        pet: document.getElementById("novoClientePet")?.value.trim() || "",
        especie: document.getElementById("novoClienteEspecie")?.value || "",
        sexo: document.getElementById("novoClienteSexo")?.value || "",
        raca: document.getElementById("novoClienteRaca")?.value || "",
        porte: document.getElementById("novoClientePorte")?.value || "",
        observacaoPet: document.getElementById("novoClienteObservacao")?.value || "",
        criadoEm: firebase.firestore.FieldValue.serverTimestamp(),
        atualizadoEm: firebase.firestore.FieldValue.serverTimestamp()
    };

    if (
        !dados.cliente ||
        !dados.telefone ||
        !dados.pet ||
        !dados.especie ||
        !dados.sexo ||
        !dados.raca ||
        !dados.porte ||
        !dados.observacaoPet
    ) {
        await mostrarAvisoAdmin({
            titulo: "Campos obrigatórios",
            mensagem: "Preencha todos os campos do cadastro.",
            icone: "⚠️"
        });
        return;
    }

    const telefoneNumeros = normalizarTelefoneCliente(dados.telefone);

    if (!telefoneBrasileiroValidoCliente(dados.telefone)) {
        await mostrarAvisoAdmin({
            titulo: "Telefone inválido",
            mensagem: "Informe um telefone com DDD, com 8 ou 9 dígitos. Exemplos: (61) 8566-5654 ou (11) 99999-9999.",
            icone: "⚠️"
        });
        return;
    }

    const clienteId = criarClienteId(dados.telefone, dados.pet);
    const existente = await db.collection("clientes").doc(clienteId).get();

    if (existente.exists) {
        await mostrarAvisoAdmin({
            titulo: "Cadastro já existente",
            mensagem: "Já existe um cadastro para este telefone e pet. Use a pesquisa para editar o registro.",
            icone: "⚠️"
        });
        return;
    }

    await db.collection("clientes").doc(clienteId).set(dados);

    limparFormularioNovoCliente();

    const formulario = document.getElementById("formNovoCliente");
    if (formulario) {
        formulario.style.display = "none";
    }

    await carregarClientesAdmin();

    const filtro = document.getElementById("filtroClientes");
    if (filtro) {
        filtro.value = dados.telefone;
        clienteSelecionadoAdminId = clienteId;
        renderizarClientesAdmin();
    }

    await mostrarAvisoAdmin({
        titulo: "Cliente cadastrado",
        mensagem: "O novo cliente foi gravado com sucesso e já está disponível no agendamento online.",
        icone: "✅"
    });
}


function selecionarClienteAdmin(id) {
    clienteSelecionadoAdminId = id;
    renderizarClientesAdmin();
}

function renderizarClientesAdmin() {
    const lista = document.getElementById("listaClientesAdmin");
    const resultados = document.getElementById("resultadoBuscaClientes");

    if (!lista) return;

    const filtro = document.getElementById("filtroClientes")?.value || "";
    const dados = clientesAdmin.filter(clienteAdminBateFiltro);

    if (!filtro.trim()) {
        clienteSelecionadoAdminId = null;
        if (resultados) resultados.innerHTML = "";
        lista.innerHTML = `<p class="empty-state">Pesquise pelo nome do cliente, telefone ou nome do pet para carregar o cadastro.</p>`;
        return;
    }

    if (dados.length === 0) {
        clienteSelecionadoAdminId = null;
        if (resultados) resultados.innerHTML = "";
        lista.innerHTML = `<p class="empty-state">Nenhum cliente encontrado.</p>`;
        return;
    }

    if (!clienteSelecionadoAdminId || !dados.some(item => item.id === clienteSelecionadoAdminId)) {
        clienteSelecionadoAdminId = dados[0].id;
    }

    const item = clientesAdmin.find(cliente => cliente.id === clienteSelecionadoAdminId) || dados[0];

    if (resultados) {
        resultados.innerHTML = `
            <div class="clientes-resultados-header">
                <strong>${dados.length} cadastro(s) encontrado(s)</strong>
                <span>Selecione um cadastro para editar</span>
            </div>
            <div class="clientes-resultados-lista">
                ${dados.map(cliente => `
                    <button type="button" class="cliente-resultado-item ${cliente.id === item.id ? "active" : ""}" onclick="selecionarClienteAdmin('${cliente.id}')">
                        <strong>${cliente.cliente || "Cliente sem nome"}</strong>
                        <span>${cliente.pet || "Pet sem nome"} • ${cliente.telefone || "Sem telefone"}</span>
                    </button>
                `).join("")}
            </div>
        `;
    }

    lista.innerHTML = `
        <div class="cliente-card-admin cliente-card-admin-unico">
            <div class="cliente-card-title">
                <div>
                    <h3>${item.cliente || "Cliente sem nome"}</h3>
                    <strong>${item.pet || "Pet sem nome"}</strong>
                </div>
                <span>${item.telefone || "Sem telefone"}</span>
            </div>

            <div class="cliente-form-grid">
                <label><span>Nome do Cliente</span><input type="text" id="cliente-nome-${item.id}" value="${item.cliente || ""}"></label>
                <label><span>Telefone</span><input type="text" id="cliente-telefone-${item.id}" value="${formatarTelefonePacote(item.telefone || "")}" inputmode="numeric" maxlength="15" oninput="this.value = formatarTelefonePacote(this.value)"></label>
                <label><span>Nome do Pet</span><input type="text" id="cliente-pet-${item.id}" value="${item.pet || ""}"></label>

                <label><span>Espécie</span><select id="cliente-especie-${item.id}" onchange="atualizarRacasClienteAdmin('${item.id}')">
                    <option value="">Selecione</option>
                    <option value="Cão" ${optionSelecionada(item.especie, "Cão")}>Cão</option>
                    <option value="Gato" ${optionSelecionada(item.especie, "Gato")}>Gato</option>
                </select></label>

                <label><span>Sexo</span><select id="cliente-sexo-${item.id}">
                    <option value="">Selecione</option>
                    <option value="Macho" ${optionSelecionada(item.sexo, "Macho")}>Macho</option>
                    <option value="Fêmea" ${optionSelecionada(item.sexo, "Fêmea")}>Fêmea</option>
                </select></label>

                <label><span>Raça</span><select id="cliente-raca-${item.id}" onchange="atualizarPorteClienteAdmin('${item.id}')">
                    ${gerarOptionsRacasAdmin(item.raca, item.especie)}
                </select></label>

                <label><span>Porte</span><select id="cliente-porte-${item.id}" disabled>
                    <option value="">Selecione</option>
                    <option value="Pequeno" ${optionSelecionada(item.porte, "Pequeno")}>Pequeno</option>
                    <option value="Médio" ${optionSelecionada(item.porte, "Médio")}>Médio</option>
                    <option value="Grande" ${optionSelecionada(item.porte, "Grande")}>Grande</option>
                    <option value="Único" ${optionSelecionada(item.porte, "Único")}>Único</option>
                </select></label>

                <label><span>Observações do Pet</span><select id="cliente-observacao-${item.id}">
                    <option value="">Selecione</option>
                    <option value="Sem Observação" ${optionSelecionada(item.observacaoPet, "Sem Observação")}>Sem Observação</option>
                    <option value="Bravo" ${optionSelecionada(item.observacaoPet, "Bravo")}>Bravo</option>
                    <option value="Não gosta de secador" ${optionSelecionada(item.observacaoPet, "Não gosta de secador")}>Não gosta de secador</option>
                    <option value="Alérgico" ${optionSelecionada(item.observacaoPet, "Alérgico")}>Alérgico</option>
                    <option value="Ansioso" ${optionSelecionada(item.observacaoPet, "Ansioso")}>Ansioso</option>
                    <option value="Idoso" ${optionSelecionada(item.observacaoPet, "Idoso")}>Idoso</option>
                    <option value="Filhote" ${optionSelecionada(item.observacaoPet, "Filhote")}>Filhote</option>
                </select></label>
            </div>

            <div class="cliente-card-actions cliente-card-actions-duplo">
                <button onclick="salvarClienteAdmin('${item.id}')">Salvar Alterações</button>
                <button class="secondary-button" onclick="excluirClienteAdmin('${item.id}')">Excluir Cadastro</button>
            </div>
        </div>
    `;
}

async function salvarClienteAdmin(idAtual) {
    const cadastroAnterior = clientesAdmin.find(item => item.id === idAtual) || {};
    const dados = {
        cliente: document.getElementById(`cliente-nome-${idAtual}`).value.trim(),
        telefone: document.getElementById(`cliente-telefone-${idAtual}`).value.trim(),
        pet: document.getElementById(`cliente-pet-${idAtual}`).value.trim(),
        especie: document.getElementById(`cliente-especie-${idAtual}`).value,
        sexo: document.getElementById(`cliente-sexo-${idAtual}`).value,
        raca: document.getElementById(`cliente-raca-${idAtual}`).value.trim(),
        porte: document.getElementById(`cliente-porte-${idAtual}`).value,
        observacaoPet: document.getElementById(`cliente-observacao-${idAtual}`).value,
        origemCadastro: "clientes",
        criadoEm: cadastroAnterior.criadoEm || firebase.firestore.FieldValue.serverTimestamp(),
        atualizadoEm: firebase.firestore.FieldValue.serverTimestamp()
    };

    if (!dados.cliente || !dados.telefone || !dados.pet) {
        await mostrarAvisoAdmin({
            titulo: "Campos obrigatórios",
            mensagem: "Informe pelo menos nome do cliente, telefone e nome do pet.",
            icone: "⚠️"
        });
        return;
    }

    if (!telefoneBrasileiroValidoCliente(dados.telefone)) {
        await mostrarAvisoAdmin({
            titulo: "Telefone inválido",
            mensagem: "Informe um telefone com DDD, com 8 ou 9 dígitos.",
            icone: "⚠️"
        });
        return;
    }

    const novoId = criarClienteId(dados.telefone, dados.pet);

    await db.collection("clientes").doc(novoId).set(dados, { merge: true });

    // Caso este cliente tenha sido excluído anteriormente, o novo salvamento
    // reativa o cadastro e remove a marca que impedia sua reconstrução histórica.
    const chaveAtualizada = chaveClientePet(dados);
    const marcadorId = criarClienteId(dados.telefone, dados.pet);
    try {
        await db.collection("clientesExcluidos").doc(marcadorId).delete();
    } catch (error) {
        console.warn("Não foi necessário remover marcador de exclusão:", error);
    }

    if (novoId !== idAtual) {
        try {
            await db.collection("clientes").doc(idAtual).delete();
        } catch (error) {
            console.warn("Registro antigo não encontrado para exclusão:", error);
        }
    }

    clientesAdmin = clientesAdmin
        .filter(item => item.id !== idAtual && item.id !== novoId)
        .concat([{ id: novoId, ...dados }]);

    await mostrarAvisoAdmin({
        titulo: "Cliente atualizado",
        mensagem: "As alterações foram salvas no cadastro principal do cliente.",
        icone: "✅"
    });

    await carregarClientesAdmin();
}


async function excluirClienteAdmin(idAtual) {
    const cliente = clientesAdmin.find(item => item.id === idAtual);

    if (!cliente) return;

    const confirmar = await mostrarConfirmacaoAdmin({
        titulo: "Excluir cadastro",
        mensagem: `Deseja excluir o cadastro de ${cliente.cliente || "cliente"} / ${cliente.pet || "pet"}? Esta ação remove apenas o cadastro principal, não apaga agendamentos já realizados.`,
        icone: "🗑️",
        textoConfirmar: "Excluir",
        textoCancelar: "Voltar"
    });

    if (!confirmar) return;

    try {
        const chave = chaveClientePet(cliente);
        const marcadorId = criarClienteId(cliente.telefone, cliente.pet);
        const lote = db.batch();

        // Remove o documento principal, quando existir.
        lote.delete(db.collection("clientes").doc(idAtual));

        // Registra que este cliente/pet não deve ser reconstruído na tela a
        // partir de agendamentos antigos. Os agendamentos permanecem intactos.
        lote.set(db.collection("clientesExcluidos").doc(marcadorId), {
            chaveClientePet: chave,
            cliente: cliente.cliente || "",
            pet: cliente.pet || "",
            telefone: cliente.telefone || "",
            excluidoEm: firebase.firestore.FieldValue.serverTimestamp()
        });

        await lote.commit();

        clientesAdmin = clientesAdmin.filter(item => chaveClientePet(item) !== chave);
        clienteSelecionadoAdminId = null;

        calcularCRM();
        renderizarCRM();
        renderizarClientesAdmin();

        await mostrarAvisoAdmin({
            titulo: "Cadastro excluído",
            mensagem: "O cliente foi removido do cadastro. Os agendamentos históricos foram preservados.",
            icone: "✅"
        });

        await carregarClientesAdmin();
        calcularCRM();
        renderizarCRM();
    } catch (error) {
        console.error("Erro ao excluir cadastro do cliente:", error);
        await mostrarAvisoAdmin({
            titulo: "Não foi possível excluir",
            mensagem: "O cadastro não foi removido. Atualize a página e tente novamente. Se o problema continuar, verifique as permissões do Firestore.",
            icone: "⚠️"
        });
    }
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
    if (lista) lista.innerHTML = "";
}


async function desbloquearDiasSelecionados() {
    const dataCampo = document.getElementById("bloqueioData")?.value;
    const datas = diasSelecionadosBloqueio.length > 0 ? [...diasSelecionadosBloqueio] : [dataCampo].filter(Boolean);

    if (datas.length === 0) {
        await mostrarAvisoAdmin({
            titulo: "Nenhum dia selecionado",
            mensagem: "Selecione um ou mais dias no calendário para desbloquear.",
            icone: "⚠️"
        });
        return;
    }

    const bloqueiosParaExcluir = bloqueiosAgenda.filter(bloqueio =>
        bloqueio.status === "Ativo" &&
        datas.includes(bloqueio.data)
    );

    if (bloqueiosParaExcluir.length === 0) {
        await mostrarAvisoAdmin({
            titulo: "Nenhum bloqueio encontrado",
            mensagem: "Os dias selecionados não possuem bloqueios ativos.",
            icone: "ℹ️"
        });
        return;
    }

    const confirmar = await mostrarConfirmacaoAdmin({
        titulo: "Desbloquear agenda",
        mensagem: `Deseja remover ${bloqueiosParaExcluir.length} bloqueio(s) dos dia(s) selecionado(s)?`,
        icone: "🔓",
        textoConfirmar: "Desbloquear",
        textoCancelar: "Voltar"
    });

    if (!confirmar) return;

    const batch = db.batch();

    bloqueiosParaExcluir.forEach(bloqueio => {
        const ref = db.collection("bloqueiosAgenda").doc(bloqueio.id);
        batch.delete(ref);
    });

    await batch.commit();

    limparSelecaoDiasBloqueio();
    await carregarBloqueiosAgenda();

    renderizarAgenda();
    renderizarCalendarioBloqueios();
    preencherHorariosPacote();

    await mostrarAvisoAdmin({
        titulo: "Agenda desbloqueada",
        mensagem: "Os bloqueios dos dias selecionados foram removidos com sucesso.",
        icone: "✅"
    });
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
    if (numeros.length <= 6) return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
    if (numeros.length <= 10) return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(6)}`;
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


/* =========================================================
   CRM GROWTH - ATENDIMENTOS AVULSOS LYNE
   ========================================================= */

const CRM_CONFIG = {
    avaliacaoAteDias: 8,
    proximoBanhoInicio: 15,
    proximoBanhoFim: 20,
    atrasoInicio: 21,
    atrasoFim: 30,
    recuperacaoInicio: 31,
    repeticaoDias: 7,
    linkAgendamento: "https://petlyne-agendamento-two.vercel.app/",
    linkAvaliacao: "https://share.google/grSyRShIkMMpW9VLH"
};

const CRM_CATEGORIAS = {
    avaliacao: { titulo: "Avaliação Google", descricao: "Último atendimento LYNE concluído há até 8 dias e avaliação ainda não solicitada.", icone: "⭐" },
    proximo: { titulo: "Hora do próximo banho", descricao: "Clientes entre 15 e 20 dias desde o último banho avulso.", icone: "🛁" },
    atraso: { titulo: "Banho em atraso", descricao: "Clientes entre 21 e 30 dias desde o último banho avulso.", icone: "⚠️" },
    recuperacao: { titulo: "Recuperar cliente", descricao: "Clientes há mais de 30 dias sem banho avulso.", icone: "❤️" },
    conhecer: { titulo: "Conhecer agendamento online", descricao: "Cadastros manuais sem histórico PACK e que ainda não fizeram agendamento LYNE.", icone: "📱" }
};

async function carregarHistoricoCRM() {
    try {
        const snapshot = await db.collection("crmHistorico").orderBy("criadoEm", "desc").get();
        crmHistorico = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.warn("Histórico do CRM ainda não disponível:", error);
        crmHistorico = [];
    }
}

function protocoloEhPack(protocolo) { return String(protocolo || "").trim().toUpperCase().startsWith("PACK-"); }
function protocoloEhLyne(protocolo) { return String(protocolo || "").trim().toUpperCase().startsWith("LYNE-"); }
function agendamentoConcluidoCRM(item) { return normalizarTextoCliente(item.status) === normalizarTextoCliente("Concluído"); }
function agendamentoAtivoFuturoCRM(item) {
    if (!protocoloEhLyne(item.protocolo) || !dataISOValidaCRM(item.data)) return false;
    const status = normalizarTextoCliente(item.status);
    if (["cancelado", "concluido"].includes(status)) return false;
    const hoje = new Date(); hoje.setHours(0, 0, 0, 0);
    return new Date(`${item.data}T00:00:00`) >= hoje;
}
function dataISOValidaCRM(valor) { return /^\d{4}-\d{2}-\d{2}$/.test(String(valor || "")); }
function calcularDiasDesdeCRM(dataISO) {
    if (!dataISOValidaCRM(dataISO)) return null;
    const hoje = new Date(); hoje.setHours(0, 0, 0, 0);
    const diferenca = Math.floor((hoje - new Date(`${dataISO}T00:00:00`)) / 86400000);
    return diferenca < 0 ? 0 : diferenca;
}
function dataFirestoreParaDateCRM(valor) {
    if (!valor) return null;
    if (typeof valor.toDate === "function") return valor.toDate();
    if (valor.seconds) return new Date(valor.seconds * 1000);
    const data = new Date(valor);
    return Number.isNaN(data.getTime()) ? null : data;
}
function formatarDataCRM(dataISO) { return dataISOValidaCRM(dataISO) ? new Date(`${dataISO}T00:00:00`).toLocaleDateString("pt-BR") : "Sem atendimento"; }
function escaparHTMLCRM(valor) { return String(valor ?? "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"); }

function chaveDonoCRM(cliente, telefone) {
    const nome = normalizarTextoCliente(cliente).replace(/[^a-z0-9]+/g, "-");
    const tel = Array.from(variantesTelefoneCliente(telefone))[0] || "semtelefone";
    return `dono:${nome || tel}`;
}
function registroPertenceAoPetCRM(agendamento, cliente) {
    const mesmoPet = normalizarTextoCliente(agendamento.pet) === normalizarTextoCliente(cliente.pet);
    if (!mesmoPet) return false;
    const mesmoDono = normalizarTextoCliente(agendamento.cliente) === normalizarTextoCliente(cliente.cliente);
    return mesmoDono || telefonesEquivalentesCliente(agendamento.telefone, cliente.telefone);
}
function obterHistoricoClienteCRM(chaves) {
    const lista = Array.isArray(chaves) ? chaves : [chaves];
    return crmHistorico.filter(item => lista.includes(item.clienteChave));
}
function acaoCRMJaRegistrada(chaves, tipo, permanente = false) {
    const registros = obterHistoricoClienteCRM(chaves).filter(item => item.tipoAcao === tipo);
    if (!registros.length) return false;
    if (permanente) return true;
    const recente = registros.map(item => dataFirestoreParaDateCRM(item.criadoEm || item.dataEnvio)).filter(Boolean).sort((a,b)=>b-a)[0];
    return !recente || ((Date.now() - recente.getTime()) / 86400000) < CRM_CONFIG.repeticaoDias;
}
function categoriaPorDiasCRM(dias) {
    if (dias === null) return null;
    if (dias >= 0 && dias <= CRM_CONFIG.avaliacaoAteDias) return "avaliacao";
    if (dias >= CRM_CONFIG.proximoBanhoInicio && dias <= CRM_CONFIG.proximoBanhoFim) return "proximo";
    if (dias >= CRM_CONFIG.atrasoInicio && dias <= CRM_CONFIG.atrasoFim) return "atraso";
    if (dias >= CRM_CONFIG.recuperacaoInicio) return "recuperacao";
    return null;
}
function prioridadeCategoriaCRM(categoria) {
    return ({ avaliacao: 1, recuperacao: 2, atraso: 3, proximo: 4, conhecer: 5 })[categoria] || 99;
}

function calcularCRM() {
    const donos = new Map();
    clientesAdmin.forEach(cliente => {
        const chaveDono = chaveDonoCRM(cliente.cliente, cliente.telefone);
        if (!donos.has(chaveDono)) donos.set(chaveDono, { chave: chaveDono, cliente: cliente.cliente || "Cliente", telefone: cliente.telefone || "", pets: [] });
        const dono = donos.get(chaveDono);
        if (!dono.telefone && cliente.telefone) dono.telefone = cliente.telefone;
        if (!dono.pets.some(p => normalizarTextoCliente(p.pet) === normalizarTextoCliente(cliente.pet))) dono.pets.push(cliente);
    });

    const registros = [];
    donos.forEach(dono => {
        const candidatos = [];
        let temPackDono = false;
        const chavesHistoricas = [dono.chave];

        dono.pets.forEach(petCadastro => {
            const historico = agendamentos.filter(a => registroPertenceAoPetCRM(a, petCadastro));
            chavesHistoricas.push(chaveClientePet(petCadastro));
            if (historico.some(a => protocoloEhPack(a.protocolo))) temPackDono = true;
            if (historico.some(agendamentoAtivoFuturoCRM)) return;

            const concluidos = historico.filter(a => protocoloEhLyne(a.protocolo) && agendamentoConcluidoCRM(a) && dataISOValidaCRM(a.data)).sort((a,b)=>String(b.data).localeCompare(String(a.data)));
            let categoria = null, ultimo = null, dias = null;
            if (concluidos.length) {
                ultimo = concluidos[0]; dias = calcularDiasDesdeCRM(ultimo.data); categoria = categoriaPorDiasCRM(dias);
            } else if (petCadastro.origemCadastro === "clientes" || petCadastro.criadoEm) categoria = "conhecer";
            if (categoria) candidatos.push({ categoria, petCadastro, ultimo, dias, totalLyne: concluidos.length });
        });

        // O MVP PACK continua separado: se qualquer pet do dono tem PACK, o dono fica fora deste CRM.
        if (temPackDono || !candidatos.length) return;
        candidatos.sort((a,b) => prioridadeCategoriaCRM(a.categoria) - prioridadeCategoriaCRM(b.categoria) || (b.dias || 0) - (a.dias || 0));
        const principal = candidatos[0];
        const permanente = principal.categoria === "avaliacao" || principal.categoria === "conhecer";
        if (acaoCRMJaRegistrada(chavesHistoricas, principal.categoria, permanente)) return;

        const pets = dono.pets.map(p => ({ pet: p.pet || "Pet", sexo: p.sexo || "", especie: p.especie || "" }));
        registros.push({
            chave: dono.chave,
            chavesHistoricas,
            categoria: principal.categoria,
            cliente: dono.cliente,
            telefone: dono.telefone || principal.ultimo?.telefone || "",
            pets,
            pet: pets.map(p => p.pet).join(", "),
            ultimoAtendimento: principal.ultimo?.data || null,
            diasSemBanho: principal.dias,
            totalLyne: candidatos.reduce((s,c)=>s+c.totalLyne,0)
        });
    });

    crmRegistrosCalculados = registros.sort((a,b) => prioridadeCategoriaCRM(a.categoria)-prioridadeCategoriaCRM(b.categoria) || (b.diasSemBanho||0)-(a.diasSemBanho||0));
    crmRegistrosPorChave = new Map(crmRegistrosCalculados.map(item => [item.chave, item]));
}

function renderizarCRM() { renderizarCRMResumo(); renderizarCRMLista(); }
function renderizarCRMResumo() {
    const container=document.getElementById("crmResumo"); if(!container)return;
    container.innerHTML=Object.entries(CRM_CATEGORIAS).map(([chave,config])=>{const quantidade=crmRegistrosCalculados.filter(i=>i.categoria===chave).length;return `<button type="button" class="crm-summary-card crm-card-${chave} ${crmCategoriaSelecionada===chave?"active":""}" onclick="selecionarCategoriaCRM('${chave}')"><span class="crm-summary-icon">${config.icone}</span><span class="crm-summary-content"><strong>${config.titulo}</strong><small>${config.descricao}</small></span><span class="crm-summary-number">${quantidade}</span></button>`;}).join("");
}
function selecionarCategoriaCRM(categoria){crmCategoriaSelecionada=categoria;renderizarCRM();}
function renderizarCRMLista(){
    const lista=document.getElementById("crmLista"),titulo=document.getElementById("crmListaTitulo"),descricao=document.getElementById("crmListaDescricao");if(!lista)return;
    const busca=normalizarTextoCliente(document.getElementById("crmBusca")?.value||"");let dados=crmRegistrosCalculados;
    if(crmCategoriaSelecionada!=="todas")dados=dados.filter(i=>i.categoria===crmCategoriaSelecionada);
    if(busca)dados=dados.filter(i=>[i.cliente,i.pet,i.telefone].some(v=>normalizarTextoCliente(v).includes(busca)));
    if(crmCategoriaSelecionada==="todas"){if(titulo)titulo.textContent="Todas as ações pendentes";if(descricao)descricao.textContent="Cada cliente aparece uma única vez, mesmo quando possui vários pets.";}else{const c=CRM_CATEGORIAS[crmCategoriaSelecionada];if(titulo)titulo.textContent=`${c.icone} ${c.titulo}`;if(descricao)descricao.textContent=c.descricao;}
    if(!dados.length){lista.innerHTML=`<p class="empty-state">Nenhum cliente pendente para este filtro.</p>`;return;}
    lista.innerHTML=dados.map(item=>{const c=CRM_CATEGORIAS[item.categoria],chave=encodeURIComponent(item.chave),detalhe=item.ultimoAtendimento?`${formatarDataCRM(item.ultimoAtendimento)} • ${item.diasSemBanho} dia(s)`:"Ainda não usou o agendamento online";return `<article class="crm-client-card"><div class="crm-client-main"><span class="crm-client-badge crm-badge-${item.categoria}">${c.icone} ${c.titulo}</span><h4>${escaparHTMLCRM(item.cliente)}</h4><p><strong>Pets:</strong> ${escaparHTMLCRM(item.pet)}</p><p><strong>Telefone:</strong> ${escaparHTMLCRM(item.telefone)}</p><p><strong>Último atendimento de referência:</strong> ${detalhe}</p>${item.totalLyne?`<p><strong>Banhos LYNE concluídos:</strong> ${item.totalLyne}</p>`:""}</div><div class="crm-client-actions"><button type="button" onclick="abrirWhatsAppCRM('${chave}')"><i class="fa-brands fa-whatsapp"></i> Abrir WhatsApp</button><button type="button" class="secondary-button" onclick="marcarAcaoCRMEnviada('${chave}')">Marcar como enviado</button></div></article>`;}).join("");
}

function artigoPetCRM(pet) {
    const sexo=normalizarTextoCliente(pet.sexo);
    if(sexo.includes("femea")) return `a ${pet.pet}`;
    if(sexo.includes("macho")) return `o ${pet.pet}`;
    return pet.pet;
}
function juntarNomesCRM(lista) {
    if(lista.length<=1)return lista[0]||"seu pet";
    return `${lista.slice(0,-1).join(", ")} e ${lista[lista.length-1]}`;
}
function montarMensagemCRM(item){
    const cliente=item.cliente||"";
    const nomes=(item.pets||[]).map(artigoPetCRM);
    const varios=nomes.length>1;
    const pets=juntarNomesCRM(nomes);
    const emoji={coracao:"\u2764\uFE0F",patas:"\uD83D\uDC3E",cachorro:"\uD83D\uDC36",banho:"\uD83D\uDEC1",calendario:"\uD83D\uDCC5",estrela:"\u2B50"};
    const mensagens={
      avaliacao: varios?`Oi, ${cliente}! ${emoji.coracao}\n\nEsperamos que seus pets tenham aproveitado bastante a experiência na PetLyne!\n\nSe você gostou do nosso trabalho, poderia dedicar menos de 1 minuto para deixar sua avaliação? Ela ajuda outras famílias a nos conhecer e faz muita diferença para nós.\n\n${emoji.estrela} Avalie aqui:\n${CRM_CONFIG.linkAvaliacao}\n\nMuito obrigado! ${emoji.patas}`:`Oi, ${cliente}! ${emoji.coracao}\n\nEsperamos que ${pets} tenha aproveitado bastante o banho!\n\nSe você gostou da experiência na PetLyne, poderia dedicar menos de 1 minuto para deixar sua avaliação? Ela ajuda outras famílias a conhecerem nosso trabalho e faz muita diferença para nós.\n\n${emoji.estrela} Avalie aqui:\n${CRM_CONFIG.linkAvaliacao}\n\nMuito obrigado! ${emoji.patas}`,
      proximo: varios?`Oi, ${cliente}! ${emoji.cachorro}${emoji.banho}\n\nJá está chegando o momento de cuidar novamente dos seus pets. Que tal garantir o melhor dia e horário?\n\n${emoji.calendario} Agende aqui:\n${CRM_CONFIG.linkAgendamento}\n\nVai ser um prazer receber vocês novamente! ${emoji.coracao}`:`Oi, ${cliente}! ${emoji.cachorro}${emoji.banho}\n\nJá está chegando o momento do próximo banho d${normalizarTextoCliente(item.pets[0]?.sexo).includes("femea")?"a":"o"} ${item.pets[0]?.pet||"seu pet"}. Que tal garantir o melhor dia e horário?\n\n${emoji.calendario} Agende aqui:\n${CRM_CONFIG.linkAgendamento}\n\nVai ser um prazer receber vocês novamente! ${emoji.coracao}`,
      atraso: varios?`Oi, ${cliente}! ${emoji.patas}\n\nPercebemos que já passou um pouquinho do período ideal para os próximos cuidados dos seus pets. Que tal garantir um horário para deixá-los limpinhos e cheirosos novamente?\n\n${emoji.calendario} Agende aqui:\n${CRM_CONFIG.linkAgendamento}`:`Oi, ${cliente}! ${emoji.patas}\n\nPercebemos que já passou um pouquinho do período ideal para o próximo banho d${normalizarTextoCliente(item.pets[0]?.sexo).includes("femea")?"a":"o"} ${item.pets[0]?.pet||"seu pet"}. Que tal garantir um horário para os próximos cuidados?\n\n${emoji.calendario} Agende aqui:\n${CRM_CONFIG.linkAgendamento}`,
      recuperacao: varios?`Oi, ${cliente}! ${emoji.coracao}\n\nEstamos com saudades dos seus pets por aqui! Já faz um tempinho desde a última visita. Temos horários disponíveis e será um prazer receber vocês novamente.\n\n${emoji.calendario} Agende aqui:\n${CRM_CONFIG.linkAgendamento}`:`Oi, ${cliente}! ${emoji.coracao}\n\nEstamos com saudades d${normalizarTextoCliente(item.pets[0]?.sexo).includes("femea")?"a":"o"} ${item.pets[0]?.pet||"seu pet"} por aqui! Já faz um tempinho desde a última visita. Temos horários disponíveis e será um prazer receber vocês novamente.\n\n${emoji.calendario} Agende aqui:\n${CRM_CONFIG.linkAgendamento}`,
      conhecer: varios?`Oi, ${cliente}! ${emoji.patas}\n\nTemos uma novidade para facilitar os próximos agendamentos dos seus pets na PetLyne! Agora você pode escolher o dia, o horário e o serviço diretamente pelo celular.\n\nQuando precisar, é só acessar:\n${CRM_CONFIG.linkAgendamento}\n\nEsperamos vocês! ${emoji.coracao}`:`Oi, ${cliente}! ${emoji.patas}\n\nTemos uma novidade para facilitar os próximos agendamentos na PetLyne! Agora você pode escolher o dia, o horário e o serviço diretamente pelo celular.\n\nQuando ${pets} precisar do próximo banho, é só acessar:\n${CRM_CONFIG.linkAgendamento}\n\nEsperamos vocês! ${emoji.coracao}`
    };
    return mensagens[item.categoria]||"";
}
function codificarMensagemWhatsApp(texto){return encodeURIComponent(String(texto||"").normalize("NFC"));}
function abrirWhatsAppCRM(chaveCodificada){
    const chave=decodeURIComponent(chaveCodificada),item=crmRegistrosPorChave.get(chave);if(!item)return;
    let telefone=normalizarTelefoneCliente(item.telefone);if(telefone.length===10||telefone.length===11)telefone=`55${telefone}`;
    if(!telefone){mostrarAvisoAdmin({titulo:"Telefone não encontrado",mensagem:"Este cliente não possui um telefone válido para abrir o WhatsApp.",icone:"⚠️"});return;}
    const texto=codificarMensagemWhatsApp(montarMensagemCRM(item)),movel=/Android|iPhone|iPad|iPod/i.test(navigator.userAgent),base=movel?"https://api.whatsapp.com/send":"https://web.whatsapp.com/send";
    window.open(`${base}?phone=${telefone}&text=${texto}`,"_blank","noopener,noreferrer");
}
async function marcarAcaoCRMEnviada(chaveCodificada){
    const chave=decodeURIComponent(chaveCodificada),item=crmRegistrosPorChave.get(chave);if(!item)return;
    const confirmar=await mostrarConfirmacaoAdmin({titulo:"Confirmar envio",mensagem:`Confirma que a mensagem de ${CRM_CATEGORIAS[item.categoria].titulo.toLowerCase()} foi enviada para ${item.cliente}?`,icone:"📲",textoConfirmar:"Sim, foi enviada"});if(!confirmar)return;
    await db.collection("crmHistorico").add({clienteChave:item.chave,cliente:item.cliente,pets:item.pets,pet:item.pet,telefone:item.telefone,tipoAcao:item.categoria,protocoloEscopo:"LYNE",status:"Enviado",ultimoAtendimento:item.ultimoAtendimento||null,criadoEm:firebase.firestore.FieldValue.serverTimestamp()});
    await carregarHistoricoCRM();calcularCRM();renderizarCRM();await mostrarAvisoAdmin({titulo:"Ação registrada",mensagem:"O envio foi salvo no histórico do CRM.",icone:"✅"});
}

async function atualizarCRM() {
    try {
        await carregarAgendamentos();
        await carregarClientesAdmin();
        await carregarHistoricoCRM();
        calcularCRM();
        renderizarCRM();
    } catch (error) {
        console.error("Erro ao atualizar CRM:", error);
        await mostrarAvisoAdmin({
            titulo: "Erro ao atualizar CRM",
            mensagem: "Não foi possível carregar os dados agora. Tente novamente.",
            icone: "⚠️"
        });
    }
}
