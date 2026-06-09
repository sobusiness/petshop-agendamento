// Configuração Firebase da Petlyne

const firebaseConfig = {
    apiKey: "AIzaSyAIPAUEpZFOmC3hP21vDDK8qiEvdcWTTf8",
    authDomain: "petlyne-agendamento.firebaseapp.com",
    projectId: "petlyne-agendamento",
    storageBucket: "petlyne-agendamento.firebasestorage.app",
    messagingSenderId: "642422200212",
    appId: "1:642422200212:web:080b2e3a3dc7350cd3a181"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
