console.log('process started');

let newsAccordion = document.getElementById("newsAccordion");

let apiKey = 'eff6301b05fe46b2b4efa94eb3e767a6'

const xhr = new XMLHttpRequest();

xhr.onprogress = function () {
	let spinner = document.getElementById('spinner')
	spinner.style.display = 'block'
}

xhr.open('GET', `https://newsapi.org/v2/everything?q=tesla&from=2021-07-23&sortBy=publishedAt&apiKey=${apiKey}`, true)

xhr.onload = function () {
	let spinner = document.getElementById('spinner')
	spinner.style.display = 'none'
	if (this.status === 200) {
		let json = JSON.parse(this.responseText);
		let articles = json.articles;
		// console.log(articles);
		let newsHtml = "";
		articles.forEach(function (element, index) {

			let news = `
					<div class="accordion-item">
						  <h2 class="accordion-header" id="headingOne">
							<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
							  ${index + 1} ${element['title']}
							</button>
						  </h2>
						  <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#newsAccordion">
							<div class="accordion-body">
							  ${element['description']}

								<img src="${element['urlToImage']}">
							
							</div>
						  </div>
						</div>
					</div>
			
			`

			newsHtml += news

		});
		newsAccordion.innerHTML = newsHtml

	}
	else {
		console.log('Some error is here');
	}
}

setTimeout(() => {
	xhr.send();
}, 000);