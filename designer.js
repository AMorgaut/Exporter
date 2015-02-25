(function(Exporter) {
    "use strict";
    
    Exporter.setWidth(92);
    Exporter.setHeight(22);

    Exporter.addStates('hover', 'active', 'focus', 'disabled');
    Exporter.addEvent('action');

    var showCsvHeader = function() {
        if (this.exportFormat() === 'csv') {
            this.csvHeader.show();
        } else {
            this.csvHeader.hide();
        }
    };

    var showServiceUrl = function() {
        if (this.remote()) {
            this.serviceURL.show();
        } else {
            this.serviceURL.hide();
        }
    };

    Exporter.doAfter('init', function() {
        showCsvHeader.call(this);
        this.exportFormat.onChange(showCsvHeader);
        this.subscribe('datasourceBindingChange', 'exportFormat', showCsvHeader, this);

        if (this.remote) {
            showServiceUrl.call(this);
            this.remote.onChange(showServiceUrl);
            this.subscribe('datasourceBindingChange', 'remote', showServiceUrl, this);
        } else {
            this.serviceURL.hide();
        }
        
        // disable click
        $(this.node).off('click', this._handleClick);
    });

    Exporter.customizeProperty('csvHeader', { category: 'Advanced Properties' });
    Exporter.customizeProperty('zipFile', { category: 'Advanced Properties' });
    Exporter.customizeProperty('serviceURL', { category: 'Advanced Properties' });
});