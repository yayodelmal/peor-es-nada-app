import { Injectable } from '@angular/core';
import { Publicacion } from '../interface/publicacion'; // Importa la interfaz Publicacion

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  // Define una clave constante para el almacenamiento en sesión
  private readonly STORAGE_KEY = 'publicaciones';

  constructor() {}

  // Método para agregar una nueva publicación
  addPublicacion(publicacion: Publicacion): void {
    // Obtiene todas las publicaciones almacenadas en sesión
    const publicaciones = this.getAllPublicaciones();
    // Asigna un nuevo id a la publicación
    publicacion.id = publicaciones.length > 0 ? Math.max(...publicaciones.map(p => p.id || 0)) + 1 : 1;
    // Agrega la nueva publicación al array de publicaciones
    publicaciones.push(publicacion);
    // Guarda el array actualizado de publicaciones en el almacenamiento de sesión
    sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(publicaciones));
  }

  // Método para obtener todas las publicaciones
  getAllPublicaciones(): Publicacion[] {
    // Obtiene el valor almacenado en sesión para la clave definida
    const value = sessionStorage.getItem(this.STORAGE_KEY);
    // Si hay un valor, lo convierte de JSON a array de publicaciones, de lo contrario devuelve un array vacío
    return value ? JSON.parse(value) : [];
  }

  // Método para eliminar una publicación por su id
  deletePublicacion(id: number): void {
    // Obtiene todas las publicaciones almacenadas en sesión
    const publicaciones = this.getAllPublicaciones();
    // Filtra las publicaciones eliminando la que tiene el id proporcionado
    const filteredPublicaciones = publicaciones.filter(p => p.id !== id);
    // Guarda el array actualizado de publicaciones en el almacenamiento de sesión
    sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredPublicaciones));
  }
}
