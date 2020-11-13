using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using NOR_WAY_FAQ.DAL;
using NOR_WAY_FAQ.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NOR_WAY_FAQ.Controllers
{
    [ApiController]
    // dekoratøren over må være med; dersom ikke må post og put bruke [FromBody] som deoratør inne i prameterlisten
    [Route("api/[controller]")]
    public class SporsmalController : ControllerBase
    {
        private readonly ISporsmalRepository _db;

        public SporsmalController(ISporsmalRepository db)
        {
            _db = db;
        }

        [HttpPost]
        public async Task<ActionResult> Lagre(Sporsmal sporsmal)
        {
            Console.WriteLine("Begynner lagring");
            if (ModelState.IsValid)
            {
                bool returOK = await _db.Lagre(sporsmal);
                if (!returOK)
                {
                    return BadRequest();
                }
                return Ok();
            }
            else
            {
                return BadRequest();
            }
                
        }

        [HttpGet]
        public async Task<ActionResult> HentAlle()
        {
            List<Sporsmal> alleSporsmal = await _db.HentAlle();
            return Ok(alleSporsmal);
        }

        [HttpGet("ubesvarte")]
        public List<Sporsmal> HentUbesvarte()
        {
            Console.WriteLine("Henter ubesvarte");
            List<Sporsmal> ubesvarteSporsmal = _db.HentUbesvarte();
            return ubesvarteSporsmal;
        }
        [HttpPut]

        public async Task<ActionResult> Endre(Sporsmal endretSporsmal)
        {
            Console.WriteLine("Endrer spørsmål");
            if (ModelState.IsValid)
            {
                bool returOK = await _db.Endre(endretSporsmal);
                if (!returOK)
                {
                    return BadRequest();
                }
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

    }
}
