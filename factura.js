document.addEventListener('DOMContentLoaded', () => {
    const productos = document.querySelectorAll('.tarjeta');
    const tbody = document.querySelector('#items-factura tbody');
    const subtotalElement = document.getElementById('subtotal');
    const ivaElement = document.getElementById('iva');
    const totalElement = document.getElementById('total');
    const btnPagar = document.querySelector('.btn-pagar');

    let facturaItems = [];
    let subtotal = 0;

    // Añadir productos a la factura
    productos.forEach(producto => {
        producto.addEventListener('click', () => {
            const nombre = producto.querySelector('h3').textContent;
            
            // CORRECCIÓN IMPORTANTE: Seleccionamos el primer párrafo que contiene el precio
            // (el segundo párrafo es la descripción)
            const precioTexto = producto.querySelectorAll('p')[0].textContent;
            const precio = parseFloat(precioTexto.replace('$', ''));

            const itemExistente = facturaItems.find(item => item.nombre === nombre);

            if (itemExistente) {
                itemExistente.cantidad += 1;
            } else {
                facturaItems.push({
                    nombre,
                    precio,
                    cantidad: 1
                });
            }

            actualizarFactura();
        });
    });

    // Actualizar factura
    function actualizarFactura() {
        tbody.innerHTML = '';
        subtotal = 0;

        facturaItems.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.nombre}</td>
                <td>${item.cantidad}</td>
                <td>$${(item.precio * item.cantidad).toFixed(2)}</td>
            `;
            tbody.appendChild(row);
            subtotal += item.precio * item.cantidad;
        });

        const iva = subtotal * 0.15;
        const total = subtotal + iva;

        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        ivaElement.textContent = `$${iva.toFixed(2)}`;
        totalElement.textContent = `$${total.toFixed(2)}`;
    }

    // Botón de pagar
    btnPagar.addEventListener('click', () => {
        if(facturaItems.length === 0) {
            alert('¡No hay productos en la factura!');
            return;
        }
        
        alert(`¡Pedido confirmado! Total a pagar: $${totalElement.textContent}`);
        facturaItems = [];
        actualizarFactura();
    });
});