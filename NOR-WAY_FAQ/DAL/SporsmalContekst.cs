using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using NOR_WAY_FAQ.Models;

namespace NOR_WAY_FAQ.DAL
{
    public class SporsmalContext : DbContext
    {
        public SporsmalContext (DbContextOptions<SporsmalContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<Sporsmal> Sporsmal { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();
        }

    }
}
