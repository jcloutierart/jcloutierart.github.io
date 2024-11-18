//console.log("LOAD : mainscript.js");


// MENU
const menuWrapper = document.querySelector("#mainMenuNav");
const menuBtn = document.querySelectorAll(".jsMenuBtn");
const menuNavLinks = document.querySelectorAll("#mainMenuNav nav a");
const menuSocialLinks = document.querySelectorAll("#mainMenuNav .socialMediaList a");

// if the main menu button is clicked
menuBtn.forEach(dsClickedBtn => dsClickedBtn.addEventListener("click", function(){
	fShowCloseFaded(menuWrapper);
}));

// if the menu links are clicked
menuNavLinks.forEach(dsClickedLink => dsClickedLink.addEventListener("click", function(){
	fShowCloseFaded(menuWrapper);
}));

// if the menu social links are clicked
menuSocialLinks.forEach(dsClickedLink => dsClickedLink.addEventListener("click", function(){
	fShowCloseFaded(menuWrapper);
}));


// FUNCTION: show/close with fade effect
function fShowCloseFaded(pTargetedElement){	
	if(pTargetedElement.classList.contains("hide")){
		// show: fade in effect
		pTargetedElement.classList.add("show");
		pTargetedElement.classList.add("fadeOut");
		window.setTimeout(function(){
			pTargetedElement.classList.remove("fadeOut");
			pTargetedElement.classList.add("fadeIn");
			pTargetedElement.classList.remove("hide");
		}, 100);
	}else{
		// hide: fade out effect
		pTargetedElement.classList.add("show");
		pTargetedElement.classList.remove("fadeIn");
		pTargetedElement.classList.add("fadeOut");
		window.setTimeout(function(){
			pTargetedElement.classList.add("hide");
		}, 100);
		// remove show class after hide class, to smooth the transition
		window.setTimeout(function(){
			pTargetedElement.classList.remove("show");
		}, 250);
	}	
}