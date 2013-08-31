using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web.Http;
using Services.Models;
using HtmlAgilityPack;

namespace Services.Controllers
{
    public class CategoriesController : ApiController
    {
        public ICollection<ContentModel> GetAllCategories()
        {
            List<ContentModel> models = new List<ContentModel>();
            var html = new HtmlDocument();
            var htmlToLoad = GetHtml("http://misliicitati.blogspot.com/2010/12/blog-post.html");
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

        public ICollection<LetterModel> GetCategoryByLetter(string id)
        {
            List<LetterModel> categoryByLetter =
                new List<LetterModel>();
            var html = new HtmlDocument();
            var htmlToLoad =
                GetHtml("http://misliicitati.blogspot.com/2010/12/blog-post.html");
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
                    Name = item.Attributes[1].Value,
                    Http = item.Attributes[0].Value
                };
                categoryByLetter.Add(categoryContentModel);
            }

            return categoryByLetter;
        }

        public CategoryModel GetCategoryByName(string categoryName, string categoryUrl)
        {
            Dictionary<string, string> quotes = new Dictionary<string, string>();
            var category = new CategoryModel
            {
                CategoryTitle = categoryName,
                Quotes = quotes
            };
            var html = new HtmlDocument();
            var htmlToLoad = GetHtml(categoryUrl);
            html.LoadHtml(htmlToLoad);

            // 'li' that is descendent of 'ul', that is descendant
            //of 'div' with class ='post-outer'.
            var quotesFound = html.DocumentNode.SelectNodes("//div[@class='post-outer']//ul//li");
            var authors = html.DocumentNode.SelectNodes("//div[@class='post-outer']//div[@align]");

            for (int i = 0; i < quotesFound.Count; i++)
            {
                var authorsName = authors[i].LastChild;
                category.Quotes.Add(authorsName.InnerHtml, quotesFound[i].InnerHtml);
            }

            return category;
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
