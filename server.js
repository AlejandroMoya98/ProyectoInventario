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
  database: 'inventario'
});

db.connect((err) => {
  if (err) {
    console.error('Error de conexión a MySQL:', err.stack);
    return;
  }
  console.log('Conectado a MySQL con el ID de conexión:', db.threadId);
});

// Obtener todos los productos
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

// Obtener un producto específico por ID
app.get('/api/productos/:id', (req, res) => {
  const productoId = req.params.id;

  const sql = 'SELECT * FROM productos WHERE id = ?';

  db.query(sql, productoId, (error, results) => {
    if (error) {
      console.error('Error al obtener producto:', error);
      res.status(500).send('Error al obtener producto');
    } else if (results.length === 0) {
      res.status(404).send('Producto no encontrado');
    } else {
      res.json(results[0]);
    }
  });
});

// Agregar un nuevo producto
app.post('/api/productos', (req, res) => {
  const nuevoProducto = {
    tipoProducto: req.body.tipoProducto,
    precio: req.body.precio,
    cantidadProducto: req.body.cantidadProducto
  };

  const sql = 'INSERT INTO productos SET ?';

  db.query(sql, nuevoProducto, (error, results) => {
    if (error) {
      console.error('Error al agregar producto:', error);
      res.status(500).send('Error al agregar producto');
    } else {
      res.status(201).json({ success: true, id: results.insertId });
    }
  });
});

// Actualizar la cantidad de un producto (PATCH)

app.patch('/api/productos/:id', (req, res) => {
    const productoId = req.params.id;
    const cantidadModificada = req.body.cantidadProducto;
  
    db.query('SELECT cantidadProducto FROM productos WHERE id = ?', [productoId], (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Error en el servidor' });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
  
      const cantidadActual = results[0].cantidadProducto;
      const nuevaCantidad = cantidadActual + cantidadModificada;
  
      if (nuevaCantidad < 0) {
        return res.status(400).json({ error: 'No se pueden eliminar más unidades de las disponibles.' });
      }
  
      db.query('UPDATE productos SET cantidadProducto = ? WHERE id = ?', [nuevaCantidad, productoId], (err, results) => {
        if (err) {
          return res.status(500).json({ error: 'Error al actualizar el producto' });
        }
        res.json({ success: true, nuevaCantidad });
      });
    });
});

// Actualizar todos los detalles de un producto (PUT)
app.put('/api/productos/:id', (req, res) => {
  const productoId = req.params.id;
  const productoActualizado = {
    tipoProducto: req.body.tipoProducto,
    precio: req.body.precio,
    cantidadProducto: req.body.cantidadProducto
  };

  const sql = 'UPDATE productos SET ? WHERE id = ?';

  db.query(sql, [productoActualizado, productoId], (error, results) => {
    if (error) {
      console.error('Error al actualizar producto:', error);
      res.status(500).send('Error al actualizar producto');
    } else if (results.affectedRows === 0) {
      res.status(404).send('Producto no encontrado');
    } else {
      res.json({ success: true, message: 'Producto actualizado correctamente' });
    }
  });
});

// Eliminar un producto
app.delete('/api/productos/:id', (req, res) => {
  const productoId = req.params.id;

  const sql = 'DELETE FROM productos WHERE id = ?';

  db.query(sql, productoId, (error, results) => {
    if (error) {
      console.error('Error al eliminar producto:', error);
      res.status(500).send('Error al eliminar producto');
    } else if (results.affectedRows === 0) {
      res.status(404).send('Producto no encontrado');
    } else {
      res.json({ success: true, message: 'Producto eliminado correctamente' });
    }
  });
});
  

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
