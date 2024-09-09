using Microsoft.Build.Framework;
using Project_7.Models;

namespace Project_7.DTOs.VouchersDtos
{
    public class VoucherDto
    {
        [Required]
        public string VoucherCode { get; set; } = null!;

        [Required]
        public decimal DiscountPercentage { get; set; }

        [Required]
        public DateOnly StartDate { get; set; }

        [Required]
        public DateOnly EndDate { get; set; }

        [Required]
        public bool? IsActive { get; set; }

        public Voucher CreateVoucher()
        {
            return new Voucher
            {
                DiscountPercentage = DiscountPercentage,
                EndDate = EndDate,
                IsActive = IsActive,
                StartDate = StartDate,
                VoucherCode = VoucherCode
            };
        }
    }
}
