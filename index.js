const arrayProductos = [
    {
        id: 'zapa1',
        titulo: 'Nike Dunk',
        imagen: './img/dunk3.jpg',
        precio: '$ 220.000',
        categoria: {
            nombre: 'NikeDunk',
            id: 'NikeDunk'
        }
    },
    {
        id: 'zapa2',
        titulo: 'Jordan 02',
        imagen: './img/jordan2.jpg',
        precio: '$ 220.000',
        categoria: {
            nombre: 'Jordan',
            id: 'Jordan'
        }
    },
    {
        id: 'zapa3',
        titulo: 'Jordan 03',
        imagen: './img/jordan3.jpg',
        precio: '$ 220.000',
        categoria: {
            nombre: 'Jordan',
            id: 'Jordan'
        }
    },
    {
        id: 'zapa4',
        titulo: 'Air Max 01',
        imagen: './img/airmax1.jpg',
        precio: '$ 220.000',
        categoria: {
            nombre: 'Air Max',
            id: 'AirMax'
        }
    },
    {
        id: 'zapa5',
        titulo: 'Air Max 02',
        imagen: './img/airmax2.jpg',
        precio: '$ 220.000',
        categoria: {
            nombre: 'Air Max',
            id: 'AirMax'
        }
    },
    {
        id: 'zapa6',
        titulo: 'Air Max 03',
        imagen: './img/airmax3.jpg',
        precio: '$ 220.000',
        categoria: {
            nombre: 'AirMax',
            id: 'AirMax'
        }
    },
    {
        id: 'zapa7',
        titulo: 'Nike Dunk',
        imagen: './img/dunk1.jpg',
        precio: '$ 220.000',
        categoria: {
            nombre: 'NikeDunk',
            id: 'NikeDunk'
        }
    },
    {
        id: 'zapa8',
        titulo: 'Nike Dunk',
        imagen: './img/dunk2.jpg',
        precio: '$ 220.000',
        categoria: {
            nombre: 'NikeDunk',
            id: 'NikeDunk'
        }
    }
]

const contenedorProductos = document.querySelector('#contenedor-productos');
const botonesCategorias = document.querySelectorAll(".boton-menu");
const tituloPrincipal = document.querySelector('#titulo-principal');

function cargarProductos(productosElegidos) {
    contenedorProductos.innerHTML = '';

    productosElegidos.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('producto');
        div.innerHTML = `
            <img class="imagen-producto" src="${producto.imagen}" alt="">
            <div class="producto-info">
                <h3 class="nombre-producto">${producto.titulo}</h3>
                <p class="precio">${producto.precio}</p>
                <button class="agregar-carrito" data-id="${producto.id}">Agregar al carrito</button>
            </div>
        `;
        contenedorProductos.append(div);
    });

    const botonesAgregarCarrito = document.querySelectorAll(".agregar-carrito");
    botonesAgregarCarrito.forEach(boton => {
        boton.addEventListener('click', agregarAlCarrito);
    });
}

function agregarAlCarrito(e) {
    const productoId = e.currentTarget.getAttribute('data-id');
    const productoSeleccionado = arrayProductos.find(producto => producto.id === productoId);

    const productosEnCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const productoExistente = productosEnCarrito.find(producto => producto.id === productoId);

    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        productosEnCarrito.push({ ...productoSeleccionado, cantidad: 1 });
    }

    localStorage.setItem('carrito', JSON.stringify(productosEnCarrito));

    actualizarNumeroCarrito();
}

function actualizarNumeroCarrito() {
    const productosEnCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const numeroCarrito = productosEnCarrito.reduce((total, producto) => total + producto.cantidad, 0);

    const carritoNumero = document.querySelector('.carrito-numero');
    if (carritoNumero) {
        carritoNumero.textContent = numeroCarrito.toString();
    }
}

cargarProductos(arrayProductos);

actualizarNumeroCarrito();

botonesCategorias.forEach(boton => {
    boton.addEventListener('click', (e) => {
        botonesCategorias.forEach(boton => boton.classList.remove('active'));
        e.currentTarget.classList.add('active');

        if (e.currentTarget.id != 'todos') {
            const productosBoton = arrayProductos.filter(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productosBoton[0].categoria.nombre;
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = 'Todos los productos';
            cargarProductos(arrayProductos);
        }
    });
});