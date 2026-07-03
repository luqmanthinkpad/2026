(function() {
    function init() {
        // Create the fixed bottom container (same styles as original)
        var fixedDiv = document.createElement('div');
        fixedDiv.id = 'fixedban';
        fixedDiv.style.cssText =
            'width:100%;margin:auto;text-align:center;float:none;overflow:hidden;display:scroll;position:fixed;bottom:0;z-index:999;-webkit-transform:translateZ(0);';
        
        var innerDiv = document.createElement('div');
        innerDiv.style.cssText =
            'text-align:center;display:block;max-width:728px;height:auto;overflow:hidden;margin:auto';
        fixedDiv.appendChild(innerDiv);

        // Create an iframe to host the ad (isolates document.write calls)
        var iframe = document.createElement('iframe');
        iframe.style.cssText =
            'border:none;overflow:hidden;width:300px;height:250px;';
        iframe.scrolling = 'no';
        iframe.allowTransparency = 'true';
        innerDiv.appendChild(iframe);

        document.body.appendChild(fixedDiv);

        // Write the ad code into the iframe's document
        var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        iframeDoc.open();
        iframeDoc.write('<!DOCTYPE html><html><head></head><body>');
        iframeDoc.write('<scr' + 'ipt type="text/javascript">');
        iframeDoc.write('atOptions = {');
        iframeDoc.write('"key": "a215683d2d0ce8fecd54e01b99606d75",');
        iframeDoc.write('"format": "iframe",');
        iframeDoc.write('"height": 250,');
        iframeDoc.write('"width": 300,');
        iframeDoc.write('"params": {}');
        iframeDoc.write('};');
        iframeDoc.write(
            'document.write("<scr" + "ipt type=\\"text/javascript\\" src=\\"http' +
            (location.protocol === 'https:' ? 's' : '') +
            '://anguishgrandpa.com/a215683d2d0ce8fecd54e01b99606d75/invoke.js\\"></scr" + "ipt>");'
        );
        iframeDoc.write('</scr' + 'ipt>');
        iframeDoc.write('</body></html>');
        iframeDoc.close();
    }

    // Ensure the DOM is ready before appending elements
    if (document.body) {
        init();
    } else {
        document.addEventListener('DOMContentLoaded', init);
    }
})();
