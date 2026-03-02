using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class Cliente
{
    public int Id { get; set; }

    [Required(ErrorMessage = "El nombre es obligatorio")]
    [StringLength(100, ErrorMessage = "El nombre no puede superar los 100 caracteres")]
    public string Nombre { get; set; } = string.Empty;

    [Required(ErrorMessage = "El email es obligatorio")]
    [EmailAddress(ErrorMessage = "El email no tiene un formato válido")]
    public string Email { get; set; } = string.Empty;

    [Required]
    [RegularExpression("activo|inactivo", ErrorMessage = "El estado debe ser 'activo' o 'inactivo'")]
    public string Estado { get; set; } = "activo";

    public DateTime CreadoEn { get; set; } = DateTime.UtcNow;
}