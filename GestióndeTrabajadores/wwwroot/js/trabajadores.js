document.addEventListener("DOMContentLoaded", () => {
    const modalAgregar = new bootstrap.Modal(document.getElementById("modalAgregar"));
    const modalEditar = new bootstrap.Modal(document.getElementById("modalEditar"));
    const modalEliminar = new bootstrap.Modal(document.getElementById("modalEliminar"));

    // ===============================
    // 🔹 FILTROS DINÁMICOS EN TIEMPO REAL
    // ===============================
    const inputBusqueda = document.getElementById("filtroBusqueda");
    const selectSexo = document.getElementById("filtroSexo");
    const selectEstado = document.getElementById("filtroEstado");

    function filtrarTabla() {
        const busqueda = inputBusqueda.value.toLowerCase();
        const sexo = selectSexo.value.toLowerCase();
        const estado = selectEstado.value.toLowerCase();

        document.querySelectorAll("#tablaTrabajadores tr").forEach(fila => {
            const nombre = fila.getAttribute("data-nombre")?.toLowerCase() ?? "";
            const dni = fila.getAttribute("data-dni")?.toLowerCase() ?? "";
            const filaSexo = fila.getAttribute("data-sexo")?.toLowerCase() ?? "";
            const filaEstado = fila.getAttribute("data-estado")?.toLowerCase() ?? "";

            const coincideBusqueda = nombre.includes(busqueda) || dni.includes(busqueda);
            const coincideSexo = sexo === "" || filaSexo === sexo;
            const coincideEstado = estado === "" || filaEstado === estado;

            fila.style.display = (coincideBusqueda && coincideSexo && coincideEstado) ? "" : "none";
        });
    }

    // Escuchar eventos
    inputBusqueda.addEventListener("input", filtrarTabla);
    selectSexo.addEventListener("change", filtrarTabla);
    selectEstado.addEventListener("change", filtrarTabla);


    // ===============================
    // 🔹 AGREGAR TRABAJADOR
    // ===============================
    const formAgregar = document.getElementById("formAgregar");
    formAgregar.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(formAgregar);

        const response = await fetch("/Trabajadores/Create", {
            method: "POST",
            body: formData,
            headers: { "X-Requested-With": "XMLHttpRequest" }
        });

        if (response.ok) {
            modalAgregar.hide();
            Swal.fire({
                icon: "success",
                title: "¡Guardado!",
                text: "El trabajador fue registrado correctamente.",
                timer: 2000,
                showConfirmButton: false
            }).then(() => location.reload());
        } else {
            Swal.fire("Error", "No se pudo guardar el trabajador.", "error");
        }
    });

    // ===============================
    // 🔹 EDITAR TRABAJADOR
    // ===============================
    document.querySelectorAll(".btn-editar").forEach(btn => {
        btn.addEventListener("click", async () => {
            const id = btn.getAttribute("data-id");

            const res = await fetch(`/Trabajadores/Edit/${id}`);
            if (!res.ok) {
                return Swal.fire("Error", "No se pudieron cargar los datos.", "error");
            }

            const data = await res.json();

            document.getElementById("editId").value = data.id;
            document.getElementById("editNombres").value = data.nombres;
            document.getElementById("editApellidos").value = data.apellidos;
            document.getElementById("editDocumento").value = data.numeroDocumento;
            document.getElementById("editSexo").value = data.sexo;
            document.getElementById("editFecha").value = data.fechaNacimiento;
            document.getElementById("editDireccion").value = data.direccion ?? "";
            document.getElementById("editEstado").value = data.estado;
            document.getElementById("editFotoPreview").src = data.fotoUrl || "/img/default-user.png";

            modalEditar.show();
        });
    });

    // ===============================
    // 🖼️ Vista previa de nueva foto en editar
    // ===============================
    document.getElementById("editFoto").addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = ev => {
                document.getElementById("editFotoPreview").src = ev.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // ===============================
    // 💾 Guardar cambios del trabajador editado
    // ===============================
    const formEditar = document.getElementById("formEditar");
    formEditar.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(formEditar);

        // 🔹 Capturamos el token antiforgery
        const tokenInput = document.querySelector('input[name="__RequestVerificationToken"]');
        const token = tokenInput ? tokenInput.value : null;

        try {
            const response = await fetch(formEditar.action, {
                method: "POST",
                body: formData,
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    // 🔹 ASP.NET Core espera este encabezado
                    "RequestVerificationToken": token
                }
            });

            if (response.ok) {
                bootstrap.Modal.getInstance(document.getElementById("modalEditar")).hide();
                location.reload();
            } else {
                const errorText = await response.text();
                console.error("❌ Error en actualización:", errorText);
                Swal.fire("Error", "❌ No se pudo actualizar el trabajador.<br>" + errorText, "error");
            }
        } catch (err) {
            console.error("⚠️ Error al enviar datos:", err);
            Swal.fire("Error", "⚠️ Error al enviar los datos.<br>" + err.message, "error");
        }
    });



    // ===============================
    // 🔹 ELIMINAR TRABAJADOR
    // ===============================
    document.querySelectorAll(".btn-eliminar").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.getAttribute("data-id");
            const nombre = btn.getAttribute("data-nombre");

            document.getElementById("deleteId").value = id;
            document.getElementById("deleteNombre").innerText = nombre;
            modalEliminar.show();
        });
    });

    const formEliminar = document.getElementById("formEliminar");
    formEliminar.addEventListener("submit", async (e) => {
        e.preventDefault();
        const id = document.getElementById("deleteId").value;

        const response = await fetch(`/Trabajadores/DeleteConfirmed/${id}`, {
            method: "POST",
            headers: { "X-Requested-With": "XMLHttpRequest" }
        });

        if (response.ok) {
            modalEliminar.hide();
            Swal.fire({
                icon: "success",
                title: "Eliminado",
                text: "El trabajador ha sido eliminado.",
                timer: 2000,
                showConfirmButton: false
            }).then(() => location.reload());
        } else {
            Swal.fire("Error", "No se pudo eliminar el trabajador.", "error");
        }
    });
});
