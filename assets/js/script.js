document.addEventListener("DOMContentLoaded", () => {
    let tareas = [
        { id: 1, descripcion: "Tarea inicial 1", completada: false },
        { id: 2, descripcion: "Tarea inicial 2", completada: false },
        { id: 3, descripcion: "Tarea inicial 3", completada: false }
    ];

    const inputTarea = document.querySelector("#inputTarea");
    const agregarTareaBtn = document.querySelector("#agregar_tarea");
    const listaTareas = document.querySelector("#listaTareas");
    const totalIngresadas = document.querySelector("#totalIngresadas");
    const totalFinalizadas = document.querySelector("#totalFinalizadas");

    function actualizarLista() {
        listaTareas.innerHTML = '';
        tareas.forEach((tarea, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${index + 1}</span> 
                <span>${tarea.descripcion}</span>
                <input type="checkbox" ${tarea.completada ? 'checked' : ''}>
                <button class="borrar-tarea">X</button>
            `;
            listaTareas.appendChild(li);

            // Evento para marcar la tarea como completada
            li.querySelector("input[type='checkbox']").addEventListener("change", (e) => {
                tarea.completada = e.target.checked;
                actualizarContadores();
            });

            // Evento para borrar la tarea
            li.querySelector(".borrar-tarea").addEventListener("click", () => {
                if (confirm("¿Quieres eliminar esta tarea?")) {
                    tareas.splice(index, 1);
                    actualizarLista();
                    actualizarContadores();
                }
            });
        });
    }

    function actualizarContadores() {
        totalIngresadas.textContent = tareas.length;
        totalFinalizadas.textContent = tareas.filter(tarea => tarea.completada).length;
    }

    // Agregar nueva tarea
    agregarTareaBtn.addEventListener("click", () => {
        if (inputTarea.value.trim()) {
            const nuevaTarea = {
                id: tareas.length + 1,
                descripcion: inputTarea.value.trim(),
                completada: false
            };
            tareas.push(nuevaTarea);
            inputTarea.value = ''; // Limpiar el input
            actualizarLista();
            actualizarContadores();
        }
    });

    // Inicializar la lista
    actualizarLista();
    actualizarContadores();
});
