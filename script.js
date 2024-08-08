const PRECIO_POLLO = 140;
const PRECIO_VENTA_CUARTO = 45;
const PRECIO_VENTA_MEDIO = 70;
const PRECIO_VENTA_ENTERO = 140;
const PRECIO_PROMOCION = 200;
let totalEnCaja = 0;
let totalGastos = 0;
let totalEntradas = 0;
let pollosNevera = 0;
let totalVentas = 0;
let totalIngresosVentas = 0;
let entradas = [];
let gastos = [];
let ventas = [];

function registrarEntrada() {
    const cantidadPollos = parseFloat(document.getElementById('entradaCantidad').value);
    if (cantidadPollos > 0) {
        const entrada = {
            id: Date.now(),
            hora: new Date().toLocaleString(),
            cantidad: cantidadPollos
        };
        entradas.push(entrada);
        pollosNevera += cantidadPollos;
        totalEntradas += cantidadPollos;
        actualizarResumen();
        guardarDatos();
        actualizarTablaEntradas();
    }
}

function registrarGasto() {
    const descripcion = document.getElementById('gastoDescripcion').value;
    const cantidad = parseFloat(document.getElementById('gastoCantidad').value);
    if (descripcion && cantidad > 0) {
        const gasto = {
            id: Date.now(),
            hora: new Date().toLocaleString(),
            descripcion: descripcion,
            cantidad: cantidad
        };
        gastos.push(gasto);
        totalGastos += cantidad;
        totalEnCaja -= cantidad;
        actualizarResumen();
        guardarDatos();
        actualizarTablaGastos();
    }
}

function registrarVenta() {
    const tipoVenta = parseFloat(document.getElementById('ventaTipo').value);
    const cantidad = parseFloat(document.getElementById('ventaCantidad').value);
    if (cantidad > 0) {
        const totalPollos = tipoVenta * cantidad;
        const totalPrecio = PRECIO_POLLO * tipoVenta * cantidad;
        if (pollosNevera >= totalPollos) {
            pollosNevera -= totalPollos;
            totalVentas += totalPollos;
            totalIngresosVentas += totalPrecio;
            totalEnCaja += totalPrecio;
            const venta = {
                id: Date.now(),
                hora: new Date().toLocaleString(),
                tipo: tipoVenta,
                cantidad: cantidad
            };
            ventas.push(venta);
            actualizarResumen();
            guardarDatos();
            actualizarTablaVentas();
        } else {
            alert("No hay suficientes pollos en la nevera.");
        }
    }
}

function actualizarResumen() {
    document.getElementById('totalCaja').innerText = `$${totalEnCaja.toFixed(2)}`;
    document.getElementById('totalGastos').innerText = `$${totalGastos.toFixed(2)}`;
    document.getElementById('totalEntradas').innerText = totalEntradas.toFixed(2);
    document.getElementById('pollosNevera').innerText = pollosNevera.toFixed(2);
    document.getElementById('pollosNeveraResumen').innerText = pollosNevera.toFixed(2);
    document.getElementById('totalVentas').innerText = totalVentas.toFixed(2);
    document.getElementById('totalVentasResumen').innerText = totalVentas.toFixed(2);
    document.getElementById('totalIngresosVentas').innerText = `$${totalIngresosVentas.toFixed(2)}`;
    const cantidadFinal = totalEnCaja - totalGastos;
    document.getElementById('cantidadFinal').innerText = `$${cantidadFinal.toFixed(2)}`;
}

function guardarDatos() {
    localStorage.setItem('totalEnCaja', totalEnCaja);
    localStorage.setItem('totalGastos', totalGastos);
    localStorage.setItem('totalEntradas', totalEntradas);
    localStorage.setItem('pollosNevera', pollosNevera);
    localStorage.setItem('totalVentas', totalVentas);
    localStorage.setItem('totalIngresosVentas', totalIngresosVentas);
    localStorage.setItem('entradas', JSON.stringify(entradas));
    localStorage.setItem('gastos', JSON.stringify(gastos));
    localStorage.setItem('ventas', JSON.stringify(ventas));
}

function cargarDatos() {
    const cajaGuardada = localStorage.getItem('totalEnCaja');
    const gastosGuardados = localStorage.getItem('totalGastos');
    const entradasGuardadas = localStorage.getItem('totalEntradas');
    const neveraGuardada = localStorage.getItem('pollosNevera');
    const ventasGuardadas = localStorage.getItem('totalVentas');
    const ingresosVentasGuardados = localStorage.getItem('totalIngresosVentas');
    const entradasGuardadasLista = localStorage.getItem('entradas');
    const gastosGuardadosLista = localStorage.getItem('gastos');
    const ventasGuardadasLista = localStorage.getItem('ventas');

    if (cajaGuardada !== null) {
        totalEnCaja = parseFloat(cajaGuardada);
    }
    if (gastosGuardados !== null) {
        totalGastos = parseFloat(gastosGuardados);
    }
    if (entradasGuardadas !== null) {
        totalEntradas = parseFloat(entradasGuardadas);
    }
    if (neveraGuardada !== null) {
        pollosNevera = parseFloat(neveraGuardada);
    }
    if (ventasGuardadas !== null) {
        totalVentas = parseFloat(ventasGuardadas);
    }
    if (ingresosVentasGuardados !== null) {
        totalIngresosVentas = parseFloat(ingresosVentasGuardados);
    }
    if (entradasGuardadasLista !== null) {
        entradas = JSON.parse(entradasGuardadasLista);
    }
    if (gastosGuardadosLista !== null) {
        gastos = JSON.parse(gastosGuardadosLista);
    }
    if (ventasGuardadasLista !== null) {
        ventas = JSON.parse(ventasGuardadasLista);
    }

    actualizarResumen();
    actualizarTablaEntradas();
    actualizarTablaGastos();
    actualizarTablaVentas();
}

function vaciarInventario() {
    const password = prompt("Ingrese la contraseña para vaciar el inventario:");
    if (password === "1234ABC") {
        totalEnCaja = 0;
        totalGastos = 0;
        totalEntradas = 0;
        pollosNevera = 0;
        totalVentas = 0;
        totalIngresosVentas = 0;
        entradas = [];
        gastos = [];
        ventas = [];
        actualizarResumen();
        guardarDatos();
        actualizarTablaEntradas();
        actualizarTablaGastos();
        actualizarTablaVentas();
        alert("Inventario vaciado correctamente.");
    } else {
        alert("Contraseña incorrecta.");
    }
}

function imprimirReporte() {
    const reporteVentana = window.open('', '', 'width=800,height=600');
    reporteVentana.document.write('<html><head><title>Reporte de Inventario</title>');
    reporteVentana.document.write('<style>body { font-family: Arial, sans-serif; } table { width: 100%; border-collapse: collapse; } table, th, td { border: 1px solid black; } th, td { padding: 8px; text-align: left; } th { background-color: #f2f2f2; }</style>');
    reporteVentana.document.write('</head><body>');
    reporteVentana.document.write('<img src="https://cdn-icons-png.flaticon.com/128/3413/3413523.png" alt="Logotipo" style="width: 150px; height: auto; margin-bottom: 20px;">'); // Incluye el logotipo
    reporteVentana.document.write('<h1>Reporte de Inventario</h1>');
    reporteVentana.document.write('<p>Total en caja: $' + totalEnCaja.toFixed(2) + '</p>');
    reporteVentana.document.write('<p>Total de gastos: $' + totalGastos.toFixed(2) + '</p>');
    reporteVentana.document.write('<p>Cantidad final en caja: $' + (totalEnCaja - totalGastos).toFixed(2) + '</p>');
    reporteVentana.document.write('<p>Total de entradas: ' + totalEntradas.toFixed(2) + '</p>');
    reporteVentana.document.write('<p>Pollos en Nevera: ' + pollosNevera.toFixed(2) + '</p>');
    reporteVentana.document.write('<p>Total de ventas: ' + totalVentas.toFixed(2) + '</p>');
    reporteVentana.document.write('<img src="URL_DE_LA_IMAGEN" alt="Reporte de Inventario">');
    reporteVentana.document.write('</body></html>');
    reporteVentana.document.close();
    reporteVentana.print();
}


function descargarReporte() {
    document.getElementById('reporteTotalCaja').innerText = totalEnCaja.toFixed(2);
    document.getElementById('reporteTotalGastos').innerText = totalGastos.toFixed(2);
    document.getElementById('reporteCantidadFinal').innerText = (totalEnCaja - totalGastos).toFixed(2);
    document.getElementById('reporteTotalEntradas').innerText = totalEntradas.toFixed(2);
    document.getElementById('reportePollosNevera').innerText = pollosNevera.toFixed(2);
    document.getElementById('reporteTotalVentas').innerText = totalVentas.toFixed(2);

    const reporte = document.getElementById('reporte');
    reporte.style.display = 'block';

    html2canvas(reporte).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'reporte_inventario.png';
        link.click();
        reporte.style.display = 'none';
    });
}

function mostrarSeccion(seccionId) {
    const secciones = document.getElementsByClassName('section');
    for (let seccion of secciones) {
        seccion.style.display = 'none';
    }
    document.getElementById(seccionId).style.display = 'block';
}

function actualizarTablaEntradas() {
    const entradasTable = document.getElementById('entradasTable');
    entradasTable.innerHTML = '';
    entradas.forEach(entrada => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${entrada.hora}</td>
            <td>${entrada.cantidad}</td>
            <td><button onclick="editarEntrada(${entrada.id})">Editar</button></td>
        `;
        entradasTable.appendChild(row);
    });
}

function actualizarTablaGastos() {
    const gastosTable = document.getElementById('gastosTable');
    gastosTable.innerHTML = '';
    gastos.forEach(gasto => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${gasto.hora}</td>
            <td>${gasto.descripcion}</td>
            <td>${gasto.cantidad}</td>
            <td><button onclick="editarGasto(${gasto.id})">Editar</button></td>
        `;
        gastosTable.appendChild(row);
    });
}

function actualizarTablaVentas() {
    const ventasTable = document.getElementById('ventasTable');
    ventasTable.innerHTML = '';
    ventas.forEach(venta => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${venta.hora}</td>
            <td>${venta.tipo}</td>
            <td>${venta.cantidad}</td>
            <td><button onclick="editarVenta(${venta.id})">Editar</button></td>
        `;
        ventasTable.appendChild(row);
    });
}

function editarEntrada(id) {
    const entrada = entradas.find(e => e.id === id);
    const nuevaCantidad = prompt("Ingrese la nueva cantidad:", entrada.cantidad);
    if (nuevaCantidad !== null && nuevaCantidad !== '') {
        const diferencia = parseFloat(nuevaCantidad) - entrada.cantidad;
        entrada.cantidad = parseFloat(nuevaCantidad);
        pollosNevera += diferencia;
        totalEntradas += diferencia;
        actualizarResumen();
        guardarDatos();
        actualizarTablaEntradas();
    }
}

function editarGasto(id) {
    const gasto = gastos.find(g => g.id === id);
    const nuevaDescripcion = prompt("Ingrese la nueva descripción:", gasto.descripcion);
    const nuevaCantidad = prompt("Ingrese la nueva cantidad:", gasto.cantidad);
    if (nuevaDescripcion !== null && nuevaDescripcion !== '' && nuevaCantidad !== null && nuevaCantidad !== '') {
        const diferencia = parseFloat(nuevaCantidad) - gasto.cantidad;
        gasto.descripcion = nuevaDescripcion;
        gasto.cantidad = parseFloat(nuevaCantidad);
        totalGastos += diferencia;
        totalEnCaja -= diferencia;
        actualizarResumen();
        guardarDatos();
        actualizarTablaGastos();
    }
}

function editarVenta(id) {
    const venta = ventas.find(v => v.id === id);
    const nuevoTipo = prompt("Ingrese el nuevo tipo (0.25, 0.5, 1, 1.5):", venta.tipo);
    const nuevaCantidad = prompt("Ingrese la nueva cantidad:", venta.cantidad);
    if (nuevoTipo !== null && nuevoTipo !== '' && nuevaCantidad !== null && nuevaCantidad !== '') {
        const diferenciaPollos = parseFloat(nuevoTipo) * parseFloat(nuevaCantidad) - venta.tipo * venta.cantidad;
        const diferenciaPrecio = PRECIO_POLLO * diferenciaPollos;
        if (pollosNevera >= diferenciaPollos) {
            venta.tipo = parseFloat(nuevoTipo);
            venta.cantidad = parseFloat(nuevaCantidad);
            pollosNevera -= diferenciaPollos;
            totalVentas += diferenciaPollos;
            totalIngresosVentas += diferenciaPrecio;
            totalEnCaja += diferenciaPrecio;
            actualizarResumen();
            guardarDatos();
            actualizarTablaVentas();
        } else {
            alert("No hay suficientes pollos en la nevera.");
        }
    }
}

document.addEventListener('DOMContentLoaded', cargarDatos);