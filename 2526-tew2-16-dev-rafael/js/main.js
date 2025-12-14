const usuModel = new UsuariosModel();  
const incModel = new IncidenciasModel();
const estModel = new HistorialEstadosModel();

const usuView = new UsuariosView();
const incView = new IncidenciasView();

const usuController = new UsuariosController(usuModel, usuView);
const incController = new IncidenciasController(incModel, incView);

window.addEventListener('load', () => {
    // INICIALIZACIONES
    usuController.init();
    incController.init(); 

    // DEF. FUNCIONES DE USUARIO 

    // DEF. MANEJADORES DE EVENTOS
    var token = sessionStorage.getItem("token")
    if(token === "" || token == null)
    {
        usuController.prepareLogin()
    } else {
        usuController.goHome()
    }
}); 