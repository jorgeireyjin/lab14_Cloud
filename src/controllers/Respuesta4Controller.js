import db from '../db/models/index.cjs';

export const getConteoPorVocal = async (req, res) => {
    try {
        // 1. Obtener y normalizar la vocal enviada en el parámetro de la URL
        const vocal = req.params.vocal.toLowerCase();

        const vocalesPermitidas = ['a', 'e', 'i', 'o', 'u'];

        if (!vocal || !vocalesPermitidas.includes(vocal)) {
            return res.status(400).json({
                status: 'error',
                msg: 'Debes enviar una vocal válida (a, e, i, o, u)'
            });
        }

        // 2. Traer solo los nombres desde PostgreSQL
        const clientes = await db.customer.findAll({
            attributes: ['first_name'], // Si deseas incluir apellidos, agrega 'last_name'
        });

        // 3. Contar cuántas veces aparece esa vocal en todos los nombres
        const total = clientes.reduce((cuenta, cliente) => {
            const letras = cliente.first_name.toLowerCase().split('');
            const aparicionesEnNombre = letras.filter(letra => letra === vocal).length;
            return cuenta + aparicionesEnNombre;
        }, 0);

        let obj = {
            vocal : vocal,
            total : total
        }

        // 4. Retornar la respuesta JSON
        return res.status(200).json({
            status: 'success',
            data: obj
        });

    } catch (error) {
        console.error('Error al contar vocal:', error);
        return res.status(500).json({
            status: 'error',
            msg: 'Error interno del servidor'
        });
    }
};