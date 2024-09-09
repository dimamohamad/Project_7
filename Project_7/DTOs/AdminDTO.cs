namespace Project_7.DTOs
{
    public class AdminDTO
    {
        public string? AdminName { get; set; }

        public string Email { get; set; } = null!;

        public string? Password { get; set; }
    }
    public class AdminLoginDTO
    {
        public string Email { get; set; } = null!;

        public string? Password { get; set; }

    }
}
