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
			header: "first",
			// String first and last; Integer values for every nth, for all use = 1,
			// anything else, preferably Boolean false, for none
			footer: "last",
			tableAttr: {},
		};

		settings = $.extend( {}, defaults, options );

		// Make sure any numbers for footer and header are positive integers
		if(typeof settings.header === "number") {
			settings.header = Math.round ( Math.abs( settings.header ) );
		}
		if(typeof settings.footer === "number") {
			settings.footer = Math.round ( Math.abs( settings.footer ) );
		}

		this.append( renderCompTables() );
	};

	function renderCompTables() {
		var tempWrapper = $(),
			hasColLabels = [];

		// Create default values for all table headers and footers, i.e. headers/footers yes or no
		for ( i = 0; i < settings.structure.length; i++ ) {
			hasColLabels[i] = [false, false];
		}

		// Assign correct header and footer settings based on given parameters
		$( ["header", "footer"] ).each( function( index, value ) {
			if ( typeof settings[ value ] === "string" ) {
				if ( settings[ value ] === "first" ) {
					hasColLabels[ 0 ][ index ] = true;
				} else if ( settings[ value ] === "last" ) {
					hasColLabels[ settings.structure.length - 1][ index ] = true;
				}
			} else if ( typeof settings[ value ] === "number" && settings[ value ] !== 0 ) {
				for ( i = settings.structure.length - 1; i >= 0; i-- ) {
					if ( i % settings[ value ] === 0 ) {
						hasColLabels[ i ][ index ] = true;
					}
				}
			}
		});

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
			if ( hasColLabels[ tIndex ][ 0 ] ) {
				table.children( "caption" ).after( createColLabels( "<thead>" ) );
			}
			if ( hasColLabels[ tIndex ][ 1 ] ) {
				table.children( "tbody" ).after( createColLabels( "<tfoot>" ) );
			}

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

		if( typeof settings.content[ dataId ] !== "undefined" ) {

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
	function assignAttributes ( source, target ) {
		if( typeof source !== "undefined" ) {
			for( var attrIndex in source ) {
				target.attr( attrIndex, source[ attrIndex ] );
			}
		}
	}

	// Creates the <tfoot> or <thead> elements
	function createColLabels ( pos ) {
		var tPos = $( pos ),
			tr = $( "<tr>" );

		tr.append( $( "<td>" ) );

		for( i = 0; i < settings.columns; i++ ) {
			tr.append( $( "<th>" ) );
		}

		return tPos.append( tr );
	}
}( jQuery, document, window ));