


$(document).ready(function() {    //wait for DOM to be ready instead of defering

    let galleryImages = $("#gallery-holder ul li a").children().toArray();
    galleryImages.forEach(element => { //add handler to all images
        addHoverHandlerToImg(element);
    });
    enableHoverForDropdown();
    //disableImageLinkIfScreenSmall(galleryImages);
});

//Hover section, allows a delay after cursor is removed from hover menu, rather than using css with no delay
function enableHoverForDropdown() {
    let timeOut;
    const timerDelay = 400; //in milliseconds
    $(".dropbtn").hover(function() { //on hover
        clearTimeout(timeOut); //reset the function that removes display
        $(".dropbtn, #drop-content").addClass("display-on");
    }, function() { //called when hover is gone
        timeOut = setTimeout(function() { //adds delay to removing display
            $("#drop-content").removeClass("display-on");
        }, timerDelay);
    });
}

function addHoverHandlerToImg(image) {
    let timeOut;
    $(image).off("click"); //removes old click handler
    $(image).hover(function() {

        //runImageFade(image);
        updateDescriptionFromAlt(image);
       // updateFigureSize(image);
    }, function() {
        $("#alt-description").stop();
        $("#alt-description").css("opacity", 0);
    });

}

function addClickHandlerToImg(image) {
    $(image).off("mouseenter mouseleave"); //removes hover handler
    $(image).on("click", function() {
        updateDescriptionFromAlt(image);
    })
}
function runImageFade(image) {
    $("#gallery-holder figure").css("opacity", ".4") //reset opacity for figure
    $("#gallery-holder figure img").attr("src", $(image).data("mainsrc")); //swap figure src with data-mainsrc of thumbnail img
    $("#gallery-holder figure").animate({opacity: "1"}, "slow"); //animate fade in
}
function updateDescriptionFromAlt(image) {
    $("#alt-description").css("opacity", 0);
    $("#alt-description").text($(image).attr("alt")); //update paragraph with alt text
    $("#alt-description").animate({opacity: "1"}, 2000);
}

function updateFigureSize(image) {
    let figure = $("#gallery-holder figure img")
    figure.attr("height", $(image).data("height")); //change image sizes to match actual image
    figure.attr("width", 400);
} 

//swaps from hover to click for gallery.
function disableImageLinkIfScreenSmall(galleryImages) {
    if (screen.width <= 1300) {
        $("#gallery-holder a").on("click", function(event) {
            event.preventDefault();
        });
        galleryImages.forEach(element => {
            addClickHandlerToImg(element);
        });
    }
}