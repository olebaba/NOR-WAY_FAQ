using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace NOR_WAY_FAQ.Models
{
    public class Sporsmal
    {
        [Key]
        public int ID { get; set; }
        public string Kategori { get; set; }
        public string Sporring { get; set; }
        public string Epost { get; set; }
        public string GodkjentSvar { get; set; }
        public string MuligeSvar { get; set; }
        public int Rating { get; set; }

    }
}
