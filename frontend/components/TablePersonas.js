export function TablePersonas(personas, onEdit, onDelete) {
  const table = document.createElement("table");
  table.className = "table table-bordered table-striped";

  table.innerHTML = `
    <thead class="table-dark">
      <tr>
        <th>Nombre</th>
        <th>Edad</th>
        <th>Profesión</th>
        <th>Estado Civil</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      ${personas.map(p => `
        <tr>
          <td>${p.nombre}</td>
          <td>${p.edad}</td>
          <td>${p.profesion}</td>
          <td>${p.estadoCivil}</td>
          <td>
            <button class="btn btn-sm btn-warning btn-edit" data-id="${p._id}">Editar</button>
            <button class="btn btn-sm btn-danger btn-del" data-id="${p._id}">Eliminar</button>
          </td>
        </tr>
      `).join('')}
    </tbody>
  `;

  // Eventos
  table.querySelectorAll(".btn-edit").forEach(btn => {
    btn.addEventListener("click", () => onEdit(btn.dataset.id));
  });
  table.querySelectorAll(".btn-del").forEach(btn => {
    btn.addEventListener("click", () => onDelete(btn.dataset.id));
  });

  return table;
}
