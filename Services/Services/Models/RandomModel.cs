using System;
using System.Linq;
using System.Runtime.Serialization;

namespace Services.Models
{
    [DataContract]
    public class RandomModel
    {
        [DataMember(Name="quote")]
        public string Quote { get; set; }

        [DataMember(Name = "author")]
        public string Author { get; set; }
    }
}