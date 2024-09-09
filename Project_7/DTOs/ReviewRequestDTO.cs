namespace Project_7.DTOs
{
    public class ReviewRequestDTO
    {

        public int UserId { get; set; }
        public int? ProductId { get; set; }

        public int? Rating { get; set; }

        public string? Comment { get; set; }

    }
}
