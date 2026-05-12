// == SLIDESHOW

// Find which slideshow is clicked
const slideshowBtn = document.querySelectorAll(".jsSlideButton");

slideshowBtn.forEach(dsSlideshowBtn => dsSlideshowBtn.addEventListener("click", function(){
	const slideshowID = dsSlideshowBtn.parentNode.parentNode.id;
	const slideImg = document.querySelectorAll("#" + slideshowID + " .slideshow .slideimage");
	const slideContainer = document.querySelector("#" + slideshowID + " .slideshow");	

	if(dsSlideshowBtn.classList.contains("prevBtn")){
		fChangeSlideImage(slideContainer, slideImg, "prev");
	}else{
		fChangeSlideImage(slideContainer, slideImg, "next");
	}
	
}));


// FUNCTION: change position of element in slideshow

function fChangeSlideImage (pContainerSlides, pSlidesImgArray, pDirectionSlide){
	console.log("fChangeSlideImage pContainerSlides=" + pContainerSlides);	

	let slideIndex = 0; // Initialize array index
	let slideIndexMaxLength = pSlidesImgArray.length - 1;  // Max index number of slide in array
	let slidePosition = 0;  // Initialize position of slide	
	
	// Initialize et Determiner quel index est actif pour le slideshow
	pSlidesImgArray.forEach((dsSlideshowArrayImg, index) => {
		if(dsSlideshowArrayImg.classList.contains("jsIsActive")){
			slideIndex = index;
		}
	});

	console.log("INITIAL slidePosition=" + slidePosition);	

	pSlidesImgArray[slideIndex].classList.remove("jsIsActive");

	// Change index et position de item in slide
	if(pDirectionSlide == "prev"){
		console.log("PREV pDirectionSlide");
		
		if(slideIndex <= 0){					
			slideIndex = slideIndexMaxLength;
			slidePosition = pContainerSlides.scrollWidth;

			console.log("slideIndex <= 0 : " + slideIndex);
			console.log("slidePosition : " + slidePosition);
		}else{			
			slideIndex--;
			slidePosition = pSlidesImgArray[slideIndex].offsetLeft;
			
			console.log("slideIndex > 0 : " + slideIndex);
			console.log("slidePosition : " + slidePosition);
		}		
	}else{
		console.log("NEXT pDirectionSlide");

		if(slideIndex >= slideIndexMaxLength){
			slideIndex = 0;
			slidePosition = 0;

			console.log("slideIndex >= slideIndexMaxLength : " + slideIndex);
			console.log("slidePosition : " + slidePosition);
		}else{
			slideIndex++;
			slidePosition = pSlidesImgArray[slideIndex].offsetLeft;

			console.log("slideIndex < slideIndexMaxLength : " + slideIndex);
			console.log("slidePosition : " + slidePosition);
		}	
	}
	
	// Change position of slideshow
	setTimeout(function(){
		pContainerSlides.scrollTo(slidePosition,0);

		// Add isActive class for actual div
		pSlidesImgArray[slideIndex].classList.add("jsIsActive");
	}, 50);
}