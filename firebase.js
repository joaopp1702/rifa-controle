// Importar funções necessárias do SDK modular Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, onValue, set, get, child } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

// Sua configuração Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAtB6H1PnAjM64GWyuo9PfI6iubJfH7YgE",
  authDomain: "rifa-d7eb9.firebaseapp.com",
  databaseURL: "https://rifa-d7eb9-default-rtdb.firebaseio.com",
  projectId: "rifa-d7eb9",
  storageBucket: "rifa-d7eb9.firebasestorage.app",
  messagingSenderId: "1073573581341",
  appId: "1:1073573581341:web:0cc0a60ac34ac3c0de6cf4",
  measurementId: "G-ZLP1NR8603"
};

// Inicializa o app e o database
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Agora você pode exportar `db` para usar nos seus scripts
export { db, ref, onValue, set, get, child };
