(function(document, window) {


	window.VideoCarousel = (function() {
		
		var Carousel = function(category) {
			var obj = {category: category};
			obj.category = category;
			// obj.videos = findVideos.call(this, category);
			obj.videos = findVideos(category);

			return obj;
		};

		/**
		 * Returns a an array of video objects that match specific
		 * category
		 */
		 // var Carousel.methods = {

		 // }
		var findVideos = function(category) {
			var videoObjs = [];
			var videos = data.videos;

			for (var i = 0, len = videos.length; i < len; i++) {
				if (videos[i].category.indexOf(category) > -1) {
					videoObjs.push(videos[i]);
				}	
			}
			return videoObjs;
		}

		var addCarouselToDOM = function(category) {
			var carouselObj = new Carousel(category);
			
			var carouselHeader = document.createElement('h2');
			var headerText = document.createTextNode(carouselObj.category);
			carouselHeader.appendChild(headerText);
			
			var videoList = document.createElement('ul');

			for (var i = 0, len = carouselObj.videos.length; i < len; i++) {
				var video = carouselObj.videos[i];

				var listItem = document.createElement('li');

				var itemThumbnail = document.createElement('img');
				itemThumbnail.src = 'http://img.youtube.com/vi/'+ video.id +'/0.jpg';

				// Create the Title
				var itemTitle = document.createElement('p');
				var titleText = document.createTextNode(video.title);
				itemTitle.appendChild(titleText);

				// Append the video elements
				listItem.appendChild(itemTitle);
				listItem.appendChild(itemThumbnail);

				// Append this video to the list
				videoList.appendChild(listItem);
			}
			document.getElementById(category).appendChild(videoList);
		}

		var initialize = function() {
			addCarouselToDOM('Astronomy');
		};

		return {
			initialize: initialize
		}
	})();

	VideoCarousel.initialize();
})(document, window);