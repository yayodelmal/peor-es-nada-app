import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Publicacion } from '../../interface/publicacion';
import { DetalleComponent } from '../detalle/detalle.component';
import { ConfirmarEliminacionComponent } from '../../shared/confirmar-eliminacion/confirmar-eliminacion.component';
import { CrearComponent } from '../crear/crear.component';
import { addIcons } from 'ionicons';
import { addCircleOutline, trashOutline, addOutline } from 'ionicons/icons';
import { DateFormatPipe } from '../../pipes/date-format.pipe';
import { SessionStorageService } from '../../services/session-storage.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, DateFormatPipe],
})
export class ListarComponent implements OnInit {
  publicaciones: Publicacion[] = [];

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private router: Router,
    private sessionStorageService: SessionStorageService
  ) {
    addIcons({
      'add-circle-outline': addCircleOutline,
      'trash-outline': trashOutline,
      'add-outline': addOutline,
    });
  }

  ngOnInit() {
    this.cargarPublicaciones();
  }

  cargarPublicaciones() {
    this.publicaciones = this.sessionStorageService.getAllPublicaciones();
    console.log('Publicaciones cargadas:', this.publicaciones);
  }

  async abrirDetallePublicacion(publicacion: Publicacion) {
    const modal = await this.modalController.create({
      component: DetalleComponent,
      componentProps: {
        publicacion: publicacion,
      },
    });
    return await modal.present();
  }

  async confirmarEliminarPublicacion(publicacion: Publicacion) {
    const modal = await this.modalController.create({
      component: ConfirmarEliminacionComponent,
      componentProps: {
        publicacionId: publicacion.id,
      },
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.eliminarPublicacion(result.data);
      }
    });

    return await modal.present();
  }

  eliminarPublicacion(publicacionId: number) {
    this.sessionStorageService.deletePublicacion(publicacionId);
    this.cargarPublicaciones();
  }

  async navegarCrearPublicacion() {
    const modal = await this.modalController.create({
      component: CrearComponent,
    });

    modal.onDidDismiss().then((data) => {
      if (data.data) {
        this.sessionStorageService.addPublicacion(data.data);
        this.cargarPublicaciones();
      }
    });

    return await modal.present();
  }
}
