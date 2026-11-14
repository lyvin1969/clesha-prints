import React, { useState } from 'react';

const CleshaLogoExact = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  }}>
    <img
      src="/images/clesha-logo.png.png"
      alt="Clesha Prints"
      style={{
        width: '85px',
        height: '75px',
        objectFit: 'contain'
      }}
    />
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('storefront');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [quoteService, setQuoteService] = useState('Large Format & Signage');
  const [quoteQty, setQuoteQty] = useState(10);
  const [quoteDetails, setQuoteDetails] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
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

  const servicePricing = {
    'Large Format & Signage': { base: 1500, unit: 'sq ft', min: 10 },
    'Sticker Printing': { base: 50, unit: 'piece', min: 50 },
    'Matanga & Funeral Services': { base: 3500, unit: 'package', min: 1 },
    'Apparel & Jerseys': { base: 850, unit: 'piece', min: 5 },
    'Campaign Materials': { base: 200, unit: 'piece', min: 100 },
    'Cup Printing & Branding': { base: 450, unit: 'piece', min: 10 },
    'Sublimation Printing': { base: 600, unit: 'item', min: 5 },
    'Vinyl Selling': { base: 800, unit: 'metre', min: 1 },
    'DTF Printing': { base: 1200, unit: 'metre', min: 1 },
    'Pen Branding': { base: 70, unit: 'piece', min: 50 },
    '3D Signage': { base: 8500, unit: 'unit', min: 1 },
    'Uniform Labelling': { base: 350, unit: 'piece', min: 10 },
    'Roll-Up Banners': { base: 4500, unit: 'piece', min: 1 }
  };

  const calculateEstimate = () => (servicePricing[quoteService]?.base || 500) * quoteQty;

  const handleWhatsAppOrder = (e) => {
    e.preventDefault();
    const total = calculateEstimate();
    const deposit = Math.round(total * 0.5);
    const orderId = `CP-2026-0${orders.length + 1}`;
    
    const message = `Hello Clesha Prints! Order ID: ${orderId} | Service: ${quoteService} | Qty: ${quoteQty} | Total: KES ${total} | Deposit: KES ${deposit}`;
    
    setOrders([{
      id: orderId, customer: customerPhone || 'Client', phone: customerPhone,
      service: quoteService, amount: total, deposit: deposit, balance: total - deposit, status: 'Pending Proof'
    }, ...orders]);

    window.open(`https://wa.me/254${selectedShopLine.replace(/^0/, '')}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div style={{ fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', background: '#f8fafc', minHeight: '100vh', display: 'flex', flexDirection: 'column', color: '#1e293b' }}>
      
      {/* Top Utility Bar */}
      <div style={{ background: '#0f172a', color: '#cbd5e1', padding: '8px 16px', fontSize: '13px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>🟢 Workshop Open & Ready | Instant Quotes & M-Pesa</div>
        <div>
          <a href="tel:0795436044" style={{ color: '#f472b6', textDecoration: 'none', fontWeight: 'bold' }}>0795 436 044</a> / 
          <a href="tel:0792303682" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 'bold', marginLeft: '6px' }}>0792 303 682</a>
        </div>
      </div>

      {/* Header */}
      <header style={{ background: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 50, flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ cursor: 'pointer' }} onClick={() => setActiveTab('storefront')}>
          <CleshaLogoExact />
        </div>

        <nav style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button onClick={() => setActiveTab('storefront')} style={{ padding: '8px 16px', borderRadius: '20px', border: 'none', background: activeTab === 'storefront' ? '#0f172a' : '#f1f5f9', color: activeTab === 'storefront' ? '#fff' : '#475569', fontWeight: 'bold', cursor: 'pointer' }}>Services</button>
          <button onClick={() => setActiveTab('calculator')} style={{ padding: '8px 16px', borderRadius: '20px', border: 'none', background: activeTab === 'calculator' ? '#db2777' : '#fdf2f8', color: activeTab === 'calculator' ? '#fff' : '#db2777', fontWeight: 'bold', cursor: 'pointer' }}>Instant Quote</button>
          <button onClick={() => setActiveTab('track')} style={{ padding: '8px 16px', borderRadius: '20px', border: 'none', background: activeTab === 'track' ? '#0284c7' : '#e0f2fe', color: activeTab === 'track' ? '#fff' : '#0369a1', fontWeight: 'bold', cursor: 'pointer' }}>Track Order</button>
          <button onClick={() => setActiveTab('admin')} style={{ padding: '8px 16px', borderRadius: '20px', border: 'none', background: activeTab === 'admin' ? '#334155' : '#f1f5f9', color: activeTab === 'admin' ? '#fff' : '#475569', fontWeight: 'bold', cursor: 'pointer' }}>⚙️ Admin</button>
        </nav>
      </header>

      {/* Main Content Area */}
      <main style={{ maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '24px 16px', flexGrow: 1 }}>

        {activeTab === 'storefront' && (
          <div>
            <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)', color: '#fff', padding: '40px', borderRadius: '24px', marginBottom: '24px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
              <span style={{ background: '#db2777', color: '#fff', padding: '4px 12px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase' }}>Professional Printing Hub</span>
              <h2 style={{ fontSize: '36px', fontWeight: '900', margin: '12px 0' }}>Bring Your Brand to Life with <span style={{ color: '#38bdf8' }}>Clesha Prints</span></h2>
              <p style={{ color: '#94a3b8', maxWidth: '600px', marginBottom: '20px' }}>Signage, Apparel, Banners, Matanga Printing, and Corporate Branding done to perfection.</p>
              <button onClick={() => setActiveTab('calculator')} style={{ background: '#db2777', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>Get Instant Quote 🚀</button>
            </div>

            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '24px' }}>
              {categories.map(cat => (
                <button key={cat} onClick={() => setSelectedCategory(cat)} style={{ whiteSpace: 'nowrap', padding: '8px 16px', borderRadius: '12px', border: '1px solid #cbd5e1', background: selectedCategory === cat ? '#db2777' : '#fff', color: selectedCategory === cat ? '#fff' : '#334155', fontWeight: '600', cursor: 'pointer' }}>{cat}</button>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px' }}>
              {categories.filter(c => c !== 'All' && (selectedCategory === 'All' || c === selectedCategory)).map((serv, idx) => (
                <div key={idx} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 2px 5px rgba(0,0,0,0.02)' }}>
                  <div>
                    <div style={{ width: '40px', height: '40px', background: '#fdf2f8', color: '#db2777', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '18px', marginBottom: '12px' }}>{serv[0]}</div>
                    <h3 style={{ fontSize: '16px', fontWeight: '800', margin: '0 0 8px 0' }}>{serv}</h3>
                    <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 16px 0' }}>High quality printing and fast turnaround times.</p>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>Rate: <strong>KES {servicePricing[serv]?.base} / {servicePricing[serv]?.unit}</strong></div>
                    <button onClick={() => { setQuoteService(serv); setActiveTab('calculator'); }} style={{ width: '100%', background: '#f1f5f9', border: 'none', padding: '10px', borderRadius: '10px', fontWeight: 'bold', color: '#0f172a', cursor: 'pointer' }}>Order / Quote</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'calculator' && (
          <div style={{ maxWidth: '700px', margin: '0 auto', background: '#fff', borderRadius: '24px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
            <div style={{ background: '#0f172a', color: '#fff', padding: '24px' }}>
              <h2 style={{ margin: 0, fontSize: '22px' }}>Instant Quote & Order Builder</h2>
              <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#94a3b8' }}>Calculate estimates and send directly to Clesha Prints WhatsApp.</p>
            </div>
            <form onSubmit={handleWhatsAppOrder} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '6px' }}>Select Service</label>
                <select value={quoteService} onChange={e => setQuoteService(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px' }}>
                  {categories.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '6px' }}>Quantity ({servicePricing[quoteService]?.unit})</label>
                <input type="number" min={servicePricing[quoteService]?.min || 1} value={quoteQty} onChange={e => setQuoteQty(parseInt(e.target.value) || 1)} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '6px' }}>Customization Details</label>
                <textarea rows="3" placeholder="Describe text, colors, sizing..." value={quoteDetails} onChange={e => setQuoteDetails(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }}></textarea>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '6px' }}>Phone Number (M-Pesa)</label>
                  <input type="tel" required placeholder="0712345678" value={customerPhone} onChange={e => setCustomerPhone(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '6px' }}>Send To Shop Line</label>
                  <select value={selectedShopLine} onChange={e => setSelectedShopLine(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px' }}>
                    <option value="0795436044">0795 436 044 (Primary)</option>
                    <option value="0792303682">0792 303 682 (Secondary)</option>
                  </select>
                </div>
              </div>

              <div style={{ background: '#fdf2f8', border: '1px solid #fbcfe8', padding: '20px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
          <div style={{ maxWidth: '500px', margin: '0 auto', background: '#fff', padding: '30px', borderRadius: '24px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', textAlign: 'center' }}>
            <h2 style={{ margin: '0 0 8px 0' }}>Track Order Status</h2>
            <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '20px' }}>Enter Order ID (e.g. CP-2026-001)</p>
            <form onSubmit={e => { e.preventDefault(); setTrackedOrder(orders.find(o => o.id.toLowerCase() === trackingSearch.trim().toLowerCase()) || { notFound: true }); }} style={{ display: 'flex', gap: '8px' }}>
              <input type="text" placeholder="Enter Order ID..." value={trackingSearch} onChange={e => setTrackingSearch(e.target.value)} style={{ flexGrow: 1, padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1' }} />
              <button type="submit" style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>Search</button>
            </form>
            {trackedOrder && trackedOrder.notFound && <p style={{ color: '#b91c1c', marginTop: '16px' }}>Order not found.</p>}
            {trackedOrder && !trackedOrder.notFound && (
              <div style={{ textAlign: 'left', background: '#f8fafc', padding: '16px', borderRadius: '12px', marginTop: '20px' }}>
                <strong>{trackedOrder.id}</strong> - {trackedOrder.service}<br/>
                Status: <span style={{ color: '#db2777', fontWeight: 'bold' }}>{trackedOrder.status}</span><br/>
                Balance Due: KES {trackedOrder.balance.toLocaleString()}
              </div>
            )}
          </div>
        )}

        {activeTab === 'admin' && (
          <div style={{ background: '#fff', padding: '24px', borderRadius: '24px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
            <h2 style={{ margin: '0 0 16px 0' }}>Workshop Admin - Active Orders</h2>
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
                    <td style={{ padding: '12px' }}>{o.customer}<br/><small style={{ color: '#64748b' }}>{o.phone}</small></td>
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

      <footer style={{ background: '#0f172a', color: '#94a3b8', padding: '30px 16px', textAlign: 'center', marginTop: '40px', fontSize: '13px' }}>
        <p style={{ margin: '0 0 8px 0', fontWeight: 'bold', color: '#fff' }}>Clesha Prints — Design | Print | Brand</p>
        <p style={{ margin: 0 }}>Shop Contacts: 0795 436 044 | 0792 303 682</p>
      </footer>

    </div>
  );
}
