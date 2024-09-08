using System;
using System.Collections.Generic;

namespace Project_7.Models;

public partial class Order
{
    public int OrderId { get; set; }

    public string? Address { get; set; }

    public int? UserId { get; set; }

    public decimal TotalAmount { get; set; }

    public DateTime? OrderDate { get; set; }

    public int? VoucherId { get; set; }

    public string? ShippingStatus { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();

    public virtual User? User { get; set; }

    public virtual Voucher? Voucher { get; set; }
}
