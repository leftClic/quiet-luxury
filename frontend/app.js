/**
 * QUIET LUXURY - Catálogo Dinámico
 * Módulo para cargar y renderizar la colección de productos.
 */

document.addEventListener('DOMContentLoaded', () => {
    const catalogGrid = document.getElementById('catalog-grid');
    
    // Ruta exacta del archivo de catálogo proporcionado
    const CATALOG_PATH = '../products/catalog.json';

    /**
     * Realiza la petición fetch para obtener los productos del catálogo.
     */
    async function fetchCatalog() {
        try {
            const response = await fetch(CATALOG_PATH);
            
            if (!response.ok) {
                throw new Error(`Error al obtener catálogo: ${response.status}`);
            }
            
            const data = await response.json();
            renderProducts(data.products);
        } catch (error) {
            console.error('Error cargando el catálogo:', error);
            renderError();
        }
    }

    /**
     * Renderiza cada tarjeta de producto de forma dinámica en el DOM.
     * @param {Array} products - Lista de productos obtenidos del JSON.
     */
    function renderProducts(products) {
        if (!products || products.length === 0) {
            catalogGrid.innerHTML = '<div class="loading">No hay piezas disponibles en este momento.</div>';
            return;
        }

        // Limpiar el estado de carga
        catalogGrid.innerHTML = '';

        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.setAttribute('tabindex', '0'); // Soporte para navegación con teclado

            // Contenedor de la imagen
            const imageContainer = document.createElement('div');
            imageContainer.className = 'product-image-container';

            // Imagen principal (Obligatoria)
            const imgPrimary = document.createElement('img');
            imgPrimary.className = 'product-image product-image-primary';
            imgPrimary.src = product.images[0];
            imgPrimary.alt = `${product.brand} ${product.model} - Vista Principal`;
            imgPrimary.loading = 'lazy';
            imageContainer.appendChild(imgPrimary);

            // Imagen secundaria para efecto hover (si existe en el array)
            if (product.images.length > 1) {
                const imgSecondary = document.createElement('img');
                imgSecondary.className = 'product-image-secondary';
                imgSecondary.src = product.images[1];
                imgSecondary.alt = `${product.brand} ${product.model} - Vista Secundaria`;
                imgSecondary.loading = 'lazy';
                imageContainer.appendChild(imgSecondary);
            }

            // Información detallada
            const info = document.createElement('div');
            info.className = 'product-info';

            const brand = document.createElement('span');
            brand.className = 'product-brand';
            brand.textContent = product.brand;

            const model = document.createElement('h3');
            model.className = 'product-model';
            model.textContent = product.model;

            const description = document.createElement('p');
            description.className = 'product-description';
            description.textContent = product.description;

            // Formato de precio elegante (si es 0, se muestra como Bajo Consulta)
            const price = document.createElement('span');
            price.className = 'product-price';
            price.textContent = product.price > 0 ? `$${product.price.toLocaleString('en-US')} USD` : 'Bajo consulta';

            // Composición de elementos
            info.appendChild(brand);
            info.appendChild(model);
            info.appendChild(description);
            info.appendChild(price);

            card.appendChild(imageContainer);
            card.appendChild(info);

            // Evento para interacciones futuras
            card.addEventListener('click', () => {
                console.log(`Consulta sobre la pieza: ${product.brand} ${product.model}`);
            });

            // Accesibilidad para tecla Enter o Espacio
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    card.click();
                }
            });

            catalogGrid.appendChild(card);
        });
    }

    /**
     * Muestra un mensaje de error elegante si la carga del catálogo falla.
     */
    function renderError() {
        catalogGrid.innerHTML = `
            <div class="error-message">
                <p>No ha sido posible cargar la colección en este momento.</p>
                <p style="font-size: 0.9rem; font-family: var(--font-sans); font-style: normal; margin-top: 10px; color: var(--text-secondary);">
                    Por favor, inténtelo de nuevo más tarde.
                </p>
            </div>
        `;
    }

    // Iniciar la carga
    fetchCatalog();
});
