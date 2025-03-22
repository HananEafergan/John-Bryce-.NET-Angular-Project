using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using NewCarSmell.Data;
using NewCarSmell.Models;

namespace NewCarSmell.BLL
{
    public class ManageUsersService
    {
        readonly NewCarSmellContext _context;

        public ManageUsersService()
        {
            _context = new NewCarSmellContext();
        }

        public async Task<List<User>> GetUsers()
        {
            try
            {
                return await _context.Users.ToListAsync();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> UpdateUser(User user)
        {
            try
            {
                User userToUpdate = await _context.Users.FirstOrDefaultAsync(u => u.UserID == user.UserID);
                if (userToUpdate == null)
                {
                    return false;
                }

                _context.Users.AddOrUpdate(user);
                await _context.SaveChangesAsync();

                return true;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> DeleteUser(int userId)
        {
            try
            {
                User userToDelete = await _context.Users.FirstOrDefaultAsync(u => u.UserID == userId);
                if (userToDelete == null)
                {
                    return false;
                }

                _context.Users.Remove(userToDelete);
                await _context.SaveChangesAsync();

                return true;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}