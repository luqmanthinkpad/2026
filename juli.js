// sticky-ads.js – Self-contained sticky ad injector
(function() {
    const AD_DOMAIN = "anguishgrandpa.com";

    // Core function to inject the ad iframe into a container
    const injectIframeAd = (containerId, key, width, height) => {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = '';
        
        const iframe = document.createElement('iframe');
        iframe.width = width;
        iframe.height = height;
        iframe.frameBorder = "0";
        iframe.scrolling = "no";
        iframe.style.cssText = "display: block; margin: 0 auto; overflow: hidden; border: none;";
        
        container.appendChild(iframe);

        const iframeDoc = iframe.contentWindow || iframe.contentDocument;
        const doc = iframeDoc.document || iframeDoc;

        doc.open();
        doc.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { margin:0; padding:0; display:flex; justify-content:center; align-items:center; background:transparent; overflow:hidden; width: ${width}px; height: ${height}px; }
                </style>
            </head>
            <body>
                <script type="text/javascript">
                    window.atOptions = {
                        'key' : '${key}',
                        'format' : 'iframe',
                        'height' : ${height},
                        'width' : ${width},
                        'params' : {}
                    };
                <\/script>
                <script type="text/javascript" src="https://${AD_DOMAIN}/${key}/invoke.js"><\/script>
            </body>
            </html>
        `);
        doc.close();
    };

    // Specific function for the sticky ad
    const fillStickyAds = () => {
        injectIframeAd('ads-sticky', '659b04a20a0861b7619a7103d607c7d3', 320, 50);
    };

    // Automatically create the container (if missing) and load the ad
    const initStickyAd = () => {
        let container = document.getElementById('ads-sticky');
        
        // If the container doesn't exist in the HTML, create it dynamically
        if (!container) {
            container = document.createElement('div');
            container.id = 'ads-sticky';
            document.body.appendChild(container);
        }

        // Apply (or re-apply) the exact styles you requested
        container.style.cssText = `
            width: 320px;
            height: 50px;
            background: #f9f9f9;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #999;
        `;
        // Optional: Add placeholder text that will be replaced by the ad
        container.textContent = 'Loading ad...';

        // Inject the actual ad
        fillStickyAds();
    };

    // Wait for the DOM to be ready before running
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initStickyAd);
    } else {
        initStickyAd();
    }
})();
