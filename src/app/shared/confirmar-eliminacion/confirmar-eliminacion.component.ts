import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmar-eliminacion',
  templateUrl: './confirmar-eliminacion.component.html',
  styleUrls: ['./confirmar-eliminacion.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class ConfirmarEliminacionComponent {
  @Input() publicacionId!: number;

  constructor(public modalController: ModalController) {}

  confirmarEliminacion() {
    this.modalController.dismiss(this.publicacionId);
  }

  cerrarModal() {
    this.modalController.dismiss(null);
  }
}
