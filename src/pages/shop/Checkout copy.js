// Checkout.js - KUPAC DOBIVA MAIL SA TVOG EMAILA
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Checkout = () => {
  const [order, setOrder] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: "card"
  });
  const [loading, setLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    const savedOrder = JSON.parse(localStorage.getItem("checkoutOrder")) || 
                      JSON.parse(localStorage.getItem("cart")) || [];
    
    if (savedOrder.length > 0) {
      setOrder(savedOrder);
    } else {
      window.location.href = "/cart";
    }
  }, []);

  const totalPrice = order ? order.reduce((sum, item) => {
    return sum + (item.price * (item.quantity || 1));
  }, 0) : 0;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const sendEmails = (e) => {
    e.preventDefault();
    setLoading(true);
    const orderId = Date.now().toString().slice(-6);

    // 1. MAIL TEBI (demo@gmail.com) - kompletni podaci
    const adminOrderSummary = order.map(item => 
      `${item.title.substring(0, 40)} x${item.quantity || 1} = ${(item.price * (item.quantity || 1)).toFixed(2)} EUR`
    ).join('\n');
    
    const adminMailBody = `Nova narudžba #${orderId}\n\nKupac: ${formData.name}\n` +
      `Email: ${formData.email}\nTelefon: ${formData.phone || 'Nije naveden'}\n` +
      `Adresa: ${formData.address}, ${formData.city} ${formData.postalCode || ''}\n` +
      `Plaćanje: ${formData.paymentMethod === 'card' ? 'Kartica' : formData.paymentMethod === 'cash' ? 'Pouzećem' : 'PayPal'}\n\n` +
      `PROIZVODI:\n${adminOrderSummary}\n\nUKUPNO: ${totalPrice.toFixed(2)} EUR`;

    const adminMailto = `mailto:demo@gmail.com?subject=Nova%20narudžba%20%23${orderId}&body=${encodeURIComponent(adminMailBody)}`;

    // 2. POTVRDA KUPCU - FROM: demo@gmail.com → TO: kupac email
    const customerOrderContent = order.map(item => 
      `${item.quantity || 1}x ${item.title}`
    ).join('\n');
    
    const customerMailBody = `Hvala na kupnji. Kupili ste:\n\n${customerOrderContent}`;
    
    // KLJUČNO: FROM demo@gmail.com → TO kupac email
    const customerMailto = `mailto:${formData.email}?` +
      `subject=Narudžba%20broj%20%23${orderId}&` +
      `body=${encodeURIComponent(customerMailBody)}`;

    setTimeout(() => {
      // PRVI otvori tvoj mail
      window.location.href = adminMailto;
      
      setTimeout(() => {
        // Zatim kupčev mail (u novom tabu)
        window.open(customerMailto, '_blank');
        
        setTimeout(() => {
          setIsSent(true);
          setLoading(false);
          
          localStorage.removeItem("cart");
          localStorage.removeItem("checkoutOrder");
          
          alert(`Narudžba #${orderId} ZAVRŠENA!\n\n` +
                `📧 Tvoj mail: demo@gmail.com\n` +
                `📧 Kupac dobiva: ${formData.email}\n` +
                `💰 ${totalPrice.toFixed(2)} EUR`);
          
          window.location.href = "/shop?success=true";
        }, 500);
      }, 1000);
    }, 1000);
  };

  if (!order) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <div className="alert alert-warning">
              Nema stavki za checkout. <Link to="/cart">Vrati se na košaricu</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-8">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-primary text-white">
              <h3>Dostava i kontakt</h3>
            </div>
            <form onSubmit={sendEmails} id="checkout-form" className="card-body">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Ime i prezime *</label>
                  <input type="text" className="form-control" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Email * (dobit ćete potvrdu)</label>
                  <input type="email" className="form-control" name="email" value={formData.email} onChange={handleInputChange} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Telefon</label>
                  <input type="tel" className="form-control" name="phone" value={formData.phone} onChange={handleInputChange} />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Način plaćanja</label>
                  <select className="form-select" name="paymentMethod" value={formData.paymentMethod} onChange={handleInputChange}>
                    <option value="card">Kartica</option>
                    <option value="cash">Pouzećem</option>
                    <option value="paypal">PayPal</option>
                  </select>
                </div>
                <div className="col-12 mb-3">
                  <label className="form-label">Adresa dostave *</label>
                  <textarea className="form-control" name="address" rows="2" value={formData.address} onChange={handleInputChange} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Grad *</label>
                  <input type="text" className="form-control" name="city" value={formData.city} onChange={handleInputChange} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Poštanski broj</label>
                  <input type="text" className="form-control" name="postalCode" value={formData.postalCode} onChange={handleInputChange} />
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card shadow-sm sticky-top shop-checkout-sticky-summary">
            <div className="card-header bg-success text-white">
              <h4>Narudžba (generira se #)</h4>
              <small>demo@gmail.com → kupac: {formData.email || 'upiši'}</small>
            </div>
            <div className="card-body p-3">
              {order.slice(0, 3).map(item => (
                <div key={item.id} className="d-flex justify-content-between mb-1 small">
                  <span>{item.title.substring(0, 25)}...</span>
                  <span>{item.price.toFixed(0)} x{item.quantity || 1}</span>
                </div>
              ))}
              {order.length > 3 && <div className="text-muted small text-center">+{order.length-3} stavki</div>}
              <hr className="my-2" />
              <div className="d-flex justify-content-between fs-5 fw-bold">
                <span>UKUPNO:</span>
                <span className="text-success">{totalPrice.toFixed(2)} EUR</span>
              </div>
            </div>
            <div className="card-footer bg-light border-0 p-3">
<button
  type="submit"
  form="checkout-form"
  className="btn btn-success btn-lg w-100"
  disabled={loading || isSent}
>
  {loading ? (
    <>
      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
      Slanje EmailJS...
    </>
  ) : isSent ? (
    <>
      <span className="fas fa-check-circle me-2"></span>
      POSLANO!
    </>
  ) : (
    "ZAVRŠI NARUDŽBU"
  )}
</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12 text-center">
          <Link to="/shop" className="btn btn-outline-secondary me-3 px-4">Shop</Link>
          <Link to="/cart" className="btn btn-outline-primary px-4">Košarica</Link>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
