function recolectarDatosParaGoogleSheet(
    tipoEntrega,
    numeroFactura,
    fecha,
    hora,
    nombre,
    telefono,
    totalProductos,
    metodoPago
) {
    let productosArray = [];
    try {
        productosArray = JSON.parse(localStorage.getItem('cart')) || [];
    } catch (e) {
        productosArray = [];
    }
    const productosFormateados = productosArray.map(item => {
        // Si es "Ninguno" o vacío, mostrar vacío
        const size = (item.selections && item.selections.size && item.selections.size !== "Ninguno") ? item.selections.size : "";
        const flavors = (item.selections && item.selections.flavors && item.selections.flavors !== "Ninguno") ? item.selections.flavors : "";
        const borders = (item.selections && item.selections.borders && item.selections.borders !== "Ninguno") ? item.selections.borders : "";
        const additionals = (item.selections && item.selections.additionals && item.selections.additionals !== "Ninguno") ? item.selections.additionals : "";
        const instrucciones = (item.instructions && item.instructions !== "Ninguno") ? item.instructions : "";

        return `${item.name} x${item.quantity} ($${item.price}) | ${size} | ${flavors} | ${borders} | ${additionals} | ${instrucciones}`;
    }).join('\n');

    return {
        tipoEntrega: tipoEntrega,
        numeroFactura: numeroFactura,
        fecha: fecha,
        hora: hora,
        nombre: nombre,
        telefono: telefono,
        mesa: localStorage.getItem('mesa') || "",
        direccion: "",
        puntoReferencia: "",
        productos: productosFormateados,
        totalProductos: totalProductos,
        costoDomicilio: "",
        totalPagar: totalProductos,
        metodoPago: metodoPago,
        ubicacionGoogleMaps: ""
    };
}

function enviarDatosAGoogleSheet(datos) {
    fetch('https://script.google.com/macros/s/AKfycbw8cwXF-qdSTjv-6hHTUmDiFvGHoOqTHdVQF9O-58zngNGZxw_dRkN1bZxBZ-sjduLJ/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });
}
