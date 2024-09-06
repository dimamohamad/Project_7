using System;
using System.Collections.Generic;

namespace Project_7.Models;

public partial class User
{
    public int UserId { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? UserName { get; set; }

    public string Email { get; set; } = null!;

    public byte[]? PasswordSalt { get; set; }

    public byte[]? PasswordHash { get; set; }

    public string? Passwword { get; set; }

    public string? UserImage { get; set; }

    public string? PhoneNumber { get; set; }

    public string? Address { get; set; }

    public string? Preferences { get; set; }

    public int? LoyaltyPoints { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual ICollection<Cart> Carts { get; set; } = new List<Cart>();

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}
