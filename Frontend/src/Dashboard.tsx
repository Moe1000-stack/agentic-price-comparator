import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoIcon from './assets/logo.jpg';
import { searchPrices, type PriceComparisonResponse, type PriceResult } from './api/priceApi';
import './dashboard.css';

const RETAILER_COLORS: Record<string, string> = {
  Amazon: '#FF9900',
  Walmart: '#0071CE',
  Newegg: '#E2231A',
  eBay: '#86B817',
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [response, setResponse] = useState<PriceComparisonResponse | null>(null);

  const parsePrice = (price: string) =>
    parseFloat(price.replace(/[^0-9.]/g, '')) || 0;

  const formatMoney = (value: number) =>
    value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });

  const getValidPrices = (results: PriceResult[]) =>
    results.map((result) => parsePrice(result.price)).filter((price) => price > 0);

  const getLowestPrice = (results: PriceResult[]) => {
    const prices = getValidPrices(results);
    return prices.length ? Math.min(...prices) : 0;
  };

  const getHighestPrice = (results: PriceResult[]) => {
    const prices = getValidPrices(results);
    return prices.length ? Math.max(...prices) : 0;
  };

  const getAveragePrice = (results: PriceResult[]) => {
    const prices = getValidPrices(results);
    if (!prices.length) return 0;

    return prices.reduce((total, price) => total + price, 0) / prices.length;
  };

  const getSavingsAmount = (results: PriceResult[]) =>
    getHighestPrice(results) - getLowestPrice(results);

  const getDealScore = (results: PriceResult[]) => {
    const highest = getHighestPrice(results);
    const savings = getSavingsAmount(results);

    if (!highest || !savings) return 0;

    return Math.min(100, Math.round((savings / highest) * 100));
  };

  const getBestDeal = (results: PriceResult[]) =>
    results.length > 0
      ? results.reduce((a, b) =>
          parsePrice(a.price) < parsePrice(b.price) ? a : b
        )
      : null;

  const getDealRecommendation = (results: PriceResult[]) => {
    const bestDeal = getBestDeal(results);
    const savings = getSavingsAmount(results);
    const score = getDealScore(results);

    if (!bestDeal) return 'Run a search to generate a recommendation.';

    if (score >= 20) {
      return `Best value is from ${bestDeal.retailerName}. You could save about ${formatMoney(
        savings
      )} compared to the highest listed price.`;
    }

    if (score >= 10) {
      return `${bestDeal.retailerName} has the lowest price, but the savings gap is moderate.`;
    }

    return `${bestDeal.retailerName} has the lowest price, but prices are fairly close across retailers.`;
  };

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    setResponse(null);

    try {
      const data = await searchPrices(query.trim());
      const sorted = {
        ...data,
        results: [...data.results].sort(
          (a, b) => parsePrice(a.price) - parsePrice(b.price)
        ),
      };

      setResponse(sorted);
    } catch (e: any) {
      setError(e.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-wrapper">
      <aside className="dashboard-sidebar">
        <div className="sidebar-logo">
          <img src={logoIcon} alt="Logo" />
          <p>
            PricePilot <span>AI</span>
          </p>
        </div>

        <nav className="sidebar-nav">
          <button className="active">Search</button>
          <button>History</button>
          <button>Settings</button>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            <span onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
              → Logout
            </span>
          </div>
        </div>
      </aside>

      <main className="dashboard-main">
        <div className="search-section">
          <h2>Find the Best Price</h2>
          <p className="search-subtitle">
            We search Amazon, Walmart, Newegg and more in real time
          </p>

          <div className="search-row">
            <input
              className="search-input"
              type="text"
              placeholder="Search for a product e.g. MacBook Pro, RTX 4090..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />

            <button className="search-btn" onClick={handleSearch} disabled={loading}>
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>

        {loading && (
          <div className="loading-state">
            <div className="spinner" />
            <p>Searching across retailers...</p>
          </div>
        )}

        {error && <div className="error-banner">{error}</div>}

        {response && !loading && (
          <div className="results-section">
            <div className="results-meta">
              <span>
                {response.resultCount} results for <strong>"{response.query}"</strong>
              </span>

              <div className="retailer-badges">
                {response.retailersQueried.map((r) => (
                  <span
                    key={r}
                    className={`retailer-badge ${
                      response.retailersWithResults.includes(r)
                        ? 'active'
                        : 'inactive'
                    }`}
                    style={{
                      borderColor: response.retailersWithResults.includes(r)
                        ? RETAILER_COLORS[r] || '#555'
                        : '#333',
                    }}
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>

            {response.results.length === 0 ? (
              <div className="no-results">
                No results found. Try a different search term.
              </div>
            ) : (
              <>
                <section className="analytics-card">
                  <div className="analytics-header">
                    <div>
                      <p className="analytics-eyebrow">AI Price Intelligence</p>
                      <h3>Deal Analytics</h3>
                    </div>

                    <div className="deal-score-pill">
                      {getDealScore(response.results)}/100 Deal Score
                    </div>
                  </div>

                  <div className="analytics-grid">
                    <div className="analytics-metric">
                      <span>Lowest Price</span>
                      <strong>{formatMoney(getLowestPrice(response.results))}</strong>
                    </div>

                    <div className="analytics-metric">
                      <span>Highest Price</span>
                      <strong>{formatMoney(getHighestPrice(response.results))}</strong>
                    </div>

                    <div className="analytics-metric">
                      <span>Average Price</span>
                      <strong>{formatMoney(getAveragePrice(response.results))}</strong>
                    </div>

                    <div className="analytics-metric">
                      <span>Potential Savings</span>
                      <strong>{formatMoney(getSavingsAmount(response.results))}</strong>
                    </div>
                  </div>

                  <div className="recommendation-box">
                    <span>Recommendation</span>
                    <p>{getDealRecommendation(response.results)}</p>
                  </div>
                </section>

                <table className="results-table">
                  <colgroup>
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                  </colgroup>

                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Product</th>
                      <th>Retailer</th>
                      <th>Price</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {response.results.map((result, i) => {
                      const best = getBestDeal(response.results);
                      const isBest = best?.url === result.url;

                      return (
                        <tr key={i} className={isBest ? 'best-deal' : ''}>
                          <td className="rank">{i + 1}</td>

                          <td className="product-name">
                            {isBest && <span className="best-badge">Best Deal</span>}
                            {result.productName}
                          </td>

                          <td>
                            <span
                              className="retailer-tag"
                              style={{
                                color:
                                  RETAILER_COLORS[result.retailerName] || '#aaa',
                              }}
                            >
                              {result.retailerName}
                            </span>
                          </td>

                          <td className="price">{result.price}</td>

                          <td>
                            <a
                              href={result.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="view-btn"
                            >
                              View →
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
