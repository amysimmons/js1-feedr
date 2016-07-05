/**
 * Project 2: Feedr
 * ====
 *
 * See the README.md for instructions
 */

(function() {

	var header = document.querySelector('header')
	var container = document.querySelector('#container')
	var state = {
		loading: false,
		newsSources: [
	  	{
	  		name: 'Mashable',
	  		url: 'https://crossorigin.me/http://mashable.com/stories.json',
	  		selected: true
	  	},
	  	{
	  		name: 'Reddit',
	  		url: 'https://www.reddit.com/top.json',
	  		selected: false
	  	}
		],
		articles: []
	}

	renderHeader(state, header)

	function renderHeader(data, into){
	   into.innerHTML = `
		   <section class="wrapper">
		      <a href="#"><h1>Feedr</h1></a>
		      <nav>
		        <section id="search">
		          <input type="text" name="name" value="">
		          <div id="search-icon"><img src="images/search.png" alt="" /></div>
		        </section>
		        <ul>
		          <li><a href="#">News Source: <span>Source Name</span></a>
		          	<ul>
									${data.newsSources.map((item) => {
										return `<li>${renderHeaderItem(item)}</li>`
									}).join('')}
								</ul>
		          </li>
		        </ul>
		      </nav>
		      <div class="clearfix"></div>
		    </section>
	    `
	}

	function renderHeaderItem(item) {
		return `
			<a href="${item.url}" class="news-source">${item.name}</a>
		`
	}

	function renderLoading(data, into) {
		into.innerHTML = `
			<div id="pop-up" class="loader"></div>
		`
	}

	function renderArticleList(data, into) {
		into.innerHTML = `
			<section id="main" class="wrapper">
				<h1>news to come</h1>
				${data.articles.map((article) => {
					return `${renderArticle(article)}`
				}).join('')}
			</section>
		`
	}

	function renderArticle(article){
		return `
      <article class="article">
        <section class="featured-image">
          <img src="images/article_placeholder_1.jpg" alt="" />
        </section>
        <section class="article-content">
          <a href="#"><h3>Test article title</h3></a>
          <h6>Lifestyle</h6>
        </section>
        <section class="impressions">
          526
        </section>
        <div class="clearfix"></div>
      </article>
		`
	}

	function renderArticlePopUp(){
		return `
	    <div id="pop-up">
	      <a href="#" class="close-pop-up">X</a>
	      <div class="wrapper">
	        <h1>Article title here</h1>
	        <p>
	        Article description/content here.
	        </p>
	        <a href="#" class="pop-up-action" target="_blank">Read more from source</a>
	      </div>
	    </div>
		`
	}

	function getNewsSource(name){
		return state.newsSources.find((source) => {
			if (source.name = name){
				return source;
			}
		})
	}

	function fetchPosts(url){
		debugger
		renderLoading(state, container)
		fetch(url).then((response) => {
			return response.json()
		}).then((dataAsJson) => {
			renderArticleList(state, container)
			console.log(dataAsJson)
		})
	}

	function handleFilterClick(event){
		console.log('filter click')
		event.preventDefault()
		debugger
		if(!getNewsSource(event.target.innerHTML).selected){
			debugger
			fetchPosts(event.target.href)
		}
	}

	function handleArticleClick(event){
		event.preventDefault()
	}


  delegate('header','click','.news-source', handleFilterClick)
  delegate('header','click','.article', handleArticleClick)
  fetchPosts(state.newsSources[0].url)
})()
