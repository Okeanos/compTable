(function ($) {
    var settings;

    $.fn.compTable = function( options ) {

        var defaults = {
            structure: "",
            content: "",
            columns: 3,
            defaultValues: [],
            header: "first",
            footer: "last",
            classes: "",
        };

        settings = $.extend( {}, defaults, options );

        this.append(renderCompTables());
    };

    function renderCompTables() {
        var startTime = new Date().getTime();

        var tempWrapper = $();

		// Create all necessary tables
		$(settings.structure).each( function( index ) {
            var table = $( "<table><caption></caption><tbody></tbody></table>" );
            var tbody = $( "tbody", table );

			table.attr( "id", this.id );
            table.attr( "class", settings.classes );

			$("caption",table).html( this.title );

			// Create first header
			if(0 === index && 'first' === settings.header) {

				var thead = $( "<thead></thead>" );
                var tr = $( "<tr></tr>" );
                tr.append( $( "<td></td>" ) );

                for(var i = 0; i < settings.columns; i++) {
                    tr.append( $( "<th></th>" ) );
                }

                table.find( "caption" ).after( thead.append( tr ) );

			}

			// Create last footer
			if(( settings.structure.length - 1 ) === index && 'last' === settings.footer) {

				var tfoot = $( "<tfoot></tfoot>" );
                var tr = $( "<tr></tr>" );
                tr.append( $( "<td></td>" ) );

                for(var i = 0; i < settings.columns; i++) {
                    tr.append( $( "<th></th>" ) );
                }

                table.find( "tbody" ).after( tfoot.append( tr ) );

			}

            // Create table body
            $( this.rows ).each( function( index ) {
				var tr = $( "<tr></tr>" );
				var label = $( "<th></th>" ).html( this.name );
                var title = this.title.trim();

                if(title.length > 0) {
                    label.attr( "title", title );
                }

                tr.append(label);

                for(var i = 0; i < settings.columns; i++) {
                    tr.append( $( "<td></td> " ) );
                }

                tbody.append( tr );
            });

            tempWrapper = tempWrapper.add( table );
        });

        var endTime = new Date().getTime();
        console.log( "Table(s) rendered in: " + ( endTime - startTime ) + "ms" );

        return tempWrapper;
    }

	// Clear a column of any existing data, including headers and footers
	$.fn.compTable.clearColumn = function(colIndex) {

		// Shorthand references to structure
		var tables = settings.structure;

		// Iterate over the available tables
		$( tables ).each( function( tIndex ) {

			// Clear headers and footers
			$( "#" + tables[ tIndex ].id + " > thead > tr, "+
			   "#" + tables[ tIndex ].id + " > tfoot > tr" ).
					find( "th:eq(" + colIndex + ")"  ).html( "" );

			// Clear body content
			$( "#" + tables[ tIndex ].id + " > tbody > tr" ).each( function( dIndex ) {
				$( this ).find( "td:eq(" + colIndex + ")" ).html( "" );
			});

		});
	}

	// Insert data (dataId) into a column (colIndex), including headers and footers
	$.fn.compTable.insertColumnData = function(colIndex, dataId) {

		// Shorthand references to data and structure
		var data = settings.content;
		var tables = settings.structure;

		if( typeof data[ dataId ] !== "undefined" ) {

			// Clear column of any existing data
			$().compTable.clearColumn( colIndex );

			// iterate over the available tables
			$( tables ).each( function( tIndex ) {

				// Set correct header and footer text
				$( "#" + tables[ tIndex ].id + " > thead > tr, "+
			       "#" + tables[ tIndex ].id + " > tfoot > tr" ).
					find( "th:eq(" + colIndex + ")"  ).html( dataId );

				// Fill body with correct content
				$( "#" + tables[ tIndex ].id + " > tbody > tr" ).each( function( dIndex ) {
					$( this ).
						find( "td:eq(" + colIndex + ")" ).
						html( data[ dataId ][ tIndex ][ dIndex ] );
				});

			});
		}
	}

}(jQuery));