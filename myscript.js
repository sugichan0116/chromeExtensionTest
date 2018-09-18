$(function(){

  (function () {
    return new Promise(function (resolve, reject) {
      chrome.storage.sync.get(['isEnable'], function(result) {
        console.log('Value currently is ' + result.isEnable);
        isEnable = (result.isEnable === undefined) ? false : result.isEnable;
        if(isEnable === false) reject();
        resolve();
      });
    });
  })()
  .then(
    function (value) {
      var target = "a";
      var size = 500;
      var url = location.href;
      console.log(chrome);

      function isMatchWith(text, keys) {
        let isMatch = false;
        let extend = text.match(/.*\/(([^\/]+)\.(\w+))\??[^\/]*$/)[3];
        console.log(extend);
        keys.forEach(key => {
          //if(text.endsWith(key)) isMatch = true;
          if(extend === key) isMatch = true;
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
              ;
            }

            $(this).addClass("my_highlight");
            console.log(href);
          }
        )
        .on(
          "mouseleave",
          target,
          function() {
            $(this).removeClass("my_highlight");
          }
        )
      ;

      if(isMatchWith(url, ["jpg", "gif", "png", "mp4"])) {
        function invoke_downloader(option) {
          option = option || {};
          console.log("clicked", this);
          let dir = url.split("/");
          let name = dir[dir.length - 1];
          chrome.runtime.sendMessage({
              type: "download",
              value: {url: url, name: name, saveAs: option.saveAs}
          });
        }
        $("body")
          .append(
            `<link rel="stylesheet" type="text/css" href="https://semantic-ui.com/dist/semantic.min.css">
            <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
            <script type="text/javascript" src="https://semantic-ui.com/dist/semantic.min.js"></script>`
          )
          .prepend(
            $(`<div class="ui fixed inverted main menu">`)
              .append(
                $(`<button class="fluid ui button">`)
                  .html("Flash Download")
                  .on(
                    "click",
                    () => {
                      invoke_downloader({saveAs: false});
                      window.close();
                    }
                  )
              )
              .append(
                $(`<button class="fluid green ui button">`)
                  .html("Download")
                  .on(
                    "click",
                    () => {
                      invoke_downloader();
                    }
                  )
              )
              .append(
                $(`<button class="fluid ui button">`)
                  .html("Search by image")
                  .on(
                    "click",
                    () => {
                      console.log("clicked", 'https://www.google.co.jp/search?image_url=' + url);
                      window.open(
                        'https://www.google.co.jp/searchbyimage?image_url=' + url,
                        '_blank');
                    }
                  )
              )
          )
        ;
        $("img")
          .wrap(
            $("<div>").addClass("ui center aligned container")
          )
        ;
      }
    }

  )
  .catch(
    function () {

    }
  );

});
