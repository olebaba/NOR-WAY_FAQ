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
            //db.Database.EnsureDeleted();
            db.Database.EnsureCreated();

            var etSporsmal = new Sporsmal()
            {
                Epost = "minepost@mail.noo",
                Kategori = "Billetter",
                Sporring = "Hvor ofte går bussen?",
                GodkjentSvar = "For oversikt over avganger gå til avganger siden.",
                MuligeSvar = "Hver dag.@@@Kommer an på byen.",
                Rating = 5
            };

            var toSporsmal = new Sporsmal
            {
                Epost = "OlaNormann@norge.no",
                Kategori = "Ruter",
                Sporring = "Hvorfor går det ikke ruter til Sverige?",
                GodkjentSvar = "Foreløpig er grensen til Sverige stengt.",
                MuligeSvar = "Norge er best.@@@Det går ikke.",
                Rating = 1
            };

            var treSporsmal = new Sporsmal
            {
                Epost = "perhanse@mail.comm",
                Kategori = "Ruter",
                Sporring = "Jeg vil lage min egen rute!",
                GodkjentSvar = "Det er desverre ikke mulig.",
                MuligeSvar = "Jeg og.@@@Hvor da?",
                Rating = 34
            };

            db.Sporsmal.AddRange( etSporsmal, toSporsmal, treSporsmal );
            db.SaveChanges();
            Console.WriteLine(db.Sporsmal.Find(etSporsmal.ID));
        }
    }  
}
