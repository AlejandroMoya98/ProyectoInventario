import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ServicioProductoService } from '../servicio-producto.service';
import { ProductosComponent } from '../productos/productos.component';
import { Producto } from '../models/producto.model';



@Component({
  selector: 'app-modificar-inventario',
  standalone: true,
  imports: [FormsModule, CommonModule, ProductosComponent],
  templateUrl: './modificar-inventario.component.html',
  styleUrls: ['./modificar-inventario.component.css']
})
export class ModificarInventarioComponent implements OnInit {

  productos: Producto[] = [];
  productoSeleccionado: Producto | null = null;
  cantidadModificar: number = 0;
  terminoBusqueda: string = '';
  confirmarEliminacion: boolean = false; 

  // Inyección del servicio en el constructor
  constructor(private productoService: ServicioProductoService) {}

  // El código que utiliza el servicio debe estar en ngOnInit
  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productoService.getProductos().subscribe({
      next: (productos) => (this.productos = productos),
      error: (error) => console.error('Error al cargar productos:', error),
    });
  }

  

  onProductoSeleccionado(producto: any): void {
    this.productoSeleccionado = producto;
  }

 
 buscarProducto(): void {
  this.productoService.buscarProducto(this.terminoBusqueda).subscribe({
    next: (resultados) => {
      console.log('Resultados de la búsqueda:', resultados); 
      this.productos = resultados; 
      this.productoSeleccionado = resultados.length ? resultados[0] : null;
      if (!resultados.length) {
        alert("No se encontró ningún producto con ese término.");
      }
    },
    error: (err) => {
      console.error("Error al buscar producto:", err);
      alert("Ocurrió un error al buscar el producto. Intente nuevamente.");
    }
  });
 }

 resetearBusqueda(): void {
  this.terminoBusqueda = ''; 
  this.cargarProductos(); 
  this.productoSeleccionado = null; 
}

  validarCantidad() {
    if (this.cantidadModificar < 1 || !Number.isInteger(this.cantidadModificar)) {
      this.cantidadModificar = 1;  // Asegura cantidad mínima
    }
  }

  // Método para modificar la cantidad de productos
  modificarCantidad(cantidad: number): void {
    if (this.productoSeleccionado) {
      const nuevaCantidad = this.productoSeleccionado.cantidadProducto + cantidad;
      if (nuevaCantidad < 0) {
        alert("No se pueden eliminar más unidades de las disponibles.");
        return;
      }

      this.productoService.modificarUnidades(this.productoSeleccionado.id!, cantidad).subscribe(() => {
        this.productoSeleccionado!.cantidadProducto = nuevaCantidad;
        this.cantidadModificar = 0;
      });
    }
  }
   // Método para modificar el tipo de producto y precio
   modificarProducto(): void {
    if (this.productoSeleccionado) {
      this.productoService.modificarProducto(this.productoSeleccionado).subscribe(() => {
        alert("Producto modificado con éxito.");
      });
    }
  }

  // Método para eliminar el producto
  eliminarProducto(): void {
    if (this.productoSeleccionado) {
      this.productoService.eliminarProducto(this.productoSeleccionado.id!).subscribe(() => {
        alert("Producto eliminado con éxito.");
        this.productoSeleccionado = null;
        this.confirmarEliminacion = false;
        this.cargarProductos();
      });
    }
  }
}
