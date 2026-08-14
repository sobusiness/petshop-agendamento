const horaInicio = 9;
const horaFim = 17;
const diasFechados = [0, 1];
const racasPorteBanhoTosa = [
    {
        "raca": "Akita",
        "porte": "Grande"
    },
    {
        "raca": "Akita Americano",
        "porte": "Grande"
    },
    {
        "raca": "Alaskan Malamute",
        "porte": "Grande"
    },
    {
        "raca": "American Pit Bull Terrier",
        "porte": "Médio"
    },
    {
        "raca": "American Staffordshire Terrier",
        "porte": "Médio"
    },
    {
        "raca": "Australian Shepherd",
        "porte": "Médio"
    },
    {
        "raca": "Basset Hound",
        "porte": "Médio"
    },
    {
        "raca": "Beagle",
        "porte": "Médio"
    },
    {
        "raca": "Bernese Mountain Dog",
        "porte": "Grande"
    },
    {
        "raca": "Bichon Frisé",
        "porte": "Pequeno"
    },
    {
        "raca": "Border Collie",
        "porte": "Médio"
    },
    {
        "raca": "Boston Terrier",
        "porte": "Pequeno"
    },
    {
        "raca": "Boxer",
        "porte": "Grande"
    },
    {
        "raca": "Buldogue Francês",
        "porte": "Pequeno"
    },
    {
        "raca": "Bulldog Inglês",
        "porte": "Médio"
    },
    {
        "raca": "Bullmastiff",
        "porte": "Grande"
    },
    {
        "raca": "Cane Corso",
        "porte": "Grande"
    },
    {
        "raca": "Cavalier King Charles Spaniel",
        "porte": "Pequeno"
    },
    {
        "raca": "Chihuahua",
        "porte": "Pequeno"
    },
    {
        "raca": "Chow Chow",
        "porte": "Médio"
    },
    {
        "raca": "Cocker Spaniel Americano",
        "porte": "Médio"
    },
    {
        "raca": "Cocker Spaniel Inglês",
        "porte": "Médio"
    },
    {
        "raca": "Coton de Tuléar",
        "porte": "Pequeno"
    },
    {
        "raca": "Dachshund (Salsicha)",
        "porte": "Pequeno"
    },
    {
        "raca": "Dobermann",
        "porte": "Grande"
    },
    {
        "raca": "Dogue Alemão",
        "porte": "Grande"
    },
    {
        "raca": "Dogue de Bordeaux",
        "porte": "Grande"
    },
    {
        "raca": "Dálmata",
        "porte": "Grande"
    },
    {
        "raca": "Fila Brasileiro",
        "porte": "Grande"
    },
    {
        "raca": "Fox Paulistinha (Terrier Brasileiro)",
        "porte": "Pequeno"
    },
    {
        "raca": "Golden Retriever",
        "porte": "Grande"
    },
    {
        "raca": "Greyhound",
        "porte": "Grande"
    },
    {
        "raca": "Husky Siberiano",
        "porte": "Médio"
    },
    {
        "raca": "Jack Russell Terrier",
        "porte": "Pequeno"
    },
    {
        "raca": "Komondor",
        "porte": "Grande"
    },
    {
        "raca": "Kuvasz",
        "porte": "Grande"
    },
    {
        "raca": "Labrador Retriever",
        "porte": "Grande"
    },
    {
        "raca": "Leonberger",
        "porte": "Grande"
    },
    {
        "raca": "Lhasa Apso",
        "porte": "Pequeno"
    },
    {
        "raca": "Maltês",
        "porte": "Pequeno"
    },
    {
        "raca": "Mastiff",
        "porte": "Grande"
    },
    {
        "raca": "Mastino Napolitano",
        "porte": "Grande"
    },
    {
        "raca": "Papillon",
        "porte": "Pequeno"
    },
    {
        "raca": "Pastor Alemão",
        "porte": "Grande"
    },
    {
        "raca": "Pastor Belga",
        "porte": "Grande"
    },
    {
        "raca": "Pequinês",
        "porte": "Pequeno"
    },
    {
        "raca": "Pinscher",
        "porte": "Pequeno"
    },
    {
        "raca": "Poodle Mini",
        "porte": "Pequeno"
    },
    {
        "raca": "Poodle Standard",
        "porte": "Médio"
    },
    {
        "raca": "Poodle Toy",
        "porte": "Pequeno"
    },
    {
        "raca": "Pug",
        "porte": "Pequeno"
    },
    {
        "raca": "Rhodesian Ridgeback",
        "porte": "Grande"
    },
    {
        "raca": "Rottweiler",
        "porte": "Grande"
    },
    {
        "raca": "Samoieda",
        "porte": "Médio"
    },
    {
        "raca": "Schnauzer Miniatura",
        "porte": "Pequeno"
    },
    {
        "raca": "Schnauzer Standard",
        "porte": "Médio"
    },
    {
        "raca": "Sem Raça Grande",
        "porte": "Grande"
    },
    {
        "raca": "Sem Raça Médio",
        "porte": "Médio"
    },
    {
        "raca": "Sem Raça Pequeno",
        "porte": "Pequeno"
    },
    {
        "raca": "Setter Inglês",
        "porte": "Médio"
    },
    {
        "raca": "Setter Irlandês",
        "porte": "Médio"
    },
    {
        "raca": "Shar Pei",
        "porte": "Médio"
    },
    {
        "raca": "Shiba Inu",
        "porte": "Pequeno"
    },
    {
        "raca": "Shih Tzu",
        "porte": "Pequeno"
    },
    {
        "raca": "Spitz Alemão (Lulu da Pomerânia)",
        "porte": "Pequeno"
    },
    {
        "raca": "Springer Spaniel",
        "porte": "Médio"
    },
    {
        "raca": "São Bernardo",
        "porte": "Grande"
    },
    {
        "raca": "Terra Nova",
        "porte": "Grande"
    },
    {
        "raca": "Weimaraner",
        "porte": "Médio"
    },
    {
        "raca": "West Highland White Terrier",
        "porte": "Pequeno"
    },
    {
        "raca": "Whippet",
        "porte": "Médio"
    },
    {
        "raca": "Wolfhound Irlandês",
        "porte": "Grande"
    },
    {
        "raca": "Yorkshire Terrier",
        "porte": "Pequeno"
    }
];
const racasPorteGatosPetlyne = [
    {
        "raca": "Abissínio",
        "porte": "Único"
    },
    {
        "raca": "American Bobtail",
        "porte": "Único"
    },
    {
        "raca": "American Curl",
        "porte": "Único"
    },
    {
        "raca": "American Shorthair",
        "porte": "Único"
    },
    {
        "raca": "Angorá Turco",
        "porte": "Único"
    },
    {
        "raca": "Azul Russo",
        "porte": "Único"
    },
    {
        "raca": "Balinês",
        "porte": "Único"
    },
    {
        "raca": "Bengal",
        "porte": "Único"
    },
    {
        "raca": "Birmanês",
        "porte": "Único"
    },
    {
        "raca": "Bobtail Japonês",
        "porte": "Único"
    },
    {
        "raca": "Bombay",
        "porte": "Único"
    },
    {
        "raca": "British Longhair",
        "porte": "Único"
    },
    {
        "raca": "British Shorthair",
        "porte": "Único"
    },
    {
        "raca": "Burmilla",
        "porte": "Único"
    },
    {
        "raca": "Burmês",
        "porte": "Único"
    },
    {
        "raca": "Chartreux",
        "porte": "Único"
    },
    {
        "raca": "Chausie",
        "porte": "Único"
    },
    {
        "raca": "Cornish Rex",
        "porte": "Único"
    },
    {
        "raca": "Cymric",
        "porte": "Único"
    },
    {
        "raca": "Devon Rex",
        "porte": "Único"
    },
    {
        "raca": "Egyptian Mau",
        "porte": "Único"
    },
    {
        "raca": "Exótico",
        "porte": "Único"
    },
    {
        "raca": "Havana Brown",
        "porte": "Único"
    },
    {
        "raca": "Himalaio",
        "porte": "Único"
    },
    {
        "raca": "Khao Manee",
        "porte": "Único"
    },
    {
        "raca": "Kurilian Bobtail",
        "porte": "Único"
    },
    {
        "raca": "LaPerm",
        "porte": "Único"
    },
    {
        "raca": "Maine Coon",
        "porte": "Único"
    },
    {
        "raca": "Manx",
        "porte": "Único"
    },
    {
        "raca": "Munchkin",
        "porte": "Único"
    },
    {
        "raca": "Norueguês da Floresta",
        "porte": "Único"
    },
    {
        "raca": "Ocicat",
        "porte": "Único"
    },
    {
        "raca": "Oriental Longhair",
        "porte": "Único"
    },
    {
        "raca": "Oriental Shorthair",
        "porte": "Único"
    },
    {
        "raca": "Persa",
        "porte": "Único"
    },
    {
        "raca": "Peterbald",
        "porte": "Único"
    },
    {
        "raca": "Ragdoll",
        "porte": "Único"
    },
    {
        "raca": "Savannah",
        "porte": "Único"
    },
    {
        "raca": "Scottish Fold",
        "porte": "Único"
    },
    {
        "raca": "Selkirk Rex",
        "porte": "Único"
    },
    {
        "raca": "Sem Raça Definida (SRD)",
        "porte": "Único"
    },
    {
        "raca": "Siamês",
        "porte": "Único"
    },
    {
        "raca": "Siberiano",
        "porte": "Único"
    },
    {
        "raca": "Singapura",
        "porte": "Único"
    },
    {
        "raca": "Somali",
        "porte": "Único"
    },
    {
        "raca": "Sphynx",
        "porte": "Único"
    },
    {
        "raca": "Tonquinês",
        "porte": "Único"
    },
    {
        "raca": "Toyger",
        "porte": "Único"
    }
];
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



// V6.4 - Cache de sessão, deduplicação de consultas e logs técnicos
const cacheConsultasPetlyne = {
    clientesPorTelefone: new Map(),
    disponibilidadePorData: new Map()
};
const CACHE_CLIENTE_MS = 10 * 60 * 1000;
const CACHE_DISPONIBILIDADE_MS = 45 * 1000;
let requisicaoHorariosEmAndamento = null;
let chaveRequisicaoHorarios = "";
let sequenciaCarregamentoHorarios = 0;

function obterCacheValido(mapa, chave, ttl) {
    const item = mapa.get(chave);
    if (!item || Date.now() - item.criadoEm > ttl) {
        mapa.delete(chave);
        return null;
    }
    return item.valor;
}

function salvarCache(mapa, chave, valor) {
    mapa.set(chave, { valor, criadoEm: Date.now() });
    return valor;
}

// V6.5 - Motor de confiabilidade para operações críticas
const CONFIG_CONFIABILIDADE = {
    // O SDK do Firestore já possui retentativas internas. Mantemos somente uma
    // retentativa adicional para leituras realmente transitórias e nunca repetimos
    // gravações automaticamente, evitando operações concorrentes e falsos erros.
    tentativasLeitura: 2,
    tentativasEscrita: 1,
    timeoutLeituraMs: 15000,
    timeoutEscritaMs: 0,
    esperaInicialMs: 650
};

const CODIGOS_TRANSITORIOS_FIREBASE = new Set([
    "aborted",
    "cancelled",
    "deadline-exceeded",
    "internal",
    "network-request-failed",
    "resource-exhausted",
    "unavailable",
    "unknown"
]);

function criarErroPetlyne(codigo, mensagem, causa = null) {
    const erro = new Error(mensagem || codigo);
    erro.code = codigo;
    erro.cause = causa || undefined;
    return erro;
}

function abrirSeletorDataSeguro(input, event) {
    // showPicker só pode ser chamado durante uma ação direta do usuário.
    if (!input || typeof input.showPicker !== "function" || !event?.isTrusted) return;
    try {
        input.showPicker();
    } catch (error) {
        // O campo continua funcionando pelo comportamento nativo do navegador.
        if (error?.name !== "NotAllowedError") {
            registrarLogSistema({
                modulo: "Interface",
                funcao: "abrirSeletorDataSeguro",
                nivel: "aviso",
                codigo: error?.name || "show-picker",
                mensagem: error?.message || String(error)
            });
        }
    }
}

function erroNavegadorIgnoravel(mensagem = "") {
    return /showPicker\(\).*requires a user gesture|ResizeObserver loop|Script error\.?$/i.test(String(mensagem));
}

function codigoErroNormalizado(error) {
    const codigo = String(error?.code || error?.message || "unknown").toLowerCase();
    return codigo.replace(/^firestore\//, "");
}

function erroTransitorio(error) {
    const codigo = codigoErroNormalizado(error);
    if (codigo === "client-timeout") return false;
    return CODIGOS_TRANSITORIOS_FIREBASE.has(codigo)
        || /network|offline|timed out|indispon[ií]vel|conex[aã]o/i.test(String(error?.message || ""));
}

function aguardar(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function executarComTimeout(promessa, timeoutMs, etapa) {
    // V7.3: o SDK do Firestore é o responsável por concluir/cancelar a operação.
    // Um Promise.race com timeout NÃO cancela a leitura real e criava falsos
    // "client-timeout" enquanto o Firestore ainda estava trabalhando.
    //
    // A partir daqui o limite serve SOMENTE como telemetria de lentidão:
    // registra um aviso, mas nunca interrompe o fluxo do cliente.
    if (!timeoutMs || timeoutMs <= 0) return Promise.resolve(promessa);

    let concluida = false;
    const timer = setTimeout(() => {
        if (concluida) return;
        registrarLogSistema({
            modulo: "Agendamento Online",
            funcao: etapa || "leitura-firestore",
            nivel: "aviso",
            codigo: "client-slow",
            mensagem: `A operação ${etapa || "leitura"} está demorando mais do que o esperado, mas continua em andamento.`,
            duracaoMs: timeoutMs
        });
    }, timeoutMs);

    return Promise.resolve(promessa).finally(() => {
        concluida = true;
        clearTimeout(timer);
    });
}

async function executarComConfiabilidade(operacao, opcoes = {}) {
    const etapa = opcoes.etapa || "operação";
    const tentativas = Math.max(1, Number(opcoes.tentativas || CONFIG_CONFIABILIDADE.tentativasLeitura));
    const timeoutMs = Number(opcoes.timeoutMs || CONFIG_CONFIABILIDADE.timeoutLeituraMs);
    const inicioTotal = performance.now();
    let ultimoErro;

    for (let tentativa = 1; tentativa <= tentativas; tentativa += 1) {
        const inicioTentativa = performance.now();
        try {
            const resultado = await executarComTimeout(operacao(tentativa), timeoutMs, etapa);
            return resultado;
        } catch (error) {
            ultimoErro = error;
            const transitorio = erroTransitorio(error);

            registrarLogSistema({
                modulo: "Agendamento Online",
                funcao: etapa,
                nivel: tentativa < tentativas && transitorio ? "aviso" : "erro",
                codigo: codigoErroNormalizado(error),
                mensagem: error?.message || String(error),
                detalhes: `Tentativa ${tentativa} de ${tentativas}; duração ${Math.round(performance.now() - inicioTentativa)} ms; total ${Math.round(performance.now() - inicioTotal)} ms`,
                tentativa,
                totalTentativas: tentativas
            });

            if (!transitorio || tentativa >= tentativas) break;
            const espera = CONFIG_CONFIABILIDADE.esperaInicialMs * Math.pow(2, tentativa - 1);
            await aguardar(espera);
        }
    }

    throw ultimoErro || criarErroPetlyne("unknown", `Falha em ${etapa}.`);
}

function mensagemAmigavelErro(error, contexto = "agendamento") {
    const codigo = codigoErroNormalizado(error);
    if (codigo === "permission-denied") return "O sistema não conseguiu acessar o banco de dados. Tente novamente em instantes.";
    if (codigo === "resource-exhausted") return "O sistema está temporariamente sobrecarregado. Aguarde um momento e tente novamente.";
    if (["unavailable", "deadline-exceeded", "network-request-failed"].includes(codigo) || erroTransitorio(error)) {
        return "A conexão com o sistema oscilou. Verifique sua internet e tente novamente.";
    }
    if (codigo === "firebase-nao-encontrado") return "O sistema de agendamento ainda não terminou de carregar. Atualize a página e tente novamente.";
    return contexto === "cadastro"
        ? "Não foi possível consultar seu cadastro agora. Tente novamente em instantes."
        : "Não foi possível confirmar o agendamento agora. Atualize os horários e tente novamente.";
}

const logsRecentesPetlyne = new Map();

function registrarLogSistema(dados = {}) {
    // Observabilidade totalmente passiva: nunca bloqueia o fluxo principal.
    try {
        if (typeof db === "undefined") return Promise.resolve();
        const chave = [dados.modulo, dados.funcao, dados.codigo, dados.mensagem].join("|");
        const ultimo = logsRecentesPetlyne.get(chave) || 0;
        if (Date.now() - ultimo < 30000) return Promise.resolve();
        logsRecentesPetlyne.set(chave, Date.now());

        const gravacao = db.collection("logsSistema").add({
            origem: "Agendamento Online",
            modulo: dados.modulo || "Agendamento Online",
            funcao: dados.funcao || "",
            nivel: dados.nivel || "erro",
            codigo: dados.codigo || "",
            mensagem: String(dados.mensagem || "Erro não identificado").slice(0, 1200),
            detalhes: String(dados.detalhes || "").slice(0, 2500),
            dataAgendamento: document.getElementById("data")?.value || "",
            horario: document.getElementById("horario")?.value || "",
            protocolo: dados.protocolo || "",
            tentativa: Number(dados.tentativa || 0),
            totalTentativas: Number(dados.totalTentativas || 0),
            duracaoMs: Number(dados.duracaoMs || 0),
            url: window.location.href,
            navegador: navigator.userAgent.slice(0, 500),
            criadoEm: firebase.firestore.FieldValue.serverTimestamp(),
            resolvido: false
        });
        gravacao.catch(erroLog => console.warn("Não foi possível registrar o log do sistema:", erroLog));
        return gravacao;
    } catch (erroLog) {
        console.warn("Não foi possível iniciar o registro do log:", erroLog);
        return Promise.resolve();
    }
}

window.addEventListener("error", event => {
    if (erroNavegadorIgnoravel(event.message)) return;
    registrarLogSistema({
        modulo: "JavaScript",
        funcao: "window.error",
        nivel: "erro",
        codigo: event.error?.name || "javascript-error",
        mensagem: event.message,
        detalhes: `${event.filename || ""}:${event.lineno || ""}:${event.colno || ""}`
    });
});
window.addEventListener("unhandledrejection", event => {
    const motivo = event.reason || {};
    registrarLogSistema({ modulo:"JavaScript", funcao:"unhandledrejection", mensagem:motivo.message || String(motivo), codigo:motivo.code || "" });
});

let agendamentosExistentes = [];
let servicosPrincipaisCliente = [];
let timeoutBuscaCadastroTelefone = null;
let sequenciaBuscaTelefone = 0;
let petsEncontradosTelefone = [];

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
const precoCorteUnha = 12;

const precosDesemboloCaes = {
    "Pequeno": 25,
    "Médio": 35,
    "Grande": 45
};
const precoBanhoSecoGato = 80;


function obterListaRacasPorEspecie(especie) {
    if (especie === "Gato") return racasPorteGatosPetlyne;
    if (especie === "Cão") return racasPorteBanhoTosa;
    return [];
}

function popularSelectRacasCliente() {
    const select = document.getElementById("raca");
    const especie = document.getElementById("especie")?.value || "";
    const porte = document.getElementById("porte");

    if (!select) return;

    const valorAtual = select.value;
    const lista = obterListaRacasPorEspecie(especie);

    select.innerHTML = `<option value="">${especie ? "Selecione a raça" : "Selecione a espécie primeiro"}</option>`;

    lista.forEach(item => {
        const option = document.createElement("option");
        option.value = item.raca;
        option.textContent = item.raca;
        option.dataset.porte = item.porte;
        select.appendChild(option);
    });

    if (valorAtual && lista.some(item => item.raca === valorAtual)) {
        select.value = valorAtual;
    } else {
        select.value = "";
        if (porte) porte.value = "";
    }
}

function obterPortePorRaca(raca, especieAtual = null) {
    const especie = especieAtual || document.getElementById("especie")?.value || "";

    if (especie === "Gato" && raca) {
        return "Único";
    }

    const lista = obterListaRacasPorEspecie(especie);

    const item = lista.find(registro =>
        (registro.raca || "").toLowerCase() === (raca || "").toLowerCase()
    );

    return item ? item.porte : "";
}

function atualizarPortePorRacaCliente() {
    const raca = document.getElementById("raca")?.value || "";
    const porte = obterPortePorRaca(raca);

    const campoPorte = document.getElementById("porte");
    if (campoPorte) campoPorte.value = porte || "";

    atualizarServicosPorEspecie();
    atualizarResumoServicos();
    carregarHorariosDisponiveis();
}


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

function obterSlotsBloqueadosPorPeriodo(horarioInicio, duracaoMinutos = 30) {
    const inicio = horarioParaMinutos(horarioInicio);
    const fim = inicio + Number(duracaoMinutos || 30);
    const slots = [];

    for (let minuto = inicio; minuto < fim; minuto += 30) {
        slots.push(minutosParaHorario(minuto));
    }

    return slots;
}

function calcularDuracaoAgendamentoMinutos() {
    return 30;
}

function horarioEstaOcupadoPorPeriodo(horario, agendamentos) {
    const inicio = horarioParaMinutos(horario);
    const fim = inicio + calcularDuracaoAgendamentoMinutos();

    return agendamentos.some(agendamento => {
        const inicioExistente = horarioParaMinutos(agendamento.horario);
        const duracaoExistente = 30;
        const fimExistente = inicioExistente + duracaoExistente;

        return inicio < fimExistente && fim > inicioExistente;
    });
}

function horarioBloqueadoPorAusencia(horario, bloqueios) {
    const inicio = horarioParaMinutos(horario);
    const fim = inicio + calcularDuracaoAgendamentoMinutos();

    return bloqueios.some(bloqueio => {
        const inicioBloqueio = horarioParaMinutos(bloqueio.inicio);
        const fimBloqueio = horarioParaMinutos(bloqueio.fim);

        return inicio < fimBloqueio && fim > inicioBloqueio;
    });
}



function normalizarTelefone(valor) {
    return (valor || "").replace(/\D/g, "");
}

function variantesTelefone(valor) {
    let numeros = normalizarTelefone(valor);
    if (numeros.startsWith("55") && (numeros.length === 12 || numeros.length === 13)) numeros = numeros.slice(2);
    const variantes = new Set();
    if (numeros.length === 10 || numeros.length === 11) variantes.add(numeros);
    if (numeros.length === 10) variantes.add(`${numeros.slice(0, 2)}9${numeros.slice(2)}`);
    if (numeros.length === 11 && numeros.charAt(2) === "9") variantes.add(`${numeros.slice(0, 2)}${numeros.slice(3)}`);
    return variantes;
}
function telefonesEquivalentes(a, b) {
    const va = variantesTelefone(a), vb = variantesTelefone(b);
    return Array.from(va).some(numero => vb.has(numero));
}
function telefoneBrasileiroValido(valor) {
    const tamanho = normalizarTelefone(valor).length;
    return tamanho === 10 || tamanho === 11;
}


function chavePetCadastro(item) {
    return [
        (item.pet || "").trim().toLowerCase(),
        (item.especie || "").trim().toLowerCase()
    ].join("|");
}

function preencherCampoSeVazioOuDiferente(id, valor) {
    const campo = document.getElementById(id);
    if (!campo || valor === undefined || valor === null || valor === "") return;

    campo.value = valor;
}

function aplicarCadastroPet(cadastro) {
    if (!cadastro) return;

    preencherCampoSeVazioOuDiferente("cliente", cadastro.cliente);
    preencherCampoSeVazioOuDiferente("especie", cadastro.especie);

    popularSelectRacasCliente();

    preencherCampoSeVazioOuDiferente("pet", cadastro.pet);
    preencherCampoSeVazioOuDiferente("sexo", cadastro.sexo);
    preencherCampoSeVazioOuDiferente("raca", cadastro.raca);

    const porteCadastro = cadastro.porte || obterPortePorRaca(cadastro.raca, cadastro.especie);
    preencherCampoSeVazioOuDiferente("porte", porteCadastro);

    preencherCampoSeVazioOuDiferente("observacaoPet", cadastro.observacaoPet);

    atualizarServicosPorEspecie();
    atualizarResumoServicos();
    carregarHorariosDisponiveis();
}

function limparSeletorPetsCadastrados() {
    const box = document.getElementById("petCadastradoBox");
    const select = document.getElementById("petCadastradoSelect");

    if (!box || !select) return;

    petsEncontradosTelefone = [];
    select.innerHTML = `<option value="">Selecione o pet</option>`;
    box.style.display = "none";
}

function renderizarPetsCadastrados(pets) {
    const box = document.getElementById("petCadastradoBox");
    const select = document.getElementById("petCadastradoSelect");

    if (!box || !select) return;

    select.innerHTML = `<option value="">Selecione o pet</option>`;

    pets.forEach((pet, index) => {
        const option = document.createElement("option");
        option.value = String(index);
        option.textContent = `${pet.pet || "Pet sem nome"}${pet.raca ? " - " + pet.raca : ""}`;
        select.appendChild(option);
    });

    box.style.display = "block";
}

async function buscarCadastrosPorTelefoneFirebase(telefoneDigitado) {
    const telefoneInformado = normalizarTelefone(telefoneDigitado);
    if (!telefoneInformado) return [];

    // Padroniza números com código do Brasil e reconhece bases antigas com ou sem 9º dígito.
    let telefoneBase = telefoneInformado;
    if (telefoneBase.startsWith("55") && (telefoneBase.length === 12 || telefoneBase.length === 13)) {
        telefoneBase = telefoneBase.slice(2);
    }

    const cache = obterCacheValido(cacheConsultasPetlyne.clientesPorTelefone, telefoneBase, CACHE_CLIENTE_MS);
    if (cache) return cache;

    const numerosEquivalentes = new Set(variantesTelefone(telefoneBase));
    numerosEquivalentes.add(telefoneBase);

    const valoresLegados = new Set();
    numerosEquivalentes.forEach(numero => {
        if (!numero) return;
        valoresLegados.add(numero);
        valoresLegados.add(formatarTelefoneCelular(numero));
        valoresLegados.add(`55${numero}`);
        valoresLegados.add(`+55${numero}`);
        valoresLegados.add(`+55 ${formatarTelefoneCelular(numero)}`);
    });
    valoresLegados.add(telefoneDigitado);

    try {
        const consultas = [];

        // Documentos atuais gravam telefoneNormalizado. Consultamos todas as variantes
        // equivalentes para também reconhecer cadastros antigos com mudança do 9º dígito.
        numerosEquivalentes.forEach(numero => {
            consultas.push(() => db.collection("agendamentos")
                .where("telefoneNormalizado", "==", numero)
                .limit(30)
                .get());
        });

        // Compatibilidade com documentos antigos que possuíam apenas o telefone formatado.
        valoresLegados.forEach(valor => {
            if (!valor) return;
            consultas.push(() => db.collection("agendamentos")
                .where("telefone", "==", valor)
                .limit(30)
                .get());
        });

        const registrosPorId = new Map();
        let primeiroErro = null;

        // Executa sequencialmente para evitar rajadas de consultas e encerra assim que
        // encontra registros suficientes para preencher o cadastro.
        for (let indice = 0; indice < consultas.length; indice += 1) {
            try {
                const snapshot = await executarComConfiabilidade(consultas[indice], {
                    etapa: `buscarHistoricoTelefone_${indice + 1}`,
                    tentativas: CONFIG_CONFIABILIDADE.tentativasLeitura,
                    timeoutMs: CONFIG_CONFIABILIDADE.timeoutLeituraMs
                });

                snapshot.docs.forEach(doc => {
                    registrosPorId.set(doc.id, { id: doc.id, ...doc.data() });
                });

                if (registrosPorId.size > 0) break;
            } catch (error) {
                primeiroErro ||= error;
            }
        }

        if (registrosPorId.size === 0 && primeiroErro) throw primeiroErro;

        const registros = Array.from(registrosPorId.values());
        registros.sort((a, b) => `${b.data || ""} ${b.horario || ""}`.localeCompare(`${a.data || ""} ${a.horario || ""}`));

        const mapaPets = new Map();
        registros.forEach(item => {
            const chave = chavePetCadastro(item);
            if (!mapaPets.has(chave)) mapaPets.set(chave, item);
        });

        return salvarCache(cacheConsultasPetlyne.clientesPorTelefone, telefoneBase, Array.from(mapaPets.values()));
    } catch (error) {
        console.error("Erro ao buscar cadastro por telefone:", error);
        registrarLogSistema({
            modulo: "Agendamento Online",
            funcao: "buscarCadastrosPorTelefoneFirebase",
            mensagem: error?.message || String(error),
            codigo: codigoErroNormalizado(error),
            detalhes: `Telefone final: ${telefoneBase.slice(-4).padStart(telefoneBase.length, "*")}`
        });
        throw error;
    }
}


// ============================================================
// PROSPECT CALLBACK V7.2
// Registra somente telefone válido que NÃO possui histórico/cadastro.
// O registro permanece pendente e só aparece no Admin após 5 minutos.
// ============================================================
async function gerarIdProspectTelefone(telefone) {
    const normalizado = normalizarTelefone(telefone);
    if (window.crypto?.subtle && window.TextEncoder) {
        const bytes = new TextEncoder().encode(`petlyne-prospect:${normalizado}`);
        const hash = await crypto.subtle.digest("SHA-256", bytes);
        return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, "0")).join("");
    }
    // fallback determinístico para navegadores muito antigos
    let h = 2166136261;
    for (const c of normalizado) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); }
    return `legacy_${Math.abs(h >>> 0)}_${normalizado.slice(-4)}`;
}

async function registrarProspectCallback(telefone) {
    if (typeof db === "undefined") return;
    const telefoneNormalizado = normalizarTelefone(telefone);
    if (!telefoneBrasileiroValido(telefoneNormalizado)) return;

    try {
        // O formulário público não possui permissão de leitura em prospectCallbacks.
        // Portanto NÃO fazemos ref.get(). Criamos no máximo um documento por telefone
        // nesta sessão e guardamos apenas o ID localmente para eventual conversão.
        const chaveSessao = `petlyne_prospect_${telefoneNormalizado}`;
        const existente = sessionStorage.getItem(chaveSessao);
        if (existente) return existente;

        const ref = await db.collection("prospectCallbacks").add({
            telefone: formatarTelefoneCelular(telefoneNormalizado),
            telefoneNormalizado,
            status: "Pendente",
            origem: "Agendamento Online",
            criadoEm: firebase.firestore.FieldValue.serverTimestamp(),
            ultimaInteracaoEm: firebase.firestore.FieldValue.serverTimestamp()
        });

        sessionStorage.setItem(chaveSessao, ref.id);
        return ref.id;
    } catch (error) {
        // Callback é acessório comercial: jamais pode bloquear o agendamento.
        console.warn("Não foi possível registrar prospect callback.", error);
        registrarLogSistema?.({
            modulo: "Agendamento Online",
            funcao: "registrarProspectCallback",
            nivel: "aviso",
            mensagem: error?.message || String(error),
            codigo: error?.code || "prospect-callback"
        });
        return null;
    }
}

async function converterProspectCallbackSeExistir(telefone, protocolo) {
    if (typeof db === "undefined") return;
    const telefoneNormalizado = normalizarTelefone(telefone);
    if (!telefoneBrasileiroValido(telefoneNormalizado)) return;

    try {
        const chaveSessao = `petlyne_prospect_${telefoneNormalizado}`;
        const prospectId = sessionStorage.getItem(chaveSessao);
        if (!prospectId) return;

        // Atualiza diretamente o documento criado nesta sessão, sem leitura pública.
        await db.collection("prospectCallbacks").doc(prospectId).update({
            status: "Convertido",
            convertidoEm: firebase.firestore.FieldValue.serverTimestamp(),
            protocoloConversao: protocolo || "",
            ultimaInteracaoEm: firebase.firestore.FieldValue.serverTimestamp()
        });

        sessionStorage.removeItem(chaveSessao);
    } catch (error) {
        // Nunca interfere na confirmação principal.
        console.warn("Não foi possível converter prospect callback.", error);
    }
}

async function preencherCadastroPorTelefone() {
    const telefone = document.getElementById("telefone").value;
    const telefoneNumeros = normalizarTelefone(telefone);
    const minhaSequencia = ++sequenciaBuscaTelefone;

    if (!telefoneBrasileiroValido(telefoneNumeros)) {
        limparSeletorPetsCadastrados();
        return;
    }

    let pets;
    try {
        pets = await buscarCadastrosPorTelefoneFirebase(telefone);
    } catch (error) {
        // Uma resposta antiga nunca deve apagar ou bloquear a digitação atual.
        if (minhaSequencia !== sequenciaBuscaTelefone || normalizarTelefone(document.getElementById("telefone").value) !== telefoneNumeros) return;
        limparSeletorPetsCadastrados();
        // A consulta automática de cadastro é um recurso auxiliar. Se falhar, o
        // cliente pode continuar preenchendo manualmente sem modal bloqueante.
        console.warn("Cadastro automático indisponível; preenchimento manual mantido.", error);
        return;
    }

    if (minhaSequencia !== sequenciaBuscaTelefone || normalizarTelefone(document.getElementById("telefone").value) !== telefoneNumeros) return;

    if (pets.length === 0) {
        limparSeletorPetsCadastrados();
        // Novo telefone sem cadastro/histórico: candidato ao Prospect Callback.
        // Ele só será exibido no Admin após 5 minutos sem conversão.
        registrarProspectCallback(telefone).catch(() => {});
        return;
    }

    petsEncontradosTelefone = pets;

    if (pets.length === 1) {
        limparSeletorPetsCadastrados();
        aplicarCadastroPet(pets[0]);
        return;
    }

    preencherCampoSeVazioOuDiferente("cliente", pets[0].cliente);
    renderizarPetsCadastrados(pets);
}

function buscarCadastroTelefoneComDelay() {
    clearTimeout(timeoutBuscaCadastroTelefone);

    timeoutBuscaCadastroTelefone = setTimeout(() => {
        preencherCadastroPorTelefone();
    }, 450);
}


function formatarTelefoneCelular(valor) {
    const numeros = valor.replace(/\D/g, "").slice(0, 11);
    if (numeros.length <= 2) return numeros;
    if (numeros.length <= 6) return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
    if (numeros.length <= 10) return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(6)}`;
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
}

popularSelectRacasCliente();

document.getElementById("telefone").addEventListener("input", function () {
    this.value = formatarTelefoneCelular(this.value);
    buscarCadastroTelefoneComDelay();
});

document.getElementById("especie").addEventListener("change", function () {
    popularSelectRacasCliente();
    atualizarPortePorRacaCliente();
    atualizarServicosPorEspecie();
});
document.getElementById("porte").addEventListener("change", atualizarResumoServicos);
document.getElementById("raca").addEventListener("change", atualizarPortePorRacaCliente);
document.getElementById("servicoPrincipal").addEventListener("change", controlarCamposServico);
document.getElementById("pelagem").addEventListener("change", atualizarResumoServicos);
document.getElementById("tipoTosa").addEventListener("change", atualizarResumoServicos);
document.getElementById("adicionalHidratacao").addEventListener("change", atualizarResumoServicos);
document.getElementById("adicionalTosaHigienica").addEventListener("change", atualizarResumoServicos);
document.getElementById("adicionalAntiParasitas").addEventListener("change", atualizarResumoServicos);
document.getElementById("adicionalCorteUnha").addEventListener("change", atualizarResumoServicos);
document.getElementById("adicionalDesembolo").addEventListener("change", atualizarResumoServicos);
document.getElementById("data").addEventListener("change", carregarHorariosDisponiveis);
document.getElementById("raca").addEventListener("input", carregarHorariosDisponiveis);
document.getElementById("servicoPrincipal").addEventListener("change", carregarHorariosDisponiveis);

document.getElementById("petCadastradoSelect")?.addEventListener("change", function () {
    const index = Number(this.value);

    if (Number.isNaN(index) || !petsEncontradosTelefone[index]) return;

    aplicarCadastroPet(petsEncontradosTelefone[index]);
});


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


function racaSelecionadaEhGoldenRetriever() {
    const raca = document.getElementById("raca")?.value || "";
    return raca.trim().toLowerCase() === "golden retriever";
}

function servicoEhTrimmingGolden(nomeServico) {
    const nome = (nomeServico || "").toLowerCase();
    return nome.includes("trimming") && nome.includes("golden");
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
    const ehGoldenRetriever = racaSelecionadaEhGoldenRetriever();

    let nomesUnicos = [...new Set(servicos.map(servico => servico.nome).filter(Boolean))];

    nomesUnicos = nomesUnicos.filter(nome => {
        if (servicoEhTrimmingGolden(nome)) {
            return especie === "Cão" && ehGoldenRetriever;
        }

        return true;
    });

    if (nomesUnicos.length === 0) {
        if (especie === "Cão") {
            return `
                <option value="">Selecione</option>
                <option value="Banho">Banho</option>
                <option value="Tosa">Tosa</option>
                ${ehGoldenRetriever ? `<option value="Trimming (Golden)">Trimming (Golden)</option>` : ""}
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
    const adicionalCorteUnha = document.getElementById("adicionalAntiParasitas");
    const adicionalDesembolo = document.getElementById("adicionalDesembolo");

    servicoPrincipal.innerHTML = "";
    adicionalHidratacao.checked = false;
    adicionalTosaHigienica.checked = false;
    adicionalCorteUnha.checked = false;
    adicionalDesembolo.checked = false;

    adicionalHidratacao.closest(".checkbox-line").style.display = "flex";
    adicionalTosaHigienica.closest(".checkbox-line").style.display = "flex";
    adicionalCorteUnha.closest(".checkbox-line").style.display = "flex";
    adicionalDesembolo.closest(".checkbox-line").style.display = "flex";

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
        adicionalDesembolo.closest(".checkbox-line").style.display = "none";
        adicionalDesembolo.checked = false;
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

    if (document.getElementById("adicionalAntiParasitas").checked) {
        itens.push({ nome: "Tratamento Anti-Parasitas", valor: precoTratamentoAntiParasitas });
        total += precoTratamentoAntiParasitas;
    }

    if (document.getElementById("adicionalCorteUnha").checked) {
        itens.push({ nome: "Corte de Unha", valor: precoCorteUnha });
        total += precoCorteUnha;
    }

    if (especie === "Cão" && document.getElementById("adicionalDesembolo").checked && porte) {
        const valor = precosDesemboloCaes[porte] || 0;
        if (valor > 0) {
            itens.push({ nome: `Desembolo (${porte})`, valor });
            total += valor;
        }
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


async function buscarDisponibilidadeDataFirebase(dataSelecionada, forcar = false) {
    if (!dataSelecionada || typeof db === "undefined") return { agendamentos: [], bloqueios: [] };

    if (!forcar) {
        const cache = obterCacheValido(cacheConsultasPetlyne.disponibilidadePorData, dataSelecionada, CACHE_DISPONIBILIDADE_MS);
        if (cache) return cache;
    }

    return executarComConfiabilidade(async () => {
        const [agendamentosSnapshot, bloqueiosSnapshot] = await Promise.all([
            db.collection("agendamentos").where("data", "==", dataSelecionada).get(),
            db.collection("bloqueiosAgenda").where("data", "==", dataSelecionada).where("status", "==", "Ativo").get()
        ]);

        return salvarCache(cacheConsultasPetlyne.disponibilidadePorData, dataSelecionada, {
            agendamentos: agendamentosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })),
            bloqueios: bloqueiosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        });
    }, {
        etapa: "buscarDisponibilidadeDataFirebase",
        tentativas: CONFIG_CONFIABILIDADE.tentativasLeitura,
        timeoutMs: CONFIG_CONFIABILIDADE.timeoutLeituraMs
    });
}

async function buscarAgendamentosPorDataFirebase(dataSelecionada, forcar = false) {
    try {
        return (await buscarDisponibilidadeDataFirebase(dataSelecionada, forcar)).agendamentos;
    } catch (error) {
        console.error("Erro ao buscar agendamentos no Firebase:", error);
        registrarLogSistema({ modulo:"Agendamento Online", funcao:"buscarAgendamentosPorDataFirebase", mensagem:error.message, codigo:error.code });
        throw error;
    }
}

async function buscarBloqueiosPorDataFirebase(dataSelecionada, forcar = false) {
    try {
        return (await buscarDisponibilidadeDataFirebase(dataSelecionada, forcar)).bloqueios;
    } catch (error) {
        console.error("Erro ao buscar bloqueios no Firebase:", error);
        registrarLogSistema({ modulo:"Agendamento Online", funcao:"buscarBloqueiosPorDataFirebase", mensagem:error.message, codigo:error.code });
        throw error;
    }
}

async function carregarHorariosDisponiveis() {
    const data = document.getElementById("data")?.value || "";
    const duracao = calcularDuracaoAgendamentoMinutos();
    const chave = `${data}|${duracao}|${document.getElementById("servicoPrincipal")?.value || ""}|${document.getElementById("raca")?.value || ""}`;

    if (requisicaoHorariosEmAndamento && chave === chaveRequisicaoHorarios) return requisicaoHorariosEmAndamento;
    chaveRequisicaoHorarios = chave;
    const minhaSequencia = ++sequenciaCarregamentoHorarios;
    const promessaAtual = executarCarregamentoHorariosDisponiveis(minhaSequencia, chave)
        .catch(error => {
            console.error("Erro ao carregar horários:", error);
            registrarLogSistema({ modulo:"Agendamento Online", funcao:"carregarHorariosDisponiveis", mensagem:error.message, codigo:error.code });
            if (minhaSequencia !== sequenciaCarregamentoHorarios) return;
            const select = document.getElementById("horario");
            if (select) select.innerHTML = "<option>Não foi possível carregar os horários. Tente novamente.</option>";
        })
        .finally(() => {
            if (requisicaoHorariosEmAndamento === promessaAtual) requisicaoHorariosEmAndamento = null;
        });
    requisicaoHorariosEmAndamento = promessaAtual;
    return promessaAtual;
}

async function executarCarregamentoHorariosDisponiveis(minhaSequencia, chaveEsperada) {
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

    const disponibilidadeData = await buscarDisponibilidadeDataFirebase(dataSelecionada);
    const chaveAtual = `${document.getElementById("data")?.value || ""}|${calcularDuracaoAgendamentoMinutos()}|${document.getElementById("servicoPrincipal")?.value || ""}|${document.getElementById("raca")?.value || ""}`;
    if (minhaSequencia !== sequenciaCarregamentoHorarios || chaveAtual !== chaveEsperada) return;
    agendamentosExistentes = disponibilidadeData.agendamentos;
    const bloqueiosTemporarios = disponibilidadeData.bloqueios;

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
        const ausenciaTemporaria = horarioBloqueadoPorAusencia(horario, bloqueiosTemporarios);

        option.value = horario;
        option.textContent = ausenciaTemporaria
            ? `${horario} - Ausência Temporária`
            : ocupado
                ? `${horario} - Indisponível`
                : `${horario} - Disponível`;
        option.disabled = ocupado || ausenciaTemporaria;

        if (!ocupado && !ausenciaTemporaria) existeHorarioLivre = true;

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

    if (!telefoneBrasileiroValido(telefoneNumeros)) {
        mostrarAlerta("Digite um telefone válido com DDD e 8 ou 9 dígitos. Exemplos: (61) 8566-5654 ou (11) 99999-9999");
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



function horariosSobrepostosPorDuracao(inicioA, duracaoA, inicioB, duracaoB) {
    const aInicio = horarioParaMinutos(inicioA);
    const aFim = aInicio + Number(duracaoA || 30);
    const bInicio = horarioParaMinutos(inicioB);
    const bFim = bInicio + Number(duracaoB || 30);

    return aInicio < bFim && aFim > bInicio;
}

function horarioOcupadoPorPeriodoComDuracao(horario, duracaoMinutos, agendamentos) {
    return agendamentos.some(agendamento => {
        if (!agendamento.horario) return false;

        return horariosSobrepostosPorDuracao(
            horario,
            duracaoMinutos,
            agendamento.horario,
            30
        );
    });
}

function horarioBloqueadoPorAusenciaComDuracao(horario, duracaoMinutos, bloqueios) {
    return bloqueios.some(bloqueio => {
        if (bloqueio.status && bloqueio.status !== "Ativo") return false;
        if (!bloqueio.inicio || !bloqueio.fim) return false;

        const duracaoBloqueio = horarioParaMinutos(bloqueio.fim) - horarioParaMinutos(bloqueio.inicio);

        return horariosSobrepostosPorDuracao(
            horario,
            duracaoMinutos,
            bloqueio.inicio,
            duracaoBloqueio
        );
    });
}


function criarClienteIdLocal(telefone, pet) {
    const tel = normalizarTelefone(telefone) || "semtelefone";
    const petNormalizado = (pet || "sempet")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    return `${tel}_${petNormalizado || "sempet"}`;
}

async function salvarCadastroClienteAutomatico(dados) {
    // A coleção "clientes" é administrativa e exige autenticação. O formulário
    // público não tenta mais gravá-la. O histórico do próprio agendamento mantém
    // os dados necessários e o painel administrativo consolida os clientes.
    cacheConsultasPetlyne.clientesPorTelefone.delete(normalizarTelefone(dados.telefone));
}

function montarDadosAgendamentoFirestore(dados, protocolo) {
    const servicos = dados.resumo.itens.map(item => ({
        nome: item.nome,
        valor: item.valor
    }));

    return {
        protocolo: protocolo,
        cliente: dados.cliente,
        telefone: dados.telefone,
        telefoneNormalizado: normalizarTelefone(dados.telefone),
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
    };
}

async function validarDisponibilidadeFinalFirestore(dados) {
    if (typeof db === "undefined") return { disponivel: true };

    const duracaoMinutos = dados.duracaoMinutos || calcularDuracaoAgendamentoMinutos();
    const disponibilidadeData = await buscarDisponibilidadeDataFirebase(dados.data, true);

    const horarioOcupado = horarioOcupadoPorPeriodoComDuracao(dados.horario, duracaoMinutos, disponibilidadeData.agendamentos);
    if (horarioOcupado) return { disponivel:false, motivo:"Este horário acabou de ficar indisponível por outro agendamento." };

    const horarioBloqueado = horarioBloqueadoPorAusenciaComDuracao(dados.horario, duracaoMinutos, disponibilidadeData.bloqueios);
    if (horarioBloqueado) return { disponivel:false, motivo:"Este horário está bloqueado por ausência temporária." };

    return { disponivel:true };
}

async function salvarAgendamentoComTransacao(dados, protocolo) {
    if (typeof db === "undefined") {
        throw criarErroPetlyne("firebase-nao-encontrado", "Firebase não encontrado.");
    }

    const referencia = db.collection("agendamentos").doc(protocolo);
    const payload = montarDadosAgendamentoFirestore(dados, protocolo);

    try {
        // Uma única gravação idempotente. Não usamos timeout artificial nem retry
        // concorrente em escrita, pois o SDK já trata reconexões internamente.
        await referencia.set(payload, { merge: false });
    } catch (error) {
        // Em falhas ambíguas de rede, verifica se a gravação chegou ao servidor
        // antes de informar erro ao cliente.
        if (erroTransitorio(error)) {
            try {
                const existente = await referencia.get();
                if (existente.exists) return;
            } catch (_) {}
        }
        throw error;
    }

    cacheConsultasPetlyne.disponibilidadePorData.delete(dados.data);
}

function alternarConfirmacaoPreviaProcessando(processando) {
    const botao = document.getElementById("btnConfirmarPrevia");
    if (!botao) return;

    botao.disabled = processando;
    botao.textContent = processando ? "Confirmando com segurança..." : "Confirmar";
}

async function tratarFalhaDisponibilidadeFinal(mensagem) {
    mostrarAlerta(mensagem || "Este horário acabou de ficar indisponível. Escolha outro horário.");

    fecharPrevia();

    await carregarHorariosDisponiveis();

    dadosPreAgendamento = null;
}


async function salvarAgendamentoFirebase(dados, protocolo) {
    await salvarAgendamentoComTransacao(dados, protocolo);
}

let confirmacaoAgendamentoEmAndamento = false;

async function confirmarAgendamentoFinal() {
    if (!dadosPreAgendamento || confirmacaoAgendamentoEmAndamento) return;

    confirmacaoAgendamentoEmAndamento = true;
    alternarConfirmacaoPreviaProcessando(true);

    try {
        const disponibilidade = await validarDisponibilidadeFinalFirestore(dadosPreAgendamento);

        if (!disponibilidade.disponivel) {
            await tratarFalhaDisponibilidadeFinal(disponibilidade.motivo);
            return;
        }

        const protocolo = gerarProtocolo();

        await salvarAgendamentoFirebase(dadosPreAgendamento, protocolo);
        // A conversão do prospect é acessória e nunca bloqueia a confirmação.
        converterProspectCallbackSeExistir(dadosPreAgendamento.telefone, protocolo).catch(() => {});
        await salvarCadastroClienteAutomatico(dadosPreAgendamento);

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
    } catch (error) {
        console.error("Erro ao salvar agendamento no Firebase:", error);
        registrarLogSistema({ modulo:"Agendamento Online", funcao:"confirmarAgendamentoFinal", mensagem:error.message, codigo:error.code || error.message, detalhes:error.stack || "" });

        const mensagem = error && error.message === "HORARIO_OCUPADO"
            ? "Este horário acabou de ser reservado por outro cliente. Escolha outro horário."
            : error && error.message === "HORARIO_BLOQUEADO"
                ? "Este horário acabou de ficar bloqueado por ausência temporária. Escolha outro horário."
                : mensagemAmigavelErro(error, "agendamento");

        await tratarFalhaDisponibilidadeFinal(mensagem);
    } finally {
        confirmacaoAgendamentoEmAndamento = false;
        alternarConfirmacaoPreviaProcessando(false);
    }
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
    limparSeletorPetsCadastrados();
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
    document.getElementById("adicionalAntiParasitas").checked = false;
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

let ultimaAtualizacaoAgendaEm = 0;
let atualizacaoAgendaEmAndamento = false;

async function atualizarAgendaAoRetornar(force = false) {
    const dataSelecionada = document.getElementById("data")?.value;
    if (!dataSelecionada || atualizacaoAgendaEmAndamento) return;
    const agora = Date.now();
    if (!force && agora - ultimaAtualizacaoAgendaEm < 30000) return;
    atualizacaoAgendaEmAndamento = true;
    try {
        await carregarHorariosDisponiveis();
        ultimaAtualizacaoAgendaEm = Date.now();
    } finally {
        atualizacaoAgendaEmAndamento = false;
    }
}

window.addEventListener("pageshow", () => atualizarAgendaAoRetornar(true));
window.addEventListener("focus", () => atualizarAgendaAoRetornar());
document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") atualizarAgendaAoRetornar(true);
});
setInterval(() => atualizarAgendaAoRetornar(), 5 * 60 * 1000);

iniciarPagina();


// V7.0 - O formulário público não altera mais os prototypes internos do SDK Firebase.
// O monitoramento técnico continua disponível no painel administrativo, enquanto
// o fluxo crítico de agendamento permanece isolado e sem interceptadores globais.