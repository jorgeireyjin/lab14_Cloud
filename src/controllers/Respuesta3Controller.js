import db from '../db/models/index.cjs';

/*
Mostrar a los clientes con una determinada cantidad de pagos
*/

export const getClientesConCantidadDePagos = async (req, res) => {
  const cantidad = parseInt(req.params.cantidad);
  console.log(`/getClientesConCantidadDePagos invocado ! con cantidad ${cantidad}`);

  let rpta = await db.customer.findAll({
    include: ['payments']
  })

  console.log(rpta)
  /// 1. Filtrar los clientes cuya cantidad de pagos coincida con el objetivo
  const filtrados = rpta.filter(c => c.payments.length === cantidad);
console.log(filtrados)
  // 2. (Opcional) Darle formato limpio al resultado sin devolver todo el array de pagos
  const resultado = filtrados.map(c => ({
    ID: c.customer_id,
    nombre: c.first_name,
    apellido: c.last_name,
    email: c.email,
    cantidad: c.payments.length
  }));

  return res.json({
    status: 'success',
    data: resultado
  });
}