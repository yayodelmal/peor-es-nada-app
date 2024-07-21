# peor-es-nada-app
 ionic v8, angular v18 standalone

### Inicializar proyecto

**Crear un Nuevo Proyecto Ionic con Angular**:

```bach
ionic start peor-es-nada-app blank --type=angular
```

Se debe seleccionar la opción *Standalone*.

**Configurar Capacitor**:

```bash
ionic integrations enable capacitor
```

**Instalar dependencias necesarias**.

```bash
npm install @capacitor/camera @capacitor/ios @capacitor/android
```

**Configura Capacitor para la plataforma deseada (iOS, Android, Web)**:

```bash
npx cap add ios
npx cap add android
```

### Estructura básica del Proyecto

**Crear Componentes Standalone**:

Crear publicaciones
```bash
ionic g component publicaciones/crear --standalone
```

Listar publicaciones
```bash
ionic g component publicaciones/listar --standalone
```

Detalle de publicación
```bash
ionic g component publicaciones/detalle --standalone
```

Shared component para eliminar publicación
```bash
ionic g component shared/confirmar-eliminacion --standalone
```

**Crear una Interfaz para las Publicaciones**:

Crear interface
```bash
ionic g interface interface/publicacion
```

Definir interface de Publicación en `interface/publicacion.ts`
```js
export interface Publicacion {
  id: number | null;
  fotografia: string;
  titulo: string;
  fecha: string;
  descripcion: string;
}
```

**Configurar el app.routes.ts**:

```js
import { Routes } from '@angular/router';

export const routes: Routes = [

	{
		path: '',
		redirectTo: 'publicaciones/listar',
		pathMatch: 'full',
	},
	{
		path: 'publicaciones/listar',	
		loadComponent: () => import('./publicaciones/listar/listar.component').then((m) => m.ListarComponent),
	},
];

```

Para comprobar que la configuración está correcta, levantar el proyecto con `npm run start`.
Se debe obtener como respuesta `listar works!` en `http://localhost:4200/`

### Crear Pipes para fecha de publicación

```bash
ionic g pipe pipes/date-format
```

```js
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
  standalone: true,
})

export class DateFormatPipe implements PipeTransform {

  transform(value: string | Date, ...args: any[]): string {
    const date = new Date(value);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Intl.DateTimeFormat('es-ES', options).format(date);
  }

}
```

De esta forma se puede mostrar la fecha como: `21 de julio de 2024, 14:35`.

### Persistencia de forma local en sesión

```bash
ionic g service services/session-storage
```
