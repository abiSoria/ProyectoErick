export function FormPersona(onSubmitCallback) {
  const form = document.createElement("form");
  form.className = "p-3 border rounded bg-light mb-4";

  form.innerHTML = `
    <h4>Agregar Persona</h4>
    <div class="mb-3">
      <input type="text" id="nombre" class="form-control" placeholder="Nombre" required>
    </div>
    <div class="mb-3">
      <input type="number" id="edad" class="form-control" placeholder="Edad" required>
    </div>
    <div class="mb-3">
      <input type="text" id="profesion" class="form-control" placeholder="Profesión" required>
    </div>
    <div class="mb-3">
      <select id="estadoCivil" class="form-select">
        <option value="Soltero">Soltero</option>
        <option value="Casado">Casado</option>
        <option value="Divorciado">Divorciado</option>
      </select>
    </div>
    <button class="btn btn-primary" type="submit">Guardar</button>
  `;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const persona = {
      nombre: form.nombre.value,
      edad: form.edad.value,
      profesion: form.profesion.value,
      estadoCivil: form.estadoCivil.value
    };

    await onSubmitCallback(persona);
    form.reset();
  });

  return form;
}
