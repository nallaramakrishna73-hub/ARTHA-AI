/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Loader2,
  ExternalLink,
  RefreshCw,
  Layers,
  Sparkles,
  SlidersHorizontal,
  Check,
  HelpCircle,
} from 'lucide-react';

interface TradingViewChartProps {
  symbol: string;
  theme?: 'dark' | 'light';
  height?: number;
}

export const TradingViewChart: React.FC<TradingViewChartProps> = ({
  symbol,
  theme = 'dark',
  height = 520,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [interval, setInterval] = useState<'D' | 'W' | 'M' | '60' | '15'>('D');

  // Active Technical Indicator Studies in TradingView
  const [activeStudies, setActiveStudies] = useState<{ [id: string]: boolean }>({
    'RSI@tv-basicstudies': true,
    'MAExp@tv-basicstudies': true,
    'MACD@tv-basicstudies': true,
    'BB@tv-basicstudies': true,
    'Volume@tv-basicstudies': false,
    'MASimple@tv-basicstudies': false,
  });

  // Map internal symbol to TradingView Indian market format
  const getTradingViewSymbol = (sym: string): string => {
    const clean = sym.toUpperCase().trim();
    if (clean === '^NSEI') return 'NSE:NIFTY';
    if (clean === '^NSEBANK') return 'NSE:BANKNIFTY';
    if (clean === '^BSESN') return 'BSE:SENSEX';

    const base = clean.replace(/\.(NS|BO)$/, '');
    const isBSE = clean.endsWith('.BO');
    return `${isBSE ? 'BSE' : 'NSE'}:${base}`;
  };

  const tvSymbol = getTradingViewSymbol(symbol);

  // Available Studies Configuration
  const availableIndicators = [
    { id: 'RSI@tv-basicstudies', name: 'RSI (14)', label: 'Relative Strength' },
    { id: 'MAExp@tv-basicstudies', name: 'EMA (Exponential)', label: 'Trend' },
    { id: 'MACD@tv-basicstudies', name: 'MACD (12, 26, 9)', label: 'Momentum' },
    { id: 'BB@tv-basicstudies', name: 'Bollinger Bands (20, 2σ)', label: 'Volatility' },
    { id: 'Volume@tv-basicstudies', name: 'Volume Flow', label: 'Liquidity' },
    { id: 'MASimple@tv-basicstudies', name: 'SMA (Simple MA)', label: 'Baseline' },
  ];

  const toggleStudy = (studyId: string) => {
    setIsLoading(true);
    setActiveStudies((prev) => ({
      ...prev,
      [studyId]: !prev[studyId],
    }));
  };

  const applyPreset = (preset: 'all' | 'trend' | 'momentum' | 'clean') => {
    setIsLoading(true);
    if (preset === 'all') {
      setActiveStudies({
        'RSI@tv-basicstudies': true,
        'MAExp@tv-basicstudies': true,
        'MACD@tv-basicstudies': true,
        'BB@tv-basicstudies': true,
        'Volume@tv-basicstudies': true,
        'MASimple@tv-basicstudies': true,
      });
    } else if (preset === 'trend') {
      setActiveStudies({
        'RSI@tv-basicstudies': false,
        'MAExp@tv-basicstudies': true,
        'MACD@tv-basicstudies': false,
        'BB@tv-basicstudies': true,
        'Volume@tv-basicstudies': true,
        'MASimple@tv-basicstudies': true,
      });
    } else if (preset === 'momentum') {
      setActiveStudies({
        'RSI@tv-basicstudies': true,
        'MAExp@tv-basicstudies': false,
        'MACD@tv-basicstudies': true,
        'BB@tv-basicstudies': false,
        'Volume@tv-basicstudies': true,
        'MASimple@tv-basicstudies': false,
      });
    } else {
      // Clean
      setActiveStudies({
        'RSI@tv-basicstudies': false,
        'MAExp@tv-basicstudies': false,
        'MACD@tv-basicstudies': false,
        'BB@tv-basicstudies': false,
        'Volume@tv-basicstudies': false,
        'MASimple@tv-basicstudies': false,
      });
    }
  };

  // Compile selected studies for TradingView widget URL
  const selectedStudiesList = Object.entries(activeStudies)
    .filter(([_, isEnabled]) => isEnabled)
    .map(([studyId]) => studyId);

  const studiesParam = encodeURIComponent(JSON.stringify(selectedStudiesList));

  // Construct official TradingView Widget Embed URL with selected studies & interval
  const embedUrl = `https://s.tradingview.com/widgetembed/?frameElementId=tradingview_chart&symbol=${encodeURIComponent(
    tvSymbol
  )}&interval=${interval}&hidesidetoolbar=0&symboledit=1&saveimage=1&toolbarbg=0B1F3A&theme=dark&style=1&timezone=Asia%2FKolkata&locale=in&studies=${studiesParam}&withdateranges=1&showpopupbutton=1&enablepublishing=false&allowsymbolchange=1`;

  const handleRefresh = () => {
    setIsLoading(true);
  };

  return (
    <div className="relative w-full rounded-xl bg-[#070F1F] border border-[#1B2B48] overflow-hidden shadow-xl flex flex-col">
      {/* Top Header Bar */}
      <div className="px-3.5 py-2.5 bg-[#0B1F3A] border-b border-[#1B2B48] flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Ticker & Status */}
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#16A34A] animate-pulse" />
          <span className="font-bold text-white tracking-wide">
            TradingView Terminal
          </span>
          <span className="text-[#64748B]">·</span>
          <span className="font-mono text-[#FF9933] font-bold text-xs">{tvSymbol}</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#16A34A]/20 text-[#16A34A] font-semibold">
            NSE/BSE IST
          </span>
        </div>

        {/* Interval Selector Buttons */}
        <div className="flex items-center gap-1 bg-[#070F1F] p-0.5 rounded-lg border border-[#1B2B48] text-xs">
          {[
            { id: '15', label: '15m' },
            { id: '60', label: '1h' },
            { id: 'D', label: '1D' },
            { id: 'W', label: '1W' },
            { id: 'M', label: '1M' },
          ].map((int) => (
            <button
              key={int.id}
              onClick={() => {
                setIsLoading(true);
                setInterval(int.id as any);
              }}
              className={`px-2 py-0.5 rounded font-mono text-[11px] font-medium transition-colors ${
                interval === int.id
                  ? 'bg-[#1B2B48] text-[#FF9933] font-bold shadow-sm'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              {int.label}
            </button>
          ))}
        </div>

        {/* Quick External & Refresh Actions */}
        <div className="flex items-center gap-2 text-[#94A3B8] text-[11px]">
          <button
            onClick={handleRefresh}
            title="Reload Chart"
            className="p-1 hover:text-white rounded hover:bg-[#1B2B48] transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>

          <a
            href={`https://www.tradingview.com/symbols/${tvSymbol.replace(':', '-')}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[#FF9933] hover:underline"
          >
            <span>Open in TV</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Indicator Selection Strip */}
      <div className="px-3.5 py-2 bg-[#081528] border-b border-[#1B2B48] flex flex-wrap items-center justify-between gap-2.5 text-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="flex items-center gap-1 text-[11px] text-[#64748B] mr-1 font-semibold uppercase tracking-wider">
            <Layers className="w-3 h-3 text-[#FF9933]" /> TV Indicators:
          </span>

          {availableIndicators.map((ind) => {
            const isSelected = !!activeStudies[ind.id];
            return (
              <button
                key={ind.id}
                onClick={() => toggleStudy(ind.id)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                  isSelected
                    ? 'bg-[#FF9933]/15 border border-[#FF9933] text-[#FF9933] shadow-sm font-semibold'
                    : 'bg-[#070F1F] border border-[#1B2B48] text-[#94A3B8] hover:text-white hover:border-[#2D436B]'
                }`}
              >
                {isSelected && <Check className="w-3 h-3 text-[#FF9933]" />}
                <span>{ind.name}</span>
              </button>
            );
          })}
        </div>

        {/* Indicator Presets */}
        <div className="flex items-center gap-1.5 text-[11px]">
          <span className="text-[#64748B]">Presets:</span>
          <button
            onClick={() => applyPreset('all')}
            className="px-2 py-0.5 rounded bg-[#070F1F] border border-[#1B2B48] text-[#38BDF8] hover:bg-[#1B2B48]"
          >
            Full Suite
          </button>
          <button
            onClick={() => applyPreset('momentum')}
            className="px-2 py-0.5 rounded bg-[#070F1F] border border-[#1B2B48] text-[#16A34A] hover:bg-[#1B2B48]"
          >
            RSI + MACD
          </button>
          <button
            onClick={() => applyPreset('trend')}
            className="px-2 py-0.5 rounded bg-[#070F1F] border border-[#1B2B48] text-[#A855F7] hover:bg-[#1B2B48]"
          >
            EMA + Bands
          </button>
          <button
            onClick={() => applyPreset('clean')}
            className="px-2 py-0.5 rounded bg-[#070F1F] border border-[#1B2B48] text-[#94A3B8] hover:bg-[#1B2B48]"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Widget Container */}
      <div className="w-full relative" style={{ height: `${height}px` }}>
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#070F1F] text-[#94A3B8] gap-2.5 z-10">
            <Loader2 className="w-6 h-6 animate-spin text-[#FF9933]" />
            <span className="text-xs font-medium">
              Rendering TradingView chart with {selectedStudiesList.length} indicators for {tvSymbol}...
            </span>
          </div>
        )}

        <iframe
          key={`${tvSymbol}-${interval}-${selectedStudiesList.join('-')}`}
          title={`TradingView Chart ${tvSymbol}`}
          src={embedUrl}
          className="w-full h-full border-0"
          style={{ width: '100%', height: '100%', border: 'none' }}
          onLoad={() => setIsLoading(false)}
          allow="clipboard-write"
          loading="lazy"
        />
      </div>

      {/* Tip footer */}
      <div className="px-3.5 py-1.5 bg-[#050B17] border-t border-[#1B2B48] flex items-center justify-between text-[10px] text-[#64748B]">
        <div className="flex items-center gap-1.5">
          <HelpCircle className="w-3 h-3 text-[#FF9933]" />
          <span>
            Indicators applied above load directly. Inside the chart header, you can also click the <strong>&quot;Indicators (fx)&quot;</strong> button to search 100+ additional TradingView community indicators.
          </span>
        </div>
        <span className="font-mono-numbers">Live {selectedStudiesList.length} indicators active</span>
      </div>
    </div>
  );
};
