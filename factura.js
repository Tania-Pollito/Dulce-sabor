let total = 0;

function agregarAFactura(nombre, precio) {
  const lista = document.getElementById("lista-factura");
  const item = document.createElement("li");
  item.textContent = `${nombre} - $${precio.toFixed(2)}`;
  lista.appendChild(item);

  total += precio;
  document.getElementById("total").textContent = total.toFixed(2);
}
