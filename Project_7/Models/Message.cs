using System;
using System.Collections.Generic;

namespace Project_7.Models;

public partial class Message
{
    public int Id { get; set; }

    public string? User { get; set; }

    public string? Content { get; set; }

    public DateTime? Timestamp { get; set; }
}
