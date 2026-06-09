auth.onAuthStateChanged(user => {
    if (user) {
        window.location.href = "dashboard.html";
    }
});

async function entrar() {
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const mensagem = document.getElementById("mensagemLogin");

    mensagem.textContent = "";

    if (!email || !senha) {
        mensagem.textContent = "Preencha e-mail e senha.";
        return;
    }

    try {
        await auth.signInWithEmailAndPassword(email, senha);
        window.location.href = "dashboard.html";
    } catch (error) {
        console.error(error);
        mensagem.textContent = "E-mail ou senha incorretos.";
    }
}


document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        entrar();
    }
});
