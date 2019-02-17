var url = 'https://newsapi.org/v2/everything?' +
		  'q=Netflix&' +
		  'from=2019-01-18&' +
          'sortBy=relevancy&' +
		  'apiKey=a8dbd77c199d4d229320b8bf08704f7b';
		  
var content =
document.querySelector('#content');
//The querySelector("p") 取得文件中第一個<p>元素
//The querySelector(".example") 取得文件中class="example"的第一個元素
//The querySelector("#demo") 取得文件中id="demo"的元素
//Note: The querySelector() method only returns the first element that matches the specified selectors. To return all the matches, use the querySelectorAll() method instead.


function makeRequest() {
	xhr = new XMLHttpRequest();  //Use XMLHttpRequest (XHR) objects to interact with servers. Retrieve data from a URL without having to do a full page refresh. This enables a Web page to update just part of a page without disrupting what the user is doing. XMLHttpRequest is used heavily in AJAX programming.
	xhr.onload = function() {   //The onload event occurs when an object has been loaded.
		var response = JSON.parse(this.responseText); //The JSON.parse() method parses a JSON string, constructing the JavaScript value or object described by the string.
		for(let i=0; i<10; i++){
			var news = response.articles[i];  //這裡的i是指上一行的第幾個文章
			var div = document.createElement('div'); //the document.createElement(tagName) method creates the HTML element specified by tagName
			var a = document.createElement('a');
			var title = document.createElement('h2');  //只要是title的部分都會以h2的格式顯示於頁面
			var authandsrc = document.createElement('p');  //只要是authandsrc(author and source)的部分都會以p的格式顯示於頁面
			var desc = document.createElement('h3');  //只要是description的部分都會以p的格式顯示於頁面
			var pubtime = document.createElement('p');
			var img = document.createElement('img');
			//設定title, desc, img等的html格式。例如只要是title的部分都會以h2的格式顯示於頁面;只要是description的部分都會以p的格式顯示於頁面。


			//The appendChild() method appends a node as the last child of a node.
			content.appendChild(div);  //content後面接div
			div.appendChild(a);   //div後面接a(連結)
			a.appendChild(title);  //a後面跟著的title會加上連結
			div.appendChild(authandsrc);
			div.appendChild(img);
			div.appendChild(desc);
			div.appendChild(pubtime);
			
			img.setAttribute('src',news.urlToImage);  //這裡設定上面輪到div.appendChild(img)出現時，圖片的來源是叫做news的data中的urlToImage
			img.height = 200;
			a.setAttribute('href',news.url)  //這裡設定上面輪到a.出現時，後面跟著的部分會加上連結，連結來自於叫做news的data中的url
		   
			title.innerHTML = news.title;
			desc.innerHTML = news.description;
      authandsrc.innerHTML = 'Author: ' + news.author + " | " + 'Source: '+ news.source.name;
			pubtime.innerHTML = 'Publish at: ' + news.publishedAt;
			//The innerHTML property sets or returns the HTML content (inner HTML) of an element.
			//我的理解：重新定義data中的名稱。例如在這個叫做news的data中，有很多element, title/ description/ author...etc.，我們可以重新給定他們新的代稱，例如desc/authandsrc/pubtime...etc.
		  }
		};

		xhr.open("GET",url,true);
		//The XMLHttpRequest(XHR) method open() initializes a newly-created request, or re-initializes an existing one.
		//The GET method requests a representation of the specified resource. Requests using GET should only retrieve data.
		xhr.send();  //The XMLHttpRequest method send() sends the request to the server. 
	    }
		makeRequest();