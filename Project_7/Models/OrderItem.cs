using System;
using System.Collections.Generic;

namespace Project_7.Models;

public partial class OrderItem
{
    public int OrderitemId { get; set; }

    public int? OrderId { get; set; }

    public int Quantity { get; set; }

    public decimal TotalPrice { get; set; }

    public int? ProductId { get; set; }

    public virtual Order? Order { get; set; }

    public virtual Product? Product { get; set; }
}
