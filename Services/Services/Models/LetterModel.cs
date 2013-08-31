using System;
using System.Linq;
using System.Runtime.Serialization;

namespace Services.Models
{
    [DataContract]
    public class LetterModel
    {
        [DataMember(Name="name")]
        public string Name { get; set; }

        [DataMember(Name="http")]
        public string Http { get; set; }
    }
}