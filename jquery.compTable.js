(function ($) {
    var settings;

    $.fn.compTable = function(options) {

        var defaults = {
            structure: "",
            content: "",
            columns: 3,
            defaultValues: [],
            header: "first",
            footer: "last",
            classes: "",
        };

        settings = $.extend({}, defaults, options);

        this.append(renderCompTables());
    };

    renderCompTables = function() {
        var startTime = new Date().getTime();

        var colCount = settings.columns;
        var tempWrapper = $('<div></div>');

        $(compTableStructure).each(function(index) {
            var tableIndex = index;
            var tableTitle = this.title;
            var tableLabel = $('<h3></h3>');
            var table = $('<table><tbody></tbody></table>');
            var tbody = $('tbody', table);

            tableLabel.addClass('group-label');
            tableLabel.text(tableTitle);

            table.attr('id', this.id);
            table.attr('class', 'table');
            table.attr('cellspacing', '0').attr('cellpadding', '0');

            /*
             * Table body
             */
            $(this.rows).each(function(index) {
                var row = this;
                var tr = $('<tr></tr>');
                var label = $('<div></div>').html(row['name']);
                var title = row['title'].trim();

                if(title.length > 0) {
                    label.attr('title', title);
                }

                label = $('<td></td>').addClass('label').append(label);
                tr.append(label);

                for(var i = 1; i <= colCount; i++) {
                    tr.append($('<td></td>'));
                }

                tbody.append(tr);
            });

            tempWrapper.append(tableLabel);
            tempWrapper.append(table);
        });
        
        var endTime = new Date().getTime();
        console.log('Table(s) rendered in: ' + (endTime - startTime) + 'ms');

        return tempWrapper.children();
    }
 
}(jQuery));