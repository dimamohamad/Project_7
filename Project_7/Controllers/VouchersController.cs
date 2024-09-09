using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project_7.DTOs.VouchersDtos;
using Project_7.Models;

namespace Project_7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VouchersController(MyDbContext context) : ControllerBase
    {
        // GET: api/Vouchers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Voucher>>> GetVouchers()
        {
            return await context.Vouchers.ToListAsync();
        }

        // GET: api/Vouchers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Voucher>> GetVoucher(int id)
        {
            var voucher = await context.Vouchers.FindAsync(id);

            if (voucher == null)
            {
                return NotFound();
            }

            return voucher;
        }

        // PUT: api/Vouchers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVoucher(int id, VoucherDto voucherDto)
        {
            var voucher = await context.Vouchers.FindAsync(id);
            if (voucher == null)
            {
                return BadRequest();
            }

            voucher.EndDate = voucherDto.EndDate;
            voucher.StartDate = voucherDto.StartDate;
            voucher.DiscountPercentage = voucherDto.DiscountPercentage;
            voucher.IsActive = voucherDto.IsActive;
            voucher.VoucherCode = voucherDto.VoucherCode;

            context.Entry(voucher).State = EntityState.Modified;

            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VoucherExists(id))
                    return NotFound();

            }

            return NoContent();
        }

        // POST: api/Vouchers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Voucher>> PostVoucher(VoucherDto voucherDto)
        {
            var voucher = voucherDto.CreateVoucher();
            context.Vouchers.Add(voucher);
            await context.SaveChangesAsync();

            return CreatedAtAction("GetVoucher", new { id = voucher.VoucherId }, voucher);
        }

        // DELETE: api/Vouchers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVoucher(int id)
        {
            var voucher = await context.Vouchers.FindAsync(id);
            if (voucher == null)
            {
                return NotFound();
            }

            context.Vouchers.Remove(voucher);
            await context.SaveChangesAsync();

            return NoContent();
        }

        private bool VoucherExists(int id)
        {
            return context.Vouchers.Any(e => e.VoucherId == id);
        }
    }
}
