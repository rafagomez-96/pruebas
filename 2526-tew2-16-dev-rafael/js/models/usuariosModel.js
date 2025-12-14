class UsuariosModel {
    constructor() {
        this.usuarios = null;
        this.tecnicos = null;
    }

    clear() {
        this.usuarios = null;
        this.tecnicos = null;
        this.setToken("");
        this.setLoginUser(null);
    }
    
    setToken(token) {
        sessionStorage.setItem("token", token); 
    }

    getToken() {
        return sessionStorage.getItem("token");
    }

    setLoginUser(user) {
        sessionStorage.setItem("loginUser", JSON.stringify(user));
    }

    getLoginUser() {
        const user = sessionStorage.getItem("loginUser");
        return user ? JSON.parse(user) : null;
    }

    async login(user) {
        try {
            const respuesta = await fetch('http://localhost:8090/tew16/api/usuario/login',
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                }
            );
            if (respuesta.ok)
                return await respuesta.text();
            else
                return "";
        } catch (error) {
            console.error(error);
            return "";
        }
    }

    async me() {
        try {
            const respuesta = await fetch(`http://localhost:8090/tew16/api/usuario/me/${this.getToken()}`);
            this.setLoginUser(await respuesta.json());
        } catch (error) {
            console.error(error);
            return "";
        }
    }

    async logout() {
        try {
            await fetch(`http://localhost:8090/tew16/api/usuario/logout/${this.getToken()}`);
        } catch (error) {
            console.error(error);
            return "";
        }
    }

    async loadAll() {
        try {
            const respuesta = await fetch(`http://localhost:8090/tew16/api/usuario/${this.getToken()}`);
            this.usuarios = await respuesta.json();
        } catch (error) {
            console.error(error);
        }
    }

    async loadTecnicos() {
        try {
            const respuesta = await fetch(`http://localhost:8090/tew16/api/usuario/tecnicos/${this.getToken()}`);
            this.tecnicos = await respuesta.json();
        } catch (error) {
            console.error(error);
        }
    }

    find(idUsuario) {
        return this.usuarios.find(usu => usu.id == idUsuario);
    }
}