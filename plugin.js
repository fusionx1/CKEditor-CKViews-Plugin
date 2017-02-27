"use strict";

(function($) {
alert(this.path + 'pop');
  CKEDITOR.plugins.add('ckviews', {
    lang: 'en',
    requires: 'widget,dialog',
    icons: 'ckviews',
    init: function(editor) {

      CKEDITOR.dialog.add('ckviews', this.path + 'dialogs/ckviews.js');

      function getViewsHtmlFromId(id, argument) {
        var ret;

        var parts = id.replace('[block:', '').replace(']', '').split('=');
        var parts2 = parts[1].split('/')
        $.ajax({
          type: "GET",
          url: Drupal.settings.basePath + 'ckviews/block/views/' + parts2[0] + '/' + argument,
          success: function(result) {
            ret = result.html;
          },
          async: false,
          cache: false
        });
        return ret;
      }

        // Register the widget
        editor.widgets.add('ckviews', {
        allowedContent: 'div(!ckviews)',
        requiredContent: 'div(ckviews)',
        editables: {
			  },
        parts: {
          div: 'div.ckviews'
        },
        // The template will be used when creating new instances of the ckviews
        template: '<div class="ckviews">Demo</div>',
        button: 'Insert a views display block',
        dialog: 'ckviews',
        upcast: function(element) {
          if(element.name == 'div' && element.hasClass('ckviews')) {
            var blockId = '';
            if ((element.children.length > 0) && (blockId = element.children[0].value)) {
              element.attributes['data-block'] = blockId;
              element.attributes['class'] = 'ckviews';
            }
            return true;
          }
          return false;
        },
        downcast: function(element) {
          element.setHtml(element.attributes['data-block']);
          delete element.attributes['data-block'];
          return element;
        },
        init: function() {
          this.setData('block', this.parts.div.getHtml());
        },
        data: function() {
          if(this.data.block && this.data.block != 'Demo') {
            this.data.block = this.data.block.toString();
            var mode = this.data.block.indexOf('/');
            if(mode >= 1) {
              var parts = this.data.block.split("/");
              this.data.argument = parts[1].slice(0, -1);
              this.data.block = parts[0] + '/' + this.data.argument + "]";
            } else {
              this.data.block = this.data.block.replace(']', '/' + this.data.argument + "]");
            }

            this.parts.div.setAttribute('data-block', this.data.block);
            this.parts.div.setAttribute('data-argument', this.data.argument);
            this.parts.div.setAttribute('class', 'ckviews');
            if (this.data.block) {
              this.parts.div.setHtml(getViewsHtmlFromId(this.data.block, this.data.argument));
            }
          }
        }
      });
    }
  });

})(jQuery);
