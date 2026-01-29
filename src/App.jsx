import React, { useState, useEffect } from 'react';
import { Search, Home, Lock, Eye, X, Edit2, Trash2, Plus, Upload, Maximize } from 'lucide-react';
import './App.css';

// Initial sample data with base64 placeholder
const PLACEHOLDER_IMAGE = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23374151" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" font-size="20" fill="%23fff" text-anchor="middle" dy=".3em"%3ENo Image%3C/svg%3E';

const initialCategories = [
  {
    id: 1,
    name: 'Wipers',
    description: 'Windshield wipers for all vehicle types',
    image: PLACEHOLDER_IMAGE,
    displayOrder: 1
  },
  {
    id: 2,
    name: 'Filters',
    description: 'Air, oil, and fuel filters for optimal engine performance',
    image: PLACEHOLDER_IMAGE,
    displayOrder: 2
  },
  {
    id: 3,
    name: 'Brakes',
    description: 'Brake pads, discs, and brake system components',
    image: PLACEHOLDER_IMAGE,
    displayOrder: 3
  },
  {
    id: 4,
    name: 'Lights',
    description: 'Headlights, tail lights, and bulbs',
    image: PLACEHOLDER_IMAGE,
    displayOrder: 4
  },
  {
    id: 5,
    name: 'Batteries',
    description: 'Car batteries and charging systems',
    image: PLACEHOLDER_IMAGE,
    displayOrder: 5
  },
  {
    id: 6,
    name: 'Suspension',
    description: 'Shock absorbers and suspension parts',
    image: PLACEHOLDER_IMAGE,
    displayOrder: 6
  }
];

const initialProducts = [
  {
    id: 1,
    name: 'Aerotwin Flat Wiper Blade 24"',
    categoryId: 1,
    brand: 'Bosch',
    model: 'AR24U',
    price: 850,
    warranty: '1 Year',
    image: null,
    inStock: true,
    features: ['All-weather performance', 'Silent operation', 'Easy installation', 'Long-lasting rubber'],
    specifications: [
      { label: 'Length', value: '24 inches' },
      { label: 'Type', value: 'Flat blade' },
      { label: 'Material', value: 'Natural rubber' }
    ],
    compatibleVehicles: ['Maruti Swift', 'Hyundai i20', 'Honda City', 'Toyota Innova']
  },
  {
    id: 2,
    name: 'Hybrid Wiper Blade 20"',
    categoryId: 1,
    brand: 'Valeo',
    model: 'VM-20',
    price: 780,
    warranty: '6 Months',
    image: null,
    inStock: true,
    features: ['Hybrid technology', 'Quiet operation'],
    specifications: [
      { label: 'Length', value: '20 inches' },
      { label: 'Type', value: 'Hybrid' }
    ],
    compatibleVehicles: ['Honda Jazz', 'Ford Figo']
  },
  {
    id: 3,
    name: 'Premium Wiper Blade 22"',
    categoryId: 1,
    brand: 'Denso',
    model: 'DCP-22',
    price: 650,
    warranty: '1 Year',
    image: null,
    inStock: true,
    features: ['Aerodynamic design', 'UV resistant'],
    specifications: [
      { label: 'Length', value: '22 inches' }
    ],
    compatibleVehicles: ['Hyundai Creta', 'Kia Seltos']
  },
  {
    id: 4,
    name: 'Ceramic Brake Pads Front',
    categoryId: 3,
    brand: 'Brembo',
    model: 'P50-065',
    price: 2800,
    warranty: '2 Years',
    image: null,
    inStock: true,
    features: ['Low dust', 'Quiet braking', 'Long life'],
    specifications: [
      { label: 'Type', value: 'Ceramic' },
      { label: 'Position', value: 'Front' }
    ],
    compatibleVehicles: ['Honda Civic', 'Toyota Corolla']
  },
  {
    id: 5,
    name: 'LED Headlight Bulb H4',
    categoryId: 4,
    brand: 'Philips',
    model: 'X-treme-H4',
    price: 2200,
    warranty: '3 Years',
    image: null,
    inStock: true,
    features: ['Bright white light', 'Energy efficient', 'Long lifespan'],
    specifications: [
      { label: 'Type', value: 'H4' },
      { label: 'Power', value: '25W' },
      { label: 'Lumens', value: '3600' }
    ],
    compatibleVehicles: ['Multiple vehicles']
  },
  {
    id: 6,
    name: 'High Flow Oil Filter',
    categoryId: 2,
    brand: 'Mann',
    model: 'HU-925/4',
    price: 380,
    warranty: '6 Months',
    image: null,
    inStock: true,
    features: ['High filtration', 'Durable construction'],
    specifications: [
      { label: 'Type', value: 'Cartridge' },
      { label: 'Thread', value: 'M20 x 1.5' }
    ],
    compatibleVehicles: ['BMW 3 Series', 'Audi A4']
  },
  {
    id: 7,
    name: 'Performance Brake Disc',
    categoryId: 3,
    brand: 'TRW',
    model: 'DF6234S',
    price: 3500,
    warranty: '1 Year',
    image: null,
    inStock: true,
    features: ['Slotted design', 'Heat resistant', 'Better stopping power'],
    specifications: [
      { label: 'Diameter', value: '300mm' },
      { label: 'Thickness', value: '28mm' }
    ],
    compatibleVehicles: ['VW Golf', 'Skoda Octavia']
  },
  {
    id: 8,
    name: 'Premium Air Filter',
    categoryId: 2,
    brand: 'Bosch',
    model: 'F026-400-201',
    price: 450,
    warranty: '1 Year',
    image: null,
    inStock: true,
    features: ['99% filtration', 'Easy installation', 'OE quality'],
    specifications: [
      { label: 'Type', value: 'Panel' },
      { label: 'Material', value: 'Synthetic fiber' }
    ],
    compatibleVehicles: ['Maruti Swift', 'Hyundai i20']
  },
  {
    id: 9,
    name: 'Premium Gas Shock Absorber Front',
    categoryId: 6,
    brand: 'Monroe',
    model: 'G7395',
    price: 3200,
    warranty: '2 Years',
    image: null,
    inStock: true,
    features: ['Gas charged', 'Improved handling', 'Comfortable ride'],
    specifications: [
      { label: 'Type', value: 'Gas' },
      { label: 'Position', value: 'Front' }
    ],
    compatibleVehicles: ['Toyota Camry', 'Honda Accord']
  },
  {
    id: 10,
    name: 'Maintenance Free Battery 65Ah',
    categoryId: 5,
    brand: 'Exide',
    model: 'EPIQ65',
    price: 5500,
    warranty: '3 Years',
    image: null,
    inStock: true,
    features: ['Maintenance free', 'High cranking power', 'Long life'],
    specifications: [
      { label: 'Capacity', value: '65Ah' },
      { label: 'Voltage', value: '12V' },
      { label: 'CCA', value: '600A' }
    ],
    compatibleVehicles: ['Most sedan and hatchback cars']
  }
];

// IndexedDB helper functions for offline storage
const DB_NAME = 'AutoPartsDB';
const DB_VERSION = 1;

const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      
      if (!db.objectStoreNames.contains('categories')) {
        db.createObjectStore('categories', { keyPath: 'id' });
      }
      
      if (!db.objectStoreNames.contains('products')) {
        db.createObjectStore('products', { keyPath: 'id' });
      }
    };
  });
};

const saveToIndexedDB = async (storeName, data) => {
  const db = await initDB();
  const transaction = db.transaction([storeName], 'readwrite');
  const store = transaction.objectStore(storeName);
  
  // Clear existing data
  store.clear();
  
  // Add new data
  data.forEach(item => store.add(item));
  
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
};

const loadFromIndexedDB = async (storeName) => {
  try {
    const db = await initDB();
    const transaction = db.transaction([storeName], 'readonly');
    const store = transaction.objectStore(storeName);
    const request = store.getAll();
    
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error('IndexedDB error:', error);
    return null;
  }
};

// Convert image file to base64
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// Main App Component
function AutoPartsKiosk() {
  const [view, setView] = useState('home');
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Load data from IndexedDB on mount
  useEffect(() => {
    const loadData = async () => {
      const savedCategories = await loadFromIndexedDB('categories');
      const savedProducts = await loadFromIndexedDB('products');
      
      if (savedCategories && savedCategories.length > 0) {
        setCategories(savedCategories);
      } else {
        setCategories(initialCategories);
        await saveToIndexedDB('categories', initialCategories);
      }
      
      if (savedProducts && savedProducts.length > 0) {
        setProducts(savedProducts);
      } else {
        setProducts(initialProducts);
        await saveToIndexedDB('products', initialProducts);
      }
    };
    
    loadData();
  }, []);

  // Save to IndexedDB whenever data changes
  useEffect(() => {
    if (categories.length > 0) {
      saveToIndexedDB('categories', categories);
    }
  }, [categories]);

  useEffect(() => {
    if (products.length > 0) {
      saveToIndexedDB('products', products);
    }
  }, [products]);

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setView('category');
  };

  const handleBackHome = () => {
    setView('home');
    setSelectedCategory(null);
    setSelectedProduct(null);
  };

  const handleAdminAccess = () => {
    setView('admin-login');
  };

  const handleAdminLogin = (password) => {
    if (password === 'admin123') {
      setIsAdminAuthenticated(true);
      setView('admin-dashboard');
      return true;
    }
    return false;
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    setView('home');
  };

  return (
    <div className="app-container">
      {/* Fullscreen Toggle Button */}
      {view === 'home' && (
        <button className="fullscreen-toggle" onClick={toggleFullscreen} title="Toggle Fullscreen">
          <Maximize size={24} />
        </button>
      )}

      {view === 'home' && (
        <HomeView 
          categories={categories}
          onCategoryClick={handleCategoryClick}
          onAdminClick={handleAdminAccess}
        />
      )}
      
      {view === 'category' && (
        <CategoryView
          category={selectedCategory}
          products={products.filter(p => p.categoryId === selectedCategory.id)}
          onBack={handleBackHome}
          onProductClick={setSelectedProduct}
        />
      )}

      {view === 'admin-login' && (
        <AdminLoginView
          onLogin={handleAdminLogin}
          onBack={handleBackHome}
        />
      )}

      {view === 'admin-dashboard' && (
        <AdminDashboard
          categories={categories}
          products={products}
          onCategoriesChange={setCategories}
          onProductsChange={setProducts}
          onLogout={handleAdminLogout}
          onViewKiosk={handleBackHome}
        />
      )}

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}

function HomeView({ categories, onCategoryClick, onAdminClick }) {
  return (
    <div className="home-view">
      <div className="home-header">
        <h1 className="home-title">
          <span className="title-auto">AUTO</span>
          <span className="title-parts">PARTS</span>
        </h1>
      </div>

      <div className="home-content">
        <div className="categories-grid">
          {categories.sort((a, b) => a.displayOrder - b.displayOrder).map(category => (
            <CategoryCard key={category.id} category={category} onClick={() => onCategoryClick(category)} />
          ))}
        </div>
      </div>

      <div className="home-footer">
        <p>Touch screen to interact</p>
        <div className="footer-actions">
          <button onClick={onAdminClick} className="footer-link">Admin Panel</button>
          <p className="footer-text">Powered by AutoParts Kiosk</p>
        </div>
      </div>
    </div>
  );
}

function CategoryCard({ category, onClick }) {
  return (
    <div onClick={onClick} className="category-card">
      <img 
        src={category.image || PLACEHOLDER_IMAGE} 
        alt={category.name} 
        className="category-image"
      />
      <div className="category-overlay"></div>
      <div className="category-content">
        <h3 className="category-name">{category.name}</h3>
        <p className="category-description">{category.description}</p>
        <div className="category-action">
          Browse Products
          <span className="category-arrow">→</span>
        </div>
      </div>
    </div>
  );
}

function CategoryView({ category, products, onBack, onProductClick }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.model.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="category-view">
      <div className="category-header">
        <div className="category-header-content">
          <div className="category-header-left">
            <button onClick={onBack} className="back-button">←</button>
            <div>
              <h2 className="category-title">{category.name}</h2>
              <p className="category-count">{products.length} products available</p>
            </div>
          </div>
          <button onClick={onBack} className="home-button">
            <Home size={20} />
            <span>Home</span>
          </button>
        </div>
      </div>

      <div className="search-bar-container">
        <div className="search-bar">
          <Search className="search-icon" size={24} />
          <input
            type="text"
            placeholder="Search by product name or brand..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="products-content">
        <div className="products-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} onClick={() => onProductClick(product)} />
          ))}
        </div>
        {filteredProducts.length === 0 && (
          <div className="no-products">No products found matching your search.</div>
        )}
      </div>
    </div>
  );
}

function ProductCard({ product, onClick }) {
  return (
    <div onClick={onClick} className="product-card">
      <div className="product-image-container">
        <div className="product-brand-badge">{product.brand}</div>
        <div className="product-stock-badge">
          {product.inStock ? (
            <span className="stock-in">✓ In Stock</span>
          ) : (
            <span className="stock-out">Out of Stock</span>
          )}
        </div>
        <div className="product-image-wrapper">
          {product.image ? (
            <img 
              src={product.image} 
              alt={product.name} 
              className="product-image"
            />
          ) : (
            <div className="product-image-placeholder">
              <svg width="80" height="80" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
      </div>
      
      <div className="product-details">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-model">Model: {product.model}</p>
        
        {product.features && product.features.length > 0 && (
          <div className="product-features">
            {product.features.slice(0, 2).map((feature, idx) => (
              <div key={idx} className="feature-item">
                <span className="feature-check">✓</span>
                <span className="feature-text">{feature}</span>
              </div>
            ))}
            {product.features.length > 2 && (
              <p className="feature-more">+{product.features.length - 2} more</p>
            )}
          </div>
        )}
        
        <div className="product-footer">
          <div className="product-price">₹{product.price.toLocaleString()}</div>
          <button className="product-details-btn">View Details →</button>
        </div>
      </div>
    </div>
  );
}

function ProductDetailModal({ product, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-header-left">
            <span className="modal-brand-badge">{product.brand}</span>
            {product.inStock ? (
              <span className="modal-stock-in">✓ In Stock</span>
            ) : (
              <span className="modal-stock-out">Out of Stock</span>
            )}
          </div>
          <button onClick={onClose} className="modal-close">
            <X size={28} />
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-grid">
            <div className="modal-image-container">
              {product.image ? (
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="modal-image"
                />
              ) : (
                <div className="modal-image-placeholder">
                  <svg width="112" height="112" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>

            <div className="modal-info">
              <h2 className="modal-title">{product.name}</h2>
              <p className="modal-model">Model: {product.model}</p>
              
              <div className="modal-price-box">
                <p className="modal-price-label">Price</p>
                <p className="modal-price-amount">₹{product.price.toLocaleString()}</p>
              </div>

              <div className="modal-warranty-box">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="warranty-label">Warranty</p>
                  <p className="warranty-value">{product.warranty}</p>
                </div>
              </div>
            </div>
          </div>

          {product.features && product.features.length > 0 && (
            <div className="modal-section">
              <h3 className="modal-section-title">Features</h3>
              <div className="modal-features-grid">
                {product.features.map((feature, idx) => (
                  <div key={idx} className="modal-feature-item">
                    <span className="modal-feature-check">✓</span>
                    <span className="modal-feature-text">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {product.specifications && product.specifications.length > 0 && (
            <div className="modal-section">
              <h3 className="modal-section-title">Specifications</h3>
              <div className="modal-specs">
                {product.specifications.map((spec, idx) => (
                  <div key={idx} className="modal-spec-row">
                    <span className="modal-spec-label">{spec.label}</span>
                    <span className="modal-spec-value">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {product.compatibleVehicles && product.compatibleVehicles.length > 0 && (
            <div className="modal-section">
              <h3 className="modal-section-title">Compatible Vehicles</h3>
              <div className="modal-vehicles">
                {product.compatibleVehicles.map((vehicle, idx) => (
                  <span key={idx} className="modal-vehicle-tag">{vehicle}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="modal-back-button">
            Back to Products
          </button>
        </div>
      </div>
    </div>
  );
}

function AdminLoginView({ onLogin, onBack }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = onLogin(password);
    if (!success) {
      setError('Incorrect password');
      setPassword('');
    }
  };

  return (
    <div className="admin-login-view">
      <div className="admin-login-box">
        <div className="admin-login-header">
          <div className="admin-login-icon">
            <Lock size={32} />
          </div>
          <h2 className="admin-login-title">Admin Access</h2>
          <p className="admin-login-subtitle">Enter password to access admin panel</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              className="form-input"
              placeholder="••••••••"
            />
            {error && <p className="form-error">{error}</p>}
          </div>

          <button type="submit" className="admin-login-button">
            Login
          </button>

          <button type="button" onClick={onBack} className="admin-back-button">
            Back to Kiosk
          </button>
        </form>

        <p className="admin-login-hint">Default password: admin123</p>
      </div>
    </div>
  );
}

function AdminDashboard({ categories, products, onCategoriesChange, onProductsChange, onLogout, onViewKiosk }) {
  const [activeTab, setActiveTab] = useState('categories');
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);

  const handleDeleteCategory = (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      onCategoriesChange(categories.filter(c => c.id !== id));
    }
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      onProductsChange(products.filter(p => p.id !== id));
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div className="admin-header-content">
          <div className="admin-header-info">
            <h1 className="admin-title">Admin Dashboard</h1>
            <p className="admin-subtitle">Manage your store catalog</p>
          </div>
          <div className="admin-header-actions">
            <button onClick={onViewKiosk} className="admin-view-button">
              <Eye size={18} />
              View Kiosk
            </button>
            <button onClick={onLogout} className="admin-logout-button">
              Logout
            </button>
          </div>
        </div>

        <div className="admin-tabs">
          <button
            onClick={() => setActiveTab('categories')}
            className={`admin-tab ${activeTab === 'categories' ? 'admin-tab-active' : ''}`}
          >
            Categories
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`admin-tab ${activeTab === 'products' ? 'admin-tab-active' : ''}`}
          >
            Products
          </button>
        </div>
      </div>

      <div className="admin-content">
        {activeTab === 'categories' && (
          <CategoriesManager
            categories={categories}
            onCategoriesChange={onCategoriesChange}
            onEdit={setEditingCategory}
            onDelete={handleDeleteCategory}
            onAdd={() => setShowCategoryForm(true)}
          />
        )}

        {activeTab === 'products' && (
          <ProductsManager
            products={products}
            categories={categories}
            onProductsChange={onProductsChange}
            onEdit={setEditingProduct}
            onDelete={handleDeleteProduct}
            onAdd={() => setShowProductForm(true)}
          />
        )}
      </div>

      {(showCategoryForm || editingCategory) && (
        <CategoryFormModal
          category={editingCategory}
          categories={categories}
          onSave={(category) => {
            if (editingCategory) {
              onCategoriesChange(categories.map(c => c.id === category.id ? category : c));
            } else {
              const newCategory = { ...category, id: Date.now() };
              onCategoriesChange([...categories, newCategory]);
            }
            setEditingCategory(null);
            setShowCategoryForm(false);
          }}
          onClose={() => {
            setEditingCategory(null);
            setShowCategoryForm(false);
          }}
        />
      )}

      {(showProductForm || editingProduct) && (
        <ProductFormModal
          product={editingProduct}
          products={products}
          categories={categories}
          onSave={(product) => {
            if (editingProduct) {
              onProductsChange(products.map(p => p.id === product.id ? product : p));
            } else {
              const newProduct = { ...product, id: Date.now() };
              onProductsChange([...products, newProduct]);
            }
            setEditingProduct(null);
            setShowProductForm(false);
          }}
          onClose={() => {
            setEditingProduct(null);
            setShowProductForm(false);
          }}
        />
      )}
    </div>
  );
}

function CategoriesManager({ categories, onCategoriesChange, onEdit, onDelete, onAdd }) {
  return (
    <div className="manager-container">
      <div className="manager-header">
        <h2 className="manager-title">Categories ({categories.length})</h2>
        <button onClick={onAdd} className="manager-add-button">
          <Plus size={18} />
          Add Category
        </button>
      </div>

      <div className="admin-grid">
        {categories.sort((a, b) => a.displayOrder - b.displayOrder).map(category => (
          <div key={category.id} className="admin-card">
            <img src={category.image || PLACEHOLDER_IMAGE} alt={category.name} className="admin-card-image" />
            <div className="admin-card-body">
              <h3 className="admin-card-title">{category.name}</h3>
              <p className="admin-card-description">{category.description}</p>
              <div className="admin-card-actions">
                <button onClick={() => onEdit(category)} className="admin-edit-button">
                  <Edit2 size={14} />
                  Edit
                </button>
                <button onClick={() => onDelete(category.id)} className="admin-delete-button">
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductsManager({ products, categories, onProductsChange, onEdit, onDelete, onAdd }) {
  return (
    <div className="manager-container">
      <div className="manager-header">
        <h2 className="manager-title">Products ({products.length})</h2>
        <button onClick={onAdd} className="manager-add-button">
          <Plus size={18} />
          Add Product
        </button>
      </div>

      <div className="admin-grid">
        {products.map(product => {
          const category = categories.find(c => c.id === product.categoryId);
          return (
            <div key={product.id} className="admin-card">
              <div className="admin-product-image-container">
                <span className="admin-product-brand">{product.brand}</span>
                <div className="admin-product-image-wrapper">
                  {product.image ? (
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="admin-card-image"
                    />
                  ) : (
                    <div className="admin-product-placeholder">
                      <svg width="64" height="64" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
              <div className="admin-card-body">
                <h3 className="admin-card-title">{product.name}</h3>
                <p className="admin-card-category">{category?.name}</p>
                <div className="admin-product-price">₹{product.price.toLocaleString()}</div>
                <div className="admin-card-actions">
                  <button onClick={() => onEdit(product)} className="admin-edit-button">
                    <Edit2 size={14} />
                    Edit
                  </button>
                  <button onClick={() => onDelete(product.id)} className="admin-delete-button">
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CategoryFormModal({ category, categories, onSave, onClose }) {
  const [formData, setFormData] = useState(
    category || {
      name: '',
      description: '',
      image: PLACEHOLDER_IMAGE,
      displayOrder: categories.length + 1
    }
  );
  const [uploading, setUploading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      try {
        const base64 = await fileToBase64(file);
        setFormData({ ...formData, image: base64 });
      } catch (error) {
        alert('Error uploading image');
      }
      setUploading(false);
    }
  };

  return (
    <div className="form-modal-overlay">
      <div className="form-modal">
        <div className="form-modal-header">
          <h3 className="form-modal-title">{category ? 'Edit Category' : 'Add Category'}</h3>
          <button onClick={onClose} className="form-modal-close">
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="form-modal-body">
          <div className="form-group">
            <label className="form-label">Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="form-textarea"
              placeholder="Brief description..."
            />
          </div>

          <div className="form-group">
            <label className="form-label">Image</label>
            {formData.image && (
              <img src={formData.image} alt="Preview" className="form-image-preview" />
            )}
            <label className="form-upload-button">
              <Upload size={18} />
              {uploading ? 'Uploading...' : 'Upload Image from Device'}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
                disabled={uploading}
              />
            </label>
          </div>

          <div className="form-group">
            <label className="form-label">Display Order</label>
            <input
              type="number"
              value={formData.displayOrder}
              onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) })}
              className="form-input"
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="form-cancel-button">
              Cancel
            </button>
            <button type="submit" className="form-submit-button" disabled={uploading}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ProductFormModal({ product, products, categories, onSave, onClose }) {
  const [formData, setFormData] = useState(
    product || {
      name: '',
      categoryId: categories[0]?.id || '',
      brand: '',
      model: '',
      price: 0,
      warranty: '',
      image: null,
      inStock: true,
      features: [],
      specifications: [],
      compatibleVehicles: []
    }
  );
  const [uploading, setUploading] = useState(false);

  const [newFeature, setNewFeature] = useState('');
  const [newSpec, setNewSpec] = useState({ label: '', value: '' });
  const [newVehicle, setNewVehicle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      try {
        const base64 = await fileToBase64(file);
        setFormData({ ...formData, image: base64 });
      } catch (error) {
        alert('Error uploading image');
      }
      setUploading(false);
    }
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData({ ...formData, features: [...formData.features, newFeature] });
      setNewFeature('');
    }
  };

  const removeFeature = (index) => {
    setFormData({ ...formData, features: formData.features.filter((_, i) => i !== index) });
  };

  const addSpecification = () => {
    if (newSpec.label.trim() && newSpec.value.trim()) {
      setFormData({ ...formData, specifications: [...formData.specifications, newSpec] });
      setNewSpec({ label: '', value: '' });
    }
  };

  const removeSpecification = (index) => {
    setFormData({ ...formData, specifications: formData.specifications.filter((_, i) => i !== index) });
  };

  const addVehicle = () => {
    if (newVehicle.trim()) {
      setFormData({ ...formData, compatibleVehicles: [...formData.compatibleVehicles, newVehicle] });
      setNewVehicle('');
    }
  };

  const removeVehicle = (index) => {
    setFormData({ ...formData, compatibleVehicles: formData.compatibleVehicles.filter((_, i) => i !== index) });
  };

  return (
    <div className="form-modal-overlay">
      <div className="form-modal form-modal-large">
        <div className="form-modal-header">
          <h3 className="form-modal-title">{product ? 'Edit Product' : 'Add Product'}</h3>
          <button onClick={onClose} className="form-modal-close">
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="form-modal-body">
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="form-input"
                placeholder="Product name"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Category *</label>
              <select
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: parseInt(e.target.value) })}
                className="form-input"
                required
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Brand *</label>
              <input
                type="text"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                className="form-input"
                placeholder="e.g., Bosch"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Model</label>
              <input
                type="text"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                className="form-input"
                placeholder="Model number"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Price (₹) *</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Warranty</label>
              <input
                type="text"
                value={formData.warranty}
                onChange={(e) => setFormData({ ...formData, warranty: e.target.value })}
                className="form-input"
                placeholder="e.g., 1 Year"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Image</label>
            {formData.image && (
              <img src={formData.image} alt="Preview" className="form-image-preview" />
            )}
            <label className="form-upload-button">
              <Upload size={18} />
              {uploading ? 'Uploading...' : 'Upload Image from Device'}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
                disabled={uploading}
              />
            </label>
          </div>

          <div className="form-group">
            <label className="form-checkbox-label">
              <input
                type="checkbox"
                checked={formData.inStock}
                onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                className="form-checkbox"
              />
              <span>In Stock</span>
            </label>
          </div>

          <div className="form-group">
            <label className="form-label">Features</label>
            <div className="form-input-group">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                className="form-input"
                placeholder="Add a feature"
              />
              <button type="button" onClick={addFeature} className="form-add-button">
                Add
              </button>
            </div>
            <div className="form-list">
              {formData.features.map((feature, idx) => (
                <div key={idx} className="form-list-item">
                  <span>{feature}</span>
                  <button type="button" onClick={() => removeFeature(idx)} className="form-remove-button">
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Specifications</label>
            <div className="form-row">
              <input
                type="text"
                value={newSpec.label}
                onChange={(e) => setNewSpec({ ...newSpec, label: e.target.value })}
                className="form-input"
                placeholder="Label"
              />
              <input
                type="text"
                value={newSpec.value}
                onChange={(e) => setNewSpec({ ...newSpec, value: e.target.value })}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSpecification())}
                className="form-input"
                placeholder="Value"
              />
            </div>
            <button type="button" onClick={addSpecification} className="form-full-button">
              Add Specification
            </button>
            <div className="form-list">
              {formData.specifications.map((spec, idx) => (
                <div key={idx} className="form-list-item">
                  <span>{spec.label}: {spec.value}</span>
                  <button type="button" onClick={() => removeSpecification(idx)} className="form-remove-button">
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Compatible Vehicles</label>
            <div className="form-input-group">
              <input
                type="text"
                value={newVehicle}
                onChange={(e) => setNewVehicle(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addVehicle())}
                className="form-input"
                placeholder="e.g., Swift, i20"
              />
              <button type="button" onClick={addVehicle} className="form-add-button">
                Add
              </button>
            </div>
            <div className="form-tags">
              {formData.compatibleVehicles.map((vehicle, idx) => (
                <div key={idx} className="form-tag">
                  <span>{vehicle}</span>
                  <button type="button" onClick={() => removeVehicle(idx)} className="form-tag-remove">
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="form-cancel-button">
              Cancel
            </button>
            <button type="submit" className="form-submit-button" disabled={uploading}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AutoPartsKiosk;