class HistorialEstadosModel {
    constructor() {
        this.estados = null;
    }

    clear() {
        this.estados = null;
    }
    
    async loadAll() {
        try {
            const respuesta = await fetch(`http://localhost:8090/tew16/api/historialestado/${sessionStorage.getItem("token")}`);
            this.estados = await respuesta.json();
        } catch (error) {
            console.error(error);
        }
    }
}