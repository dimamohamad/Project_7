using Project_7.Models;

namespace Project_7.DTOs
{
    public class OrderDto
    {
        public int OrderId { get; set; }

        //public string? Address { get; set; }

        //public int? UserId { get; set; }

        public decimal TotalAmount { get; set; }

        public DateTime? OrderDate { get; set; }

        public int? VoucherId { get; set; }

        public string? ShippingStatus { get; set; }

        public List<OrderItemDto> OrderItems { get; set; }

        public PaymentDto? Payment { get; set; }

        public VoucherDto? Voucher { get; set; }
    }

    public class OrderItemDto
    {
        public int OrderItemId { get; set; }

        public int Quantity { get; set; }

        public decimal TotalPrice { get; set; }
    }

    public class PaymentDto
    {
        public int PaymentId { get; set; }

        public decimal? Amount { get; set; }

        public string? PaymentMethod { get; set; }

        public string? TransactionId { get; set; }

        public DateTime? PaymentDate { get; set; }

        public string? Status { get; set; }
    }

    public class VoucherDto
    {
        public int VoucherId { get; set; }

        public string VoucherCode { get; set; } = null!;

        public decimal DiscountPercentage { get; set; }

        public DateOnly StartDate { get; set; }

        public DateOnly EndDate { get; set; }

        public bool? IsActive { get; set; }

    }
}
