class UsuariosView {
    async showLogin() {
        var res = await fetch("/2526-tew2-16/login.html")
        var html = await res.text()

        const main = document.getElementsByTagName("main")[0];
        main.innerHTML = html;
    }

    async showListado() {
        var res = await fetch("/2526-tew2-16/listadoUsuarios.html")
        var html = await res.text()

        const main = document.getElementsByTagName("main")[0];
        main.innerHTML = html;
    }

    showUsuariosInTable(usuarios) {
        const cuerpoTabla = document.querySelector('#usuarios-listado-tabla tbody');
        cuerpoTabla.innerHTML = '';
        usuarios.forEach(usu => {
            const tr = document.createElement('tr');
            tr.innerHTML = ` 
                <td>${usu.dni}</td> 
                <td>${usu.nombre}</td> 
                <td>${usu.apellidos}</td> 
                <td>${usu.rol}</td>`;
                cuerpoTabla.appendChild(tr);
        });
    }

    loadUsuarioFromForm() {
        return {
            dni: document.getElementById("dni").value,
            passwd: document.getElementById("passwd").value
        }
    }

    loadUsuarioInForm(user) {
        document.getElementById("dni").value = user.dni
        document.getElementById("passwd").value = user.passwd
    }
}