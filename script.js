// Datos de productos
const productos = {
    skincare: [
        { nombre: "Limpiador Facial", precio: "$20" },
        { nombre: "Tónico Facial", precio: "$15" },
        { nombre: "Hidratante", precio: "$25" },
        { nombre: "Protector Solar", precio: "$30" },
        { nombre: "Mascarilla", precio: "$18" },
        { nombre: "Sérum de Vitamina C", precio: "$35" },
        { nombre: "Exfoliante Facial", precio: "$22" },
        { nombre: "Aceite Facial", precio: "$27" },
        { nombre: "Crema de Ojos", precio: "$28" },
        { nombre: "Spray Hidratante", precio: "$16" }
    ],
    maquillaje: [
        { nombre: "Base Líquida", precio: "$28" },
        { nombre: "Polvo Compacto", precio: "$20" },
        { nombre: "Rubor", precio: "$18" },
        { nombre: "Corrector", precio: "$15" },
        { nombre: "Sombra de Ojos", precio: "$25" },
        { nombre: "Máscara de Pestañas", precio: "$22" },
        { nombre: "Delineador de Ojos", precio: "$14" },
        { nombre: "Labial", precio: "$19" },
        { nombre: "Iluminador", precio: "$24" }
    ],
    brochas: [
        { nombre: "Brocha para Base", precio: "$10" },
        { nombre: "Brocha para Polvo", precio: "$12" },
        { nombre: "Brocha para Sombras", precio: "$8" },
        { nombre: "Brocha para Contorno", precio: "$15" },
        { nombre: "Brocha para Rubor", precio: "$14" },
        { nombre: "Brocha de Precisión", precio: "$9" },
        { nombre: "Esponja de Maquillaje", precio: "$7" },
        { nombre: "Pincel para Labios", precio: "$5" },
        { nombre: "Brocha para Iluminador", precio: "$11" }
    ]
};

// Variables de usuario y carrito
let carrito = [];

// Función para mostrar productos
function mostrarProductos(categoria) {
    const contenedor = document.getElementById("productos");
    contenedor.innerHTML = ""; 
    productos[categoria].slice(0, 10).forEach((producto, index) => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>${producto.precio}</p>
            <button onclick="agregarAlCarrito('${categoria}', ${index})">Agregar al carrito</button>
        `;
        contenedor.appendChild(div);
    });
    document.getElementById("carrito").style.display = "none";
}

// Agregar al carrito sin alert
function agregarAlCarrito(categoria, index) {
    const producto = productos[categoria][index];
    carrito.push(producto);
    mostrarCarrito(); // Muestra el carrito actualizado automáticamente
}

// Mostrar carrito
function mostrarCarrito() {
    const contenedor = document.getElementById("carrito-items");
    contenedor.innerHTML = "";
    carrito.forEach((producto, index) => {
        const item = document.createElement("li");
        item.textContent = `${producto.nombre} - ${producto.precio}`;
        const btn = document.createElement("button");
        btn.textContent = "Eliminar";
        btn.onclick = () => eliminarDelCarrito(index);
        item.appendChild(btn);
        contenedor.appendChild(item);
    });
    const total = carrito.reduce((acc, prod) => acc + parseFloat(prod.precio.slice(1)), 0);
    document.getElementById("total").textContent = `Total: $${total.toFixed(2)} USD`;
    
    // Si hay productos en el carrito, mostrar el botón de "Realizar Compra"
    if (carrito.length > 0) {
        document.getElementById("realizar-compra").style.display = "block";
    } else {
        document.getElementById("realizar-compra").style.display = "none";
    }
    document.getElementById("carrito").style.display = "block";
}

// Eliminar del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    mostrarCarrito();
}

// Función de registro
function register() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (username && password) {
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        alert("Registro exitoso");
        login();
    } else {
        document.getElementById("login-error").textContent = "Por favor, ingresa un usuario y contraseña válidos";
    }
}

// Función de inicio de sesión
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    if (username === storedUsername && password === storedPassword) {
        document.getElementById("login-container").style.display = "none";
        document.getElementById("main-container").style.display = "block";
    } else {
        document.getElementById("login-error").textContent = "Usuario o contraseña incorrectos";
    }
}

// Función para realizar compra (redirige a formulario de pago)
function realizarCompra() {
    document.getElementById("main-container").style.display = "none";
    document.getElementById("formulario-pago").style.display = "block";
}

// Función para procesar el pago (simulación)
function procesarPago() {
    const tarjeta = document.getElementById("tarjeta").value;
    const nombre = document.getElementById("nombre").value;
    if (tarjeta && nombre) {
        alert("Compra realizada con éxito. ¡Gracias por tu compra!");
        // Resetea el carrito y regresa a la vista principal
        carrito = [];
        mostrarCarrito();
        document.getElementById("formulario-pago").style.display = "none";
        document.getElementById("main-container").style.display = "block";
    } else {
        alert("Por favor, ingresa todos los datos requeridos.");
    }
}
