import { Component, OnInit } from '@angular/core'; // Importa los módulos necesarios desde Angular Core
import { CommonModule } from '@angular/common'; // Importa CommonModule desde Angular Common
import { IonicModule, ModalController, AlertController } from '@ionic/angular'; // Importa IonicModule, ModalController y AlertController desde Ionic Angular
import { Router } from '@angular/router'; // Importa Router desde Angular Router
import { Publicacion } from '../../interface/publicacion'; // Importa la interfaz Publicacion
import { DetalleComponent } from '../detalle/detalle.component'; // Importa el componente DetalleComponent
import { ConfirmarEliminacionComponent } from '../../shared/confirmar-eliminacion/confirmar-eliminacion.component'; // Importa el componente ConfirmarEliminacionComponent
import { CrearComponent } from '../crear/crear.component'; // Importa el componente CrearComponent
import { addIcons } from 'ionicons'; // Importa la función addIcons desde ionicons
import { addCircleOutline, trashOutline, addOutline } from 'ionicons/icons'; // Importa los íconos necesarios desde ionicons
import { DateFormatPipe } from '../../pipes/date-format.pipe'; // Importa el pipe para formatear fechas
import { SessionStorageService } from '../../services/session-storage.service'; // Importa el servicio de almacenamiento en sesión

@Component({
  selector: 'app-listar', // Define el selector del componente
  templateUrl: './listar.component.html', // Especifica la ruta del archivo de plantilla HTML del componente
  styleUrls: ['./listar.component.scss'], // Especifica la ruta del archivo de estilos SCSS del componente
  standalone: true, // Indica que este es un componente independiente
  imports: [CommonModule, IonicModule, DateFormatPipe], // Especifica los módulos importados que el componente utilizará
})
export class ListarComponent implements OnInit {
  publicaciones: Publicacion[] = []; // Declara una propiedad para almacenar las publicaciones

  constructor(
    private modalController: ModalController, // Inyecta el controlador de modales
    private alertController: AlertController, // Inyecta el controlador de alertas
    private router: Router, // Inyecta el router
    private sessionStorageService: SessionStorageService // Inyecta el servicio de almacenamiento en sesión
  ) {
    // Agrega los íconos necesarios
    addIcons({
      'add-circle-outline': addCircleOutline,
      'trash-outline': trashOutline,
      'add-outline': addOutline,
    });
  }

  ngOnInit() {
    // Método del ciclo de vida que se ejecuta después de la inicialización del componente
    this.cargarPublicaciones(); // Carga las publicaciones cuando se inicializa el componente
  }

  cargarPublicaciones() {
    // Método para cargar las publicaciones desde el almacenamiento en sesión
    this.publicaciones = this.sessionStorageService.getAllPublicaciones(); // Obtiene todas las publicaciones
    console.log('Publicaciones cargadas:', this.publicaciones); // Muestra las publicaciones en la consola
  }

  async abrirDetallePublicacion(publicacion: Publicacion) {
    // Método para abrir el modal de detalles de una publicación
    const modal = await this.modalController.create({
      component: DetalleComponent, // Especifica el componente del modal
      componentProps: {
        publicacion: publicacion, // Pasa la publicación como propiedad del componente
      },
    });
    return await modal.present(); // Presenta el modal
  }

  async confirmarEliminarPublicacion(publicacion: Publicacion) {
    // Método para confirmar la eliminación de una publicación
    const modal = await this.modalController.create({
      component: ConfirmarEliminacionComponent, // Especifica el componente del modal
      componentProps: {
        publicacionId: publicacion.id, // Pasa el ID de la publicación como propiedad del componente
      },
    });

    modal.onDidDismiss().then((result) => {
      // Se ejecuta cuando se cierra el modal
      if (result.data) {
        this.eliminarPublicacion(result.data); // Elimina la publicación si se confirma la eliminación
      }
    });

    return await modal.present(); // Presenta el modal
  }

  eliminarPublicacion(publicacionId: number) {
    // Método para eliminar una publicación
    this.sessionStorageService.deletePublicacion(publicacionId); // Elimina la publicación del almacenamiento en sesión
    this.cargarPublicaciones(); // Recarga las publicaciones después de eliminar
  }

  async navegarCrearPublicacion() {
    // Método para navegar a la creación de una nueva publicación
    const modal = await this.modalController.create({
      component: CrearComponent, // Especifica el componente del modal
    });

    modal.onDidDismiss().then((data) => {
      // Se ejecuta cuando se cierra el modal
      if (data.data) {
        this.sessionStorageService.addPublicacion(data.data); // Agrega la nueva publicación al almacenamiento en sesión
        this.cargarPublicaciones(); // Recarga las publicaciones después de agregar
      }
    });

    return await modal.present(); // Presenta el modal
  }
}
