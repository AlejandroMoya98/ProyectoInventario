const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); // Permite acceso desde tu app Angular
const app = express();

app.use(cors());
app.use(express.json());

// Configuración de conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '6655321',
  database: 'Inventario'
});

db.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL.');
});

// Ruta para obtener productos
app.get('/api/productos', (req, res) => {
    const sql = 'SELECT * FROM productos';
  
    db.query(sql, (error, results) => {
      if (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).send('Error al obtener productos');
      } else {
        res.json(results);  // Enviar los productos como JSON
      }
    });
  });

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
