import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosComponent } from '../productos/productos.component';
import { ProductoComponent } from '../producto/producto.component';
import { ServicioProductoService } from '../servicio-producto.service';
import { Producto } from '../models/producto.model';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ ProductosComponent, CommonModule, ProductoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

  constructor(private productoService: ServicioProductoService) {}

  agregarProducto(nuevoProducto: Producto) {
    this.productoService.agregarProducto(nuevoProducto).subscribe({
      next: () => console.log('Producto agregado con éxito.'),
      error: (err) => {
        console.error('Error al agregar producto:', err);
        alert('No se pudo agregar el producto. Intente nuevamente.');
      }
    });
  }
}
