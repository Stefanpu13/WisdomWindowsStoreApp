using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Services.Models
{
    [DataContract]
    public class FoundAuthorsModel
    {
        [DataMember(Name="name")]
        public string Name { get; set; }

        [DataMember(Name="http")]
        public string Http { get; set; }

        
    }
}