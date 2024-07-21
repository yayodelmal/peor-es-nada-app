import { Component, Input, OnInit } from '@angular/core'; // Importa los módulos necesarios desde Angular Core
import { IonicModule, ModalController } from '@ionic/angular'; // Importa IonicModule y ModalController desde Ionic Angular
import { Publicacion } from '../../interface/publicacion'; // Importa la interfaz Publicacion
import { CommonModule } from '@angular/common'; // Importa CommonModule desde Angular Common
import { DateFormatPipe } from '../../pipes/date-format.pipe'; // Importa el pipe para formatear fechas

@Component({
  selector: 'app-detalle', // Define el selector del componente
  templateUrl: './detalle.component.html', // Especifica la ruta del archivo de plantilla HTML del componente
  styleUrls: ['./detalle.component.scss'], // Especifica la ruta del archivo de estilos SCSS del componente
  standalone: true, // Indica que este es un componente independiente
  imports: [CommonModule, IonicModule, DateFormatPipe], // Especifica los módulos importados que el componente utilizará
})
export class DetalleComponent implements OnInit {
  @Input() publicacion!: Publicacion; // Define una propiedad de entrada que recibe una publicación

  constructor(private modalController: ModalController) {} // Inyecta el controlador de modales en el constructor

  ngOnInit() {
    // Método del ciclo de vida que se ejecuta después de la inicialización del componente
    if (!this.publicacion) {
      // Verifica si la publicación no está definida
      console.error('Publicación no definida.'); // Muestra un mensaje de error en la consola
      this.cerrarModal(); // Cierra el modal si la publicación no está definida
    }
  }

  cerrarModal() {
    // Método para cerrar el modal
    this.modalController.dismiss(); // Cierra el modal sin pasar ningún dato
  }
}
