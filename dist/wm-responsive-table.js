(function (window, document, undefined) {
    "use strict";

    /**
     *
     * @param tableEle element of the html table to make responsive
     * @param options.pinnedColumns, the amount of columns that should be pinned to the left
     * @param options.fixedHeader, if true the table header (thead) will be fixed when the user scrolling past the table
     */
    function wmResponsiveTable(tableEle, options) {
        options = options || {};

        var i, j, rows, row, cols,
            pinnedCols = getWithDefault(options, 'pinnedColumns', 1),
            fixedHeadTableEle = handleHeader(tableEle, options),
            fixedColTableEle = cloneWithClass(tableEle, "wm-rt-fixed-cols"), // we make a exact copy so it keeps the styling
            containerEle = wrap(tableEle, "<div class='wm-rt-container'>"); // wrap the table in a container

        tableEle.className += " wm-rt-scroll-cols";
        containerEle.appendChild(fixedColTableEle);
        if (fixedHeadTableEle) {
            containerEle.appendChild(fixedHeadTableEle);
        }

        // add wm-rt-pinned-col to all cells in pinned columns, and
        // wm-rt-scroll-col in others
        rows = containerEle.getElementsByTagName('tr');
        for (i = 0; i < rows.length; ++i) {
            row = rows[i];
            cols = row.getElementsByTagName('td');
            for (j = 0; j < cols.length; ++j) {
                if (j < pinnedCols) cols[j].className += ' wm-rt-pinned-col';
                else cols[j].className += ' wm-rt-scroll-col';
            }
        }
    }

    function handleHeader(tableEle, options) {
        var tableRect, tableIsBelowFold,
            fixedHeadTableEle = null,
            headEle = tableEle.getElementsByTagName('thead')[0],
            headerIsFixed = getWithDefault(options, 'fixedHeader', true);

        if (headEle) {
            fixedHeadTableEle = cloneWithClass(tableEle, "wm-rt-fixed-header");
            fixedHeadTableEle.style.height = (headEle.scrollHeight + 1) + 'px';

            if (headerIsFixed) {
                // on scroll events, check if part of the table is visible, but not the top
                // if so, display the fixed header so user can always refer to header titles
                onDocumentScroll(function () {
                    tableRect = tableEle.getBoundingClientRect();
                    tableIsBelowFold = tableRect.top < 0 && tableRect.bottom > 0;
                    fixedHeadTableEle.style.display = tableIsBelowFold ? 'block' : 'none';
                });
            }

            // make sure the header scrolls with the cells
            addEventListener(tableEle, 'scroll', function () {
                fixedHeadTableEle.scrollLeft = tableEle.scrollLeft;
            });
        }

        return fixedHeadTableEle;
    }

    var scrollListeners = [];

    function onDocumentScroll(callback) {
        if (!scrollListeners.length) {
            addEventListener(document, 'scroll', function () {
                for (var i = 0; i < scrollListeners.length; ++i) {
                    scrollListeners[i]();
                }
            });
        }
        scrollListeners.push(callback);
    }

    function addEventListener(element, event, callback) {
        element.addEventListener(event, callback, false);
    }

    // wraps the given node with the given html
    function wrap(node, withHtml) {
        var factory = document.createElement('div');
        factory.innerHTML = withHtml;
        var container = factory.childNodes[0];

        node.parentNode.insertBefore(container, node);
        container.appendChild(node);

        return container;
    }

    function cloneWithClass(node, clazz) {
        var clone = node.cloneNode(true);
        clone.className += ' ' + clazz;
        return clone;
    }

    function getWithDefault(options, key, def) {
        return options[key] === undefined ? def : options[key];
    }

    (function ($) {
        if ($) {
            $.fn.wmResponsiveTable = function (options) {
                return this.each(function () {
                    wmResponsiveTable(this, options);
                });
            };
        }
    })(window.jQuery || window.Zepto);

    window.wmResponsiveTable = wmResponsiveTable;

})(window, document, undefined);