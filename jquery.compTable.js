/*
 * compTable - a jQuery plugin to dynamically compare information in tables
 * @copyright Nikolas Grottendieck, Jan Musmann 2013
 * @license https://github.com/Okeanos/compTable/blob/master/LICENSE
 */
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

		this.append( renderCompTables() );
	};

	function renderCompTables() {
		var tempWrapper = $();

		// Creating two-dim array for label assignment with default values
		var hasColLabels = new Array();
		for ( i = 0; i < settings.structure.length; i++ ) {
			hasColLabels[i] = [false, false];
		}

		// Setting label assignment values
		$( ["header", "footer"] ).each( function( index, value ) {
			var sVal = settings[value];

			if ( typeof sVal === "string" && sVal !== "none" ) {
				if ( sVal === "all" ) {
					for ( i = settings.structure.length - 1; i >= 0; i-- ) {
						hasColLabels[i][index] = true;
					}			
				} else if ( sVal === "first" ) {
					hasColLabels[0][index] = true;
				} else if ( sVal === "last" ) {
					hasColLabels[settings.structure.length - 1][index] = true;
				}
			}

			if ( typeof sVal === "number" && sVal !== 0 ) {
				for ( i = settings.structure.length - 1; i >= 0; i-- ) {
					if ( i % Math.abs( sVal ) === 0 ) hasColLabels[i][index] = true;
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
			if ( hasColLabels[tIndex][0] ) table.children( "caption" ).after( createColLabels( "thead" ) );
			if ( hasColLabels[tIndex][1] ) table.children( "tbody" ).after( createColLabels( "tfoot" ) );

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
				for( var i = 0; i < settings.columns; i++ ) {
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

	function assignAttributes ( source, target ) {
		if( typeof source !== "undefined" ) {
			for( var attrIndex in source ) {
				target.attr( attrIndex, source[ attrIndex ] );
			}
		}
	}

	// Creates the <tfoot> or <thead> elements
	function createColLabels ( pos ) {
		var tPos = $( document.createElement( pos ) ),
			tr = $( "<tr>" );

		tr.append( $( "<td>" ) );

		for( var i = 0; i < settings.columns; i++ ) {
			tr.append( $( "<th>" ) );
		}

		return tPos.append( tr );;
	}
}( jQuery ));