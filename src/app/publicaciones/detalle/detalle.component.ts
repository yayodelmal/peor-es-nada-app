import { Component, Input, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { Publicacion } from '../../interface/publicacion';
import { CommonModule } from '@angular/common';
import { DateFormatPipe } from '../../pipes/date-format.pipe';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, DateFormatPipe],
})
export class DetalleComponent implements OnInit {
  @Input() publicacion!: Publicacion;

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    if (!this.publicacion) {
      console.error('Publicación no definida.');
      this.cerrarModal();
    }
  }

  cerrarModal() {
    this.modalController.dismiss();
  }
}
