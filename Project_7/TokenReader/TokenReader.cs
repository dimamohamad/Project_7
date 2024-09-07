using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Project_7.TokenReaderNS
{
    using Microsoft.IdentityModel.Tokens;
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using System.Text;

    public class TokenReader(IConfiguration configuration)
    {
        public ClaimsPrincipal? ValidateToken(string token)
        {
            var jwtSettings = configuration.GetSection("Jwt");
            var key = jwtSettings.GetValue<string>("Key");

            var tokenHandler = new JwtSecurityTokenHandler();
            var keyBytes = Encoding.UTF8.GetBytes(key);
            var validationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = jwtSettings.GetValue<string>("Issuer"),
                ValidAudience = jwtSettings.GetValue<string>("Audience"),
                IssuerSigningKey = new SymmetricSecurityKey(keyBytes),
                ClockSkew = TimeSpan.Zero // Optional: to avoid a clock skew issue
            };

            try
            {
                var principal = tokenHandler.ValidateToken(token, validationParameters, out SecurityToken validatedToken);
                return principal; // Returns the validated ClaimsPrincipal
            }
            catch (Exception ex)
            {
                // Token validation failed, return null or handle as needed
                Console.WriteLine($"Token validation failed: {ex.Message}");
                return null;
            }
        }
    }

}
