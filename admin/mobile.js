/* Layout mobile do Admin. Preferência salva somente neste navegador. */
const mediaMobileV914=window.matchMedia('(max-width: 760px)');
let preferenciaMobileV914=null;
try{preferenciaMobileV914=localStorage.getItem('petlyne-admin-layout');}catch(e){}
function modoMobileAtivoV914(){return preferenciaMobileV914?preferenciaMobileV914==='mobile':mediaMobileV914.matches;}
function aplicarModoMobileV914(){
 const ativo=modoMobileAtivoV914();document.body.classList.toggle('admin-mobile-v914',ativo);
 const botao=document.getElementById('modoMobileV914');botao.setAttribute('aria-pressed',String(ativo));botao.innerHTML=`<i class="fa-solid ${ativo?'fa-desktop':'fa-mobile-screen-button'}" aria-hidden="true"></i> ${ativo?'Modo PC':'Modo mobile'}`;
 if(document.getElementById('secao-agendamentos').classList.contains('active'))renderizarAgenda();
}
function alternarModoMobileV914(){preferenciaMobileV914=modoMobileAtivoV914()?'pc':'mobile';try{localStorage.setItem('petlyne-admin-layout',preferenciaMobileV914);}catch(e){}aplicarModoMobileV914();}
const renderizarAgendaDesktopV914=renderizarAgenda;
renderizarAgenda=function(){if(!modoMobileAtivoV914())return renderizarAgendaDesktopV914();renderizarAgendaMobileV914();};
function renderizarAgendaMobileV914(){
 const datas=obterDatasAgendaPorPeriodo();const calendario=document.getElementById('calendarioAgenda');calendario.style.gridTemplateColumns='';calendario.style.width='';
 const lista=agendamentos.filter(a=>datas.includes(a.data)&&agendamentoBateFiltroProtocolo(a)).sort((a,b)=>`${a.data} ${a.horario}`.localeCompare(`${b.data} ${b.horario}`));
 const dias=[...new Set(lista.map(a=>a.data))];
 calendario.innerHTML=dias.map(data=>`<section class="agenda-dia-mobile-v914"><h3>${escaparV9(formatarCabecalhoDataAgenda(data))}</h3><div class="agenda-lista-mobile-v914">${lista.filter(a=>a.data===data).map(a=>{
 const status=normalizarTextoCliente(a.status),pacote=String(a.protocolo||'').startsWith('PACK-');
 return `<article data-agendamento-id="${escaparV9(a.id)}" class="agenda-event ${pacote?'agenda-event-pack':'agenda-event-lyne'} ${status==='concluido'?'agenda-event-done':'agenda-event-open'}"><div class="agenda-event-header"><strong class="agenda-hora-mobile-v914">${escaparV9(a.horario)}</strong><span class="status-badge ${status==='concluido'?'status-concluido':status==='cancelado'?'status-inativo':'status-confirmado'}">${escaparV9(a.status||'Confirmado')}</span></div><div class="agenda-cliente-mobile-v914"><strong>${escaparV9(a.cliente||'Cliente')}</strong><span>${escaparV9(a.telefone||'')}</span></div>${renderizarPetsCardAgendaV99(a)}${a.beneficioClube?`<p class="agenda-beneficio-clube">🎁 ${escaparV9(a.beneficioClube.tipo==='hidratacao'?'Hidratação Clube':'Banho grátis Clube')} • ${escaparV9(a.beneficioClube.pet||'')}</p>`:''}<div class="agenda-rodape-mobile-v914"><strong>${formatarMoeda(a.valorTotal)}</strong><span>${escaparV9(a.protocolo||'')} • ${pacote?'Pacote':'Avulso'}</span></div><div class="agenda-event-actions"><button onclick="editarAgendamentoV9('${a.id}')">Editar</button><button onclick="concluirAgendamento('${a.id}')">Concluir</button><button class="secondary-button" onclick="cancelarAgendamento('${a.id}')">Cancelar</button></div></article>`;
 }).join('')}</div></section>`).join('')||'<p class="mobile-vazio-v914">Nenhum agendamento neste período.</p>';
 const bloqueios=bloqueiosAgenda.filter(b=>b.status==='Ativo'&&datas.includes(b.data));
 if(bloqueios.length)calendario.innerHTML+=`<section class="agenda-dia-mobile-v914"><h3>Bloqueios da agenda</h3>${bloqueios.map(b=>`<p class="mobile-bloqueio-v914">${formatarDataCurta(b.data)} • ${escaparV9(b.inicio)}–${escaparV9(b.fim)}<br>${escaparV9(b.motivo||'Horário bloqueado')}</p>`).join('')}</section>`;
 document.getElementById('agendaFiltroInfo').textContent=`${lista.length} agendamento(s) • Visualização por dia`;
 atualizarPainelOperacionalAgenda();
}
mediaMobileV914.addEventListener('change',()=>{if(!preferenciaMobileV914)aplicarModoMobileV914();});
aplicarModoMobileV914();
