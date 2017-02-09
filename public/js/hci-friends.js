'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();

	$(".name").each(function () {
	    $(this).click( function (e) {
            e.preventDefault();
	        let name = $(this);
            name.text(anagrammedName(name.text()));
        })
    });

    // $(".friend").each( function (i) {
	 //    let x = $(this);
	 //    x.addClass('friend_' + i);
	 //    // console.log($(this).attr("class"));
    //     x.click(function (e) {
    //         e.preventDefault();
    //
    //         let name = x.find('a.name');
    //         name.text(anagrammedName(name.text().toString()));
    //     })
    // });

});

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	console.log("Javascript connected!");
}

function anagrammedName(name) {
	// Thanks, Internet Anagram Server!
    console.log(name);
	
	if (name == "Doug Engelbart") {
		return "Notable Grudge";
	} 
	else if (name == "Ivan Sutherland") {
		return "Vandal Heist Run";
	}
	else if (name == "JCR Licklider") {
		return "Crick Rid Jell";
	}
	else if (name == "Vannevar Bush") {
		return "Ravens Van Hub";
	}
	else if (name == "Alan C. Kay") {
		return "Canal Yak";
	}
	else if (name == "Allen Newell") {
		return "Ellen All New";
	}
	else if (name == "Lucy Suchman") {
		return "Lunacy Chums";
	}
	else if (name == "Grace Hopper") {
		return "Gear Chopper";
	}
	else {
		console.log(name + " not known for anagramming.");
		return name;
	}
}