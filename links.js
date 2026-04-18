(async function() {
    const API_URL = 'https://norest.website/api/autobacklink?limit=5';
    
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const links = await response.json();
        
        if (links && Array.isArray(links) && links.length > 0) {
            const container = document.createElement('div');
            container.id = 'csr-autobacklink-container';
            
            let html = `
            <style>
                #csr-autobacklink-container {
                    max-width: 100%; 
                    margin: 30px 10px; 
                    padding: 15px;
                    background: #ffffff;
                    border-top: 2px solid #007bff;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                    box-sizing: border-box;
                }
                #csr-autobacklink-container .auto-bl-title {
                    font-size: 16px;
                    font-weight: 700;
                    margin-bottom: 12px;
                    color: #333;
                    display: flex;
                    align-items: center;
                }
                #csr-autobacklink-container .auto-bl-title::after {
                    content: "";
                    flex: 1;
                    margin-left: 10px;
                    height: 1px;
                    background: #eee;
                }
                #csr-autobacklink-container .auto-bl-list {
                    display: flex;
                    flex-direction: column; /* Urut ke bawah */
                    gap: 8px;
                    padding: 0;
                    margin: 0;
                    list-style: none;
                }
                #csr-autobacklink-container .auto-bl-list li {
                    padding: 4px 0;
                    border-bottom: 1px solid #f8f9fa;
                }
                #csr-autobacklink-container .auto-bl-list li::before {
                    content: "»";
                    color: #007bff;
                    margin-right: 10px;
                    font-weight: bold;
                }
                #csr-autobacklink-container .auto-bl-list a {
                    color: #0056b3;
                    text-decoration: none;
                    font-size: 14px;
                    line-height: 1.5;
                    transition: all 0.2s ease;
                }
                #csr-autobacklink-container .auto-bl-list a:hover {
                    color: #d93025;
                    padding-left: 5px;
                    text-decoration: underline;
                }
            </style>
            <div class="auto-bl-title">RECOMMENDED LINKS</div>
            <ul class="auto-bl-list">
            `;
            
            links.forEach(item => {
                html += `<li><a href="${item.url}" target="_blank" rel="noopener">${item.title}</a></li>`;
            });
            
            html += `</ul>`;
            container.innerHTML = html;
            
            const injectToBody = () => {
                const footer = document.querySelector('footer') || document.body;
                footer.appendChild(container);
            };
            
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', injectToBody);
            } else {
                injectToBody();
            }
        }
    } catch (error) {
        console.warn('[CSR] Autobacklink gagal dimuat:', error.message);
    }
})();
