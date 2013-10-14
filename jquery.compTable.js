(function( $ ) {
	var settings;

	$.fn.compTable = function( options ) {

		var defaults = {
			structure: "",
			content: "",
			columns: 3,
			defaultValues: [],
			header: "first",
			footer: "last",
			tableAttr: {},
		};

		settings = $.extend( {}, defaults, options );

		this.append(renderCompTables());
	};

	function renderCompTables() {
		var /*startTime = new Date().getTime(), */
			tempWrapper = $();

		// Create all necessary tables
		$(settings.structure).each( function( tIndex, tValue ) {
			var table = $( "<table><caption></caption><tbody></tbody></table>" ),
				tbody = $( "tbody", table );

			// Assign defined id to each table
			table.attr( "id", tValue.id );

			// Give each table the general attributes
			assignAttributes( settings.tableAttr, table );

			// Assign the table specific attributes
			assignAttributes( tValue.attr, table );

			$("caption",table).html( tValue.title );

			// Create first header
			if(0 === tIndex && "first" === settings.header) {

				var thead = $( "<thead></thead>" ),
					tr = $( "<tr></tr>" );

				tr.append( $( "<td></td>" ) );

				for(var i = 0; i < settings.columns; i++) {
					tr.append( $( "<th></th>" ) );
				}

				table.find( "caption" ).after( thead.append( tr ) );

			}

			// Create last footer
			if(( settings.structure.length - 1 ) === tIndex && "last" === settings.footer) {

				var tfoot = $( "<tfoot></tfoot>" ),
					tr = $( "<tr></tr>" );

				tr.append( $( "<td></td>" ) );

				for(var i = 0; i < settings.columns; i++) {
					tr.append( $( "<th></th>" ) );
				}

				table.find( "tbody" ).after( tfoot.append( tr ) );

			}

			// Create table body
			$( this.rows ).each( function( rIndex, rValue ) {
				var tr = $( "<tr></tr>" ),
					th = $( "<th></th>" ).html( rValue.name );

				// Assign attributes to current row
				assignAttributes( rValue.trAttr, tr );

				// Assign attributes to table header in the current row
				assignAttributes( rValue.thAttr, th );

				// Add table header to current row
				tr.append( th );

				// Add empty columns to current row for the data to be compared
				for(var i = 0; i < settings.columns; i++) {
					tr.append( $( "<td></td> " ) );
				}

				tbody.append( tr );
			});

			tempWrapper = tempWrapper.add( table );
		});

//		var endTime = new Date().getTime();
//		console.log( "Table(s) rendered in: " + ( endTime - startTime ) + "ms" );

		return tempWrapper;
	}

	// Clear a column of any existing data, including headers and footers
	$.fn.compTable.clearColumn = function(colIndex) {

		// Iterate over the available tables
		$( settings.structure ).each( function( tIndex, tValue ) {

			// Clear headers and footers
			$( "#" + tValue.id + " > thead > tr, "+
			   "#" + tValue.id + " > tfoot > tr" ).
					find( "th:eq(" + colIndex + ")"  ).html( "" );

			// Clear body content
			$( "#" + tValue.id + " > tbody > tr" ).each( function() {
				$( this ).find( "td:eq(" + colIndex + ")" ).html( "" );
			});

		});
	};

	// Insert data (dataId) into a column (colIndex), including headers and footers
	$.fn.compTable.insertColumnData = function(colIndex, dataId, clearOnEmpty) {

		clearOnEmpty = typeof clearOnEmpty !== "undefined" ? clearOnEmpty : false;

		if( typeof settings.content[ dataId ] !== "undefined" ) {

			// iterate over the available tables
			$( settings.structure ).each( function( tIndex, tValue ) {

				// Set correct header and footer text
				$( "#" + tValue.id + " > thead > tr, "+
				   "#" + tValue.id + " > tfoot > tr" ).
					find( "th:eq(" + colIndex + ")"  ).html( dataId );

				// Fill body with correct content
				$( "#" + tValue.id + " > tbody > tr" ).each( function( dIndex ) {
					$( this ).
						find( "td:eq(" + colIndex + ")" ).
						html( settings.content[ dataId ][ tIndex ][ dIndex ] );
				});

			});
		} else if (clearOnEmpty) {
			// Clear column of any existing data
			$().compTable.clearColumn( colIndex );
		}
	};

	function assignAttributes (source, target) {
		if( typeof source !== "undefined" ) {
			for( var attrIndex in source ) {
				target.attr( attrIndex, source[ attrIndex ] );
			}
		}
	}

}( jQuery ));