using HtmlAgilityPack;
using Services.Models;
using System;
using System.Globalization;
using System.Threading;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Text;

namespace Services.Controllers
{
    public class AuthorsByLetterController : ApiController
    {
        // Not necessary. Since all letters are always listed.
        public ICollection<CategoryModel> GetCategories()
        {
            List<CategoryModel> models = new List<CategoryModel>();
            var html = new HtmlDocument();
            var htmlToLoad =
                GetHtml("http://misliicitati.blogspot.com/2010/11/blog-post_30.html#1");
            html.LoadHtml(htmlToLoad);
            // Select all 'span' nodes that have class attributes named 'headletter'.
            var result = html.DocumentNode.SelectNodes("//span[@class='headletter']");

            foreach (var item in result)
            {
                var categoryModel = new CategoryModel();
                categoryModel.Letter = item.InnerHtml[0];                
                
                models.Add(categoryModel);
            }

            return models;
        }

        public ICollection<FoundAuthorsModel> GetCategoryContent(string id)
        {           
            List<FoundAuthorsModel> categoryContent =
                new List<FoundAuthorsModel>();
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
                var categoryContentModel = new FoundAuthorsModel
                {
                    Name = item.Attributes[1].Value.Replace("Цитати на ", ""),
                    Http = item.Attributes[0].Value
                };
                categoryContent.Add(categoryContentModel);
            }

            return categoryContent;
        }

        public AuthorModel GetAuthor(string name, string url) {           

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
