# Responsive Table

Responsive data tables that work on mobile devices. Works by making the table header and left columns sticky while
the use can scroll the other columns horizontaly.

## Demos

* todo

## Features

* Pin table header to top of the browser window while user scrolls over it
* Pin left columns while user can scroll over columns
* Tiny, 2kb  minified, 1kb gzipped.
* No dependencies (jQuery not required)
* jQuery/Zepto plugin support (only if jQuery/Zepto is present)

## Installation

1. todo bower/browserify

2. Include Style sheet in head

```html
<head>
    .
    <link rel="stylesheet" type="text/css" href="bower-components/wm-responsive-table/dist/wm-responsive-table.css">
    .
</head>
```

3. Include JavaScript

```html
 <script src="bower-components/wm-responsive-table/dist/wm-responsive-table.js"></script>
```

If you are using jQuery, make sure you include wm-responsive-table after jQuery for the plugin to work.

## Usage

#### Options

wmResponsiveTable can takes an option object of key/value settings:

* **pinnedColumns** Integer *(default:1, optional)* - The amount of columns that will be pinned to the left
* **fixedHeader** Boolean *(default:true, optional)* - If true, the thead element of the table will stick to the top of the browser window when the user has scrolled past the top of the table.

#### Example

```html
<table id="my-table">
    <thead>
        <tr>
            <td colspan="6">My Responsive Table</td>
        </tr>
    </thead>
    <tbody>
        <tr><td>Group A</td> <td>7,000</td> <td>6,000</td> <td>56,000</td></tr>
        <tr><td>Group A</td> <td>7,000</td> <td>6,000</td> <td>56,000</td></tr>
    </tbody>
</table>
```

non-jQuery

```javascript
wmResponsiveTable(document.getElementById("example"), {
    pinnedColumns: 1,
    fixedHeader: true
});
```

jQuery/Zepto

```javascript
$("#example").wmResponsiveTable({
    pinnedColumns: 1,
    fixedHeader: true
})
```

