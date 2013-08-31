using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;

namespace Services.Models
{
    [DataContract]
    public class AuthorModel
    {
        [DataMember(Name="name")]
        public string Name { get; set; }

        [DataMember(Name="quotes")]
        public ICollection<string> Quotes { get; set; }
    }
}