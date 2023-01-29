using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Car
    {
        public int Id { get; set; }
        public string LicenseNumber { get; set; }
        public string Type { get; set; }
        public bool Booked { get; set; }
        public string Color { get; set; }
        public string Model { get; set; }
        public string Company { get; set; }
    }
}