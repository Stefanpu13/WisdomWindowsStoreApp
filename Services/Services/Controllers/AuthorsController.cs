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
    public class AuthorsController : ApiController
    {
        public ICollection<ContentModel> GetAllAuthors()
        {
            List<ContentModel> models = new List<ContentModel>();
            var html = new HtmlDocument();
            var htmlToLoad = GetHtml("http://misliicitati.blogspot.com/2010/11/blog-post_30.html");
            html.LoadHtml(htmlToLoad);
            var result = html.DocumentNode.SelectNodes("//a[@title]");

            foreach (var item in result)
            {
                var urlModel = new ContentModel();
                urlModel.Title = item.InnerHtml;
                urlModel.Url = item.Attributes["href"].Value;
                models.Add(urlModel);
            }

            return models;
        }

        public ICollection<LetterModel> GetAuthorByLetter(string id)
        {           
            List<LetterModel> categoryContent =
                new List<LetterModel>();
            var html = new HtmlDocument();
            var htmlToLoad =
                GetHtml("http://misliicitati.blogspot.com/2010/11/blog-post_30.html#1");
            html.LoadHtml(htmlToLoad);
            // Select all 'a' nodes that are descendents of
            // div node with class attributes named 'post-outer',
            // and having title attribute.
            var result = html.DocumentNode.             
                SelectNodes("//div[@class='post-outer']//a[@title]").
                Where(node => node.InnerText.ToLower().
                    StartsWith(id.ToLower()));

            foreach (var item in result)
            {
                var categoryContentModel = new LetterModel
                {
                    Name = item.Attributes[1].Value.Replace("Цитати на ", ""),
                    Http = item.Attributes[0].Value
                };
                categoryContent.Add(categoryContentModel);
            }

            return categoryContent;
        }

        public AuthorModel GetAuthorByName(string name, string url) {           

            List<string> quotes = new List<string>();
            var author = new AuthorModel
            {
                Name = name,
                Quotes = quotes
            };
            var html = new HtmlDocument();
            var htmlToLoad =
                GetHtml(url);
            html.LoadHtml(htmlToLoad);

            // 'li' that is descendent of 'ul', that is descendant
            //of 'div' with class ='post-outer'.
            var result = 
                html.DocumentNode.
                SelectNodes("//div[@class='post-outer']//ul//li");

            foreach (var quote in result)
            {
                author.Quotes.Add(quote.InnerText);
            }

            return author;
        }

        public static string GetHtml(string url)
        {
            HttpWebRequest myRequest = (HttpWebRequest)WebRequest.Create(url);
            myRequest.Method = "GET";
            WebResponse myResponse = myRequest.GetResponse();
            StreamReader sr =
                new StreamReader(myResponse.GetResponseStream(), System.Text.Encoding.UTF8);
            string result = sr.ReadToEnd();
            sr.Close();
            myResponse.Close();

            return result;
        }
    }
}
