import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ProductosComponent } from '../productos/productos.component';
import { ProductoComponent } from '../producto/producto.component';
import { ServicioProductoService } from '../servicio-producto.service';



interface Producto {
  tipoProducto: string;
  precio: number;
  cantidadProducto: number;
}


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, ProductosComponent, CommonModule, ProductoComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

  // property binding : [atributo de etiqueta html u otro a cambiar]="valor en .ts"
// al usar input radio usar para las dos opciones el mismo name en la etiqueta input y añadir value para cada uno excluyentes como s o n
// Después en función para darle una funcionalidad u otra con un if se toma como condicion event.target.value, haciendo un casting antes >
// (<HTMLInputElement>event.target).value . Comprobar si el tipo de la variable es HTMLIn... con un alert de event.target
//event binding : < (event como click)="función definida en .ts()" >, y si tengo que usar las propiedades del evento que se ha generado
//>(evento usado)="función($event)". En esa función definida en .ts definirla así : función(event: Event){} 

  // recordar usar notación typescript con su tipo de variable al definirlas
  // recordar usar this. al usar variables y demás creadas en la clase


  //productos: Producto[] = [];

  constructor(private productoService: ServicioProductoService) {}

  agregarProducto(nuevoProducto: Producto) {
    this.productoService.agregarProducto(nuevoProducto);
  }
  
  title = 'Inventario de productos';
  
}
