/**
 * Project 2: Feedr
 * ====
 *
 * See the README.md for instructions
 */

(function() {

	var container = document.querySelector('#container')
	var header = document.querySelector('header')
	var state = {
		loading: true,
		newsSources: [
	  	{
	  		name: 'Mashable',
	  		url: 'http://mashable.com/stories.json'
	  	},
	  	{
	  		name: 'Reddit',
	  		url: 'https://www.reddit.com/top.json'
	  	}
		],
		selected: ''
	}


	//renderLoading(state, container)
	renderHeader(state, header)

	function renderLoading(data, into) {
		into.innerHTML = `
			<div id="pop-up" class="loader"></div>
		`
	}

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
							return `<li>${renderSourceListItem(item)}</li>`
						}).join('')}
					</ul>
		          </li>
		        </ul>
		      </nav>
		      <div class="clearfix"></div>
		    </section>
	    `
	}

	function renderSourceListItem(item) {
		return `
			<a href="">${item.name}</a>
		`
	}

})()
