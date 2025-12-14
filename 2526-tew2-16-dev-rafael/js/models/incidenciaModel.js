class IncidenciasModel {
    constructor() {
        this.incidencias = null;
        this.categorias = null;
    }

    clear() {
        this.incidencias = null;
    }

    async load() {
        try {
            //NOTE
            const respuesta = await fetch(`http://localhost:8090/tew16/api/incidencia/${sessionStorage.getItem("token")}`);
            if (!respuesta.ok) {
                throw new Error(`HTTP error! status: ${respuesta.status}`);
            }
            this.incidencias = await respuesta.json();
        } catch (error) {
            console.error(error);
        }
    }

    async save(incidencia) {
        try {
            const incidenciaRequest = {
                data: incidencia,
                token: sessionStorage.getItem("token")
            };

            await fetch('http://localhost:8090/tew16/api/incidencia',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(incidenciaRequest)
                }
            );
        } catch (error) {
            console.error(error);
        }
    }

    async loadCategorias() {
        try {
            const respuesta = await fetch(`http://localhost:8090/tew16/api/incidencia/categorias/${sessionStorage.getItem("token")}`);
            if (!respuesta.ok) {
                throw new Error(`HTTP error! status: ${respuesta.status}`);
            }
            this.categorias = await respuesta.json();
        } catch (error) {
            console.error(error);
        }
    }

    find(idIncidencia) {
        return this.incidencias.find(inc => inc.id == idIncidencia);
    }

    filtrar(dniTecnico, estado) {
        return this.incidencias.filter(inc => {
            const coincideTecnico = dniTecnico ? inc.tecnico === dniTecnico : true;
            const coincideEstado  = estado ? inc.estadoActual === estado : true;
            return coincideTecnico && coincideEstado;
        });
    }
    
}