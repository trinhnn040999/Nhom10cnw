!function(e){var a=(cookie.get("lang")||window.locale||"").replace("_","-");!window.isHreflangPath&&window.prefLocale&&(a=window.prefLocale),e("#language-picker option[value="+a+"]").prop("selected",!0),e("#language-picker").on("change",(function(){var a=e(this).find("option:selected");a.data("url")!==window.location.href&&(window.trackUnstructEvent({category:"Language Picker",verb:"selects",dirObj:a.val()}),window.location.href=a.data("url"))}))}($);