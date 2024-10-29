import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ServicioProductoService } from '../servicio-producto.service';
import { ProductosComponent } from '../productos/productos.component';

@Component({
  selector: 'app-modificar-inventario',
  standalone: true,
  imports: [FormsModule, CommonModule, ProductosComponent],
  templateUrl: './modificar-inventario.component.html',
  styleUrls: ['./modificar-inventario.component.css']
})
export class ModificarInventarioComponent implements OnInit {

  productos: any[] = [];
  productoSeleccionado: any = null;
  cantidadModificar: number = 0;
  terminoBusqueda: string = '';

  // Inyección del servicio en el constructor
  constructor(private productoService: ServicioProductoService) {}

  // El código que utiliza el servicio debe estar en ngOnInit
  ngOnInit(): void {
    // Inicializamos los productos cuando el componente ya está listo
    this.productos = this.productoService.getProductos();
  }

  seleccionarProducto(producto: any): void {
    this.productoSeleccionado = producto;
  }

  onProductoSeleccionado(producto: any): void {
    this.productoSeleccionado = producto;
  }

  // Método para buscar un producto por su término de búsqueda
  buscarProducto(): void {
    const resultados = this.productoService.buscarProducto(this.terminoBusqueda);
    this.productoSeleccionado = resultados.length ? resultados[0] : null;
  }

  validarCantidad() {
    if (this.cantidadModificar < 1 || !Number.isInteger(this.cantidadModificar)) {
      this.cantidadModificar = 1;  // Asegura cantidad mínima
    }
  }

  // Método para modificar la cantidad de productos
  modificarCantidad(cantidad: number): void {
    try {
      const index = this.productos.indexOf(this.productoSeleccionado);
      this.productoService.modificarUnidades(index, cantidad);
      this.cantidadModificar = 0;  // Resetear el campo de cantidad después de modificar
    } catch (error : any) {
      alert(error.message);  // Mensaje de error si se intenta eliminar más de lo disponible
    }
  }
}
