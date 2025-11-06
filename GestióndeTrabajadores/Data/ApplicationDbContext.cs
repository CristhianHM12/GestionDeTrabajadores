using System.Collections.Generic;
using GestióndeTrabajadores.Models;
using Microsoft.EntityFrameworkCore;

namespace GestióndeTrabajadores.Data
{
    public class ApplicationDbContext : DbContext
    {
        // Constructor que recibe las opciones de configuración (cadena de conexión, etc.)
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // Aquí registramos las tablas (entidades)
        public DbSet<Trabajador> Trabajadores { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Mapeamos la tabla si ya existe en la base de datos
            modelBuilder.Entity<Trabajador>().ToTable("Trabajadores");
        }
    }
}
