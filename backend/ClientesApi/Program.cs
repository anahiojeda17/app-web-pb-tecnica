using Microsoft.EntityFrameworkCore;
using backend.Data;
using System.ComponentModel.DataAnnotations;
using backend.Models;

var builder = WebApplication.CreateBuilder(args);
//cors para la conexion con next.js
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=clientes.db"));

var app = builder.Build();

app.UseCors();

//endpoints 
//crear cliente 
app.MapPost("/api/clientes", async (Cliente cliente, AppDbContext db) =>
{
    var validacion = new System.ComponentModel.DataAnnotations.ValidationContext(cliente);
    var errores = new List<System.ComponentModel.DataAnnotations.ValidationResult>();
    
    if (!Validator.TryValidateObject(cliente, validacion, errores, true))
        return Results.BadRequest(errores.Select(e => e.ErrorMessage));

    db.Clientes.Add(cliente);
    await db.SaveChangesAsync();
    return Results.Created($"/api/clientes/{cliente.Id}", cliente);
});

//trae a todos los clientes creados 
app.MapGet("/api/clientes", async (AppDbContext db) =>
    await db.Clientes.ToListAsync());

//por id 
app.MapGet("/api/clientes/{id}", async (int id, AppDbContext db) =>
    await db.Clientes.FindAsync(id) is Cliente c ? Results.Ok(c) : Results.NotFound());

//modificar cliente 
app.MapPut("/api/clientes/{id}", async (int id, Cliente input, AppDbContext db) =>
{
    var cliente = await db.Clientes.FindAsync(id);
    if (cliente is null) return Results.NotFound();

    var validacion = new ValidationContext(input);
    var errores = new List<ValidationResult>();
    
    if (!Validator.TryValidateObject(input, validacion, errores, true))
        return Results.BadRequest(errores.Select(e => e.ErrorMessage));

    cliente.Nombre = input.Nombre;
    cliente.Email = input.Email;
    cliente.Estado = input.Estado;

    await db.SaveChangesAsync();
    return Results.Ok(cliente);
});

//eliminar cliente 
app.MapDelete("/api/clientes/{id}", async (int id, AppDbContext db) =>
{
    var cliente = await db.Clientes.FindAsync(id);
    if (cliente is null) return Results.NotFound();

    db.Clientes.Remove(cliente);

    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.Run();