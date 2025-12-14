class IncidenciasView {
    async showListado() {
        var res = await fetch("/2526-tew2-16/listadoIncidencias.html")
        var html = await res.text()

        const main = document.getElementsByTagName("main")[0];
        main.innerHTML = html;
    }

    async showDetalle() {
        var res = await fetch("/2526-tew2-16/detalle.html")
        var html = await res.text()

        const main = document.getElementsByTagName("main")[0];
        main.innerHTML = html;
    }

    async showFormulario() {
        var res = await fetch("/2526-tew2-16/formularioIncidencia.html")
        var html = await res.text()

        const main = document.getElementsByTagName("main")[0];
        main.innerHTML = html;
    }

    showIncidenciasInTable(incidencias) {
        const cuerpoTabla = document.querySelector('#incidencias-listado-tabla tbody');
        cuerpoTabla.innerHTML = '';
        
        if (!Array.isArray(incidencias)) {
            console.error("Expected an array of incidencias, got:", incidencias);
            return;
          }
          
        incidencias.forEach(inc => {
            const tr = document.createElement('tr');
            tr.innerHTML = ` 
                <td>${inc.titulo}</td> 
                <td>${inc.fechaCreacion}</td> 
                <td>${inc.ultimaModificacion}</td> 
                <td>${inc.estadoActual}</td> 
                <td>${inc.categoria}</td>
                <td>
                    <button
                        class="btn btn-primary"
                        onclick="incController.prepareDetalle(${inc.id})"
                    >
                        Detalle
                    </button>
                </td>
                <td>
                    <button
                        class="btn btn-primary"
                        onclick=""
                    >
                        Reasignar
                    </button> 
                </td>
                `;
            cuerpoTabla.appendChild(tr);
        });
    }

    showIncidenciaInDetalle(incidencia, tecnico, solicitante, comentarios) {
        // Campos Incidencia
        document.getElementById('inc-id')                .innerText = incidencia.id;
        document.getElementById('inc-titulo')            .innerText = incidencia.titulo;
        document.getElementById('inc-descripcion')       .innerText = incidencia.descripcion;
        document.getElementById('inc-categoria')         .innerText = incidencia.categoria;
        document.getElementById('inc-fechaCreacion')     .innerText = incidencia.fechaCreacion;
        document.getElementById('inc-ultimaModificacion').innerText = incidencia.ultimaModificacion;
        document.getElementById('inc-estadoActual')      .innerText = incidencia.estadoActual;

        // ...
    }

    showFiltroIncidencias() {
        const formFiltro = document.getElementById("filtrosIncidencias");
        formFiltro.classList.remove("d-none");
    }

    
    getIncidenciaInForm(incidencia) {
        if (!incidencia) return;
    
        document.getElementById("titulo").value = incidencia.titulo ?? "";
        document.getElementById("descripcion").value = incidencia.descripcion ?? "";
        document.getElementById("categoria").value = incidencia.categoria ?? "";
    }

    getIncidenciaFromForm() {
        return {
            titulo: document.getElementById("titulo").value.trim(),
            descripcion: document.getElementById("descripcion").value.trim(),
            categoria: document.getElementById("categoria").value
        };
    }

    showCategoriasInFormulario(categorias) {
        const selectCategoria = document.getElementById("categoria");
        selectCategoria.innerHTML = '';
    
        categorias.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat;
            selectCategoria.appendChild(option);
        });
    }

    showTecnicosInFiltroIncidencias(tecnicos) {
        const filtroTecnico = document.getElementById("filtroTecnico");
        const option = document.createElement("option");
            option.value = "";
            option.textContent = "Todos";
            filtroTecnico.appendChild(option);

        tecnicos.forEach(tecnico => {
            const option = document.createElement("option");
            option.value = tecnico.dni;
            option.textContent = tecnico.dni;
            filtroTecnico.appendChild(option);
        })
    }

    getTecnicoFiltroIncidencias() {
        return document.getElementById("filtroTecnico").value.trim()
    }

    showEstadosInFiltroIncidencias(estados) {
        const filtroEstado = document.getElementById("filtroEstado");
        const option = document.createElement("option");
            option.value = "";
            option.textContent = "Todos";
            filtroEstado.appendChild(option);

        estados.forEach(estado => {
            const option = document.createElement("option");
            option.value = estado;
            option.textContent = estado;
            filtroEstado.appendChild(option);
        })
    }

    getEstadoFiltroIncidencias() {
        return document.getElementById("filtroEstado").value.trim()
    }
}