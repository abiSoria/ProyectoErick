import { FormPersona } from "../components/FormPersona.js";
import { TablePersonas } from "../components/TablePersonas.js";
import { ModalEditar } from "../components/ModalEditar.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const API_URL = "http://localhost:5000/api/personas";
const app = document.querySelector("#app");

let personas = [];
let personaActual = null;

async function fetchPersonas() {
  const res = await fetch(API_URL);
  personas = await res.json();
  render();
}

async function crearPersona(persona) {
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(persona),
  });
  await fetchPersonas();
}

async function eliminarPersona(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  await fetchPersonas();
}

async function editarPersona(id, updated) {
  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updated),
  });
  await fetchPersonas();
}

function render() {
  app.innerHTML = "";
  app.appendChild(FormPersona(crearPersona));
  app.appendChild(TablePersonas(personas, abrirModalEdicion, eliminarPersona));
}

function abrirModalEdicion(id) {
  personaActual = personas.find(p => p._id === id);
  const modal = ModalEditar((data) => editarPersona(id, data));
  document.body.appendChild(modal);
  const bsModal = new bootstrap.Modal(modal);
  bsModal.show();
}

fetchPersonas();
