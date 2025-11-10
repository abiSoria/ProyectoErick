export function ModalEditar(onSave) {
  const modal = document.createElement("div");
  modal.className = "modal fade";
  modal.id = "modalEditar";
  modal.tabIndex = -1;
  modal.innerHTML = `
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Editar Persona</h5>
          <button class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <input id="edit-nombre" class="form-control mb-2" placeholder="Nombre">
          <input id="edit-edad" class="form-control mb-2" placeholder="Edad" type="number">
          <input id="edit-profesion" class="form-control mb-2" placeholder="Profesión">
          <select id="edit-estadoCivil" class="form-select">
            <option value="Soltero">Soltero</option>
            <option value="Casado">Casado</option>
            <option value="Divorciado">Divorciado</option>
          </select>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button class="btn btn-success" id="btnGuardarCambios">Guardar</button>
        </div>
      </div>
    </div>
  `;

  modal.querySelector("#btnGuardarCambios").addEventListener("click", async () => {
    const updated = {
      nombre: modal.querySelector("#edit-nombre").value,
      edad: modal.querySelector("#edit-edad").value,
      profesion: modal.querySelector("#edit-profesion").value,
      estadoCivil: modal.querySelector("#edit-estadoCivil").value,
    };
    await onSave(updated);
  });

  return modal;
}
