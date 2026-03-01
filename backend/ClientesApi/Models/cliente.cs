namespace backend.Models;

public class Cliente
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Estado { get; set; } = "activo";
    public DateTime CreadoEn { get; set; } = DateTime.UtcNow;
}