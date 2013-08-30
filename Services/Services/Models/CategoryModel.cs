using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Services.Models
{
    [DataContract]
    public class CategoryModel
    {
        [DataMember(Name = "letter")]
        public char Letter { get; set; }
    }
}