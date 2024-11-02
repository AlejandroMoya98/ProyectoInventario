import { Component , Input, Output, EventEmitter, OnInit, SimpleChanges, OnChanges} from '@angular/core';
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
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit, OnChanges {

  @Input() mostrarUltimaColumna: boolean = true;
  @Input() productoSeleccionadoExternamente: Producto | null = null; // Producto seleccionado externamente
 
  productos: Producto[] = [];
  productoSeleccionadoLocal: Producto | null = null;


  @Output() productoSeleccionadoEvent = new EventEmitter<Producto>();
  
  constructor(private productoService: ServicioProductoService) {}

  ngOnInit(): void {
    this.productos = this.productoService.getProductos();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productoSeleccionadoExternamente']) {
      this.productoSeleccionadoLocal = this.productoSeleccionadoExternamente;
    }

  }
  
  seleccionarProducto(producto: Producto): void {
    
    this.productoSeleccionadoLocal = producto;
    this.productoSeleccionadoEvent.emit(producto);  // Emite al componente padre
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