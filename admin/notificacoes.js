/* Notificações do Admin: leitura em tempo real, sem modificar os registros. */
let notificacoesV910=[],fontesNotificacoesV910={agenda:[],contas:[],pacotes:[]},leiturasNotificacoesV910=new Set(),cancelarNotificacoesV910=[],usuarioNotificacoesV910='',timerNotificacoesV910=null;
function dataNotificacaoV910(valor){return valor?.toMillis?valor.toMillis():valor?.seconds?valor.seconds*1000:typeof valor==='string'?Date.parse(valor)||0:0;}
function diasNotificacaoV910(data){const hoje=hojeISOv9();return Math.round((Date.parse(data+'T12:00:00')-Date.parse(hoje+'T12:00:00'))/86400000);}
function montarNotificacoesV910(fontes){
 const lista=[];
 fontes.agenda.forEach(a=>{const criado=dataNotificacaoV910(a.criadoEm);if(criado>=Date.now()-7*86400000&&normalizarTextoCliente(a.status)!=='cancelado')lista.push({chave:'agenda:'+a.id,tipo:'agenda',id:a.id,titulo:'Novo agendamento',texto:`${a.pet||'Pet'} • ${a.cliente||'Cliente'} • ${formatarDataCurta(a.data)} às ${a.horario||''}`,ordem:criado});});
 fontes.contas.forEach(c=>{const dias=diasNotificacaoV910(c.vencimento);if(c.status!=='Pago'&&Number.isFinite(dias)&&dias<=7)lista.push({chave:`conta:${c.id}:${c.vencimento}`,tipo:'contas',id:c.id,titulo:dias<0?'Conta vencida':dias===0?'Conta vence hoje':'Vencimento próximo',texto:`${c.descricao||'Conta'} • ${formatarMoeda(c.valor)} • ${formatarDataCurta(c.vencimento)}${c.parcelas>1?' • Parcela '+c.parcela+'/'+c.parcelas:''}`,ordem:Date.parse(c.vencimento+'T12:00:00')});});
 fontes.pacotes.forEach(p=>{const dias=diasNotificacaoV910(p.dataFim);if(p.status==='Ativo'&&Number.isFinite(dias)&&dias<=7)lista.push({chave:`pacote:${p.id}:${p.dataFim}`,tipo:'pacotes',id:p.id,titulo:dias<0?'Pacote com renovação pendente':'Renovação próxima',texto:`${p.nomeCliente||'Cliente'} • ${p.nomePet||'Pet'} • ${p.tipo||'Pacote'} • ${formatarDataCurta(p.dataFim)}`,ordem:Date.parse(p.dataFim+'T12:00:00')});});
 return lista.sort((a,b)=>b.ordem-a.ordem);
}
function salvarLeiturasNotificacoesV910(){try{localStorage.setItem('petlyne-notificacoes:'+usuarioNotificacoesV910,JSON.stringify([...leiturasNotificacoesV910].slice(-1500)));}catch(e){console.warn('Não foi possível guardar a leitura das notificações.',e);}}
function marcarNotificacoesLidasV910(){notificacoesV910.forEach(n=>leiturasNotificacoesV910.add(n.chave));salvarLeiturasNotificacoesV910();}
function renderizarNotificacoesV910(){
 notificacoesV910=montarNotificacoesV910(fontesNotificacoesV910);
 const aberto=!document.getElementById('notificacoesPainelV910').hidden;
 if(aberto)marcarNotificacoesLidasV910();
 const novas=notificacoesV910.filter(n=>!leiturasNotificacoesV910.has(n.chave)).length;
 const badge=document.getElementById('notificacoesContagemV910');badge.hidden=!novas;badge.textContent=novas>99?'99+':novas;
 document.getElementById('notificacoesBotaoV910').setAttribute('aria-label',`Notificações${novas?' • '+novas+' novas':''}`);
 document.getElementById('notificacoesListaV910').innerHTML=notificacoesV910.map((n,i)=>`<button type="button" class="notificacao-item-v910" onclick="abrirDestinoNotificacaoV910(${i})"><span class="notificacao-icone-v910">${n.tipo==='agenda'?'📅':n.tipo==='contas'?'💳':'🐾'}</span><span><strong>${escaparV9(n.titulo)}</strong><small>${escaparV9(n.texto)}</small></span><span aria-hidden="true">›</span></button>`).join('')||'<p class="notificacoes-vazio-v910">Nenhuma notificação no momento.</p>';
}
function alternarNotificacoesV910(){const painel=document.getElementById('notificacoesPainelV910');painel.hidden=!painel.hidden;document.getElementById('notificacoesBotaoV910').setAttribute('aria-expanded',String(!painel.hidden));renderizarNotificacoesV910();}
function fecharNotificacoesV910(){document.getElementById('notificacoesPainelV910').hidden=true;document.getElementById('notificacoesBotaoV910').setAttribute('aria-expanded','false');}
function destacarDestinoNotificacaoV910(atributo,id){const el=[...document.querySelectorAll('['+atributo+']')].find(x=>x.getAttribute(atributo)===id);if(el){el.scrollIntoView({behavior:'smooth',block:'center',inline:'center'});el.classList.add('notificacao-destino-v910');setTimeout(()=>el.classList.remove('notificacao-destino-v910'),7000);}return !!el;}
async function abrirDestinoNotificacaoV910(indice){
 const n=notificacoesV910[indice];if(!n)return;fecharNotificacoesV910();
 try{
  if(n.tipo==='agenda'){await abrirSecao('agendamentos');await carregarAgendamentos(true);const a=agendamentos.find(x=>x.id===n.id);if(!a)throw Error('Este agendamento não está mais disponível.');filtroAgendaPeriodo='todos';document.getElementById('filtroProtocoloAgenda').value=a.protocolo||'';agendaPosicionadaNaUltimaData=true;renderizarAgenda();destacarDestinoNotificacaoV910('data-agendamento-id',n.id);}
  if(n.tipo==='contas'){await abrirSecao('contas-pagar');await carregarContasV9();document.getElementById('contasPeriodoV94').value='todos';document.getElementById('contasCategoriaV9').value='';document.getElementById('contasStatusV9').value='';document.getElementById('contasBuscaV94').value='';renderizarContasV9();if(!destacarDestinoNotificacaoV910('data-conta-id',n.id))throw Error('Esta conta não está mais disponível.');}
  if(n.tipo==='pacotes'){await abrirSecao('pacotes');await carregarPacotesAdmin(true);document.getElementById('filtroPacoteCliente').value='';document.getElementById('filtroPacoteStatus').value='';filtroRapidoPacoteAtual='todos';renderizarPacotes();if(!destacarDestinoNotificacaoV910('data-pacote-id',n.id))throw Error('Este pacote não está mais disponível.');}
 }catch(e){await mostrarAvisoAdmin({titulo:'Notificação',mensagem:e.message});}
}
auth.onAuthStateChanged(user=>{
 cancelarNotificacoesV910.forEach(f=>f());cancelarNotificacoesV910=[];clearInterval(timerNotificacoesV910);fontesNotificacoesV910={agenda:[],contas:[],pacotes:[]};if(!user)return;
 usuarioNotificacoesV910=user.uid;try{leiturasNotificacoesV910=new Set(JSON.parse(localStorage.getItem('petlyne-notificacoes:'+user.uid)||'[]'));}catch(e){leiturasNotificacoesV910=new Set();}
 [['agenda','agendamentos'],['contas','contasPagar'],['pacotes','pacotes']].forEach(([tipo,col])=>{cancelarNotificacoesV910.push(db.collection(col).onSnapshot(snapshot=>{fontesNotificacoesV910[tipo]=snapshot.docs.map(d=>({...d.data(),id:d.id}));renderizarNotificacoesV910();},e=>{console.error('Falha nas notificações:',e);document.getElementById('notificacoesListaV910').textContent='Não foi possível atualizar as notificações. Recarregue o painel.';}));});
 timerNotificacoesV910=setInterval(renderizarNotificacoesV910,60000);
});
document.addEventListener('click',e=>{if(!e.target.closest('.notificacoes-area-v910'))fecharNotificacoesV910();});
document.addEventListener('keydown',e=>{if(e.key==='Escape')fecharNotificacoesV910();});
