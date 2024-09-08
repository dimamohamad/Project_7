using System.Text;

namespace Project_7.DTOs
{
    public class PasswordHash
    {
        public static void Hasher(string password, out byte[] passwordHash ,out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password)); //trans from string to byte

            }
        }
        public static bool verifyPassword(string password , byte[] passwordHashUser , byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var passwordHash1 = hmac.ComputeHash(Encoding.UTF8.GetBytes (password));
                return passwordHash1.SequenceEqual(passwordHashUser);
            }
        }
    }
}
