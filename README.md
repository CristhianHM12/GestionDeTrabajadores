# 🧰 Gestión de Trabajadores – Proyecto Final

**Autor:** Cristhian Huamán  
**Tecnologías:** ASP.NET Core MVC, Entity Framework Core, Bootstrap 5, JavaScript, SQL Server  

## 📘 Descripción
Módulo CRUD para la gestión de trabajadores.  
Permite registrar, editar, eliminar, buscar y filtrar empleados por sexo o estado.  
Incluye subida de fotografías, validación de datos, y diseño responsivo.

## 🏗️ Arquitectura
El sistema está basado en el patrón **MVC**:
- **Models:** definen las entidades (`Trabajador.cs`).
- **Views:** manejan la interfaz (`Index.cshtml` con modales dinámicos).
- **Controllers:** gestionan la lógica y conexión con la base de datos (`TrabajadoresController.cs`).

## ⚙️ Funcionalidades principales
- CRUD completo (Create, Read, Update, Delete)
- Filtro dinámico por nombre, sexo y estado
- Vista previa de fotos
- Diseño moderno con Bootstrap
- Modal responsivo para agregar/editar trabajadores

## ✅ Pruebas y QA
Se realizaron pruebas funcionales de:
- Registro de nuevo trabajador  
- Edición de datos  
- Eliminación con confirmación  
- Filtro por sexo y estado  
- Validación de campos vacíos  
> Documentadas en el archivo `Documento_QA.pdf`

## 🚀 Cómo ejecutar
1. Clonar el repositorio  
2. Configurar la cadena de conexión en `appsettings.json`  
3. Ejecutar el script SQL incluido  
4. Ejecutar desde Visual Studio o `dotnet run`

## 🔗 Enlaces
- 📂 **Repositorio GitHub:** [https://github.com/cristhianhm12/GestionDeTrabajadores](https://github.com/cristhianhm12/GestionDeTrabajadores)
- 🎥 **Video de presentación (Loom):** *(agrega tu enlace aquí)*
- 🧩 **Script de Base de Datos:** `/sql/trabajadores.sql`
