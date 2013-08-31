using System;
using System.Linq;
using System.Runtime.Serialization;

namespace Services.Models
{
    [DataContract]
    public class UrlModel
    {
        [DataMember(Name = "title")]
        public string Title { get; set; }

        //[DataMember(Name = "title")]
        //public string Title { get; set; }

        [DataMember(Name = "url")]
        public string Url { get; set; }
    }
}