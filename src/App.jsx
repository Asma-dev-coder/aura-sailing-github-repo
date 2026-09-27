import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import { 
  ShoppingBag, Search, Heart, User, ChevronLeft, ChevronRight, Star, 
  Trash2, ShieldCheck, RefreshCw, Truck, CheckCircle2, Menu, X, ArrowRight,
  Sparkles, SlidersHorizontal, Mail, Phone, MapPin, Send, Scissors
} from 'lucide-react';
import { CartProvider, useCart } from './context/CartContext';
import { PRODUCTS } from './data/products';

// --- NAVBAR ---
const Navbar = ({ wishlist, toggleWishlist, wishlistOpen, setWishlistOpen }) => {
  const { totalItems, addToCart } = useCart();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 transition-all duration-300">
        <div className="bg-slate-950 text-white text-[10px] tracking-[0.25em] font-medium py-2 text-center uppercase">
          Complimentary Express Shipping On Orders Over Rs. 5,000
        </div>

        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex flex-col items-start group">
            <span className="font-serif text-2xl tracking-[0.25em] text-slate-950 font-semibold group-hover:opacity-80 transition">
              AURA
            </span>
            <span className="text-[9px] tracking-[0.4em] text-amber-700 font-sans uppercase font-bold -mt-1">
              WOMEN
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-10 text-[11px] font-bold tracking-[0.2em] uppercase text-slate-700">
            <Link to="/" className="hover:text-amber-700 transition">Home</Link>
            <Link to="/products" className="hover:text-amber-700 transition">Collection</Link>
            <Link to="/products?cat=Unstitched" className="hover:text-amber-700 transition flex items-center gap-1 text-amber-800 font-extrabold">
              <Scissors className="w-3.5 h-3.5" /> Unstitched
            </Link>
            <Link to="/contact" className="hover:text-amber-700 transition">Contact Us</Link>
          </div>

          <div className="flex items-center space-x-5 text-slate-800">
            <button onClick={() => setSearchOpen(!searchOpen)} className="hover:text-amber-700 transition p-1">
              <Search className="w-5 h-5 stroke-[1.5]" />
            </button>
            
            {/* Wishlist / Likes Icon Button */}
            <button onClick={() => setWishlistOpen(true)} className="hover:text-amber-700 transition p-1 relative">
              <Heart className={`w-5 h-5 stroke-[1.5] ${wishlist.length > 0 ? "fill-red-500 text-red-500" : ""}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1.5 bg-red-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Icon */}
            <Link to="/cart" className="relative p-1 hover:text-amber-700 transition">
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1.5 bg-amber-700 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            <button className="md:hidden text-slate-900" onClick={() => setMobileMenu(!mobileMenu)}>
              {mobileMenu ? <X className="w-6 h-6 stroke-[1.5]" /> : <Menu className="w-6 h-6 stroke-[1.5]" />}
            </button>
          </div>
        </nav>

        {searchOpen && (
          <div id="search-container" className="border-t border-slate-100 bg-slate-50 py-3 px-6 animate-fadeIn">
            <div id='search-bar' className="max-w-xl mx-auto flex items-center gap-6 border border-gray-600 h-[48px] px-4 rounded-full">
              <Search className="w-6 h-6 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search unstitched 3-piece, silk dresses, co-ords..." 
                className="w-full bg-transparent text-md font-light tracking-wide outline-none text-slate-800"
                autoFocus
              />
              <button onClick={() => setSearchOpen(false)} className="text-md text-slate-400 hover:text-slate-700">ESC</button>
            </div>
          </div>
        )}

        {mobileMenu && (
          <div className="md:hidden bg-white px-6 py-6 space-y-4 border-t border-slate-100 text-xs font-bold uppercase tracking-widest text-slate-800">
            <Link to="/" onClick={() => setMobileMenu(false)} className="block py-1 hover:text-amber-700">Home</Link>
            <Link to="/products" onClick={() => setMobileMenu(false)} className="block py-1 hover:text-amber-700">Collection</Link>
            <Link to="/products?cat=Unstitched" onClick={() => setMobileMenu(false)} className="block py-1 text-amber-800 font-bold">Unstitched Collection</Link>
            <Link to="/contact" onClick={() => setMobileMenu(false)} className="block py-1 hover:text-amber-700">Contact Us</Link>
            <button onClick={() => { setMobileMenu(false); setWishlistOpen(true); }} className="block py-1 hover:text-amber-700 text-left w-full">
              Wishlist ({wishlist.length})
            </button>
            <Link to="/cart" onClick={() => setMobileMenu(false)} className="block py-1 hover:text-amber-700">Cart ({totalItems})</Link>
          </div>
        )}
      </header>

      {/* WISHLIST DRAWER / LIKES MODAL */}
      {wishlistOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/40 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between p-6 animate-slideLeft">
            <div>
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                  <h2 className="font-serif text-lg font-bold text-slate-950">Your Wishlist ({wishlist.length})</h2>
                </div>
                <button onClick={() => setWishlistOpen(false)} className="p-1 text-slate-400 hover:text-slate-900">
                  <X className="w-6 h-6 stroke-[1.5]" />
                </button>
              </div>

              <div className="divide-y divide-slate-100 overflow-y-auto max-h-[70vh] mt-4">
                {wishlist.length === 0 ? (
                  <div className="py-12 text-center text-slate-400 text-xs space-y-3">
                    <p>No items added to your wishlist yet.</p>
                  </div>
                ) : (
                  wishlist.map((item) => (
                    <div key={item.id} className="py-4 flex gap-4 items-center">
                      <img src={item.image} alt={item.name} className="w-16 h-20 object-cover rounded-sm bg-slate-50" />
                      <div className="flex-1 space-y-1">
                        <h4 className="font-serif text-xs font-semibold text-slate-900">{item.name}</h4>
                        <p className="text-xs font-bold text-slate-950">Rs. {item.price.toLocaleString()}</p>
                        <button 
                          onClick={() => { addToCart(item, item.sizes ? item.sizes[0] : "Standard", 1); toggleWishlist(item); }}
                          className="text-[10px] font-bold uppercase text-amber-800 hover:underline"
                        >
                          + Move To Shopping Bag
                        </button>
                      </div>
                      <button onClick={() => toggleWishlist(item)} className="p-1 text-slate-300 hover:text-red-500">
                        <Trash2 className="w-4 h-4 stroke-[1.5]" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            <button 
              onClick={() => setWishlistOpen(false)}
              className="w-full bg-slate-950 text-white py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-amber-800 transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </>
  );
};

// --- FOOTER ---
const Footer = () => (
  <footer className="bg-slate-950 text-slate-300 pt-20 pb-10 border-t border-slate-800">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-slate-800">
      <div className="space-y-4 md:col-span-1">
        <h2 className="font-serif text-2xl tracking-[0.25em] text-white">AURA</h2>
        <p className="text-xs font-light text-slate-400 leading-relaxed">
          Crafting timeless silhouettes with luxury unstitched fabrics & tailored pret wear.
        </p>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-bold tracking-[0.2em] uppercase text-white">Navigation</p>
        <ul className="space-y-2 text-xs font-light text-slate-400">
          <li><Link to="/" className="hover:text-amber-500 transition">Home</Link></li>
          <li><Link to="/products" className="hover:text-amber-500 transition">Shop All</Link></li>
          <li><Link to="/products?cat=Unstitched" className="hover:text-amber-500 transition">Unstitched Fabric</Link></li>
          <li><Link to="/contact" className="hover:text-amber-500 transition">Contact Us</Link></li>
        </ul>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-bold tracking-[0.2em] uppercase text-white">Customer Care</p>
        <ul className="space-y-2 text-xs font-light text-slate-400">
          <li className="hover:text-amber-500 cursor-pointer">Shipping Policy</li>
          <li className="hover:text-amber-500 cursor-pointer">Returns & Exchanges</li>
          <li className="hover:text-amber-500 cursor-pointer">Size & Fabric Guide</li>
          <li><Link to="/contact" className="hover:text-amber-500 transition">Help Desk</Link></li>
        </ul>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-bold tracking-[0.2em] uppercase text-white">Newsletter</p>
        <p className="text-xs font-light text-slate-400">Subscribe for private sales and unstitched lawn drops.</p>
        <div className="flex border-b border-slate-700 pb-2">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="bg-transparent text-xs outline-none w-full text-white placeholder-slate-500 font-light"
          />
          <button className="text-xs font-bold uppercase tracking-widest text-amber-500 hover:text-amber-400">Join</button>
        </div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-6 pt-8 flex flex-col md:flex-row justify-between items-center text-[11px] font-mono text-slate-500 gap-4">
      <p>© 2026 AURA WOMEN. ALL RIGHTS RESERVED.</p>
      <div className="flex gap-6">
        <span className="hover:text-slate-300 cursor-pointer">PRIVACY</span>
        <span className="hover:text-slate-300 cursor-pointer">TERMS</span>
      </div>
    </div>
  </footer>
);

// --- HOME PAGE ---
const Home = ({ wishlist, toggleWishlist }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white text-slate-900 font-sans">
      <section className="relative h-[85vh] bg-slate-950 text-white flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-1000 opacity-60"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=80')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-8 w-full">
          <div className="max-w-xl space-y-6">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-mono uppercase tracking-[0.3em]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>New Festive Arrivals</span>
            </div>
            
            {/* CHANGED TEXT HERE */}
            <h1 className="text-5xl md:text-7xl font-serif font-light tracking-wide leading-tight text-white">
              Timeless <br />
              <span className="italic font-normal text-amber-200">Luxury & Pret.</span>
            </h1>

            <p className="text-xs text-slate-300 max-w-md font-light leading-relaxed tracking-wide">
              Discover tailored luxury pret and premium unstitched embroidered fabrics designed for every modern occasion.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button 
                onClick={() => navigate('/products')}
                className="bg-white text-slate-950 font-semibold px-8 py-4 text-xs tracking-[0.2em] uppercase hover:bg-amber-600 hover:text-white transition duration-300 shadow-xl flex items-center gap-3"
              >
                Explore Collection <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-[10px] font-mono tracking-[0.3em] text-amber-800 uppercase block mb-1">Curated Collections</span>
            <h2 className="text-3xl md:text-4xl font-serif text-slate-950">Shop By Category</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { title: "UNSTITCHED", subtitle: "3pc & 2pc Suits", img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80" },
            { title: "DRESSES", subtitle: "Flowing Silhouettes", img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80" },
            { title: "SHIRTS", subtitle: "Crisp & Modern", img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80" },
            { title: "CO-ORD SETS", subtitle: "Effortless Sets", img: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80" }
          ].map((cat, idx) => (
            <div 
              key={idx} 
              onClick={() => navigate('/products')} 
              className="group cursor-pointer relative h-[380px] rounded-sm overflow-hidden bg-slate-100 shadow-sm"
            >
              <img src={cat.img} alt={cat.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-[10px] font-mono tracking-widest text-amber-300 uppercase">{cat.subtitle}</span>
                <h3 className="font-serif text-xl tracking-wider text-white mt-1">{cat.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// --- PRODUCTS PAGE WITH UNSTITCHED & SIZE FILTERS ---
const Products = ({ wishlist, toggleWishlist }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSize, setSelectedSize] = useState("All");
  const navigate = useNavigate();

  const categories = ["All", "Unstitched", "Dresses", "Shirts", "Pants", "Co-ord Sets"];
  const sizes = ["All", "Unstitched", "XS", "S", "M", "L", "XL"];

  const filteredProducts = PRODUCTS.filter(p => {
    const categoryMatch = selectedCategory === "All" || p.category === selectedCategory;
    const sizeMatch = selectedSize === "All" || (p.sizes && p.sizes.includes(selectedSize));
    return categoryMatch && sizeMatch;
  });

  return (
    <div className="bg-white text-slate-900 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 border-b border-slate-100 pb-8">
          <span className="text-[10px] font-mono tracking-[0.3em] text-amber-800 uppercase block mb-1">CATALOGUE</span>
          <h1 className="text-4xl font-serif text-slate-950">Our Signature Collection</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* SIDEBAR FILTERS WITH CATEGORY AND SIZE OPTIONS */}
          <div className="space-y-8 bg-slate-50/50 p-6 rounded border border-slate-100 h-fit">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3 text-slate-900">
              <SlidersHorizontal className="w-4 h-4 text-amber-800" />
              <h3 className="font-serif font-bold text-xs uppercase tracking-widest">Filter By</h3>
            </div>

            {/* Category Filter */}
            <div>
              <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider mb-3">Category</h4>
              <ul className="space-y-1.5 text-xs">
                {categories.map((cat) => (
                  <li 
                    key={cat} 
                    onClick={() => setSelectedCategory(cat)}
                    className={`cursor-pointer py-1.5 px-3 rounded transition flex justify-between items-center text-xs ${
                      selectedCategory === cat ? "bg-slate-950 text-white font-bold" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    <span>{cat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Size Filter */}
            <div className="border-t border-slate-200 pt-6">
              <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider mb-3">Select Size</h4>
              <div className="flex flex-wrap gap-2">
                {sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-3 py-1.5 text-[10px] font-bold uppercase rounded border transition ${
                      selectedSize === sz 
                        ? "bg-amber-800 text-white border-amber-800" 
                        : "bg-white text-slate-700 border-slate-200 hover:border-slate-400"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* PRODUCTS GRID */}
          <div className="md:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => {
                const isLiked = wishlist.some(item => item.id === product.id);
                return (
                  <div key={product.id} className="group bg-white border border-slate-100 rounded-sm overflow-hidden hover:shadow-lg transition duration-500">
                    <div className="relative h-80 bg-slate-50 overflow-hidden">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                      
                      {/* Heart Like Button */}
                      <button 
                        onClick={() => toggleWishlist(product)}
                        className="absolute top-3 right-3 p-2 bg-white/90 rounded-full text-slate-700 hover:text-red-500 transition shadow z-10"
                      >
                        <Heart className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                      </button>
                    </div>
                    <div className="p-5 space-y-2">
                      <div className="flex justify-between items-center text-[10px] font-mono tracking-wider text-slate-400 uppercase">
                        <span>{product.category}</span>
                        <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">{product.sizes ? product.sizes.join(", ") : "Standard"}</span>
                      </div>
                      <h3 className="font-serif text-sm font-medium text-slate-900">{product.name}</h3>
                      <p className="text-xs font-bold text-slate-950">Rs. {product.price.toLocaleString()}</p>
                      <button 
                        onClick={() => navigate(`/products/${product.id}`)}
                        className="w-full mt-3 bg-slate-950 text-white text-[10px] font-bold uppercase py-2.5 tracking-widest hover:bg-amber-800 transition"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- PRODUCT DETAILS PAGE WITH SIZE SELECTOR ---
const ProductDetails = ({ wishlist, toggleWishlist }) => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];
  const availableSizes = product.sizes || ["Standard"];
  const [selectedSize, setSelectedSize] = useState(availableSizes[0]);
  const [quantity, setQuantity] = useState(1);

  const isLiked = wishlist.some(item => item.id === product.id);

  return (
    <div className="bg-white text-slate-900 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-6 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="h-[550px] rounded-sm overflow-hidden bg-slate-50 border border-slate-100 relative">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            <button 
              onClick={() => toggleWishlist(product)}
              className="absolute top-4 right-4 p-3 bg-white/90 rounded-full text-slate-800 hover:text-red-500 transition shadow-lg"
            >
              <Heart className={`w-5 h-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-800">{product.category}</span>
              <h1 className="text-3xl font-serif text-slate-950 mt-1">{product.name}</h1>
              <p className="text-2xl font-bold text-slate-950 mt-3">Rs. {product.price.toLocaleString()}</p>
            </div>

            <p className="text-xs text-slate-600 font-light leading-relaxed border-y border-slate-100 py-4">
              {product.description || "Crafted with premium quality fabric, providing a structured fit suitable for everyday luxury."}
            </p>

            {/* SIZE SELECTION OPTION */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-900 block">Select Size / Stitching</label>
              <div className="flex gap-3">
                {availableSizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-4 py-2 text-xs font-bold border transition ${
                      selectedSize === sz 
                        ? "bg-slate-950 text-white border-slate-950" 
                        : "bg-white text-slate-800 border-slate-200 hover:border-slate-400"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <button 
                onClick={() => addToCart(product, selectedSize, quantity)}
                className="w-full bg-slate-950 text-white text-xs font-bold uppercase py-4 tracking-widest hover:bg-amber-800 transition"
              >
                Add To Shopping Bag ({selectedSize})
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- CONTACT US PAGE ---
const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-white text-slate-900 min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16 space-y-2">
          <span className="text-[10px] font-mono tracking-[0.3em] text-amber-800 uppercase">WE'RE HERE TO HELP</span>
          <h1 className="text-4xl font-serif text-slate-950">Contact Us</h1>
          <p className="text-xs text-slate-500 font-light">Have questions regarding orders, unstitched fabrics, or sizing?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-6 bg-slate-50 p-8 rounded-sm border border-slate-100">
            <h3 className="font-serif text-lg text-slate-950 border-b border-slate-200 pb-3">Get In Touch</h3>
            <div className="space-y-4 text-xs">
              <div className="flex gap-3 items-start">
                <MapPin className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-semibold">Flagship Boutique</strong>
                  <span className="text-slate-500">MM Alam Road, Gulberg III, Lahore, Pakistan</span>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <Phone className="w-5 h-5 text-amber-800 shrink-0" />
                <span className="text-slate-700 font-mono">+92 300 1234567</span>
              </div>
              <div className="flex gap-3 items-center">
                <Mail className="w-5 h-5 text-amber-800 shrink-0" />
                <span className="text-slate-700">support@aurawomen.com</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 bg-white p-8 border border-slate-100 shadow-sm">
            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-amber-800 mx-auto stroke-[1]" />
                <h3 className="font-serif text-2xl text-slate-950">Message Received</h3>
                <p className="text-xs text-slate-500">Thank you for reaching out. Our support team will get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input required placeholder="Your Name" className="p-3.5 border border-slate-200 rounded-sm text-xs outline-none focus:border-slate-950" />
                  <input required type="email" placeholder="Your Email" className="p-3.5 border border-slate-200 rounded-sm text-xs outline-none focus:border-slate-950" />
                </div>
                <input required placeholder="Subject" className="w-full p-3.5 border border-slate-200 rounded-sm text-xs outline-none focus:border-slate-950" />
                <textarea required rows="5" placeholder="How can we assist you today?" className="w-full p-3.5 border border-slate-200 rounded-sm text-xs outline-none focus:border-slate-950" />
                <button type="submit" className="bg-slate-950 text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-amber-800 transition flex items-center gap-2">
                  Send Message <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- CART PAGE ---
const Cart = () => {
  const { cart, removeFromCart, subtotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) return (
    <div className="bg-white min-h-[60vh] flex items-center justify-center text-center p-8">
      <div className="space-y-4">
        <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto stroke-[1]" />
        <h2 className="text-2xl font-serif text-slate-950">Your Bag is Empty</h2>
        <button onClick={() => navigate('/products')} className="bg-slate-950 text-white px-8 py-3 text-xs tracking-widest uppercase font-bold">
          Explore Collection
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-white text-slate-900 min-h-screen py-12 max-w-4xl mx-auto px-6">
      <h1 className="text-3xl font-serif text-slate-950 mb-8 border-b border-slate-100 pb-4">Shopping Bag</h1>
      <div className="space-y-8">
        {cart.map((item) => (
          <div key={`${item.id}-${item.selectedSize}`} className="flex justify-between items-center border-b border-slate-100 pb-6">
            <div className="flex gap-5 items-center">
              <img src={item.image} alt={item.name} className="w-20 h-24 object-cover rounded-sm bg-slate-50" />
              <div className="space-y-1">
                <h3 className="font-serif text-sm font-semibold text-slate-950">{item.name}</h3>
                <p className="text-xs text-slate-500">Size / Option: <strong className="text-slate-800">{item.selectedSize}</strong></p>
                <p className="text-xs font-bold text-slate-950">Rs. {item.price.toLocaleString()}</p>
              </div>
            </div>
            <button onClick={() => removeFromCart(item.id, item.selectedSize)} className="text-slate-400 hover:text-red-600 transition">
              <Trash2 className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>
        ))}

        <div className="bg-slate-50 p-6 rounded-sm border border-slate-100 space-y-3">
          <div className="flex justify-between text-xs"><span>Subtotal</span><span>Rs. {subtotal.toLocaleString()}</span></div>
          <div className="flex justify-between text-xs"><span>Shipping</span><span className="text-amber-800 font-bold">Complimentary</span></div>
          <div className="flex justify-between text-sm font-bold border-t border-slate-200 pt-3 text-slate-950">
            <span>Total</span>
            <span>Rs. {subtotal.toLocaleString()}</span>
          </div>
          <button onClick={() => navigate('/checkout')} className="w-full bg-slate-950 text-white py-4 text-xs font-bold uppercase tracking-widest hover:bg-amber-800 transition duration-300 mt-4">
            Checkout Now →
          </button>
        </div>
      </div>
    </div>
  );
};

// --- CHECKOUT PAGE ---
const Checkout = () => {
  const { cart, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="bg-white text-slate-900 min-h-screen py-12 max-w-4xl mx-auto px-6">
      <h1 className="text-3xl font-serif text-slate-950 mb-8 border-b border-slate-100 pb-4">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <form onSubmit={(e) => { e.preventDefault(); clearCart(); navigate('/order-success'); }} className="md:col-span-2 space-y-4">
          <h3 className="font-serif text-sm font-bold text-slate-950 uppercase tracking-wider">Shipping Details</h3>
          <input required placeholder="Full Name" className="w-full p-3.5 border border-slate-200 rounded-sm text-xs outline-none focus:border-slate-950" />
          <input required type="email" placeholder="Email Address" className="w-full p-3.5 border border-slate-200 rounded-sm text-xs outline-none focus:border-slate-950" />
          <input required placeholder="Shipping Address" className="w-full p-3.5 border border-slate-200 rounded-sm text-xs outline-none focus:border-slate-950" />
          <div className="grid grid-cols-2 gap-4">
            <input required placeholder="City" className="p-3.5 border border-slate-200 rounded-sm text-xs outline-none focus:border-slate-950" />
            <input required placeholder="Phone Number" className="p-3.5 border border-slate-200 rounded-sm text-xs outline-none focus:border-slate-950" />
          </div>

          <h3 className="font-serif text-sm font-bold text-slate-950 uppercase tracking-wider pt-4">Payment Method</h3>
          <div className="border border-amber-200 p-4 rounded-sm text-xs flex items-center gap-3 bg-amber-50/40">
            <input type="radio" defaultChecked readOnly />
            <span className="font-bold text-slate-950">Cash On Delivery (COD)</span>
          </div>

          <button type="submit" className="w-full bg-slate-950 text-white py-4 font-bold text-xs uppercase tracking-widest hover:bg-amber-800 transition duration-300 mt-6">
            Place Order (Rs. {subtotal.toLocaleString()})
          </button>
        </form>

        <div className="bg-slate-50 p-6 rounded-sm border border-slate-100 h-fit space-y-4">
          <h3 className="font-serif text-sm font-bold text-slate-950 border-b border-slate-200 pb-2 uppercase tracking-wider">Summary</h3>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between text-xs">
              <span className="truncate max-w-[140px] text-slate-600">{item.name}</span>
              <span className="font-bold text-slate-950">Rs. {item.price.toLocaleString()}</span>
            </div>
          ))}
          <div className="border-t border-slate-200 pt-3 flex justify-between font-bold text-sm text-slate-950">
            <span>Total</span>
            <span>Rs. {subtotal.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- ORDER SUCCESS PAGE ---
const OrderSuccess = () => (
  <div className="bg-white min-h-[70vh] flex items-center justify-center text-center p-8">
    <div className="space-y-4 max-w-sm">
      <CheckCircle2 className="w-16 h-16 text-amber-800 mx-auto stroke-[1]" />
      <h1 className="text-3xl font-serif text-slate-950">Order Confirmed</h1>
      <p className="text-xs text-slate-500 font-light">Thank you for shopping with AURA WOMEN. Your order is being processed with care.</p>
      <Link to="/" className="inline-block bg-slate-950 text-white px-8 py-3.5 text-xs uppercase font-bold tracking-widest mt-2">Return To Store</Link>
    </div>
  </div>
);

// --- MAIN APP COMPONENT ---
function App() {
  const [wishlist, setWishlist] = useState([]);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen flex flex-col font-sans bg-white text-slate-900 antialiased">
          <Navbar 
            wishlist={wishlist} 
            toggleWishlist={toggleWishlist} 
            wishlistOpen={wishlistOpen} 
            setWishlistOpen={setWishlistOpen} 
          />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home wishlist={wishlist} toggleWishlist={toggleWishlist} />} />
              <Route path="/products" element={<Products wishlist={wishlist} toggleWishlist={toggleWishlist} />} />
              <Route path="/products/:id" element={<ProductDetails wishlist={wishlist} toggleWishlist={toggleWishlist} />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-success" element={<OrderSuccess />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;