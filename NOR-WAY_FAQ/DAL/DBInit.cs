using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using NOR_WAY_FAQ.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NOR_WAY_FAQ.DAL
{
    public static class DBInit
    {
        public static void Seed(IApplicationBuilder app)
        {
            var serviceScope = app.ApplicationServices.CreateScope();
            
            var db = serviceScope.ServiceProvider.GetService<SporsmalContext>();

            // må slette og opprette databasen hver gang når den skal initieres (seed`es)
            db.Database.EnsureDeleted();
            db.Database.EnsureCreated();

            var etSporsmal = new Sporsmal()
            {
                Epost = "minepost@mail.noo",
                Sporring = "Hvor ofte går bussen?",
                GodkjentSvar = "For oversikt over avganger gå til <a href='#'>avganger</a >.",
                MuligeSvar = "Hver dag." + ", " + "Kommer an på byen."
            };

            db.Sporsmal.Add(etSporsmal);
            db.SaveChanges();
            Console.WriteLine(db.Sporsmal.Find(etSporsmal.ID));
        }
    }  
}
