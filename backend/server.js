require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

// Validar variables de entorno requeridas para Supabase
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
    console.error('Error grave: Las variables de entorno SUPABASE_URL y SUPABASE_KEY son requeridas.');
    process.exit(1);
}

// Inicializar el cliente de Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar CORS y parseo de cuerpo JSON
app.use(cors());
app.use(express.json());

// Endpoint para obtener los productos del catálogo
app.get('/api/products', (req, res) => {
    // Ruta absoluta hacia el catálogo de frontend
    const catalogPath = path.join(__dirname, '../frontend/products/catalog.json');
    
    fs.readFile(catalogPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el catálogo:', err);
            return res.status(500).json({ error: 'Error al obtener los productos.' });
        }
        
        try {
            const catalog = JSON.parse(data);
            res.json(catalog);
        } catch (parseErr) {
            console.error('Error al parsear el catálogo:', parseErr);
            res.status(500).json({ error: 'Error al procesar los datos del catálogo.' });
        }
    });
});

// Endpoint para registrar una consulta (lead) de producto
app.post('/api/inquiries', async (req, res) => {
    const { name, email, message, product } = req.body;

    // Validación básica de campos requeridos
    if (!name || !email || !message || !product) {
        return res.status(400).json({ error: 'Todos los campos son requeridos.' });
    }

    try {
        // Insertar consulta en la tabla 'inquiries' de Supabase
        const { error } = await supabase
            .from('inquiries')
            .insert([{ name, email, message, product }]);

        if (error) {
            console.error('Error al insertar en Supabase:', error);
            return res.status(500).json({ error: 'Error al registrar la consulta en la base de datos.' });
        }

        // Registro elegante en la consola del servidor con el prefijo requerido
        console.log('\nQuiet Luxury Lead Received:');
        console.log('=========================================');
        console.log(`- Cliente:  ${name}`);
        console.log(`- Email:    ${email}`);
        console.log(`- Producto: ${product}`);
        console.log(`- Mensaje:  ${message}`);
        console.log('=========================================\n');

        // Retornar respuesta exitosa
        res.status(200).json({ success: true, message: 'Consulta registrada de manera exitosa.' });
    } catch (err) {
        console.error('Error inesperado al registrar la consulta:', err);
        res.status(500).json({ error: 'Error inesperado al procesar la solicitud.' });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor Quiet Luxury corriendo en http://localhost:${PORT}`);
});
