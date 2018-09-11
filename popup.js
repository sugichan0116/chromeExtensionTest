$('.ui.checkbox')
  .checkbox(
    {
      onChange: function() {
        let isEnable = $(this).parent().hasClass("checked");
        chrome.storage.sync.set({isEnable: isEnable}, function() {

          console.log(isEnable);
        });
        chrome.storage.sync.get(['isEnable'], function(result) {
          console.log(result.isEnable);
        });
      }
    }
  )
;

chrome.storage.sync.get(['isEnable'], function(result) {
  console.log(result);
  isEnable = result.isEnable || false;
  $('.ui.checkbox')
    .checkbox(isEnable ? "set checked" : "set unchecked")
  ;
});
