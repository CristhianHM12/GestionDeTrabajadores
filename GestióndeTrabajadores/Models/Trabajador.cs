using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GestióndeTrabajadores.Models
{
    [Table("Trabajadores")]
    public class Trabajador
    {
        [Key]
        public int Id { get; set; }

        [Required, StringLength(100)]
        public string Nombres { get; set; }

        [Required, StringLength(100)]
        public string Apellidos { get; set; }

        [Required, StringLength(20)]
        public string TipoDocumento { get; set; }

        [Required, StringLength(20)]
        public string NumeroDocumento { get; set; }

        [Required, StringLength(10)]
        public string Sexo { get; set; }

        [Required]
        public DateTime FechaNacimiento { get; set; }

        public byte[]? Foto { get; set; }

        [StringLength(200)]
        public string? Direccion { get; set; }

        [Required, StringLength(20)]
        public string Estado { get; set; } = "Activo";

        [NotMapped]
        public IFormFile? FotoArchivo { get; set; }
    }
}
