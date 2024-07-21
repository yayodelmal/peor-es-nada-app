import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Publicacion } from '../../interface/publicacion';
import { SessionStorageService } from '../../services/session-storage.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonicModule]
})
export class CrearComponent {
  publicacionForm: FormGroup;
  fotografia: string | null = null;
  fotoTomada: boolean = false;

  constructor(private fb: FormBuilder, private modalController: ModalController, private sessionStorageService: SessionStorageService) {
    this.publicacionForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5)]],
      descripcion: ['', [Validators.required, Validators.minLength(20)]],
    });
  }

  async capturarFotografia() {
    const image = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });
    this.fotografia = image.dataUrl ? image.dataUrl : null;
    this.fotoTomada = !!this.fotografia;
  }

  crearPublicacion() {
    if (this.publicacionForm.valid && this.fotoTomada) {
      const nuevaPublicacion: Publicacion = {
        id: null,
        fotografia: this.fotografia!,
        titulo: this.publicacionForm.get('titulo')?.value,
        fecha: new Date().toISOString(),
        descripcion: this.publicacionForm.get('descripcion')?.value,
      };
      this.modalController.dismiss(nuevaPublicacion);
    } else {
      console.log('Formulario inválido o fotografía no tomada');
    }
  }

  cerrarModal() {
    this.modalController.dismiss();
  }
}
