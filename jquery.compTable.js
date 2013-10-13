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

    renderCompTables = function() {
        var startTime = new Date().getTime();

        var colCount = settings.columns;
        var tempWrapper = $();

        $(compTableStructure).each( function( index ) {
            var table = $( "<table><caption></caption><tbody></tbody></table>" );
            var tbody = $( "tbody", table );

			table.attr( "id", this.id );
            table.attr( "class", settings.classes );


			$("caption",table).html( this.title );

            /*
             * Table body
             */
            $(this.rows).each(function(index) {
                var tr = $( "<tr></tr>" );
				var label = $( "<td></td>" ).html(this.name);
                var title = this.title.trim();

                if(title.length > 0) {
                    label.attr( "title", title );
                }

                tr.append(label);

                for(var i = 1; i <= colCount; i++) {
                    tr.append($("<td></td>"));
                }

                tbody.append(tr);
            });

            tempWrapper = tempWrapper.add(table);
        });

        var endTime = new Date().getTime();
        console.log("Table(s) rendered in: " + (endTime - startTime) + "ms");

        return tempWrapper;
    }

}(jQuery));