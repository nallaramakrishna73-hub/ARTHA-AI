<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>ARTHA AI</title><style>body{margin:0;background:#070F1F;color:#E6EDF7;font:16px/1.65 Inter,Segoe UI,Helvetica,Arial,sans-serif}
.wrap{max-width:980px;margin:0 auto;padding:28px 20px 60px}
h1{font-size:44px;margin:8px 0 0}h2{margin-top:44px;padding-bottom:8px;border-bottom:2px solid #FF9933;color:#fff}h3{color:#FF9933}
a{color:#FF9933}img{max-width:100%;border-radius:12px}
table{border-collapse:collapse;width:100%;margin:14px 0}th,td{border:1px solid #1d3a66;padding:8px 12px;text-align:left;vertical-align:top}
th{background:#0B1F3A}tr:nth-child(even) td{background:#0b1a33}
code{background:#0B1F3A;color:#ffc680;padding:2px 6px;border-radius:5px;font-size:.92em}
pre{background:#0B1F3A;border:1px solid #1d3a66;border-radius:10px;padding:16px;overflow:auto}pre code{background:none;padding:0;color:#E6EDF7}
blockquote{margin:16px 0;padding:12px 18px;background:#1a1409;border-left:4px solid #FF9933;border-radius:6px}
sub{color:#8FA0B8}hr{border:0;border-top:1px solid #1d3a66;margin:40px 0 16px}</style></head><body><div class="wrap">
<p align="center"><img src="assets/banner.svg" alt="ARTHA AI banner" width="100%"></p>

<p align="center">
<img src="https://img.shields.io/badge/Python-3.11+-3776AB?logo=python&logoColor=white" alt="Python">
<img src="https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white" alt="FastAPI">
<img src="https://img.shields.io/badge/LangGraph-agents-7C3AED" alt="LangGraph">
<img src="https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white" alt="Next.js">
<img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" alt="TypeScript">
<img src="https://img.shields.io/badge/Market-NSE%20%7C%20BSE-FF9933" alt="NSE BSE">
<img src="https://img.shields.io/badge/Not%20investment%20advice-red" alt="Not investment advice">
</p>

<h1 align="center">ARTHA AI</h1>
<p align="center"><b>AI-Powered Indian Financial Research &amp; Intelligence Platform</b><br>
<i>Artha (अर्थ) = wealth / economic value</i></p>

<p align="center"><img src="assets/dashboard-preview.svg" alt="ARTHA AI dashboard preview" width="90%"><br><sub>Dashboard layout illustration. Replace with a real screenshot (see Screenshots).</sub></p>

<h2>Overview</h2>
<p>ARTHA AI is an agentic financial research platform for the Indian stock market. Instead of a basic price chatbot, it works like a research analyst: ask <code>Analyze RELIANCE</code> and a LangGraph workflow gathers market data, technical indicators, fundamentals, news sentiment, macro indicators, risk metrics and portfolio context, then writes an evidence-based report with analytical scores, bull/bear cases, risks and sources.</p>
<blockquote><b>Disclaimer:</b> ARTHA AI provides financial research and analytical information for educational and informational purposes only. It does not provide personalized investment advice, recommendations, or guarantees of returns. Users should conduct independent research and consult a qualified financial professional before making investment decisions.</blockquote>

<h2>Key Features</h2>
<table>
<tr><th>Module</th><th>What it does</th></tr>
<tr><td>Market data</td><td>NSE/BSE quotes and history (<code>.NS</code> / <code>.BO</code>), INR formatting, IST market-hours handling</td></tr>
<tr><td>Technical analysis</td><td>SMA/EMA, RSI, MACD, Bollinger Bands, ATR, volume, support/resistance, trend structure</td></tr>
<tr><td>Fundamentals</td><td>P/E, P/B, ROE, margins, growth, debt ratios and a 0-100 fundamental score</td></tr>
<tr><td>News &amp; sentiment</td><td>Company news, positive/neutral/negative sentiment, sentiment momentum</td></tr>
<tr><td>Macro</td><td>RBI repo rate, inflation, GDP, USD/INR, 10Y yield and sector sensitivity</td></tr>
<tr><td>Risk engine</td><td>Volatility, beta, max drawdown, VaR, Sharpe, risk level</td></tr>
<tr><td>Portfolio + optimiser</td><td>P&amp;L, sector exposure, concentration, Modern Portfolio Theory (min-risk, max-Sharpe), what-if shocks</td></tr>
<tr><td>AI research agent</td><td>LangGraph planner, specialist nodes, number validator and compliance checker</td></tr>
<tr><td>Reports</td><td>13-section research report with PDF export</td></tr>
<tr><td>Resilience</td><td>Multi-provider fallback, caching, rate limiting and a demo-data mode</td></tr>
</table>
<p><sub>Keep only the rows that are actually implemented in your build. Move the rest to the Roadmap.</sub></p>

<h2>Screenshots</h2>
<p>Save your real screenshots in <code>docs/screenshots/</code> and update the paths below.</p>
<table>
<tr><td align="center"><img src="docs/screenshots/dashboard.png" alt="Dashboard" width="100%"><br><sub>Dashboard</sub></td>
<td align="center"><img src="docs/screenshots/analysis.png" alt="Stock analysis" width="100%"><br><sub>Stock analysis</sub></td></tr>
<tr><td align="center"><img src="docs/screenshots/portfolio.png" alt="Portfolio" width="100%"><br><sub>Portfolio &amp; optimiser</sub></td>
<td align="center"><img src="docs/screenshots/report.png" alt="Research report" width="100%"><br><sub>Research report / PDF</sub></td></tr>
</table>

<h2>Architecture</h2>
<p align="center"><img src="assets/architecture.svg" alt="System architecture" width="100%"></p>
<h3>Agent workflow (LangGraph)</h3>
<p align="center"><img src="assets/agent-workflow.svg" alt="Agent workflow" width="100%"></p>
<p>All numbers come from tools and are stored in the agent state. The LLM only explains that evidence. A validator rejects figures that are not in the evidence, and a compliance node removes advice-style language and appends the disclaimer.</p>

<h2>Tech Stack</h2>
<table>
<tr><th>Layer</th><th>Technology</th></tr>
<tr><td>Frontend</td><td>Next.js, React, TypeScript, Tailwind CSS, charting (Lightweight Charts / Recharts)</td></tr>
<tr><td>Backend</td><td>Python, FastAPI, LangGraph, pandas, NumPy, SciPy</td></tr>
<tr><td>AI</td><td>LLM via provider-agnostic interface (Gemini / Claude); FinBERT or VADER for sentiment</td></tr>
<tr><td>Data</td><td>Yahoo Finance, Alpha Vantage, Financial Modeling Prep, NewsAPI, RBI / MoSPI data</td></tr>
<tr><td>Storage</td><td>PostgreSQL (or SQLite for local), Redis (or in-memory cache)</td></tr>
<tr><td>Deployment</td><td>Docker Compose locally; Vercel + Render/Railway in production</td></tr>
</table>

<h2>Quick Start</h2>
<p><i>Commands below follow the planned layout. Adjust folder names or scripts to match your repo.</i></p>
<pre><code>git clone https://github.com/nallaramakrishna73-hub/ARTHA-AI.git
cd ARTHA-AI

# 1. Configure environment
cp .env.example .env        # add your API keys (all optional - demo mode works without them)

# 2. Backend (terminal 1)
cd backend
python -m venv .venv &amp;&amp; source .venv/bin/activate     # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000

# 3. Frontend (terminal 2)
cd frontend
npm install
npm run dev                  # opens http://localhost:3000</code></pre>
<p>Or with Docker: <code>docker compose up --build</code></p>
<p>Open <a href="http://localhost:3000">http://localhost:3000</a>. API docs (Swagger): <code>http://localhost:8000/docs</code>.</p>

<h3>Environment variables</h3>
<table>
<tr><th>Variable</th><th>Purpose</th></tr>
<tr><td><code>LLM_PROVIDER</code>, <code>GEMINI_API_KEY</code> / <code>ANTHROPIC_API_KEY</code></td><td>Language model for planning and report writing</td></tr>
<tr><td><code>ALPHAVANTAGE_API_KEY</code>, <code>FMP_API_KEY</code></td><td>Fallback market and fundamentals data</td></tr>
<tr><td><code>NEWSAPI_KEY</code></td><td>Financial news</td></tr>
<tr><td><code>HF_TOKEN</code></td><td>FinBERT via Hugging Face Inference API (optional)</td></tr>
<tr><td><code>JWT_SECRET</code>, <code>DATABASE_URL</code>, <code>REDIS_URL</code></td><td>Auth and storage</td></tr>
<tr><td><code>DEMO_MODE</code></td><td>Use bundled sample data when keys or providers are unavailable</td></tr>
</table>

<h2>Usage Examples</h2>
<ul>
<li><code>Analyze RELIANCE.NS</code> - full multi-agent research report</li>
<li><code>Compare TCS.NS and INFY.NS</code> - side-by-side comparison</li>
<li><code>How could higher interest rates affect Indian banking stocks?</code> - macro explanation</li>
<li><code>What happens to my portfolio if the market falls 10%?</code> - what-if scenario</li>
</ul>
<p>Sample symbols: <code>RELIANCE.NS</code>, <code>TCS.NS</code>, <code>INFY.NS</code>, <code>HDFCBANK.NS</code>, <code>ICICIBANK.NS</code>, <code>SBIN.NS</code></p>

<h2>Data Sources &amp; Resilience</h2>
<p>Requests go through a provider router: cache, primary provider, fallback provider, stale cache, then sample data. Free market feeds are delayed, so data is shown as near real-time with a "data as of" timestamp.</p>

<h2>Security &amp; Compliance</h2>
<ul>
<li>JWT authentication, hashed passwords, input validation, rate limiting</li>
<li>API keys kept server-side in environment variables, never in the frontend</li>
<li>Audit logs and a compliance node that blocks buy/sell/guarantee language</li>
<li>Educational and informational use only - no personalised investment advice</li>
</ul>

<h2>Project Structure</h2>
<pre><code>ARTHA-AI/
├── backend/
│   └── app/  api/  agents/  analysis/  providers/  services/  models/  sample_data/
├── frontend/
│   ├── app/  components/  lib/
├── docs/  architecture.md  api.md  security.md  screenshots/
├── docker-compose.yml
├── .env.example
└── README.md</code></pre>

<h2>Roadmap</h2>
<p>Tick what is truly done before you submit.</p>
<ul>
<li>&#9744; Market data + multi-provider fallback</li>
<li>&#9744; Technical analysis engine and charts</li>
<li>&#9744; LangGraph research agent</li>
<li>&#9744; News sentiment (FinBERT / VADER)</li>
<li>&#9744; Fundamentals and macro dashboard</li>
<li>&#9744; Risk engine, portfolio analytics, MPT optimiser</li>
<li>&#9744; PDF research reports</li>
<li>&#9744; Smart alerts (price, RSI, EMA cross, news)</li>
<li>&#9744; Options Lab (Black-Scholes, Greeks)</li>
<li>&#9744; Live broker feed (Kite Connect)</li>
</ul>

<h2>Testing</h2>
<pre><code>cd backend &amp;&amp; pytest
cd frontend &amp;&amp; npm run lint &amp;&amp; npm run build</code></pre>

<h2>Author</h2>
<p><b>Ramakrishna Janhvi</b> - Cybersecurity student and developer, Telangana, India.<br>
Built for the Capabl Financial Research AI Agent Development project (Track B).</p>

<h2>License</h2>
<p>Add your license here (for example MIT) and keep the disclaimer above in the app and docs.</p>

<hr>
<p align="center"><sub>ARTHA AI - research and analytics only. Not investment advice.</sub></p>
</div></body></html>
