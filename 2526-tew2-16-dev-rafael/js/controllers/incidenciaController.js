class IncidenciasController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.idOculto = -1;
    }

    init() {
        document.getElementById('btnMenuIncListado').addEventListener('click', () => {
            this.prepareListado();
        });

        document.getElementById('btnMenuIncFormulario').addEventListener('click', () => {
            this.prepareFormulario();
        });
    }

    clear () { this.model.clear(); } 

    prepareListado() {
        this.view.showListado().then(() => {
            this.model.load().then(() => {
                this.view.showIncidenciasInTable(this.model.incidencias);
            });

            this.prepareFiltroListado();
        });
    }

    prepareFormulario(idIncidencia=-1) {
        this.view.showFormulario().then(() => {
            this.model.loadCategorias().then(() => {
                this.view.showCategoriasInFormulario(this.model.categorias);
            });

            if(idIncidencia > -1)
            {
                this.view.getIncidenciaInForm(
                    this.model.find(idIncidencia)
                );

                alert("Metodo update no implementado")
            }

            document.getElementById("formNuevaIncidencia").addEventListener("submit", (event) => {
                event.preventDefault();
                var nuevaIncidencia = this.view.getIncidenciaFromForm()
                nuevaIncidencia.id = idIncidencia
                this.model.save(nuevaIncidencia).then(() => {
                    this.prepareListado();
                });
            });
        });
    }

    prepareFiltroListado() {
        const user = JSON.parse(sessionStorage.getItem("loginUser"));
        if (user.rol == 'ADMIN') {
            usuModel.loadTecnicos().then(() => {
                this.view.showTecnicosInFiltroIncidencias(usuModel.tecnicos)
            });
            estModel.loadAll().then(() => {
                this.view.showEstadosInFiltroIncidencias(estModel.estados)
            });

            // No hace falta el then pq existe en html pero oculta
            this.view.showFiltroIncidencias(); 
            document.getElementById('btnFiltroAplicar').addEventListener('click', () => {
                this.filtrarListado();
            });
            document.getElementById('btnFiltroLimpiar').addEventListener('click', () => {
                this.limpiarFiltro();
            });
        }
    }

    filtrarListado() {
        this.view.showIncidenciasInTable(this.model.filtrar(
           this.view.getTecnicoFiltroIncidencias(),
           this.view.getEstadoFiltroIncidencias()
        ));
    }

    limpiarFiltro() {
        this.view.showTecnicosInFiltroIncidencias(usuModel.tecnicos)
        this.view.showEstadosInFiltroIncidencias(estModel.estados)
        this.view.showIncidenciasInTable(this.model.incidencias);
    }

    prepareDetalle(idIncidencia) {
        this.view.showDetalle().then(() => {
            var incidencia = this.model.find(idIncidencia)
            this.view.showIncidenciaInDetalle(incidencia, null, null, null);
        });
    }
}