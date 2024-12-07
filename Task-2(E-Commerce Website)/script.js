const products = [
    {
        id: 1,
        name: "Premium Wireless Headphones",
        category: "Electronics",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
        description: "High-quality wireless headphones with noise cancellation"
    },
    {
        id: 2,
        name: "Designer Watch",
        category: "Fashion",
        price: 299.99,
        image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314",
        description: "Elegant timepiece with premium materials"
    },
    {
        id: 3,
        name: "Smart Home Speaker",
        category: "Electronics",
        price: 149.99,
        image: "https://images.unsplash.com/photo-1543512214-318c7553f230",
        description: "Voice-controlled smart speaker with premium sound"
    },
    {
        id: 4,
        name: "Leather Handbag",
        category: "Fashion",
        price: 399.99,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
        description: "Genuine leather handbag with classic design"
    }
];
// Category Images
const categoryImages = {
    Electronics: "https://images.unsplash.com/photo-1498049794561-7780e7231661",
    Fashion: "https://images.unsplash.com/photo-1445205170230-053b83016050",
    HomeDecor: "https://images.unsplash.com/photo-1513694203232-719a280e022f",
    Beauty: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9"
};
// State Management
let cart = [];
let wishlist = [];
let currentSection = 'home';
// Initialize Page
document.addEventListener('DOMContentLoaded', () => {
    initializeProducts();
    setupEventListeners();
    setupNavigation();
    updateCategoryImages();
    updateCartDisplay();
    // Remove preloader after content loads
    setTimeout(() => {
        document.querySelector('.preloader').style.display = 'none';
    }, 2000);
});
// Navigation Setup
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = e.target.getAttribute('href').replace('#', '');
            navigateToSection(section);
        });
    });
    // Handle About Us navigation
    document.querySelector('a[href="#about"]').addEventListener('click', (e) => {
        e.preventDefault();
        showAboutSection();
    });
}
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').replace('#', '');
            if (targetId === 'home') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            // Special handling for shop and about
            if (targetId === 'shop') {
                const featuredProductsSection = document.querySelector('.featured-products');
                featuredProductsSection.scrollIntoView({ behavior: 'smooth' });
                return;
            }     
            if (targetId === 'about') {
                const aboutSection = document.querySelector('.about');
                aboutSection.scrollIntoView({ behavior: 'smooth' });
                return;
            }
        });
    });
    // Handle CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', () => {
            const featuredProductsSection = document.querySelector('.featured-products');
            featuredProductsSection.scrollIntoView({ behavior: 'smooth' });
        });
    });
}
function enhanceCartInteractions() {
    // Ensure cart modal buttons work globally
    document.addEventListener('click', (e) => {
        if (e.target.matches('.cart-item-actions button')) {
            const productId = parseInt(e.target.closest('.cart-item').dataset.id);
            const action = e.target.textContent.trim();
            if (action === '+') {
                addToCart(productId);
            } else if (action === '-') {
                removeFromCart(productId);
            }
            updateCartDisplay();
            updateCartModalContent();
        }
    });
}
function setupCheckout() {
    const checkoutButton = document.querySelector('.proceed-checkout');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Your cart is empty. Please add items before checkout.');
                return;
            }
            // Simple checkout simulation
            alert('Proceeding to checkout...\n' + 
                  `Total Items: ${cart.reduce((total, item) => total + item.quantity, 0)}\n` +
                  `Total Amount: $${cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}`);
            
            // Optional: Clear cart after checkout
            cart = [];
            updateCartDisplay();
            updateCartModalContent();
        });
    }
}
// Modify existing DOMContentLoaded event
document.addEventListener('DOMContentLoaded', () => {
    // Existing initialization functions
    initializeProducts();
    setupEventListeners();
    setupNavigation();
    updateCategoryImages();
    updateCartDisplay();
    setupModalToggle();
    setupProductInteractions();
    // New functions
    setupSmoothScrolling();
    enhanceCartInteractions();
    setupCheckout();
    // Remove preloader after content loads
    setTimeout(() => {
        document.querySelector('.preloader').style.display = 'none';
    }, 2000);
});
function navigateToSection(section) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(sec => {
        sec.style.display = 'none';
    });
    // Show selected section
    const targetSection = document.querySelector(`#${section}`);
    if (targetSection) {
        targetSection.style.display = 'block';
        currentSection = section; 
        // Update active nav link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${section}`) {
                link.classList.add('active');
            }
        });
    }
}
function showAboutSection() {
    const mainContent = document.querySelector('main');
    mainContent.innerHTML = `
        <section id="about" class="section about">
            <div class="about-content">
                <h2>About LuxeCart</h2>
                <p>Welcome to LuxeCart, your premier destination for luxury shopping. We pride ourselves on offering the finest selection of premium products across various categories.</p>
                <p>Our mission is to provide an exceptional shopping experience with carefully curated items that meet the highest standards of quality and elegance.</p>
                <div class="about-features">
                    <div class="feature">
                        <h3>Premium Quality</h3>
                        <p>All our products are carefully selected to ensure premium quality.</p>
                    </div>
                    <div class="feature">
                        <h3>Expert Curation</h3>
                        <p>Our team of experts curates each collection with passion and precision.</p>
                    </div>
                    <div class="feature">
                        <h3>Customer First</h3>
                        <p>We prioritize customer satisfaction in everything we do.</p>
                    </div>
                </div>
            </div>
        </section>
    `;
}
function updateCategoryImages() {
    const categoryCards = document.querySelectorAll('.category-card img');
    categoryCards.forEach(card => {
        const category = card.parentElement.querySelector('h3').textContent;
        const imageUrl = categoryImages[category.replace(' ', '')] || categoryImages.Fashion;
        card.src = imageUrl;
    });
}
function initializeProducts() {
    const productGrid = document.getElementById('productGrid');
    if (productGrid) {
        productGrid.innerHTML = products.map(product => `
            <div class="product-card" data-id="${product.id}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <div class="product-category">${product.category}</div>
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <div class="product-actions">
                        <button class="add-to-cart" data-id="${product.id}">
                        Add to Cart
                        </button>
                        <button class="add-to-wishlist" data-id="${product.id}">
                            ❤
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
        setupProductListeners();
    }
}
function setupProductListeners() {
    // Add to Cart Button Listeners
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}
    // Add to Wishlist Button Listeners
    const addToWishlistButtons = document.querySelectorAll('.add-to-wishlist');
    addToWishlistButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToWishlist(productId);
        });
    });
    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) return;
    
        const existingCartItem = cart.find(item => item.id === productId);
        if (existingCartItem) {
            existingCartItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCartDisplay();
        showNotification(`${product.name} added to cart`);
    }
function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
        } else {
            cart.splice(index, 1);
        }
        updateCartDisplay();
    }
}
function updateCartDisplay() {
    const cartElement = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cartCountElement = document.getElementById('cart-count');
    if (cartElement && cartTotalElement && cartCountElement) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        cartElement.innerHTML = cart.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
                    <div class="cart-item-actions">
                        <button onclick="removeFromCart(${item.id})">-</button>
                        <button onclick="addToCart(${item.id})">+</button>
                    </div>
                </div>
            </div>
        `).join('');
        cartTotalElement.textContent = `$${totalPrice.toFixed(2)}`;
        cartCountElement.textContent = totalItems;
    }
}
function addToWishlist(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const existingWishlistItem = wishlist.find(item => item.id === productId);
    if (!existingWishlistItem) {
        wishlist.push(product);
        showNotification(`${product.name} added to wishlist`);
        updateWishlistDisplay();
    }
}
function updateWishlistDisplay() {
    const wishlistElement = document.getElementById('wishlist-items');
    if (wishlistElement) {
        wishlistElement.innerHTML = wishlist.map(item => `
            <div class="wishlist-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}">
                <div class="wishlist-item-details">
                    <h4>${item.name}</h4>
                    <p>$${item.price.toFixed(2)}</p>
                    <button onclick="moveToCart(${item.id})">Move to Cart</button>
                </div>
            </div>
        `).join('');
    }
}
function moveToCart(productId) {
    const wishlistItem = wishlist.find(item => item.id === productId);
    if (wishlistItem) {
        addToCart(productId);
        wishlist = wishlist.filter(item => item.id !== productId);
        updateWishlistDisplay();
    }
}
function showNotification(message) {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 2000);
}
// Enhanced Product Interaction Functions
function setupProductInteractions() {
    const productGrid = document.getElementById('productGrid');
    if (!productGrid) return;
    // Delegated event listener for add to cart
    productGrid.addEventListener('click', (e) => {
        const addToCartButton = e.target.closest('.add-to-cart');
        if (addToCartButton) {
            const productId = parseInt(addToCartButton.getAttribute('data-id'));
            addToCartWithFeedback(productId, addToCartButton);
        }
        // Wishlist button handler
        const addToWishlistButton = e.target.closest('.add-to-wishlist');
        if (addToWishlistButton) {
            const productId = parseInt(addToWishlistButton.getAttribute('data-id'));
            addToWishlistWithFeedback(productId, addToWishlistButton);
        }
    });
}
function addToCartWithFeedback(productId, buttonElement) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    // Temporary disable to prevent multiple clicks
    buttonElement.disabled = true;
    buttonElement.classList.add('loading');
    // Simulating async operation
    setTimeout(() => {
        const existingCartItem = cart.find(item => item.id === productId);
        if (existingCartItem) {
            existingCartItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        // Update cart display and notification
        updateCartDisplay();
        updateCartBadge();
        showResponsiveFeedback(buttonElement, `${product.name} added to cart`, 'success');
        // Re-enable button
        buttonElement.disabled = false;
        buttonElement.classList.remove('loading');
    }, 300);
}
function addToWishlistWithFeedback(productId, buttonElement) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    // Temporary disable to prevent multiple clicks
    buttonElement.disabled = true;
    buttonElement.classList.add('loading');
    // Simulating async operation
    setTimeout(() => {
        const existingWishlistItem = wishlist.find(item => item.id === productId);
        if (!existingWishlistItem) {
            wishlist.push(product);
            updateWishlistDisplay();
            updateWishlistBadge();
            showResponsiveFeedback(buttonElement, `${product.name} added to wishlist`, 'success');
        }
        // Re-enable button
        buttonElement.disabled = false;
        buttonElement.classList.remove('loading');
    }, 300);
}
function showResponsiveFeedback(element, message, type = 'success') {
    // Remove any existing feedback
    const existingFeedback = element.querySelector('.feedback-tooltip');
    if (existingFeedback) {
        existingFeedback.remove();
    }
    // Create feedback tooltip
    const tooltip = document.createElement('div');
    tooltip.classList.add('feedback-tooltip', type);
    tooltip.textContent = message;
    // Position the tooltip
    const rect = element.getBoundingClientRect();
    tooltip.style.position = 'fixed';
    tooltip.style.top = `${rect.top - 40}px`;
    tooltip.style.left = `${rect.left + rect.width / 2}px`;
    tooltip.style.transform = 'translateX(-50%)';
    document.body.appendChild(tooltip);
    // Animate and remove
    setTimeout(() => {
        tooltip.classList.add('fade-out');
        setTimeout(() => {
            document.body.removeChild(tooltip);
        }, 500);
    }, 2000);
}
function updateCartBadge() {
    const cartBadge = document.querySelector('.cart-count');
    if (cartBadge) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartBadge.textContent = totalItems;
        cartBadge.classList.add('bounce');
        setTimeout(() => cartBadge.classList.remove('bounce'), 500);
    }
}
function updateWishlistBadge() {
    const wishlistBadge = document.querySelector('.wishlist-count');
    if (wishlistBadge) {
        wishlistBadge.textContent = wishlist.length;
        wishlistBadge.classList.add('bounce');
        setTimeout(() => wishlistBadge.classList.remove('bounce'), 500);
    }
}
// Add to existing event setup
document.addEventListener('DOMContentLoaded', () => {
    setupProductInteractions();
});
function setupEventListeners() {
    // Any additional event listeners can be added here
}
function setupModalToggle() {
    // Cart modal toggle
    const cartIcon = document.querySelector('.cart-count');
    const cartModal = document.getElementById('cartModal');
    const cartCloseButton = cartModal.querySelector('.modal-header');
    if (cartIcon) {
        cartIcon.addEventListener('click', () => {
            cartModal.style.display = 'block';
            updateCartModalContent();
        });
    }
    if (cartCloseButton) {
        cartCloseButton.addEventListener('click', () => {
            cartModal.style.display = 'none';
        });
    }
    // Wishlist modal toggle
    const wishlistIcon = document.querySelector('.wishlist-count');
    const wishlistModal = document.createElement('div');
    wishlistModal.id = 'wishlistModal';
    wishlistModal.classList.add('modal');
    wishlistModal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Your Wishlist</h2>
                <span class="close">&times;</span>
            </div>
            <div id="wishlist-items" class="wishlist-items"></div>
        </div>
    `;
    document.body.appendChild(wishlistModal);
    if (wishlistIcon) {
        wishlistIcon.addEventListener('click', () => {
            wishlistModal.style.display = 'block';
            updateWishlistModalContent();
        });
    }
    const wishlistCloseButton = wishlistModal.querySelector('.close');
    if (wishlistCloseButton) {
        wishlistCloseButton.addEventListener('click', () => {
            wishlistModal.style.display = 'none';
        });
    }
    // Close modals when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === cartModal) {
            cartModal.style.display = 'none';
        }
        if (event.target === wishlistModal) {
            wishlistModal.style.display = 'none';
        }
    });
}
function updateCartModalContent() {
    const cartItemsContainer = document.querySelector('#cartModal .cart-items');
    const subtotalElement = document.querySelector('.subtotal-amount');
    const shippingElement = document.querySelector('.shipping-amount');
    const totalElement = document.querySelector('.total-amount');
    if (cartItemsContainer) {
        // Render cart items
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
                    <div class="cart-item-actions">
                        <button onclick="removeFromCart(${item.id})">-</button>
                        <button onclick="addToCart(${item.id})">+</button>
                    </div>
                </div>
            </div>
        `).join('');
        // Calculate totals
        const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        const shipping = subtotal > 50 ? 0 : 5.99;
        const total = subtotal + shipping;
        // Update total elements
        if (subtotalElement) subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        if (shippingElement) shippingElement.textContent = shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`;
        if (totalElement) totalElement.textContent = `$${total.toFixed(2)}`;
    }
}
function updateWishlistModalContent() {
    const wishlistItemsContainer = document.getElementById('wishlist-items');
    if (wishlistItemsContainer) {
        wishlistItemsContainer.innerHTML = wishlist.length > 0 
            ? wishlist.map(item => `
                <div class="wishlist-item" data-id="${item.id}">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="wishlist-item-details">
                        <h4>${item.name}</h4>
                        <p>$${item.price.toFixed(2)}</p>
                        <div class="wishlist-actions">
                            <button onclick="moveToCart(${item.id})">Move to Cart</button>
                            <button onclick="removeFromWishlist(${item.id})">Remove</button>
                        </div>
                    </div>
                </div>
            `).join('')
            : '<p>Your wishlist is empty.</p>';
}
}
function removeFromWishlist(productId) {
    wishlist = wishlist.filter(item => item.id !== productId);
    updateWishlistModalContent();
    updateWishlistBadge();
}