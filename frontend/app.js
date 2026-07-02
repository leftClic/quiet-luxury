/**
 * QUIET LUXURY - Catálogo Dinámico
 * Módulo para cargar y renderizar la colección de productos.
 */

document.addEventListener('DOMContentLoaded', () => {
    const catalogGrid = document.getElementById('catalog-grid');
    
    // Ruta exacta del archivo de catálogo proporcionado
    const CATALOG_PATH = './products/catalog.json';

    // Elementos del modal
    const modal = document.getElementById('product-inquiry-modal');
    const modalProductName = document.getElementById('modal-product-name');
    const inquiryForm = document.getElementById('inquiry-form');
    const formView = document.querySelector('.modal-form-view');
    const successView = document.querySelector('.modal-success-view');

    /**
     * Abre el modal de consulta y asigna el nombre de la pieza de forma dinámica.
     * @param {string} brand - Marca del producto.
     * @param {string} model - Modelo del producto.
     */
    function openModal(brand, model) {
        modalProductName.textContent = `${brand} ${model}`;
        modal.classList.add('is-active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
        
        // Foco inicial en el primer campo para accesibilidad
        const firstInput = document.getElementById('client-name');
        if (firstInput) {
            firstInput.focus();
        }
    }

    /**
     * Cierra el modal y restablece la vista del formulario.
     */
    function closeModal() {
        modal.classList.remove('is-active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
        
        // Restablecer el formulario y vistas tras completarse la animación
        setTimeout(() => {
            if (inquiryForm) {
                inquiryForm.reset();
            }
            if (formView && successView) {
                formView.style.display = 'block';
                successView.style.display = 'none';
            }
        }, 400); // Sincronizado con la transición de 0.4s en CSS
    }

    // Cerrar modal al hacer clic en el botón de cerrar o en el fondo traslúcido
    modal.addEventListener('click', (e) => {
        if (e.target.hasAttribute('data-close-modal')) {
            closeModal();
        }
    });

    // Cerrar modal con la tecla de escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('is-active')) {
            closeModal();
        }
    });

    // Interceptar envío del formulario para mostrar confirmación elegante
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            formView.style.display = 'none';
            successView.style.display = 'block';
            
            // Cerrar modal automáticamente después de un breve lapso
            setTimeout(() => {
                closeModal();
            }, 3500);
        });
    }

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
            price.textContent = product.price > 0 ? `$${product.price.toLocaleString('en-US')} USD` : 'Precio bajo consulta';

            // Composición de elementos
            info.appendChild(brand);
            info.appendChild(model);
            //info.appendChild(description);
            info.appendChild(price);

            card.appendChild(imageContainer);
            card.appendChild(info);

            // Evento para abrir el modal de consulta
            card.addEventListener('click', (e) => {
                e.preventDefault();
                openModal(product.brand, product.model);
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

        // Inicializar animaciones de revelación por scroll después de inyectar las tarjetas
        initScrollReveal();
    }

    /**
     * Inicializa el IntersectionObserver para animar la aparición de las tarjetas de producto.
     */
    function initScrollReveal() {
        const cards = document.querySelectorAll('.product-card');
        
        // Configuración refinada del observador para un comportamiento elegante
        const observerOptions = {
            root: null,             // Relativo al viewport del navegador
            rootMargin: '0px 0px -80px 0px', // Activa la transición sutilmente dentro del viewport
            threshold: 0.1          // Se activa cuando el 10% del elemento es visible
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Activar la animación añadiendo la clase CSS
                    entry.target.classList.add('is-visible');
                    // Dejar de observar para optimizar rendimiento de scroll
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        cards.forEach(card => {
            observer.observe(card);
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
