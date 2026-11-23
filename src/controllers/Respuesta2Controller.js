import db from '../db/models/index.cjs';

/* Ir de Clientes a Pagos */
export const getPaymentsAndTotal = async (req, res) => {
  const id = req.params.id
  console.log(`/getPaymentsAndTotal invocado ! con ID ${id}`)

  let rpta = await db.customer.findOne({
    where: {
      customer_id: id
    },
    include: ['payments']
  })
  console.log(rpta)

  let pagos = rpta.get('payments')
  let total = pagos.reduce((total, p) => {
    return total + parseFloat(p.amount);
  }, 0);

  /* COnstruir la rpta */
  let obj = {
    ID: rpta.customer_id,
    nombre: rpta.first_name,
    apellido: rpta.last_name,
    total_pagado: total
  }

  return res.status(200).json({
    status: 'success',
    data: obj
  });
}

