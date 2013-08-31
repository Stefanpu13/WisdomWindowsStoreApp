using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Web.Http;
using Services.Models;

namespace Services.Controllers
{
    public class RandomController : ApiController
    {
        public RandomModel GetRandomQuote()
        {
            CategoriesController controller = new CategoriesController();
           
            var categories = controller.GetAllCategories();
            var randomCategory = categories.ElementAt(new Random().Next(0, categories.Count()));
           
            var quotes = controller.GetCategoryByName(randomCategory.Title, randomCategory.Url);
            var foundQuote = quotes.Quotes.ElementAt(new Random().Next(0, quotes.Quotes.Count));

            var randomQuote = new RandomModel(){Author = foundQuote.Key, Quote = foundQuote.Value};

            return randomQuote;
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
