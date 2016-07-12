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
	  		selected: true,
	  		mapDataFunction: mapMashableData
	  	},
	  	{
	  		name: 'Reddit',
	  		url: 'https://www.reddit.com/top.json',
	  		selected: false,
	  		mapDataFunction: mapRedditData
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

		var selectedArticles = filterArticlesBySelectedSource()

		into.innerHTML = `
			<section id="main" class="wrapper">
				${selectedArticles.map((article) => {
					return `${renderArticle(article)}`
				}).join('')}
			</section>
		`
	}

	function renderArticle(article){
		return `
      <article class="article">
        <section class="featured-image">
          <img src="${article.imgSrc}" alt="" />
        </section>
        <section class="article-content">
          <a href="#"><h3>${article.title}</h3></a>
          <h6>${article.category}</h6>
        </section>
        <section class="impressions">
          ${article.impressions}
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
			if (source.name == name){
				return source;
			}
		})
	}

	function deselectHeaderItems(){
		state.newsSources.forEach((source)=>{
			source.selected = false;
		})
	}

	function mapMashableData(data){
		[data.new, data.hot, data.rising].forEach((dataSet)=>{
			dataSet.forEach((item)=> {
				var article = {
					imgSrc: item.thumbnail,
					link: item.link,
					title: item.title,
					category: item.channel,
					impressions: item.shares.total,
					description: item.content.plain,
					postDate: item.post_date,
					source: "Mashable"
				}
				state.articles.push(article)
			})
		})
		renderArticleList(state, container)
	}

	function mapRedditData(data){
		data.data.children.forEach((dataSet) => {
			var article = {
				imgSrc: dataSet.data.thumbnail,
				link: 'reddit.com' + dataSet.data.permalink,
				title: dataSet.data.title,
				category: dataSet.data.subreddit,
				impressions: dataSet.data.score,
				description: dataSet.data.title,
				postDate: convertToDate(dataSet.data.created_utc),
				source: "Reddit"
			}
			state.articles.push(article)
		})
		renderArticleList(state, container)
	}

	function fetchPosts(newsSource){
		renderLoading(state, container)
		fetch(newsSource.url).then((response) => {
			return response.json()
		}).then((dataAsJson) => {
			return newsSource.mapDataFunction(dataAsJson)
		})
	}

	function handleFilterClick(event){
		event.preventDefault()
		var newsSource = getNewsSource(event.target.innerHTML);
		if(!newsSource.selected){
			deselectHeaderItems();
			newsSource.selected = true;
			fetchPosts(newsSource)
		}
	}

	function handleArticleClick(event){
		event.preventDefault()
	}

	function convertToDate(utcSeconds){
		var d = new Date(0)
		d.setUTCSeconds(utcSeconds)
		return d
	}

	function filterArticlesBySelectedSource(){
		var selected = state.newsSources.find((source)=>{
			return source.selected
		})

		var filteredArticles = state.articles.filter((article) => {
			return article.source == selected.name
		})

		return filteredArticles
	}

  delegate('header','click','.news-source', handleFilterClick)
  delegate('header','click','.article', handleArticleClick)
  fetchPosts(state.newsSources[0])
})()
