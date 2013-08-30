using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;

namespace Services.Models
{
    [DataContract]
    public class CategoryQuotesModel
    {
        [DataMember(Name="title")]
        public string CategoryTitle { get; set; }

        [DataMember(Name="quotes")]
        public IDictionary<string, string> Quotes { get; set; }
    }
}