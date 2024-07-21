import { Injectable } from '@angular/core';
import { Publicacion } from '../interface/publicacion';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  private readonly STORAGE_KEY = 'publicaciones';

  constructor() {}

  addPublicacion(publicacion: Publicacion): void {
    const publicaciones = this.getAllPublicaciones();
    publicacion.id = publicaciones.length > 0 ? Math.max(...publicaciones.map(p => p.id || 0)) + 1 : 1;
    publicaciones.push(publicacion);
    sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(publicaciones));
  }

  getAllPublicaciones(): Publicacion[] {
    const value = sessionStorage.getItem(this.STORAGE_KEY);
    return value ? JSON.parse(value) : [];
  }

  deletePublicacion(id: number): void {
    const publicaciones = this.getAllPublicaciones();
    const filteredPublicaciones = publicaciones.filter(p => p.id !== id);
    sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredPublicaciones));
  }
}
