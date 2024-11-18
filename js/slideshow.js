// Initialize slideshow item position
const slideshow = document.querySelector(".slideshow");
const slideshowContent = document.querySelectorAll(".slideshow .artwork");

if(slideshow != null || slideshow != "undefined"){
	fFocusSlideshowItem(slideshow, slideshowContent);
}


// SLIDESHOW
// Boutons prev et next
const slideshowButtons = document.querySelectorAll(".slideshowWrapper .button");

// Si un bouton prev ou next est clique
slideshowButtons.forEach(dsSlideshowButtons => dsSlideshowButtons.addEventListener("click", function(){
	if(dsSlideshowButtons.classList.contains("prevBtn")){
		fChangeSlideshowItem(slideshow, slideshowContent, "prev");
	}else{
		fChangeSlideshowItem(slideshow, slideshowContent, "next");
	}	
}));

// drag du contenu pour mobile
let dragStartX;
let dragStopX;

// Debut du drag
slideshow.addEventListener("mousedown", function(pEvent){
	slideshow.classList.add("draggedElement");

	dragStartX = pEvent.pageX;
});

// Arret du drag
slideshow.addEventListener("mouseup", function(pEvent){
	slideshow.classList.remove("draggedElement");

	dragStopX = pEvent.pageX;

	// si dragStartX plus grand que dragStopX == next
	if(dragStartX > dragStopX){
		fChangeSlideshowItem(slideshow, slideshowContent, "next");
	}
	// si dragStartX plus petit que dragStopX == prev
	if(dragStartX < dragStopX){
		fChangeSlideshowItem(slideshow, slideshowContent, "prev");		
	}
});



// FUNCTION: focus on position of element in slideshow
function fFocusSlideshowItem(pContainerSlide, pContentArraySlide){
	// pContainerSlide == OBLIGATOIRE - class ou id de slideshow
	// pContentArraySlide == OBLIGATOIRE - class ou id de element contenant slide (array car entree multiples)

	let initialSlideshowIndex = 0;
	let initialSlideshowPrevImgWidth = 0;
	let initialSlideshowPosition = 0;

	// Determiner quel index est actif pour le slideshow
	pContentArraySlide.forEach((dscontentArraySlide, index) => {
		if(dscontentArraySlide.classList.contains("isActive")){
			initialSlideshowIndex = index;
		}
	});

	// si pas de classe isActive
	if(!pContentArraySlide[initialSlideshowIndex].classList.contains("isActive")){
		pContentArraySlide[initialSlideshowIndex].classList.add("isActive");
	}

	// Set previous image width
	if(initialSlideshowIndex > 0){
		initialSlideshowPrevImgWidth = (pContentArraySlide[initialSlideshowIndex - 1].offsetWidth / 2);
	}

	// Ajuste le offset selon la largeur du viewport
	if(window.innerWidth <= 950){
		initialSlideshowPosition = Math.round(pContentArraySlide[initialSlideshowIndex].offsetLeft);
	}else{
		initialSlideshowPosition = Math.round( pContentArraySlide[initialSlideshowIndex].offsetLeft - initialSlideshowPrevImgWidth );
	}

	// Change position of slideshow
	setTimeout(function(){
		pContainerSlide.scrollTo(initialSlideshowPosition,0);
	}, 50);
}


// FUNCTION: change position of element in slideshow
function fChangeSlideshowItem(pContainerSlide, pContentArraySlide, pDirectionSlide){	
	// pContainerSlide == OBLIGATOIRE - class ou id de slideshow
	// pContentArraySlide == OBLIGATOIRE - class ou id de element contenant slide (array car entree multiples)
	// pDirectionSlide == OBLIGATOIRE - prev ou next

	let slideshowIndex = 0;
	let slideshowPosition = 0;
	let slideshowPrevImgWidth = 0;
	
	// Determiner quel index est actif pour le slideshow
	pContentArraySlide.forEach((dscontentArraySlide, index) => {
		if(dscontentArraySlide.classList.contains("isActive")){
			slideshowIndex = index;
		}
	});

	// Set current index image width
	slideshowPrevImgWidth = (pContentArraySlide[slideshowIndex].offsetWidth / 2);
	
	// Ajuste le offset selon la largeur du viewport
	if(window.innerWidth <= 950){
		slideshowPosition = Math.round(pContentArraySlide[slideshowIndex].offsetLeft);
	}else{
		slideshowPosition = Math.round( pContentArraySlide[slideshowIndex].offsetLeft - slideshowPrevImgWidth );
	}


	pContentArraySlide[slideshowIndex].classList.remove("isActive");

	// Change index et position de slideshowItem
	if(pDirectionSlide == "prev"){
		if(slideshowIndex <= 0){			
			slideshowIndex = (pContentArraySlide.length - 1);
			slideshowPosition = Math.round(pContainerSlide.scrollWidth);
		}else{
			slideshowIndex--;

			// Ajuste le offset selon la largeur du viewport
			if(window.innerWidth <= 950){
				slideshowPosition = Math.round(pContentArraySlide[slideshowIndex].offsetLeft);
			}else{
				slideshowPosition = Math.round( pContentArraySlide[slideshowIndex].offsetLeft - slideshowPrevImgWidth );
			}
		}	
	}else{
		if(slideshowIndex >= (pContentArraySlide.length - 1)){
			slideshowIndex = 0;
			slideshowPosition = 0;
		}else{
			slideshowIndex++;

			// Ajuste le offset selon la largeur du viewport
			if(window.innerWidth <= 950){
				slideshowPosition = Math.round(pContentArraySlide[slideshowIndex].offsetLeft);
			}else{
				slideshowPosition = Math.round( pContentArraySlide[slideshowIndex].offsetLeft - slideshowPrevImgWidth );
			}
		}	
	}
	

	// Change position of slideshow
	setTimeout(function(){
		pContainerSlide.scrollTo(slideshowPosition,0);

		// Add isActive class for actual div
		pContentArraySlide[slideshowIndex].classList.add("isActive");
	}, 50);
}