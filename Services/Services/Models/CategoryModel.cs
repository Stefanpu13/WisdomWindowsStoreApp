using System;
using System.Linq;
using System.Runtime.Serialization;

namespace Services.Models
{
    [DataContract]
    public class CategoryModel
    {
        [DataMember(Name = "letter")]
        public char Letter { get; set; }
    }
}