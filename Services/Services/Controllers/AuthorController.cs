using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web.Http;
using HtmlAgilityPack;
using Services.Models;

namespace Services.Controllers
{
    public class AuthorController : ApiController
    {
        public ICollection<URLModel> Get()
        {
            List<URLModel> models = new List<URLModel>();
            var html = new HtmlDocument();
            var htmlToLoad = GetHtml("http://misliicitati.blogspot.com/2010/11/blog-post_30.html");
            html.LoadHtml(htmlToLoad);
            var result = html.DocumentNode.SelectNodes("//a[@title]");

            foreach (var item in result)
            {
                var urlModel = new URLModel();
                urlModel.Title = item.InnerHtml;
                //urlModel.Title = item.Attributes["title"].Value;
                urlModel.Url = item.Attributes["href"].Value;
                models.Add(urlModel);
            }

            return models;
        }

        public static string GetHtml(string url)
        {
            HttpWebRequest myRequest = (HttpWebRequest)WebRequest.Create(url);
            myRequest.Method = "GET";
            WebResponse myResponse = myRequest.GetResponse();
            StreamReader sr = new StreamReader(myResponse.GetResponseStream(), System.Text.Encoding.UTF8);
            string result = sr.ReadToEnd();
            sr.Close();
            myResponse.Close();

            return result;
        }
    }
}
