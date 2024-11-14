import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ServicioProductoService } from '../servicio-producto.service';
import { ProductosComponent } from '../productos/productos.component';
import { Producto } from '../models/producto.model';

/*interface Producto {
  tipoProducto: string;
  precio: number;
  cantidadProducto: number;
}*/

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

  // Inyección del servicio en el constructor
  constructor(private productoService: ServicioProductoService) {}

  // El código que utiliza el servicio debe estar en ngOnInit
  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productoService.getProductos().subscribe((productos) => {
      this.productos = productos;
    });
  }

  /*seleccionarProducto(producto: any): void {
    this.productoSeleccionado = producto;
  } */

  onProductoSeleccionado(producto: any): void {
    this.productoSeleccionado = producto;
  }

  // Método para buscar un producto por su término de búsqueda
  buscarProducto(): void {
    this.productoService.buscarProducto(this.terminoBusqueda).subscribe((resultados) => {
      this.productoSeleccionado = resultados.length ? resultados[0] : null;
    });
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
}
