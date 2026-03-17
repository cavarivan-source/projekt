import { useState } from "react";
import { Helmet } from "react-helmet-async";
import poletPaket from "../../img/poletShop/polet-paket-copy-600x799.jpg";
import poletPlaviDres from "../../img/poletShop/polet-klara-dres.jpg";
import poletBijeliDres from "../../img/poletShop/polet-bijeli-dresovi-shop.jpg";
import poletJakna from "../../img/poletShop/jakna-eclipse.jpg";
import poletKapa from "../../img/poletShop/polet-kapa.jpg";
import poletRuksak from "../../img/poletShop/polet-klara-ruksak.jpg";
import ImagePreviewModal from "./ImagePreviewModal";
import "./ShopCartPreview.css";

const SIZE_OPTIONS = [
  "dječji XXXS",
  "dječji XXS",
  "dječji XS",
  "S",
  "M",
  "L",
  "XL",
  "2XL",
  "3XL",
];

const SHOP_PRODUCTS = [
  {
    id: 1,
    title: "Polet paket opreme",
    price: 120,
    images: [poletPaket],
    hasSizeAndNumber: true,
  },
  {
    id: 2,
    title: "Polet plavi dres",
    price: 35,
    images: [poletPlaviDres],
    hasSizeAndNumber: true,
  },
  {
    id: 3,
    title: "Polet bijeli dres",
    price: 35,
    images: [poletBijeliDres],
    hasSizeAndNumber: true,
  },
  {
    id: 4,
    title: "Polet jakna",
    price: 40,
    images: [poletJakna],
    hasSizeAndNumber: true,
  },
  {
    id: 5,
    title: "Polet kapa",
    price: 10,
    images: [poletKapa],
    hasSizeAndNumber: false,
  },
  {
    id: 6,
    title: "Polet ruksak",
    price: 20,
    images: [poletRuksak],
    hasSizeAndNumber: false,
  },
];

const Shop = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const [productOptions, setProductOptions] = useState(() => {
    const initialOptions = {};
    SHOP_PRODUCTS.forEach((product) => {
      if (product.hasSizeAndNumber) {
        initialOptions[product.id] = {
          size: "",
          jerseyNumber: "",
        };
      }
    });
    return initialOptions;
  });

  const handleOptionChange = (productId, field, value) => {
    setProductOptions((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [field]: value,
      },
    }));
  };

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const selectedOptions = productOptions[product.id] || {};
    const selectedSize = product.hasSizeAndNumber ? selectedOptions.size || "" : "";
    const jerseyNumber = product.hasSizeAndNumber ? (selectedOptions.jerseyNumber || "").trim() : "";

    if (product.hasSizeAndNumber && !selectedSize) {
      alert("Molimo odaberi veličinu.");
      return;
    }

    const cartItemId = product.hasSizeAndNumber
      ? `${product.id}-${selectedSize}-${jerseyNumber || "bez-broja"}`
      : `${product.id}`;

    const existingProduct = cart.find((item) => item.cartItemId === cartItemId);

    if (existingProduct) {
      existingProduct.quantity = (existingProduct.quantity || 1) + 1;
    } else {
      cart.push({
        ...product,
        quantity: 1,
        cartItemId,
        selectedSize,
        jerseyNumber,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const formatPrice = (price) => `${price.toFixed(2).replace(".", ",")} EUR`;

  const openPreview = (imageSrc, imageAlt) => {
    setPreviewImage({ imageSrc, imageAlt });
  };

  return (
      <>
    <Helmet>
      <title>Shop</title>
      <meta name="description" content="Pregled naših proizvoda." />
    </Helmet>
    <div className="shop-cart-page">
      <div className="shop-cart-atmosphere shop-cart-atmosphere-left" />
      <div className="shop-cart-atmosphere shop-cart-atmosphere-right" />
      <div className="container shop-cart-shell">
      <div className="row g-4">
        <h1 className="mb-1">Shop</h1>
        {SHOP_PRODUCTS.map((product) => (
          <div className="col-md-4" key={product.id}>
            <div className="shop-product-card">
            <img
              src={product.images[0]}
              alt={product.title}
              className="shop-product-image"
              onClick={() => openPreview(product.images[0], product.title)}
            />
            <h3>{product.title}</h3>

            {product.hasSizeAndNumber && (
              <div className="mb-3">
                <label className="form-label">Veličina</label>
                <select
                  className="form-select mb-2"
                  value={productOptions[product.id]?.size || ""}
                  onChange={(e) => handleOptionChange(product.id, "size", e.target.value)}
                >
                  <option value="" disabled>
                    Odaberi veličinu
                  </option>
                  {SIZE_OPTIONS.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>

                <label className="form-label">Broj na dresu</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Upiši broj"
                  value={productOptions[product.id]?.jerseyNumber || ""}
                  onChange={(e) => handleOptionChange(product.id, "jerseyNumber", e.target.value)}
                />
              </div>
            )}

            <button className="btn btn-success" onClick={() => addToCart(product)}>
              Dodaj u košaricu - {formatPrice(product.price)}
            </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
    <ImagePreviewModal
      isOpen={Boolean(previewImage)}
      imageSrc={previewImage?.imageSrc}
      imageAlt={previewImage?.imageAlt}
      onClose={() => setPreviewImage(null)}
    />
    </>
  );
};

export default Shop;