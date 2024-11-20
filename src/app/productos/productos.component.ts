import { Component , Input, Output, EventEmitter, OnInit, SimpleChanges, OnChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicioProductoService } from '../servicio-producto.service';
import { Producto } from '../models/producto.model';




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
  @Input() productos: Producto[] = [];

 
  
  productoSeleccionadoLocal: Producto | null = null;


  @Output() productoSeleccionadoEvent = new EventEmitter<Producto>();
  
  constructor(private productoService: ServicioProductoService) {}

  ngOnInit() {
    this.cargarProductos();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productoSeleccionadoExternamente']) {
      this.productoSeleccionadoLocal = this.productoSeleccionadoExternamente;
    }

  }

  cargarProductos() {
    this.productoService.getProductos().subscribe((productos) => {
      this.productos = productos;
    });
  }
  
  seleccionarProducto(producto: Producto): void {
    
    this.productoSeleccionadoLocal = producto;
    this.productoSeleccionadoEvent.emit(producto);  // Emite al componente padre
  }


  modificarUnidades(index: number, cantidad: number) {
    const producto = this.productos[index];
    const nuevaCantidad = producto.cantidadProducto + cantidad;
    if (nuevaCantidad < 0) {
      alert("No se pueden eliminar más unidades de las disponibles.");
      return;
    }

    this.productoService.modificarUnidades(producto.id!, cantidad).subscribe(() => {
      producto.cantidadProducto = nuevaCantidad;
    });
  }
}

