/* Catálogo V9. O histórico usa os valores gravados em cada protocolo. */
const PETLYNE_V9 = {
 versao: '9.0.0', vigencia: '2026-10-01',
 banhos: {Pequeno:65,'Médio':80,Grande:130},
 tosas: {Pequeno:{'Bebê':105,Geral:85,Tesoura:125,'Verão':95},'Médio':{'Bebê':115,Geral:95,Tesoura:135,'Verão':110},Grande:{Geral:115,Tesoura:135,'Verão':130}},
 adicionais: {'Hidratação':25,'Corte de Unha':10,Desembolo:25,'Tratamento Anti-Pulgas':25,'Tosa Higiênica Avulsa':12,'Escovação de Dentes':10},
 pacotes: {Quinzenal:{Pequeno:115,'Médio':135,Grande:215},Mensal:{Pequeno:210,'Médio':240,Grande:360}},
 trimming:380, banhoGato:80
};
function regrasPadraoV9(){
 const r=[];const add=(nome,especie,porte,tipoTosa,preco)=>r.push({id:`v9-${r.length}`,nome,especie,porte,pelagem:'',tipoTosa,preco,ativo:true,versaoPreco:'9.0.0'});
 Object.entries(PETLYNE_V9.banhos).forEach(([p,v])=>add('Banho','Cão',p,'',v));
 Object.entries(PETLYNE_V9.tosas).forEach(([p,ts])=>Object.entries(ts).forEach(([t,v])=>add('Tosa','Cão',p,t,v)));
 add('Trimming (Golden)','Cão','Grande','',PETLYNE_V9.trimming);
 Object.entries(PETLYNE_V9.adicionais).forEach(([n,v])=>add(n,'Ambos','','',v));
 add('Banho a Seco','Gato','','',PETLYNE_V9.banhoGato);
 return r;
}
let catalogoV9 = regrasPadraoV9();
let leituraCatalogoV916=null,ultimoCatalogoV916=0;
function persistirCatalogoV919(){
 if(typeof window==='undefined'||! /\/admin\//.test(window.location.pathname||''))return;
 try{sessionStorage.setItem('petlyne-catalogo-v919',JSON.stringify({em:ultimoCatalogoV916,regras:catalogoV9}));}catch(e){}
}
async function lerCatalogoV9(forcar=false){
 if(!forcar&&!ultimoCatalogoV916&&typeof window!=='undefined'&&/\/admin\//.test(window.location.pathname||'')){
  try{const c=JSON.parse(sessionStorage.getItem('petlyne-catalogo-v919'));if(c&&Array.isArray(c.regras)&&Date.now()-c.em<300000){catalogoV9=c.regras;ultimoCatalogoV916=c.em;}}catch(e){}
 }
 if(!forcar&&ultimoCatalogoV916&&Date.now()-ultimoCatalogoV916<300000)return catalogoV9;
 if(leituraCatalogoV916)return leituraCatalogoV916;
 leituraCatalogoV916=(async()=>{const doc=await db.collection('servicos').doc('v9_catalogo').get({source:'server'});if(doc.exists&&Array.isArray(doc.data().regras))catalogoV9=doc.data().regras;ultimoCatalogoV916=Date.now();persistirCatalogoV919();return catalogoV9;})();
 try{return await leituraCatalogoV916;}finally{leituraCatalogoV916=null;}
}
function precoRegraV9(nome,especie,porte='',tipoTosa=''){
 return catalogoV9.find(r=>r.ativo!==false && r.nome===nome && (r.especie===especie||r.especie==='Ambos') && (!r.porte||r.porte===porte) && (!r.tipoTosa||r.tipoTosa===tipoTosa));
}
function petsAgendamentoV9(a){return Array.isArray(a.pets)&&a.pets.length?a.pets:[{pet:a.pet||'',especie:a.especie||'',sexo:a.sexo||'',raca:a.raca||'',porte:a.porte||'',observacaoPet:a.observacaoPet||'',servicos:a.servicos||[],valorTotal:Number(a.valorTotal||0)}];}
function expandirPetsV9(a){return petsAgendamentoV9(a).map((p,i)=>({...a,...p,id:a.id,petIndice:i,protocolo:a.protocolo,beneficioClube:a.beneficioClube?.pet===p.pet?a.beneficioClube:null}));}
function escaparV9(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
