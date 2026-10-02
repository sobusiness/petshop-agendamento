/* V9.0.20: atualização em tempo real compartilhada, sem polling de coleções. */
const fontesAdminV916=new Map();
const PREFIXO_CACHE_V917='petlyne-v919:';
const esquemasCacheV919={
 bloqueiosAgenda:{campo:'data',direcao:'asc'},
 crmHistorico:{campo:'criadoEm',direcao:'desc'},
 clubePetlyneResgates:{campo:'criadoEm',direcao:'desc'},
 prospectCallbacks:{campo:'criadoEm',direcao:'desc',limite:200},
 logsSistema:{campo:'criadoEm',direcao:'desc',limite:100}
};
let filaReconciliacaoV919=Promise.resolve();
function chaveCacheV917(chave){return PREFIXO_CACHE_V917+(auth.currentUser?.uid||'anonimo')+':'+chave;}
function reviverCacheV917(k,v){
 if(v&&typeof v==='object'&&typeof v.seconds==='number'&&typeof v.nanoseconds==='number'&&Object.keys(v).every(x=>['seconds','nanoseconds','type'].includes(x)))return new firebase.firestore.Timestamp(v.seconds,v.nanoseconds);
 return v;
}
function snapshotCacheV917(dados){
 const docs=dados.map(d=>({id:d.id,data:()=>d.dados}));
 return {docs,size:docs.length,empty:!docs.length,metadata:{fromCache:true},forEach:f=>docs.forEach(f)};
}
async function lerCachePersistidoV919(chave){
 let texto=sessionStorage.getItem(chaveCacheV917(chave));if(!texto)return null;
 if(texto.startsWith('gzip:')){
  const bytes=Uint8Array.from(atob(texto.slice(5)),c=>c.charCodeAt(0));
  const stream=new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));
  texto=await new Response(stream).text();
 }
 return JSON.parse(texto,reviverCacheV917);
}
async function persistirCacheV919(chave,f){
 const snapshot=f.snapshot;
 try{
  let texto=JSON.stringify({em:f.em,dados:snapshot.docs.map(d=>({id:d.id,dados:d.data()}))});
  // Evita estourar o armazenamento da aba em históricos grandes e relê-los a cada reload.
  if(texto.length>65536&&typeof CompressionStream!=='undefined'&&typeof DecompressionStream!=='undefined'){
   const stream=new Blob([texto]).stream().pipeThrough(new CompressionStream('gzip'));
   const bytes=new Uint8Array(await new Response(stream).arrayBuffer());let binario='';
   for(let i=0;i<bytes.length;i+=16384)binario+=String.fromCharCode(...bytes.subarray(i,i+16384));
   texto='gzip:'+btoa(binario);
  }
  if(fontesAdminV916.get(chave)===f&&f.snapshot===snapshot)sessionStorage.setItem(chaveCacheV917(chave),texto);
 }catch(e){/* Armazenamento indisponível/cheio: memória continua válida. */}
}
// Um listener por consulta/coleção, iniciado apenas quando a tela precisa dos dados.
async function consultaAdminV917(chave,consulta){
 let f=fontesAdminV916.get(chave);
 if(f?.pendente)return f.pendente;
 if(f?.unsubscribe&&f.snapshot)return f.snapshot;
 f=f||{};f.consulta=consulta;fontesAdminV916.set(chave,f);
 f.pendente=new Promise((resolve,reject)=>{
  let primeiro=true;
  f.unsubscribe=consulta.onSnapshot({includeMetadataChanges:true},snapshot=>{
   if(fontesAdminV916.get(chave)!==f)return;
   const anterior=f.snapshot;
   const mudou=!anterior||JSON.stringify(anterior.docs.map(d=>[d.id,d.data()]))!==JSON.stringify(snapshot.docs.map(d=>[d.id,d.data()]));
   f.snapshot=snapshot;f.em=Date.now();
   if(typeof mostrarStatusSincronizacaoV920==='function')mostrarStatusSincronizacaoV920(snapshot.metadata?.fromCache?'Aguardando conexão para sincronizar…':'Atualização automática ativa');
   if(mudou){f.revisao=(f.revisao||0)+1;invalidarModulosDadosV919([chave]);persistirCacheV919(chave,f);}
   // A primeira abertura online espera a confirmação do servidor, nunca o cache antigo da aba.
   if(primeiro&&(!snapshot.metadata?.fromCache||navigator.onLine===false)){
    primeiro=false;resolve(snapshot);
   }
   if(mudou&&typeof agendarRenderAutomaticoV920==='function')agendarRenderAutomaticoV920(chave);
  },erro=>{
   f.unsubscribe?.();f.unsubscribe=null;f.erro=erro;
   if(primeiro){primeiro=false;reject(erro);}
   if(typeof mostrarStatusSincronizacaoV920==='function')mostrarStatusSincronizacaoV920('Sem sincronização: confira a conexão ou clique em Atualizar dados.');
   console.warn('Sincronização interrompida:',chave,erro);
  });
 });
 try{return await f.pendente;}finally{f.pendente=null;}
}
function obterDadosAdminV916(colecao){return consultaAdminV917(colecao,db.collection(colecao));}
function invalidarModulosDadosV919(colecoes){
 if(typeof estadoCargaModulos==='undefined')return;
 const mapa={agendamentos:['agendamentos','clientes'],pacotes:['pacotes'],servicos:['servicos'],clientes:['clientes'],clientesExcluidos:['clientes'],bloqueiosAgenda:['bloqueios'],crmHistorico:['crmHistorico'],clubePetlyneResgates:['clubeResgates'],logsSistema:['logs']};
 const nomes=colecoes?new Set(colecoes.flatMap(c=>mapa[c]||[])):new Set(Object.keys(estadoCargaModulos));
 nomes.forEach(k=>{if(estadoCargaModulos[k]){estadoCargaModulos[k].carregado=false;estadoCargaModulos[k].atualizadoEm=0;}});
}
function invalidarDadosAdminV917(colecoes){
 const corresponde=k=>!colecoes||colecoes.some(c=>k===c||k.startsWith(c+':'));
 [...fontesAdminV916.keys()].filter(corresponde).forEach(k=>{fontesAdminV916.get(k)?.unsubscribe?.();fontesAdminV916.delete(k);});
 try{const prefixo=PREFIXO_CACHE_V917+(auth.currentUser?.uid||'anonimo')+':';for(let i=sessionStorage.length-1;i>=0;i--){const k=sessionStorage.key(i);if(k?.startsWith(prefixo)&&corresponde(k.slice(prefixo.length)))sessionStorage.removeItem(k);}}catch(e){}
 invalidarModulosDadosV919(colecoes);
}
function encerrarDadosAdminV916(){fontesAdminV916.forEach(f=>f.unsubscribe?.());fontesAdminV916.clear();try{for(let i=sessionStorage.length-1;i>=0;i--){const k=sessionStorage.key(i);if(k&&/^petlyne-v9\d+:/.test(k))sessionStorage.removeItem(k);}}catch(e){}}
function ordenarCacheV919(dados,esquema){
 if(!esquema?.campo)return dados;
 const valor=v=>v&&typeof v.seconds==='number'?v.seconds*1000+(v.nanoseconds||0)/1e6:v??'';
 const sinal=esquema.direcao==='desc'?-1:1;
 return dados.filter(d=>d.dados[esquema.campo]!==undefined).sort((a,b)=>{
  const x=valor(a.dados[esquema.campo]),y=valor(b.dados[esquema.campo]);
  return sinal*(x<y?-1:x>y?1:a.id<b.id?-1:a.id>b.id?1:0);
 });
}
async function reconciliarOperacoesV919(operacoes){
 const grupos=new Map();
 operacoes.forEach(op=>{const col=op.ref?.path?.split('/')[0];if(col){if(!grupos.has(col))grupos.set(col,[]);grupos.get(col).push(op);}});
 for(const [col,ops]of grupos){
  const f=fontesAdminV916.get(col);
  if(!f?.snapshot){invalidarDadosAdminV917([col]);continue;}
  if(f.unsubscribe)continue; // O listener incorpora gravações sem leitura extra nem reconstrução da janela.
  const esquema=esquemasCacheV919[col];
  const tamanhoAntes=f.snapshot.size;
  const mapa=new Map(f.snapshot.docs.map(d=>[d.id,{id:d.id,dados:d.data()}]));
  // Exclusões confirmadas dispensam até mesmo a leitura do cache do SDK.
  const leituras=await Promise.allSettled(ops.map(async op=>{
   if(op.excluir)return {id:op.ref.id,excluir:true};
   let doc;
   try{doc=await op.ref.get({source:'cache'});}catch(e){
    // Após restaurar a aba, o SDK pode não ter esse documento completo em memória.
    // Confere somente o documento alterado, em vez de invalidar todo o histórico.
    doc=await op.ref.get({source:'server'});
   }
   return {id:op.ref.id,excluir:!doc.exists,dados:doc.exists?doc.data():null};
  }));
  if(fontesAdminV916.get(col)!==f)continue;
  if(leituras.some(r=>r.status==='rejected')){invalidarDadosAdminV917([col]);continue;}
  leituras.forEach(r=>{const d=r.value;if(d.excluir)mapa.delete(d.id);else mapa.set(d.id,{id:d.id,dados:d.dados});});
  let dados=ordenarCacheV919([...mapa.values()],esquema);
  // Completa apenas a lacuna após excluir um item de uma janela limitada cheia.
  if(esquema?.limite&&tamanhoAntes>=esquema.limite&&dados.length<esquema.limite){
   try{
    const faltam=esquema.limite-dados.length;
    const ultimo=dados[dados.length-1];
    let consulta=f.consulta.orderBy(firebase.firestore.FieldPath.documentId(),esquema.direcao);
    if(ultimo)consulta=consulta.startAfter(ultimo.dados[esquema.campo],ultimo.id);
    const cauda=await consulta.limit(faltam).get({source:'server'});
    cauda.docs.forEach(d=>mapa.set(d.id,{id:d.id,dados:d.data()}));
    dados=ordenarCacheV919([...mapa.values()],esquema);
   }catch(e){invalidarDadosAdminV917([col]);continue;}
  }
  if(esquema?.limite)dados=dados.slice(0,esquema.limite);
  if(fontesAdminV916.get(col)===f){f.revisao=(f.revisao||0)+1;f.snapshot=snapshotCacheV917(dados);await persistirCacheV919(col,f);}
 }
 invalidarModulosDadosV919([...grupos.keys()]);
}
function agendarReconciliacaoV919(operacoes){
 const trabalho=filaReconciliacaoV919.then(()=>reconciliarOperacoesV919(operacoes));
 filaReconciliacaoV919=trabalho.catch(e=>{invalidarDadosAdminV917([...new Set(operacoes.map(o=>o.ref?.path?.split('/')[0]).filter(Boolean))]);console.warn('Cache invalidado após gravação:',e);});
 // A gravação já foi confirmada. Falha no cache não deve sugerir repetir a compra/reserva.
 return filaReconciliacaoV919;
}
(function instalarInvalidacaoV919(){
 const fs=firebase.firestore;
 ['set','update','delete'].forEach(m=>{const proto=fs.DocumentReference?.prototype;if(!proto?.[m])return;const original=proto[m];proto[m]=function(...args){const ref=this;return original.apply(this,args).then(async r=>{await agendarReconciliacaoV919([{ref,excluir:m==='delete'}]);return r;});};});
 const cp=fs.CollectionReference?.prototype;if(cp?.add){const original=cp.add;cp.add=function(...args){return original.apply(this,args).then(async ref=>{await agendarReconciliacaoV919([{ref}]);return ref;});};}
 const bp=fs.WriteBatch?.prototype;if(bp){
  ['set','update','delete'].forEach(m=>{if(!bp[m])return;const original=bp[m];bp[m]=function(ref,...args){this.__operacoesV919=this.__operacoesV919||new Map();this.__operacoesV919.set(ref.path,{ref,excluir:m==='delete'});return original.call(this,ref,...args);};});
  if(bp.commit){const original=bp.commit;bp.commit=function(...args){const ops=[...(this.__operacoesV919?.values()||[])];return original.apply(this,args).then(async r=>{await agendarReconciliacaoV919(ops);return r;});};}
 }
 const original=db.runTransaction.bind(db);
 db.runTransaction=function(executor,...args){let operacoes=new Map();return original(tx=>{
  operacoes=new Map();
  ['set','update','delete'].forEach(m=>{const fn=tx[m].bind(tx);tx[m]=function(ref,...a){operacoes.set(ref.path,{ref,excluir:m==='delete'});return fn(ref,...a);};});
  return executor(tx);
 },...args).then(async r=>{await agendarReconciliacaoV919([...operacoes.values()]);return r;});};
})();
auth.onAuthStateChanged(user=>{if(!user)encerrarDadosAdminV916();});

// Retira caches de versões anteriores para liberar espaço da mesma aba.
try{for(let i=sessionStorage.length-1;i>=0;i--){const k=sessionStorage.key(i);if(k&&/^petlyne-v9\d+:/.test(k)&&!k.startsWith(PREFIXO_CACHE_V917))sessionStorage.removeItem(k);}}catch(e){}

// Atualiza uma janela da agenda mantendo o histórico completo já carregado.
async function atualizarIntervaloAdminV919(colecao,campo,inicio,fim,tentativa=0){
 let f=fontesAdminV916.get(colecao);
 if(!f?.snapshot)return obterDadosAdminV916(colecao);
 const revisao=f.revisao||0;
 const snapshot=await db.collection(colecao).where(campo,'>=',inicio).where(campo,'<=',fim).get({source:'server'});
 const recebidos=new Set(snapshot.docs.map(d=>d.id));
 const retirados=f.snapshot.docs.filter(d=>{const v=d.data()[campo];return v>=inicio&&v<=fim&&!recebidos.has(d.id);});
 // Um item ausente da janela pode ter sido movido, não excluído. Confere apenas esses IDs.
 const conferidos=await Promise.all(retirados.map(d=>db.collection(colecao).doc(d.id).get({source:'server'})));
 f=fontesAdminV916.get(colecao);
 if(!f?.snapshot){invalidarDadosAdminV917([colecao]);return obterDadosAdminV916(colecao);}
 if((f.revisao||0)!==revisao){if(tentativa<1)return atualizarIntervaloAdminV919(colecao,campo,inicio,fim,1);throw Error('Houve uma alteração durante a atualização. Atualize novamente.');}
 const mapa=new Map(f.snapshot.docs.map(d=>[d.id,{id:d.id,dados:d.data()}]));
 retirados.forEach(d=>mapa.delete(d.id));
 [...snapshot.docs,...conferidos].forEach(d=>{if(d.exists!==false)mapa.set(d.id,{id:d.id,dados:d.data()});});
 f.revisao=(f.revisao||0)+1;
 f.snapshot=snapshotCacheV917(ordenarCacheV919([...mapa.values()],esquemasCacheV919[colecao]));
 await persistirCacheV919(colecao,f);invalidarModulosDadosV919([colecao]);return f.snapshot;
}

// Incorpora documentos já conferidos no servidor sem buscar novamente a coleção.
async function incorporarDocumentosCacheV919(colecao,documentos){
 const f=fontesAdminV916.get(colecao);if(!f?.snapshot){invalidarDadosAdminV917([colecao]);return;}
 const mapa=new Map(f.snapshot.docs.map(d=>[d.id,{id:d.id,dados:d.data()}]));
 documentos.forEach(d=>{if(d.exists===false)mapa.delete(d.id);else mapa.set(d.id,{id:d.id,dados:d.data()});});
 let dados=ordenarCacheV919([...mapa.values()],esquemasCacheV919[colecao]);
 if(esquemasCacheV919[colecao]?.limite)dados=dados.slice(0,esquemasCacheV919[colecao].limite);
 f.revisao=(f.revisao||0)+1;f.snapshot=snapshotCacheV917(dados);await persistirCacheV919(colecao,f);invalidarModulosDadosV919([colecao]);
}
