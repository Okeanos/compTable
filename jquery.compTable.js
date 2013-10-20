/*
 * compTable - a jQuery plugin to dynamically compare information in tables
 * @copyright Nikolas Grottendieck, Jan Musmann 2013
 * @license https://github.com/Okeanos/compTable/blob/master/LICENSE
 */
(function( $ ) {
	var i,
		settings;

	$.fn.compTable = function( options ) {
		var defaults = {
			structure: "",
			content: "",
			// How many columns should be generated for content to be compared
			columns: 3,
			defaultValues: [],
			// String first and last; Integer values for every nth, for all use = 1,
			// anything else, preferably Boolean false, for none
			thead: "first",
			// String first and last; Integer values for every nth, for all use = 1,
			// anything else, preferably Boolean false, for none
			tfoot: "last",
			tableAttr: {},
		};

		settings = $.extend( {}, defaults, options );

		// Make sure any numbers for footer and header are positive integers
		if ( typeof settings.thead === "number" ) {
			settings.thead = Math.round ( Math.abs( settings.thead ) );
		}
		if ( typeof settings.tfoot === "number" ) {
			settings.tfoot = Math.round ( Math.abs( settings.tfoot ) );
		}

		// Convert first/last to corresponding integer values
		if ( typeof settings.thead === "string" ) {
			if (settings.thead === "first" ) {
				settings.thead = -1;
			} else if ( settings.thead === "last" ) {
				settings.thead = settings.structure.length;
			} else {
				settings.thead = 0;
			}
		}
		if ( typeof settings.tfoot === "string" ) {
			if (settings.tfoot === "first" ) {
				settings.tfoot = -1;
			} else if ( settings.tfoot === "last" ) {
				settings.tfoot = settings.structure.length;
			} else {
				settings.tfoot = 0;
			}
		}

		this.append( renderCompTables() );
	};

	function renderCompTables() {
		var tempWrapper = $();

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

			$( "caption", table ).html( tValue.title );

			// Insert the head or foot to each enabled table (label assignment)
			table.children( "caption" ).after( createColLabels( "thead", tIndex ) );
			table.children( "tbody" ).after( createColLabels( "tfoot", tIndex ) );

			// Create table body
			$( this.rows ).each( function( rIndex, rValue ) {
				var tr = $( "<tr>" ),
					th = $( "<th>" ).html( rValue.name );

				// Assign attributes to current row
				assignAttributes( rValue.trAttr, tr );

				// Assign attributes to table header in the current row
				assignAttributes( rValue.thAttr, th );

				// Add table header to current row
				tr.append( th );

				// Add empty columns to current row for the data to be compared
				for( i = 0; i < settings.columns; i++ ) {
					tr.append( $( "<td>" ) );
				}

				tbody.append( tr );
			});

			tempWrapper = tempWrapper.add( table );
		});

		return tempWrapper;
	}

	// Clear a column of any existing data, including headers and footers
	$.fn.compTable.clearColumn = function( colIndex ) {

		// Iterate over the available tables
		$( settings.structure ).each( function( tIndex, tValue ) {

			// Clear headers and footers
			$( "#" + tValue.id + " > thead > tr, " +
			   "#" + tValue.id + " > tfoot > tr" ).
					find( "th:eq(" + colIndex + ")"  ).html( "" );

			// Clear body content
			$( "#" + tValue.id + " > tbody > tr" ).each( function() {
				$( this ).find( "td:eq(" + colIndex + ")" ).html( "" );
			});

		});
	};

	// Insert data (dataId) into a column (colIndex), including headers and footers
	$.fn.compTable.insertColumnData = function( colIndex, dataId, clearOnEmpty ) {
		clearOnEmpty = typeof clearOnEmpty !== "undefined" ? clearOnEmpty : false;

		if ( typeof settings.content[ dataId ] !== "undefined" ) {

			// iterate over the available tables
			$( settings.structure ).each( function( tIndex, tValue ) {

				// Set correct header and footer text
				$( "#" + tValue.id + " > thead > tr, " +
				   "#" + tValue.id + " > tfoot > tr" ).
					find( "th:eq(" + colIndex + ")"  ).html( dataId );

				// Fill body with correct content
				$( "#" + tValue.id + " > tbody > tr" ).each( function( dIndex ) {
					$( this ).
						find( "td:eq(" + colIndex + ")" ).
						html( settings.content[ dataId ][ tIndex ][ dIndex ] );
				});

			});
		} else if ( clearOnEmpty ) {

			// Clear column of any existing data
			$().compTable.clearColumn( colIndex );
		}
	};

	// Assign html attributes in source to the target
	// already existing attribute values will be kept and not overridden
	function assignAttributes ( source, target ) {
		if ( typeof source !== "undefined" ) {
			jQuery.each(source, function( attrIndex, attrValue ) {
				target.attr( attrIndex, function( index, attr ) {
					return attrValue + ( attr !== undefined ? " " + attr : "" );
				});
			});
		}
	}

	// Creates the <tfoot> and <thead> elements based on pos and index
	function createColLabels ( pos, index ) {

		var tPos = $( "<" + pos + ">" ),
			tr = $( "<tr>" );

			tr.append( $( "<td>" ) );

		// Count like a sane person would do by starting with 1
		index++;

		if ( typeof settings[ pos ] === "number" &&
				( index % settings[ pos ] === 0 &&
					index % settings[ pos ] !== "undefined" &&
					settings[ pos ] > 0 ) ||
				( index === 1 && settings[ pos ] === -1 ) ) {

			for( i = 0; i < settings.columns; i++ ) {
				tr.append( $( "<th>" ) );
			}

			return tPos.append( tr );
		}

		return;
	}
}( jQuery, document, window ));