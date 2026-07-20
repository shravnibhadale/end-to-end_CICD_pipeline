import React, { useState } from 'react';

const MENU_ITEMS = [
  { id: 1, name: 'Classic Cheeseburger', category: 'Burgers', price: 12.99, image: '🍔', desc: 'Juicy beef patty with sharp cheddar and special sauce.' },
  { id: 2, name: 'Margherita Pizza', category: 'Pizza', price: 14.50, image: '🍕', desc: 'Fresh mozzarella, basil, and san marzano tomatoes.' },
  { id: 3, name: 'Crispy Pepperoni Pizza', category: 'Pizza', price: 16.50, image: '🍕', desc: 'Loaded with crispy pepperoni and mozzarella.' },
  { id: 4, name: 'Spicy Chicken Wings', category: 'Sides', price: 9.99, image: '🍗', desc: 'Tossed in hot buffalo sauce with blue cheese dip.' },
  { id: 5, name: 'French Fries', category: 'Sides', price: 4.50, image: '🍟', desc: 'Golden crispy fries lightly salted.' },
  { id: 6, name: 'Chocolate Milkshake', category: 'Drinks', price: 5.50, image: '🥤', desc: 'Rich chocolate ice cream topped with whipped cream.' },
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const categories = ['All', 'Burgers', 'Pizza', 'Sides', 'Drinks'];

  const filteredItems = selectedCategory === 'All'
    ? MENU_ITEMS
    : MENU_ITEMS.filter((item) => item.category === selectedCategory);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    setCart([]);
    setIsCartOpen(false);
    setOrderPlaced(true);
    setTimeout(() => setOrderPlaced(false), 4000);
  };

  return (
    <div style={styles.appContainer}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.logo}>⚡ QuickBite</h1>
        <button style={styles.cartButton} onClick={() => setIsCartOpen(!isCartOpen)}>
          Cart ({cartItemCount})
        </button>
      </header>

      {/* Notification */}
      {orderPlaced && (
        <div style={styles.notification}>
          🎉 Order placed successfully! Your food is on the way.
        </div>
      )}

      {/* Main Content */}
      <main style={styles.main}>
        {/* Category Filters */}
        <div style={styles.categoryContainer}>
          {categories.map((cat) => (
            <button
              key={cat}
              style={{
                ...styles.categoryBtn,
                ...(selectedCategory === cat ? styles.categoryBtnActive : {}),
              }}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div style={styles.grid}>
          {filteredItems.map((item) => (
            <div key={item.id} style={styles.card}>
              <div style={styles.cardImage}>{item.image}</div>
              <div style={styles.cardContent}>
                <h3 style={styles.cardTitle}>{item.name}</h3>
                <p style={styles.cardDesc}>{item.desc}</p>
                <div style={styles.cardFooter}>
                  <span style={styles.price}>${item.price.toFixed(2)}</span>
                  <button style={styles.addBtn} onClick={() => addToCart(item)}>
                    + Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Cart Drawer Overlay */}
      {isCartOpen && (
        <div style={styles.overlay} onClick={() => setIsCartOpen(false)}>
          <div style={styles.drawer} onClick={(e) => e.stopPropagation()}>
            <div style={styles.drawerHeader}>
              <h2>Your Order</h2>
              <button style={styles.closeBtn} onClick={() => setIsCartOpen(false)}>
                ✕
              </button>
            </div>

            <div style={styles.drawerBody}>
              {cart.length === 0 ? (
                <p style={styles.emptyCart}>Your cart is empty.</p>
              ) : (
                cart.map((item) => (
                  <div key={item.id} style={styles.cartItem}>
                    <div>
                      <h4 style={{ margin: '0 0 4px 0' }}>{item.name}</h4>
                      <span style={{ color: '#666', fontSize: '14px' }}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                    <div style={styles.qtyControls}>
                      <button style={styles.qtyBtn} onClick={() => updateQuantity(item.id, -1)}>
                        -
                      </button>
                      <span style={{ fontWeight: 'bold' }}>{item.quantity}</span>
                      <button style={styles.qtyBtn} onClick={() => updateQuantity(item.id, 1)}>
                        +
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div style={styles.drawerFooter}>
                <div style={styles.totalRow}>
                  <span>Total:</span>
                  <strong>${cartTotal.toFixed(2)}</strong>
                </div>
                <button style={styles.checkoutBtn} onClick={handleCheckout}>
                  Place Order
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  appContainer: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
    color: '#333',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 32px',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },
  logo: {
    margin: 0,
    fontSize: '24px',
    color: '#ff4757',
  },
  cartButton: {
    backgroundColor: '#ff4757',
    color: '#fff',
    border: 'none',
    padding: '10px 18px',
    borderRadius: '20px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  notification: {
    backgroundColor: '#2ed573',
    color: '#fff',
    textAlign: 'center',
    padding: '12px',
    fontWeight: 'bold',
  },
  main: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '32px 16px',
  },
  categoryContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '24px',
    overflowX: 'auto',
  },
  categoryBtn: {
    padding: '8px 16px',
    border: '1px solid #ddd',
    borderRadius: '20px',
    backgroundColor: '#fff',
    cursor: 'pointer',
    fontWeight: '500',
  },
  categoryBtnActive: {
    backgroundColor: '#2f3542',
    color: '#fff',
    borderColor: '#2f3542',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '24px',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    display: 'flex',
    flexDirection: 'column',
  },
  cardImage: {
    fontSize: '64px',
    textAlign: 'center',
    backgroundColor: '#f1f2f6',
    padding: '24px 0',
  },
  cardContent: {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  cardTitle: {
    margin: '0 0 8px 0',
    fontSize: '18px',
  },
  cardDesc: {
    margin: '0 0 16px 0',
    color: '#747d8c',
    fontSize: '14px',
    flexGrow: 1,
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  addBtn: {
    backgroundColor: '#ff4757',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'flex-end',
    zIndex: 100,
  },
  drawer: {
    backgroundColor: '#fff',
    width: '100%',
    maxWidth: '400px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  drawerHeader: {
    padding: '16px 24px',
    borderBottom: '1px solid #eee',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
  },
  drawerBody: {
    padding: '24px',
    flexGrow: 1,
    overflowY: 'auto',
  },
  emptyCart: {
    textAlign: 'center',
    color: '#a4b0be',
    marginTop: '40px',
  },
  cartItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
    paddingBottom: '16px',
    borderBottom: '1px solid #f1f2f6',
  },
  qtyControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  qtyBtn: {
    width: '28px',
    height: '28px',
    border: '1px solid #ddd',
    backgroundColor: '#fff',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  drawerFooter: {
    padding: '24px',
    borderTop: '1px solid #eee',
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '18px',
    marginBottom: '16px',
  },
  checkoutBtn: {
    width: '100%',
    backgroundColor: '#2ed573',
    color: '#fff',
    border: 'none',
    padding: '14px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};