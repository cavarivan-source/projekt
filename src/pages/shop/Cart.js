// pages/shop/Cart.js
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ImagePreviewModal from "./ImagePreviewModal";
import "./ShopCartPreview.css";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const removeFromCart = (cartItemId) => {
    const updatedCart = cart.filter(item => (item.cartItemId || `${item.id}`) !== cartItemId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const updateQuantity = (cartItemId, delta) => {
    const updatedCart = cart.map(item => {
      const currentItemId = item.cartItemId || `${item.id}`;
      if (currentItemId === cartItemId) {
        const newQty = Math.max(1, (item.quantity || 1) + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalPrice = cart.reduce((sum, item) => {
    return sum + (item.price * (item.quantity || 1));
  }, 0);

  const openPreview = (imageSrc, imageAlt) => {
    setPreviewImage({ imageSrc, imageAlt });
  };

  if (cart.length === 0) {
    return (
      <div className="shop-cart-page">
        <div className="shop-cart-atmosphere shop-cart-atmosphere-left" />
        <div className="shop-cart-atmosphere shop-cart-atmosphere-right" />
      <div className="container mt-5 shop-cart-shell">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <div className="mb-4">
              <i className="fas fa-shopping-cart fa-3x text-muted"></i>
            </div>
            <h2 className="text-muted">🛒 Košarica je prazna</h2>
            <p className="lead">Dodaj proizvode iz <Link to="/shop" className="text-decoration-none">Shop stranice</Link>.</p>
            <Link to="/shop" className="btn btn-outline-primary btn-lg">
              ← Nastavi kupovati
            </Link>
          </div>
        </div>
      </div>
      </div>
    );
  }

  return (
    <>
      <div className="shop-cart-page">
        <div className="shop-cart-atmosphere shop-cart-atmosphere-left" />
        <div className="shop-cart-atmosphere shop-cart-atmosphere-right" />
      <div className="container mt-5 shop-cart-shell">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="mb-0">🛒 Moja košarica ({cart.length} proizvoda)</h1>
          <Link to="/shop" className="btn btn-outline-secondary">
            ← Nastavi kupovati
          </Link>
        </div>

        <div className="row g-4">
          {cart.map((item) => {
            const qty = item.quantity || 1;
            const itemTotal = item.price * qty;
            const currentItemId = item.cartItemId || `${item.id}`;
            return (
              <div key={currentItemId} className="col-lg-4 col-md-6">
                <div className="card h-100 shadow-sm shop-cart-card">
                  <div className="shop-cart-image-wrap">
                    <img 
                      src={item.images[0]} 
                      className="card-img-top shop-cart-image" 
                      alt={item.title}
                      onClick={() => openPreview(item.images[0], item.title)}
                    />
                  </div>
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{item.title}</h5>
                    {item.selectedSize && (
                      <p className="mb-1 small text-muted">Veličina: {item.selectedSize}</p>
                    )}
                    {typeof item.jerseyNumber === "string" && item.jerseyNumber.trim() !== "" && (
                      <p className="mb-2 small text-muted">Broj na dresu: {item.jerseyNumber}</p>
                    )}
                    <p className="card-text text-success fw-bold">{item.price} EUR / kom</p>
                    
                    <div className="d-flex align-items-center mb-3">
                      <button 
                        className="btn btn-outline-secondary btn-sm me-2" 
                        onClick={() => updateQuantity(currentItemId, -1)}
                      >
                        -
                      </button>
                      <span className="badge bg-primary fs-6 px-3 py-2 mx-2">{qty}</span>
                      <button 
                        className="btn btn-outline-secondary btn-sm me-3" 
                        onClick={() => updateQuantity(currentItemId, 1)}
                      >
                        +
                      </button>
                      <button 
                        className="btn btn-danger btn-sm ms-auto" 
                        onClick={() => removeFromCart(currentItemId)}
                      >
                        🗑️ Ukloni
                      </button>
                    </div>
                    
                    <div className="mt-auto text-end">
                      <h5 className="text-success">Ukupno: {itemTotal.toFixed(2)} EUR</h5>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="row mt-5">
          <div className="col-md-8"></div>
          <div className="col-md-4">
            <div className="card shadow-sm shop-cart-summary">
              <div className="card-body">
                <h4 className="card-title text-success">Ukupna cijena</h4>
                <h2 className="display-6 fw-bold text-success">{totalPrice.toFixed(2)} EUR</h2>
              </div>
            </div>
          </div>
        </div>

        {/* GLAVNI BUTTONE NA DNU */}
        <div className="row mt-4 mb-5">
          <div className="col-12">
            <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-md-end">
              <Link 
                to="/shop" 
                className="btn btn-outline-secondary btn-lg px-4"
              >
                ← Vrati na listu proizvoda
              </Link>
              <Link 
                to="/checkout" 
                className="btn btn-success btn-lg px-5"
              >
                Završi narudžbu ➡️ ({cart.length})
              </Link>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Fixed "Naruči" button */}
      <Link 
        to="/checkout"
        className="btn btn-success btn-lg position-fixed shop-cart-floating-order-btn"
      >
        Naruči ({cart.length})
      </Link>
      <ImagePreviewModal
        isOpen={Boolean(previewImage)}
        imageSrc={previewImage?.imageSrc}
        imageAlt={previewImage?.imageAlt}
        onClose={() => setPreviewImage(null)}
      />
    </>
  );
};

export default Cart;
