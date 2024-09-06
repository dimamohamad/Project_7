using System;
using System.Collections.Generic;

namespace Project_7.Models;

public partial class ContactU
{
    public int MessageId { get; set; }

    public string? Name { get; set; }

    public string? Email { get; set; }

    public string? Subject { get; set; }

    public string? Message { get; set; }

    public DateTime? SubmittedAt { get; set; }
}
