using System;
using System.Collections.Generic;

namespace Project_7.Models;

public partial class Payment
{
    public int PaymentId { get; set; }

    public int? OrderId { get; set; }

    public decimal? Amount { get; set; }

    public string? PaymentMethod { get; set; }

    public string? TransactionId { get; set; }

    public DateTime? PaymentDate { get; set; }

    public string? PaymentGateway { get; set; }

    public string? Status { get; set; }

    public virtual Order? Order { get; set; }
}
