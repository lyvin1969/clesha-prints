import React, { useState } from 'react';

// --- LOGO COMPONENT ---
const CleshaLogo = ({ size = 'normal' }) => {
  const [imgFailed, setImgFailed] = useState(false);

  if (!imgFailed) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img
          src="/images/clesha-logo.png.png"
          alt="Clesha Prints Logo"
          onError={() => setImgFailed(true)}
          style={{ height: size === 'large' ? '64px' : '46px', width: 'auto', objectFit: 'contain', borderRadius: '8px' }}
        />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div style={{ position: 'relative', width: '44px', height: '44px', background: '#111827', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #db2777', flexShrink: 0 }}>
        <div style={{ position: 'absolute', top: '-7px', right: '6px', color: '#ec4899' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2 19h20v2H2zM2 5l4 5 6-7 6 7 4-5v12H2V5z"/>
          </svg>
        </div>
        <span style={{ fontSize: '18px', fontWeight: '900', fontStyle: 'italic', fontFamily: 'serif', color: '#f8fafc' }}>C</span>
        <span style={{ fontSize: '18px', fontWeight: '900', color: '#db2777' }}>S</span>
      </div>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', fontSize: '20px', fontWeight: '900', letterSpacing: '-0.5px', color: '#0f172a' }}>
          <span>CL</span>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2px', margin: '0 2px', width: '8px' }}>
            <span style={{ height: '3px', background: '#06b6d4', borderRadius: '1px' }}></span>
            <span style={{ height: '3px', background: '#db2777', borderRadius: '1px' }}></span>
            <span style={{ height: '3px', background: '#eab308', borderRadius: '1px' }}></span>
          </div>
          <span>SHA — PRINTS</span>
        </div>
        <div style={{ fontSize: '8px', letterSpacing: '2px', color: '#64748b', fontWeight: 'bold', marginTop: '1px' }}>
          DESIGN | PRINT | BRAND
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register' | 'admin'
  const [inputName, setInputName] = useState('');
  const [inputPhone, setInputPhone] = useState('');
  const [adminPinInput, setAdminPinInput] = useState('');
  const [authError, setAuthError] = useState('');
  const WORKSHOP_PIN = '2026';

  const [activeTab, setActiveTab] = useState('storefront');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [galleryService, setGalleryService] = useState(null);

  const [quoteService, setQuoteService] = useState('Large Format & Signage');
  const [quoteQty, setQuoteQty] = useState(10);
  const [quoteDetails, setQuoteDetails] = useState('');
  const [selectedShopLine, setSelectedShopLine] = useState('0795436044');

  const [orders, setOrders] = useState([
    { id: 'CP-2026-001', customer: 'Brian Otieno', phone: '0712345678', service: 'Apparel & Jerseys', amount: 4500, deposit: 2000, balance: 2500, status: 'In Production' },
    { id: 'CP-2026-002', customer: 'Mercy Wanjiku', phone: '0722987654', service: 'Large Format & Signage', amount: 12000, deposit: 6000, balance: 6000, status: 'Pending Proof' }
  ]);

  const [trackingSearch, setTrackingSearch] = useState('');
  const [trackedOrder, setTrackedOrder] = useState(null);

  const categories = [
    'All', 'Large Format & Signage', 'Sticker Printing', 'Matanga & Funeral Services',
    'Apparel & Jerseys', 'Campaign Materials', 'Cup Printing & Branding', 'Sublimation Printing',
    'Vinyl Selling', 'DTF Printing', 'Pen Branding', '3D Signage', 'Uniform Labelling', 'Roll-Up Banners'
  ];

  const serviceData = {
    'Large Format & Signage': { base: 1500, unit: 'sq ft', min: 10, samples: ['https://images.unsplash.com/photo-1563906267088-b029e7101114?auto=format&fit=crop&w=600&q=80'] },
    'Sticker Printing': { base: 50, unit: 'piece', min: 50, samples: ['https://images.unsplash.com/photo-1572375992501-4b0892d50c69?auto=format&fit=crop&w=600&q=80'] },
    'Matanga & Funeral Services': { base: 3500, unit: 'package', min: 1, samples: ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80'] },
    'Apparel & Jerseys': { base: 850, unit: 'piece', min: 5, samples: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80'] },
    'Campaign Materials': { base: 200, unit: 'piece', min: 100, samples: ['https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=600&q=80'] },
    'Cup Printing & Branding': { base: 450, unit: 'piece', min: 10, samples: ['https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=600&q=80'] },
    'Sublimation Printing': { base: 600, unit: 'item', min: 5, samples: ['https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80'] },
    'Vinyl Selling': { base: 800, unit: 'metre', min: 1, samples: ['https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80'] },
    'DTF Printing': { base: 1200, unit: 'metre', min: 1, samples: ['https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=600&q=80'] },
    'Pen Branding': { base: 70, unit: 'piece', min: 50, samples: ['https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=600&q=80'] },
    '3D Signage': { base: 8500, unit: 'unit', min: 1, samples: ['https://images.unsplash.com/photo-1563906267088-b029e7101114?auto=format&fit=crop&w=600&q=80'] },
    'Uniform Labelling': { base: 350, unit: 'piece', min: 10, samples: ['https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=600&q=80'] },
    'Roll-Up Banners': { base: 4500, unit: 'piece', min: 1, samples: ['https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80'] }
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setAuthError('');

    if (authMode === 'admin') {
      if (adminPinInput === WORKSHOP_PIN) {
        setCurrentUser({ name: 'Workshop Admin', phone: '0795436044', role: 'admin' });
        setActiveTab('admin');
      } else {
        setAuthError('Incorrect Workshop PIN.');
      }
    } else {
      if (!inputName.trim() || !inputPhone.trim()) {
        setAuthError('Please fill in both name and phone number.');
        return;
      }
      setCurrentUser({ name: inputName.trim(), phone: inputPhone.trim(), role: 'customer' });
      setActiveTab('storefront');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setInputName('');
    setInputPhone('');
    setAdminPinInput('');
    setAuthError('');
    setAuthMode('login');
  };

  const calculateEstimate = () => (serviceData[quoteService]?.base || 500) * quoteQty;

  const handleWhatsAppOrder = (e) => {
    e.preventDefault();
    const total = calculateEstimate();
    const deposit = Math.round(total * 0.5);
    const orderId = `CP-2026-0${orders.length + 1}`;

    const message = `Hello Clesha Prints! Order ID: ${orderId} | Client: ${currentUser.name} (${currentUser.phone}) | Service: ${quoteService} | Qty: ${quoteQty} | Total: KES ${total.toLocaleString()} | 50% Deposit: KES ${deposit.toLocaleString()}`;

    setOrders([{
      id: orderId, customer: currentUser.name, phone: currentUser.phone,
      service: quoteService, amount: total, deposit: deposit, balance: total - deposit, status: 'Pending Proof'
    }, ...orders]);

    window.open(`https://wa.me/254${selectedShopLine.replace(/^0/, '')}?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (!currentUser) {
    return (
      <div style={{ fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ background: '#ffffff', borderRadius: '20px', maxWidth: '440px', width: '100%', padding: '32px', boxShadow: '0 25px 50px rgba(0,0,0,0.3)' }}>
          
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
            <CleshaLogo size="large" />
          </div>

          <div style={{ background: '#0284c7', color: '#fff', padding: '16px', borderRadius: '12px', textAlign: 'center', marginBottom: '24px' }}>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '18px' }}>Clesha Prints Portal</h3>
            <p style={{ margin: 0, fontSize: '12px', opacity: 0.9 }}>
              {authMode === 'register' ? 'Create a new customer account' : authMode === 'admin' ? 'Workshop Staff Access' : 'Sign in to continue'}
            </p>
          </div>

          <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {authMode !== 'admin' ? (
              <>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#334155', marginBottom: '4px' }}>Full Name / Business Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Brian Otieno"
                    value={inputName}
                    onChange={e => setInputName(e.target.value)}
                    style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#334155', marginBottom: '4px' }}>Phone Number (M-Pesa / WhatsApp)</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0712 345 678"
                    value={inputPhone}
                    onChange={e => setInputPhone(e.target.value)}
                    style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }}
                  />
                </div>
              </>
            ) : (
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#334155', marginBottom: '4px' }}>Workshop Secret PIN</label>
                <input
                  type="password"
                  required
                  placeholder="Enter PIN"
                  value={adminPinInput}
                  onChange={e => setAdminPinInput(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '18px', textAlign: 'center', letterSpacing: '4px', boxSizing: 'border-box' }}
                />
              </div>
            )}

            {authError && <p style={{ color: '#dc2626', fontSize: '12px', fontWeight: '600', margin: 0, textAlign: 'center' }}>{authError}</p>}

            <button
              type="submit"
              style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '14px', borderRadius: '10px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', marginTop: '6px' }}
            >
              {authMode === 'register' ? 'Register Account' : authMode === 'admin' ? 'Unlock Admin Dashboard' : 'Login'}
            </button>
          </form>

          <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #e2e8f0', textAlign: 'center', fontSize: '13px' }}>
            {authMode === 'register' ? (
              <span>Already have an account? <button onClick={() => { setAuthMode('login'); setAuthError(''); }} style={{ background: 'transparent', border: 'none', color: '#0284c7', fontWeight: 'bold', cursor: 'pointer' }}>Sign In</button></span>
            ) : authMode === 'login' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span>Don't have an account? <button onClick={() => { setAuthMode('register'); setAuthError(''); }} style={{ background: 'transparent', border: 'none', color: '#0284c7', fontWeight: 'bold', cursor: 'pointer' }}>Create Account</button></span>
                <span><button onClick={() => { setAuthMode('admin'); setAuthError(''); }} style={{ background: 'transparent', border: 'none', color: '#db2777', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}>🔒 Workshop Staff Login</button></span>
              </div>
            ) : (
              <span><button onClick={() => { setAuthMode('login'); setAuthError(''); }} style={{ background: 'transparent', border: 'none', color: '#0284c7', fontWeight: 'bold', cursor: 'pointer' }}>← Back to Client Login</button></span>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', background: '#f8fafc', minHeight: '100vh', display: 'flex', flexDirection: 'column', color: '#1e293b' }}>

      <div style={{ background: '#0f172a', color: '#cbd5e1', padding: '8px 16px', fontSize: '13px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <div>🟢 Logged in as <strong style={{ color: '#38bdf8' }}>{currentUser.name}</strong> ({currentUser.phone})</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <a href="tel:0795436044" style={{ color: '#f472b6', textDecoration: 'none', fontWeight: 'bold' }}>0795 436 044</a>
          <button onClick={handleLogout} style={{ background: '#be123c', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>Log Out</button>
        </div>
      </div>

      {/* Header with Always-Visible "Services & Samples" Navigation */}
      <header style={{ background: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 40, flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ cursor: 'pointer' }} onClick={() => setActiveTab('storefront')}>
          <CleshaLogo />
        </div>

        <nav style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button onClick={() => setActiveTab('storefront')} style={{ padding: '8px 16px', borderRadius: '20px', border: 'none', background: activeTab === 'storefront' ? '#0f172a' : '#f1f5f9', color: activeTab === 'storefront' ? '#fff' : '#475569', fontWeight: 'bold', cursor: 'pointer' }}>🏠 Services & Samples</button>
          <button onClick={() => setActiveTab('calculator')} style={{ padding: '8px 16px', borderRadius: '20px', border: 'none', background: activeTab === 'calculator' ? '#db2777' : '#fdf2f8', color: activeTab === 'calculator' ? '#fff' : '#db2777', fontWeight: 'bold', cursor: 'pointer' }}>Instant Quote</button>
          <button onClick={() => setActiveTab('track')} style={{ padding: '8px 16px', borderRadius: '20px', border: 'none', background: activeTab === 'track' ? '#0284c7' : '#e0f2fe', color: activeTab === 'track' ? '#fff' : '#0369a1', fontWeight: 'bold', cursor: 'pointer' }}>Track Order</button>
          {currentUser.role === 'admin' && (
            <button onClick={() => setActiveTab('admin')} style={{ padding: '8px 16px', borderRadius: '20px', border: 'none', background: activeTab === 'admin' ? '#334155' : '#f1f5f9', color: activeTab === 'admin' ? '#fff' : '#475569', fontWeight: 'bold', cursor: 'pointer' }}>⚙️ Admin</button>
          )}
        </nav>
      </header>

      <main style={{ maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '24px 16px', flexGrow: 1 }}>
        {activeTab === 'storefront' && (
          <div>
            <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)', color: '#fff', padding: '40px', borderRadius: '24px', marginBottom: '24px' }}>
              <span style={{ background: '#db2777', color: '#fff', padding: '4px 12px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>Professional Printing Hub</span>
              <h2 style={{ fontSize: '36px', fontWeight: '900', margin: '12px 0' }}>Bring Your Brand to Life with <span style={{ color: '#38bdf8' }}>Clesha Prints</span></h2>
              <p style={{ color: '#94a3b8', maxWidth: '600px', marginBottom: '20px' }}>Browse portfolio, calculate quotes, and order directly via WhatsApp.</p>
              <button onClick={() => setActiveTab('calculator')} style={{ background: '#db2777', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>Get Instant Quote 🚀</button>
            </div>

            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '24px' }}>
              {categories.map(cat => (
                <button key={cat} onClick={() => setSelectedCategory(cat)} style={{ whiteSpace: 'nowrap', padding: '8px 16px', borderRadius: '12px', border: '1px solid #cbd5e1', background: selectedCategory === cat ? '#db2777' : '#fff', color: selectedCategory === cat ? '#fff' : '#334155', fontWeight: '600', cursor: 'pointer' }}>{cat}</button>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
              {categories.filter(c => c !== 'All' && (selectedCategory === 'All' || c === selectedCategory)).map((serv, idx) => {
                const info = serviceData[serv];
                return (
                  <div key={idx} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '18px', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ position: 'relative', height: '150px', background: '#e2e8f0' }}>
                        <img src={info?.samples[0]} alt={serv} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <button onClick={() => setGalleryService(serv)} style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(15, 23, 42, 0.85)', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '10px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>📸 View Samples</button>
                      </div>
                      <div style={{ padding: '16px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '800', margin: '0 0 6px 0' }}>{serv}</h3>
                        <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>High-resolution printing & fast turnaround.</p>
                      </div>
                    </div>
                    <div style={{ padding: '0 16px 16px 16px' }}>
                      <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '10px' }}>Rate: <strong>KES {info?.base.toLocaleString()} / {info?.unit}</strong></div>
                      <button onClick={() => { setQuoteService(serv); setActiveTab('calculator'); }} style={{ width: '100%', background: '#0f172a', border: 'none', padding: '10px', borderRadius: '10px', fontWeight: 'bold', color: '#fff', cursor: 'pointer' }}>Order / Get Quote</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'calculator' && (
          <div style={{ maxWidth: '700px', margin: '0 auto', background: '#fff', borderRadius: '24px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', padding: '24px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h2 style={{ margin: '0 0 4px 0', fontSize: '22px' }}>Instant Quote & Order Builder</h2>
                <p style={{ margin: 0, color: '#64748b', fontSize: '13px' }}>Ordering as <strong>{currentUser.name}</strong></p>
              </div>
              <button onClick={() => setActiveTab('storefront')} style={{ background: '#f1f5f9', border: 'none', padding: '8px 14px', borderRadius: '10px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>← Back to Services</button>
            </div>
            
            <form onSubmit={handleWhatsAppOrder} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '6px' }}>Select Service</label>
                <select value={quoteService} onChange={e => setQuoteService(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
                  {categories.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '6px' }}>Quantity ({serviceData[quoteService]?.unit})</label>
                <input type="number" min={serviceData[quoteService]?.min || 1} value={quoteQty} onChange={e => setQuoteQty(parseInt(e.target.value) || 1)} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '6px' }}>Customization Details</label>
                <textarea rows="3" placeholder="Describe text, colors, sizing..." value={quoteDetails} onChange={e => setQuoteDetails(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}></textarea>
              </div>
              <div style={{ background: '#fdf2f8', border: '1px solid #fbcfe8', padding: '20px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#db2777', textTransform: 'uppercase' }}>Total Estimate</div>
                  <div style={{ fontSize: '24px', fontWeight: '900' }}>KES {calculateEstimate().toLocaleString()}</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>50% Deposit: <strong>KES {Math.round(calculateEstimate() * 0.5).toLocaleString()}</strong></div>
                </div>
                <button type="submit" style={{ background: '#16a34a', color: '#fff', border: 'none', padding: '14px 24px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>📲 Send to WhatsApp</button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'track' && (
          <div style={{ maxWidth: '600px', margin: '0 auto', background: '#fff', padding: '30px', borderRadius: '24px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ margin: 0 }}>Track Order Status</h2>
              <button onClick={() => setActiveTab('storefront')} style={{ background: '#f1f5f9', border: 'none', padding: '8px 14px', borderRadius: '10px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>← Back to Services</button>
            </div>
            <form onSubmit={e => { e.preventDefault(); setTrackedOrder(orders.find(o => o.id.toLowerCase() === trackingSearch.trim().toLowerCase() || o.phone.includes(trackingSearch.trim())) || { notFound: true }); }} style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
              <input type="text" placeholder="Enter Order ID or Phone..." value={trackingSearch} onChange={e => setTrackingSearch(e.target.value)} style={{ flexGrow: 1, padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1' }} />
              <button type="submit" style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>Search</button>
            </form>
            {trackedOrder && trackedOrder.notFound && <p style={{ color: '#b91c1c' }}>Order not found.</p>}
            {trackedOrder && !trackedOrder.notFound && (
              <div style={{ textAlign: 'left', background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <strong>{trackedOrder.id}</strong> — {trackedOrder.service}<br/>
                Status: <span style={{ color: '#db2777', fontWeight: 'bold' }}>{trackedOrder.status}</span><br/>
                Balance Due: KES {trackedOrder.balance.toLocaleString()}
              </div>
            )}
          </div>
        )}

        {activeTab === 'admin' && currentUser.role === 'admin' && (
          <div style={{ background: '#fff', padding: '24px', borderRadius: '24px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ margin: 0 }}>Workshop Admin — Active Orders</h2>
              <button onClick={() => setActiveTab('storefront')} style={{ background: '#f1f5f9', border: 'none', padding: '8px 14px', borderRadius: '10px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>← Back to Services</button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
                  <th style={{ padding: '12px' }}>Order ID</th>
                  <th style={{ padding: '12px' }}>Customer</th>
                  <th style={{ padding: '12px' }}>Service</th>
                  <th style={{ padding: '12px' }}>Total</th>
                  <th style={{ padding: '12px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px', fontWeight: 'bold' }}>{o.id}</td>
                    <td style={{ padding: '12px' }}>{o.customer}<br/><small>{o.phone}</small></td>
                    <td style={{ padding: '12px' }}>{o.service}</td>
                    <td style={{ padding: '12px' }}>KES {o.amount.toLocaleString()}</td>
                    <td style={{ padding: '12px' }}><span style={{ background: '#fdf2f8', color: '#db2777', padding: '4px 8px', borderRadius: '8px', fontWeight: 'bold', fontSize: '12px' }}>{o.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {galleryService && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '16px' }}>
          <div style={{ background: '#fff', borderRadius: '24px', maxWidth: '700px', width: '100%', padding: '24px' }}>
            <h3 style={{ margin: '0 0 16px 0' }}>{galleryService} — Sample Work</h3>
            <div style={{ height: '260px', marginBottom: '20px', borderRadius: '12px', overflow: 'hidden' }}>
              <img src={serviceData[galleryService]?.samples[0]} alt={galleryService} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button onClick={() => setGalleryService(null)} style={{ background: '#f1f5f9', border: 'none', padding: '10px 18px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>Close</button>
              <button onClick={() => { setQuoteService(galleryService); setGalleryService(null); setActiveTab('calculator'); }} style={{ background: '#db2777', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>Order Similar Print 🚀</button>
            </div>
          </div>
        </div>
      )}

      <footer style={{ background: '#0f172a', color: '#94a3b8', padding: '20px', textAlign: 'center', marginTop: '40px', fontSize: '13px' }}>
        <p style={{ margin: 0 }}>Clesha Prints — Design | Print | Brand | 0795 436 044</p>
      </footer>
    </div>
  );
}