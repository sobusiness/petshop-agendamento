let redirecionandoLoginV919=false;
let loginEmAndamentoV919=false;
function abrirPainelAposLoginV919(){
    if(redirecionandoLoginV919)return;
    redirecionandoLoginV919=true;
    window.location.replace('dashboard.html');
}
auth.onAuthStateChanged(user=>{if(user)abrirPainelAposLoginV919();});

async function entrar(){
    if(loginEmAndamentoV919||redirecionandoLoginV919)return;
    const email=document.getElementById('email').value.trim();
    const senha=document.getElementById('senha').value.trim();
    const mensagem=document.getElementById('mensagemLogin');
    mensagem.textContent='';
    if(!email||!senha){mensagem.textContent='Preencha e-mail e senha.';return;}
    loginEmAndamentoV919=true;
    try{
        await auth.signInWithEmailAndPassword(email,senha);
        abrirPainelAposLoginV919();
    }catch(error){
        console.error(error);
        mensagem.textContent='E-mail ou senha incorretos.';
    }finally{loginEmAndamentoV919=false;}
}
document.addEventListener('keydown',event=>{if(event.key==='Enter')entrar();});
