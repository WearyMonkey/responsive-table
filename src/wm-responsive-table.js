(function (window, document, undefined) {
    "use strict";

    function wmResponsiveTable(tableEle, options) {
        options = options || {};

        var i, j, rows, row, cols,
            pinnedCols = getWithDefault(options, 'pinnedColumns', 1),
            fixedHeadTableEle = handleHeader(tableEle, options),
            fixedColTableEle = cloneWithClass(tableEle, "wm-rt-fixed-cols"),
            containerEle = wrap(tableEle, "<div class='wm-rt-container'>");

        tableEle.className += " wm-rt-scroll-cols";
        containerEle.appendChild(fixedColTableEle);
        if (fixedHeadTableEle) {
            containerEle.appendChild(fixedHeadTableEle);
        }

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
        var tableRect,
            fixedHeadTableEle = null,
            isFixed = false,
            fixedClass = ' wm-rt-fixed ',
            headEle = tableEle.getElementsByTagName('thead')[0],
            headerIsFixed = getWithDefault(options, 'fixedHeader', true);

        if (headEle) {
            fixedHeadTableEle = cloneWithClass(tableEle, "wm-rt-fixed-header");
            fixedHeadTableEle.style.height = (headEle.scrollHeight + 1) + 'px';

            if (headerIsFixed) {
                onDocumentScroll(function () {
                    tableRect = tableEle.getBoundingClientRect();
                    if (tableRect.top < 0 && tableRect.bottom > 0) {
                        if (!isFixed) {
                            fixedHeadTableEle.className += fixedClass;
                            isFixed = true;
                        }
                    } else {
                        if (isFixed) {
                            fixedHeadTableEle.className = fixedHeadTableEle.className.replace(fixedClass, '');
                            isFixed = false;
                        }
                    }
                });
            }

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