// ------------------------------------------------------------------
// DETALLES INTERESANTES DE ESTE SERVIDOR BÁSICO DE APIs
// 
// "require" carga el paquete que se instaló al inicio con NPM y lo
// busca en la carpeta "node_modules".
// "require" es complementario a "module.export", mientras que el primero
// tre algo xe un archivo externo, el segundo EXPORTA lo que se quiere compartir.
// esto último se puede ver en el manejo de ./data/productos.js. 
//
// Otra parte muy interesante es:      const app = express();
// Por lo que entiendo REQUIRE le asignó a EXPRESS ciertas características de
// objeto y la convirtió en una función. Esta funcionalidad se la traslada a APP
// con el cuál podremos manejar nuestro servidor. Practicamente APP sería 
// nuestro servidor de API.
//
// Lobonick
// ------------------------------------------------------------------

const express = require('express');
const app = express();
const PORT = 3000;
const productos = require('./data/productos');

// Middleware para parsear JSON
app.use(express.json());

// Ruta básica
app.get('/', (req, res) => {
    res.json({
        mensaje: 'Bienvenido a MI PRIMERA API de Productos',
        version: '1.0.0',
        endpoints: [
            'GET /api/productos - Listar todos los productos',
            // La disposición de la RUTAS van de la mano con los
            // los diferentes ENDPOINTS a ofrecer.
        ]
    });
});

// ----------------------------------------------------------------
// CONFIGURACIÓN CONSUMO -  Aquí se configura lo que el USUARIO 
//                          podría consumir.
// ----------------------------------------------------------------

// estos GET me permiten configurar mis ENDPOINTS
app.get('/api/productos', (req, res) => {
    res.json({
        total: productos.length,        // ESTE GET USA LA RUTA DEL ENDPOINT
        productos: productos
    });
});


// ----------------------------------------------------------------
// CONFIGURACIÓN FINAL - Me imagino que se complicará luego.
// ----------------------------------------------------------------

app.use((req, res) => {
    res.status(404).json({
        error: 'Endpoint no encontrado',    // VALIDA UBICACIÓN
        ruta: req.url
    });
});

// PONE EN ESCUCHA AL SERVIDOR
app.listen(PORT, () => {
    console.log(`✓ Servidor corriendo en http://localhost:${PORT}`);
});

