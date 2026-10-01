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
async function lerCatalogoV9(){
 const doc=await db.collection('servicos').doc('v9_catalogo').get();
 if(doc.exists && Array.isArray(doc.data().regras)) catalogoV9=doc.data().regras;
 return catalogoV9;
}
function precoRegraV9(nome,especie,porte='',tipoTosa=''){
 return catalogoV9.find(r=>r.ativo!==false && r.nome===nome && (r.especie===especie||r.especie==='Ambos') && (!r.porte||r.porte===porte) && (!r.tipoTosa||r.tipoTosa===tipoTosa));
}
function petsAgendamentoV9(a){return Array.isArray(a.pets)&&a.pets.length?a.pets:[{pet:a.pet||'',especie:a.especie||'',sexo:a.sexo||'',raca:a.raca||'',porte:a.porte||'',observacaoPet:a.observacaoPet||'',servicos:a.servicos||[],valorTotal:Number(a.valorTotal||0)}];}
function expandirPetsV9(a){return petsAgendamentoV9(a).map((p,i)=>({...a,...p,id:a.id,petIndice:i,protocolo:a.protocolo,beneficioClube:a.beneficioClube?.pet===p.pet?a.beneficioClube:null}));}
function escaparV9(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
