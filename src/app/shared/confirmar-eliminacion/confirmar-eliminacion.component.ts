import { Component, Input, Output, EventEmitter } from '@angular/core'; // Importa los módulos necesarios desde Angular
import { IonicModule, ModalController } from '@ionic/angular'; // Importa IonicModule y ModalController desde Ionic Angular
import { CommonModule } from '@angular/common'; // Importa CommonModule desde Angular Common

@Component({
  selector: 'app-confirmar-eliminacion', // Define el selector para el componente
  templateUrl: './confirmar-eliminacion.component.html', // Especifica la ruta del archivo de plantilla HTML del componente
  styleUrls: ['./confirmar-eliminacion.component.scss'], // Especifica la ruta del archivo de estilos SCSS del componente
  standalone: true, // Indica que este es un componente independiente
  imports: [CommonModule, IonicModule], // Especifica los módulos importados que el componente utilizará
})
export class ConfirmarEliminacionComponent {
  @Input() publicacionId!: number; // Define una entrada (input) que recibe el ID de la publicación a eliminar

  constructor(public modalController: ModalController) {} // Inyecta el controlador de modales en el constructor

  // Método para confirmar la eliminación
  confirmarEliminacion() {
    this.modalController.dismiss(this.publicacionId); // Cierra el modal y pasa el ID de la publicación eliminada al componente padre
  }

  // Método para cerrar el modal sin eliminar
  cerrarModal() {
    this.modalController.dismiss(null); // Cierra el modal sin pasar ningún dato
  }
}
