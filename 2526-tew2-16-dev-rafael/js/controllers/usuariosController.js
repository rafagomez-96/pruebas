class UsuariosController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    init() {
        document.getElementById("btnMenuLogin").addEventListener("click", () => {
            this.prepareLogin();
        });

        document.getElementById("btnMenuLogout").addEventListener("click", () => {
            this.logout();
        });

        document.getElementById('btnMenuUsuListado').addEventListener('click', () => {
            this.view.showListado().then(() => { //NOTE
                this.model.loadAll().then(() => {
                    this.view.showUsuariosInTable(this.model.usuarios);
                });
            });
        })
        document.getElementById("btnMenuHome").addEventListener("click", () => {
            this.goHome();
        });
    }

    clear () { this.model.clear(); } 

    prepareLogin() {
        this.view.showLogin().then(() => {
            document.getElementById("loginForm").addEventListener("submit", (event) => {
                event.preventDefault();
                this.login();
            });
        });
    }

    login() {
        const usuario = this.view.loadUsuarioFromForm();
        this.model.login(usuario).then(token => {
            if (token === "") {
                alert("Usuario o contraseña incorrectos.");
            } else {
                this.model.setToken(token);
                this.model.me().then(() => {
                    incController.prepareListado();
                });
                
            }
        });
    }

    logout() {
        this.model.logout().then(() => {
            
            // Reseteo datos
            this.clear();
            incController.clear();

            this.prepareLogin();
        });
    }

    goHome() {
        incController.prepareListado();
    }
}