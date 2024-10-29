import { Component , Input, Output, EventEmitter, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicioProductoService } from '../servicio-producto.service';

interface Producto {
  tipoProducto: string;
  precio: number;
  cantidadProducto: number;
}

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit {

  @Input() mostrarUltimaColumna: boolean = true;
 
  productos: Producto[] = [];

  @Output() productoSeleccionado = new EventEmitter<any>();
  
  constructor(private productoService: ServicioProductoService) {}

  ngOnInit(): void {
    this.productos = this.productoService.getProductos();
  }
  
  seleccionarProducto(producto: any): void {
    this.productoSeleccionado.emit(producto);
  }


  modificarUnidades(index: number, cantidad: number) {
    try {
      this.productoService.modificarUnidades(index, cantidad);
    } catch (error : any) {
      alert(error.message);  // Muestra una alerta si intentas eliminar más unidades de las disponibles.
    }

}
}

/*<p style="text-align: center; font-weight: bold;">Lista de productos</p>
<ul>
    <li *ngFor="let producto of productos">
      {{ producto.tipoProducto }} - Precio: {{ producto.precio }} - Cantidad: {{ producto.cantidadProducto }} - Coste: {{ coste(producto) }}
    </li>
</ul>*/