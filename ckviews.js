"use strict";

(function($) {

  CKEDITOR.dialog.add( 'ckviews', function( editor ) {
    var lang = editor.lang.ckviews,
    commonLang = editor.lang.common;

    var options = [];
    $.ajax({
      type: "GET",
      url: Drupal.settings.basePath + 'ckviews/views',
      success: function(result) {
        options = result;
      },
      async: false,
      cache: false
    });
    var items = [];
    $.each(options, function(key, value) {
      items.push([value, key]);
    });


    return {
      title: 'Edit CKEditor Views Block',
      minWidth: 400,
      minHeight: 300,
      contents: [
        {
          id: 'info',
          label: lang.infoTab,
          accessKey: 'I',
          elements: [
            {
              id: 'block',
              type: 'select',
              label: lang.blockTitle,
              items: items,
              setup: function( widget ) {
                this.setValue( widget.data.block );
              },
              commit: function( widget ) {
                widget.setData( 'block', this.getValue() );
              }
            },
            {
              id: 'argument',
              type: 'text',
              label: 'Argument',
              onChange: function( api ) {
                // this = CKEDITOR.ui.dialog.select
              },
              setup: function( widget ) {
                this.setValue( widget.data.argument );
              },
              commit: function( widget ) {
                widget.setData( 'argument', this.getValue() );
              }
            },
          ]
        }
      ]
    };
  } );
})(jQuery);
