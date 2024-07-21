import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Importa los módulos necesarios desde Angular Forms
import { CommonModule } from '@angular/common'; // Importa CommonModule desde Angular Common
import { IonicModule, ModalController } from '@ionic/angular'; // Importa IonicModule y ModalController desde Ionic Angular
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'; // Importa las funcionalidades de la cámara desde Capacitor
import { Publicacion } from '../../interface/publicacion'; // Importa la interfaz Publicacion
import { SessionStorageService } from '../../services/session-storage.service'; // Importa el servicio de almacenamiento en sesión

@Component({
  selector: 'app-crear', // Define el selector del componente
  templateUrl: './crear.component.html', // Especifica la ruta del archivo de plantilla HTML del componente
  styleUrls: ['./crear.component.scss'], // Especifica la ruta del archivo de estilos SCSS del componente
  standalone: true, // Indica que este es un componente independiente
  imports: [CommonModule, ReactiveFormsModule, IonicModule], // Especifica los módulos importados que el componente utilizará
})
export class CrearComponent {
  publicacionForm: FormGroup; // Declara un formulario de grupo para la publicación
  fotografia: string | null = null; // Variable para almacenar la fotografía capturada
  fotoTomada: boolean = false; // Variable para indicar si se ha tomado una fotografía

  constructor(
    private fb: FormBuilder, // Inyecta el FormBuilder para construir el formulario
    private modalController: ModalController, // Inyecta el controlador de modales
    private sessionStorageService: SessionStorageService // Inyecta el servicio de almacenamiento en sesión
  ) {
    // Inicializa el formulario de grupo con validaciones
    this.publicacionForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5)]], // Campo de título requerido con mínimo de 5 caracteres
      descripcion: ['', [Validators.required, Validators.minLength(20)]], // Campo de descripción requerido con mínimo de 20 caracteres
    });
  }

  // Método asíncrono para capturar una fotografía
  async capturarFotografia() {
    const image = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl, // Especifica que el resultado de la foto será una URL de datos
      source: CameraSource.Camera, // Especifica que la fuente será la cámara
    });
    this.fotografia = image.dataUrl ? image.dataUrl : null; // Asigna la URL de datos de la foto a la variable fotografía
    this.fotoTomada = !!this.fotografia; // Actualiza la variable fotoTomada para indicar que se ha tomado una fotografía
  }

  // Método para crear una nueva publicación
  crearPublicacion() {
    if (this.publicacionForm.valid && this.fotoTomada) { // Verifica si el formulario es válido y se ha tomado una fotografía
      const nuevaPublicacion: Publicacion = {
        id: null, // El ID se generará posteriormente
        fotografia: this.fotografia!, // Asigna la fotografía capturada
        titulo: this.publicacionForm.get('titulo')?.value, // Obtiene el valor del campo título
        fecha: new Date().toISOString(), // Asigna la fecha actual en formato ISO
        descripcion: this.publicacionForm.get('descripcion')?.value, // Obtiene el valor del campo descripción
      };
      this.modalController.dismiss(nuevaPublicacion); // Cierra el modal y pasa la nueva publicación creada
    } else {
      console.log('Formulario inválido o fotografía no tomada'); // Muestra un mensaje en la consola si el formulario no es válido o no se ha tomado una fotografía
    }
  }

  // Método para cerrar el modal sin crear una publicación
  cerrarModal() {
    this.modalController.dismiss(); // Cierra el modal sin pasar ningún dato
  }
}
