using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using NewCarSmell.Data;
using NewCarSmell.Models;

namespace NewCarSmell.BLL
{
	public class AuthService
	{
		NewCarSmellContext _context;
		public AuthService() { 
			_context = new NewCarSmellContext();
		}

		public async Task<User> Authenticate(User user)
		{
			try
			{
				 
                return _context.Users.FirstOrDefault(x => x.Username == user.Username && x.PasswordHash == user.PasswordHash);
            }
			catch (Exception ex)
			{
				throw ex;
			}
		}

		public async Task<User> Register(User user)
		{
			try
			{
				user.Role = "User";
				_context.Users.Add(user);
				await _context.SaveChangesAsync();
				return user;
			}
			catch (Exception ex)
			{
				throw ex;
			}
		}
	}
}