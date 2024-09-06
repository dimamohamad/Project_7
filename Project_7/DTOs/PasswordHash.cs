using System.Text;

namespace Project_7.DTOs
{
    public class PasswordHash
    {
        public static void Hasher(string password, out byte[] passwordhash ,out byte[] passwordsalt)
        {
            using (var l = new System.Security.Cryptography.HMACSHA512())
            {
                
                passwordsalt = l.Key;
                passwordhash = l.ComputeHash(Encoding.UTF8.GetBytes(password)); //trans from string to byte

            }
        }
    }
}
