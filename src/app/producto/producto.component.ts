import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
//import { ServicioProductoService } from '../servicio-producto.service';


//(ngSubmit)="AgregarProducto()
//*ngIf="productos_en_inventario"
//<button type ="submit" class ="btn btn-primary" >Agregar Producto</button>

interface Producto {
  tipoProducto: string;
  precio: number;
  cantidadProducto: number;
}

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {

  @Output() productoCreado = new EventEmitter<Producto>();

  nuevoProducto = { tipoProducto: '', precio: 0, cantidadProducto: 0 };

  //constructor(private productoService: ServicioProductoService) {}

  crearProducto() {
    if (this.esValido()) {
      this.productoCreado.emit(this.nuevoProducto);
      this.nuevoProducto = { tipoProducto: '', precio: 0, cantidadProducto: 0 };  // Resetea el formulario
    }
  }
  esValido(): boolean {
    return this.nuevoProducto.precio > 0 && Number.isInteger(this.nuevoProducto.cantidadProducto) && this.nuevoProducto.cantidadProducto > 0;
  }

  validarPrecio() {
    // Limitar a dos decimales
    this.nuevoProducto.precio = parseFloat(this.nuevoProducto.precio.toFixed(2));
    if (this.nuevoProducto.precio <= 0) {
      this.nuevoProducto.precio = 0.01;  // Valor mínimo permitido
    }
  }

  validarCantidad() {
    if (this.nuevoProducto.cantidadProducto < 1 || !Number.isInteger(this.nuevoProducto.cantidadProducto)) {
      this.nuevoProducto.cantidadProducto = 1;  // Asegura cantidad mínima
    }
  }

  
}
