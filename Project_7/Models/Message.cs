using System;
using System.Collections.Generic;

namespace Project_7.Models;

public partial class Message
{
    public int MessageId { get; set; }

    public int? UserId { get; set; }

    public string Content { get; set; } = null!;

    public DateTime? Timestamp { get; set; }

    public virtual User? User { get; set; }
}
