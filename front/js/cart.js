const contenedorTarjetas = document.getElementById("productos-container");
const unidadesElement = document.getElementById("unidades");
const precioElement = document.getElementById("precio");
const carritoVacioElement = document.getElementById("carrito-vacio");
const totalesElement = document.getElementById("totales");
const reiniciarCarritoElement = document.getElementById("reiniciar");

function crearTarjetasProductosInicio() {
  contenedorTarjetas.innerHTML = "";
  const productos = JSON.parse(localStorage.getItem("bicicletas"));
  console.log(productos);
  if (productos && productos.length > 0) {
    productos.forEach((producto) => {
      const nuevaBicicleta = document.createElement("div");
      nuevaBicicleta.classList = "tarjeta-producto";
      nuevaBicicleta.innerHTML = `
      <img src="${producto.urlImagen}">
      <h3>${producto.nombre}</h3>
      <p>$${producto.precio}</p>
      <div>
        <button>-</button>
        <span class="cantidad">${producto.cantidad}</span>
        <button>+</button>
      </div>
    `;
      contenedorTarjetas.appendChild(nuevaBicicleta);
      nuevaBicicleta
        .getElementsByTagName("button")[1]
        .addEventListener("click", (e) => {
          const cuentaElement =
            e.target.parentElement.getElementsByTagName("span")[0];
          cuentaElement.innerText = agregarAlCarrito(producto);
          actualizarTotales();
        });
      nuevaBicicleta
        .getElementsByTagName("button")[0]
        .addEventListener("click", (e) => {
          restarAlCarrito(producto);
          crearTarjetasProductosInicio();
          actualizarTotales();
        });
    });
  }
}

crearTarjetasProductosInicio();
actualizarTotales();

function actualizarTotales() {
  const productos = JSON.parse(localStorage.getItem("bicicletas"));
  let unidades = 0;
  let precio = 0;
  if (productos && productos.length > 0) {
    productos.forEach((producto) => {
      unidades += producto.cantidad;
      precio += producto.precio * producto.cantidad;
    });
    unidadesElement.innerText = unidades;
    precioElement.innerText = precio;
  }
  revisarMensajeVacio();
}

function revisarMensajeVacio() {
  const productos = JSON.parse(localStorage.getItem("bicicletas"));
  console.log(productos, productos == true);
  carritoVacioElement.classList.toggle(
    "escondido",
    productos && productos.length > 0
  );
  totalesElement.classList.toggle(
    "escondido",
    !(productos && productos.length > 0)
  );
}

revisarMensajeVacio();

reiniciarCarritoElement.addEventListener("click", reiniciarCarrito);
function reiniciarCarrito() {
  localStorage.removeItem("bicicletas");
  actualizarTotales();
  crearTarjetasProductosInicio();
}

document.getElementById("comprar").addEventListener("click", async () => {
  const res = await comprarCarrito();
  if (res) {
    reiniciarCarrito();
    window.location.href = "http://127.0.0.1:5500/compra-exitosa.html";
  }
});
