var target = "a";
var size = 500;

function isMatchWith(text, keys) {
  let isMatch = false;
  keys.forEach(key => {
    if(text.endsWith(key)) isMatch = true;
  });
  return isMatch;
}

$("html")
  .on(
    "mouseenter",
    target,
    function() {
      let href = $(this).attr("href");
      if(!href) return;
      if($(this).has("img").length) $(this).addClass("my_popup_source");

      if(!$(this).hasClass("my_popup_source") &&
        isMatchWith(href, ["jpg", "gif", "png"])
      ){

        $(this)
          .append(
            $("<img>")
              .attr("src", href)
              .addClass("my_popup_image")
              .css("max-width", size)
          )
          .addClass("my_popup_source")
          // .on(
          //   "mouseleave",
          //   function() {
          //     $(this)
          //
          //       //.children(".my_popup_image")
          //       //.remove()
          //     ;
          //   }
          // )
        ;
        $(this).css("background-color", "orange");
      }
      console.log(href);
    }
  )
  .on(
    "mouseleave",
    target,
    function() {
      $(this).css("background-color", "transparent");
    }
  )
;
