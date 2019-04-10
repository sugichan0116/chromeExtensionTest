function isMatchWith(text, keys) {
  if(text.indexOf(".") === -1) return false;
  let isMatch = false;
  let extend = text.match(/(.*)(?:\.([^.]+$))/)[2];

  keys.forEach(key => {
    //if(text.endsWith(key)) isMatch = true;
    if(extend === key) isMatch = true;
  });

  return isMatch;
}

$(window).on('load', function(){
  $(".file-navigation").prepend(
    $("<div>").addClass("my_album")
  );

  $("a").each(function (i, image) {
    let title = $(image).attr("title");
    if(title === undefined) return;

    if(isMatchWith(title, ["png"])) {
      let src = `https://raw.githubusercontent.com` + $(image).attr("href");
      src = src.replace("blob/", "");

      console.log(src);

      $(".my_album").prepend(
        $("<img>")
          .attr("src", src)
          .css({ "max-width":"100px", "max-height":"100px" })
      );
    }
  });
});
