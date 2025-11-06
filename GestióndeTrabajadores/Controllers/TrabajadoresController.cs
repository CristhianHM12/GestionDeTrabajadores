using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GestióndeTrabajadores.Data;
using GestióndeTrabajadores.Models;
using System;

namespace GestióndeTrabajadores.Controllers
{
    public class TrabajadoresController : Controller
    {
        private readonly ApplicationDbContext _context;

        public TrabajadoresController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ✅ LISTAR TRABAJADORES
        public async Task<IActionResult> Index()
        {
            var trabajadores = await _context.Trabajadores.ToListAsync();
            return View(trabajadores);
        }

        // ✅ CREAR (POST) — desde modal (AJAX)
        [HttpPost]
        public async Task<IActionResult> Create(Trabajador trabajador)
        {
            try
            {
                if (trabajador.FotoArchivo != null && trabajador.FotoArchivo.Length > 0)
                {
                    using var ms = new MemoryStream();
                    await trabajador.FotoArchivo.CopyToAsync(ms);
                    trabajador.Foto = ms.ToArray();
                }

               

                _context.Add(trabajador);
                await _context.SaveChangesAsync();

                return Json(new { success = true });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        // ✅ EDITAR (GET) — devuelve JSON para llenar modal
        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            var trabajador = await _context.Trabajadores.FindAsync(id);
            if (trabajador == null) return NotFound();

            var data = new
            {
                id = trabajador.Id,
                nombres = trabajador.Nombres,
                apellidos = trabajador.Apellidos,
                numeroDocumento = trabajador.NumeroDocumento,
                tipoDocumento = trabajador.TipoDocumento,
                sexo = trabajador.Sexo,
                fechaNacimiento = trabajador.FechaNacimiento.ToString("yyyy-MM-dd"),
                direccion = trabajador.Direccion,
                estado = trabajador.Estado,
                fotoUrl = trabajador.Foto != null
                    ? $"data:image/png;base64,{Convert.ToBase64String(trabajador.Foto)}"
                    : "/img/default-user.png"
            };

            return Json(data);
        }

        
        // ✅ EDITAR (POST)
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(Trabajador trabajador)
        {
            try
            {
                var existente = await _context.Trabajadores.FindAsync(trabajador.Id);
                if (existente == null)
                    return NotFound();

                existente.Nombres = trabajador.Nombres;
                existente.Apellidos = trabajador.Apellidos;
                existente.NumeroDocumento = trabajador.NumeroDocumento;
                existente.Sexo = trabajador.Sexo;
                existente.FechaNacimiento = trabajador.FechaNacimiento;
                existente.Estado = trabajador.Estado;
                existente.Direccion = trabajador.Direccion;

                if (trabajador.FotoArchivo != null && trabajador.FotoArchivo.Length > 0)
                {
                    using var ms = new MemoryStream();
                    await trabajador.FotoArchivo.CopyToAsync(ms);
                    existente.Foto = ms.ToArray();
                }

                _context.Update(existente);
                await _context.SaveChangesAsync();

                return Ok();
            }
            catch (DbUpdateException dbEx)
            {
                var inner = dbEx.InnerException?.Message ?? "Sin detalle interno.";
                Console.WriteLine($"💥 Error al actualizar trabajador: {inner}");
                return BadRequest($"Error al editar trabajador: {inner}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Error general: {ex.Message}");
                return BadRequest($"Error al editar trabajador: {ex.Message}");
            }
        }


        // ✅ ELIMINAR
        [HttpPost]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var trabajador = await _context.Trabajadores.FindAsync(id);
            if (trabajador == null)
                return NotFound();

            _context.Trabajadores.Remove(trabajador);
            await _context.SaveChangesAsync();

            return Json(new { success = true });
        }
    }
}
