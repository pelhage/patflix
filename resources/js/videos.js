(function(document, window) {


	window.VideoCarousel = (function() {
		
		var Carousel = function(category) {
			var obj = { category: category };
			obj.category = category;
			// obj.videos = findVideos.call(this, category);
			obj.videos = findVideos(category);

			return obj;
		};

		 // var Carousel.methods = {}

		/**
		 * Returns a an array of video objects that match specific
		 * category
		 */
		var findVideos = function(category) {
			var videoObjs = [];
			var videos = data.videos;

			for (var i = 0, len = videos.length; i < len; i++) {
				if (videos[i].category.indexOf(category) > -1) {
					videoObjs.push(videos[i]);
				}	
			}
			return videoObjs;
		};

    // var ElementMethods = {
    //   createHeader: function()
    // };

		var addCarouselToDOM = function(category) {
			var carouselObj = new Carousel(category);
			
			/* The Section Container */
			var section = document.createElement('section');
			/* Header Text of Carousel */
			var carouselHeader = document.createElement('h2');
			var headerText = document.createTextNode(carouselObj.category);
			carouselHeader.appendChild(headerText);
			
			/* The List of Videos to Display in Carousel */
			var videoList = document.createElement('div');
			videoList.className = 'videos-row';
			for (var i = 0, len = carouselObj.videos.length; i < len; i++) {
				var video = carouselObj.videos[i];

				var listItem = document.createElement('div');
				listItem.className = 'video-thumb';
				var itemThumbnail = document.createElement('img');
				// itemThumbnail.src = 'http://img.youtube.com/vi/'+ video.id +'/0.jpg';
				itemThumbnail.src = 'http://img.youtube.com/vi/'+ video.id +'/mqdefault.jpg';
				// Create the Title
				var itemTitle = document.createElement('p');
				var titleText = document.createTextNode(video.title);
				itemTitle.appendChild(titleText);

				// Append the video elements
				listItem.appendChild(itemThumbnail);
				listItem.appendChild(itemTitle);

				// Append this video to the list
				videoList.appendChild(listItem);
			}
			/* The Container Holding the List */
			var carouselDiv = document.createElement('div');
			carouselDiv.className = 'carousel-container';
			carouselDiv.setAttribute('id', category);

			/* The Buttons That Will Let User Scroll Through List */
			var leftButton = document.createElement('div');
			leftButton.className = 'left-button';

			leftButton.addEventListener('click', function() {
				
				var elMargin = videoList.style.left;
				var currentMargin = parseInt(elMargin, 10) || 0;
				if (currentMargin + 345 > 0) {
					return false;
				}
				
				videoList.style.left = currentMargin + 345 + "px";
			});


			var rightButton = document.createElement('div');
			rightButton.className = 'right-button';

			rightButton.addEventListener('click', function(e) { 
				var elMargin = videoList.style.left;
				var currentMargin = parseInt(elMargin, 10) || 0;
				console.log('Video width: ', videoList.offsetWidth);
				console.log('Window width: ', section.offsetWidth);
				console.log('currentMargin: ', currentMargin);
				if ((videoList.offsetWidth + currentMargin) <= section.offsetWidth) {
					console.log('Dont do it!!');
					videoList.style.left = section.offsetWidth - videoList.offsetWidth;
					return false;
				}
				if (currentMargin <= 0 && videoList.offsetWidth < section.offsetWidth) {
					return false
				}
				
				videoList.style.left = currentMargin - 345 + "px";
			});

			/* Append The Carousel Elements to Its Container */
			carouselDiv.appendChild(leftButton);
			carouselDiv.appendChild(videoList);
			carouselDiv.appendChild(rightButton);

			/* Append The Carousel + Header to a Section */
			section.appendChild(carouselHeader);
			section.appendChild(carouselDiv);

			// Append the div to the body
			document.getElementById("main").appendChild(section);
		};

		var initialize = function() {
			addCarouselToDOM('Astronomy');
			addCarouselToDOM('Success');
			addCarouselToDOM('Spirituality');
			addCarouselToDOM('Philosophy');
			addCarouselToDOM('Comedy');
			addCarouselToDOM('Social Critique');
		};

		return {
			initialize: initialize
		}

	})();

	VideoCarousel.initialize();
})(document, window);