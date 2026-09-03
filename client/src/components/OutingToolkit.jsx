import React, { useState } from 'react';
import { 
  Sun, CloudRain, ShieldCheck, Clock, Users, 
  Wallet, CheckSquare, Square, Volume2, Copy, Check,
  AlertTriangle, Sparkles, Navigation, ChevronDown, ChevronUp
} from 'lucide-react';

export default function OutingToolkit({ plan }) {
  const [activeTab, setActiveTab] = useState('radar'); // 'radar', 'split', 'packing', 'kannada'
  const [splitCount, setSplitCount] = useState(plan?.people_count || 3);
  const [copiedUpi, setCopiedUpi] = useState(false);

  // Dynamic packing list based on itinerary stops
  const isTrek = plan?.items?.some(it => it.place_name?.toLowerCase().includes('hill') || it.place_name?.toLowerCase().includes('monolith') || it.place_name?.toLowerCase().includes('trek'));
  const isTemple = plan?.items?.some(it => it.place_name?.toLowerCase().includes('temple') || it.place_name?.toLowerCase().includes('kshetra') || it.place_name?.toLowerCase().includes('mutt'));
  const isLakeside = plan?.items?.some(it => it.place_name?.toLowerCase().includes('lake') || it.place_name?.toLowerCase().includes('dam'));

  const initialChecklist = [
    { id: 1, text: 'UPI Enabled Phone & Backup Cash for rural highway tolls', checked: true },
    { id: 2, text: isTrek ? 'Firm grip trekking shoes for steep granite rock faces' : 'Comfortable walking shoes', checked: false },
    { id: 3, text: isTrek ? 'At least 2 Litres of drinking water per person' : '1 Litre water bottle & hydration pack', checked: true },
    { id: 4, text: isTemple ? 'Modest attire covering shoulders & knees for temple entry' : 'Breathable cotton daytime clothing', checked: false },
    { id: 5, text: 'Sunglasses, sun cap & sunscreen (rock gets hot after 11 AM)', checked: false },
    { id: 6, text: isLakeside ? 'Light windbreaker or evening jacket for lake breeze' : 'Phone power bank for camera and offline GPS', checked: false }
  ];

  const [checklist, setChecklist] = useState(initialChecklist);

  const toggleCheck = (id) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const packedCount = checklist.filter(c => c.checked).length;

  // Expense estimation breakdown
  // Parse base per-person estimate or fallback to 250
  const costMatch = plan?.estimated_cost?.match(/₹(\d+)/);
  const baseCostPerPerson = costMatch ? parseInt(costMatch[1], 10) : 250;
  const foodShare = Math.round(baseCostPerPerson * 0.45);
  const transitShare = Math.round(baseCostPerPerson * 0.35);
  const entryShare = Math.round(baseCostPerPerson * 0.10);
  const bufferShare = Math.round(baseCostPerPerson * 0.10);
  const totalGroupCost = baseCostPerPerson * splitCount;

  const handleCopyUpiSplit = () => {
    const text = `✦ NAVORA AI · Tumkur Outing Expense Split\nPlan: ${plan?.title || 'Tumkur Trip'}\nTotal: ₹${totalGroupCost} (${splitCount} people)\n👉 Your Share: ₹${baseCostPerPerson} per person\nPlease UPI to settle!`;
    navigator.clipboard.writeText(text);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const kannadaPhrases = [
    {
      phrase: 'Bisi Thatte Idli mathu Vada kodi',
      english: 'Please give hot Thatte Idlis and Vada',
      context: 'Ordering at Kyathsandra breakfast stops'
    },
    {
      phrase: 'Namaskara, betta daari yavude?',
      english: 'Hello, which is the path to the hill?',
      context: 'Asking locals for DD Hills or Madhugiri trail'
    },
    {
      phrase: 'Eshtu aayithu, UPI ideya?',
      english: 'How much is it, do you have UPI?',
      context: 'Paying at local stalls or entrance counters'
    },
    {
      phrase: 'Oota thumbha chennagidhe!',
      english: 'The food is very delicious!',
      context: 'Complimenting the cafe or hotel cook'
    }
  ];

  return (
    <div 
      className="p-6 sm:p-7 rounded-3xl mb-8 relative overflow-hidden"
      style={{
        background: 'rgba(10, 14, 26, 0.85)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 20px 50px -15px rgba(0,0,0,0.7)'
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse-glow" />
            <span className="label-overline text-cyan-400">NAVORA Outing Intelligence Suite</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight">
            Tumkur Trip Tools & Field Guide
          </h3>
        </div>

        {/* Tab Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/4 border border-white/6 overflow-x-auto">
          {[
            { id: 'radar', label: '🌤️ Outdoor Radar' },
            { id: 'split', label: '💰 Group Splitter' },
            { id: 'packing', label: `🎒 Checklist (${packedCount}/${checklist.length})` },
            { id: 'kannada', label: '🗣️ Kannada Guide' }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === t.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/4'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: Outdoor Radar */}
      {activeTab === 'radar' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
          {/* Temperature & Breeze */}
          <div className="p-5 rounded-2xl bg-white/3 border border-white/6">
            <div className="flex items-center justify-between mb-3">
              <span className="label-overline text-slate-500">Live Weather Radar</span>
              <Sun className="w-4 h-4 text-amber-400" />
            </div>
            <div className="font-mono text-3xl font-bold text-white mb-1">28°C</div>
            <div className="text-xs text-cyan-300 font-semibold mb-2">Partly Sunny · Crisp Hill Air</div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Gentle hill breeze across DD Hills and Madhugiri. High visibility for landscape photography.
            </p>
          </div>

          {/* Trek Safety Index */}
          <div className="p-5 rounded-2xl bg-white/3 border border-white/6">
            <div className="flex items-center justify-between mb-3">
              <span className="label-overline text-slate-500">Rock Climb & Trail Safety</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="font-mono text-xl font-bold text-emerald-400 mb-1 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              Optimal Conditions
            </div>
            <div className="text-xs text-slate-300 mb-2">Dry granite rocks, minimal slipperiness</div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Safe for stone step ascents. Start high monolith steps before 10:30 AM to avoid hot afternoon stone surfaces.
            </p>
          </div>

          {/* Sunset & Golden Hour */}
          <div className="p-5 rounded-2xl bg-white/3 border border-white/6">
            <div className="flex items-center justify-between mb-3">
              <span className="label-overline text-slate-500">Golden Hour Forecast</span>
              <Clock className="w-4 h-4 text-violet-400" />
            </div>
            <div className="font-mono text-3xl font-bold text-violet-300 mb-1">6:34 PM</div>
            <div className="text-xs text-violet-200 font-semibold mb-2">Peak Sunset Window (6:15 - 6:45 PM)</div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Prime vantage points: Yoga Narasimha Peak summit, Amanikere promenade, or Markonahalli dam spillway.
            </p>
          </div>
        </div>
      )}

      {/* TAB 2: Group Expense Splitter */}
      {activeTab === 'split' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
          <div className="lg:col-span-5 p-5 rounded-2xl bg-white/3 border border-white/6 flex flex-col justify-between">
            <div>
              <span className="label-overline text-slate-500 block mb-2">Group Calculator</span>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-white">Party Size:</span>
                <span className="font-mono text-lg font-bold text-cyan-300">{splitCount} {splitCount === 1 ? 'Person' : 'People'}</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={splitCount}
                onChange={(e) => setSplitCount(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 mb-6"
              />

              <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 mb-4">
                <div className="text-xs text-slate-400 uppercase font-mono mb-1">Per Person Share</div>
                <div className="font-mono text-3xl font-bold text-cyan-300">₹{baseCostPerPerson}</div>
                <div className="text-[11px] text-slate-400 mt-1">Total estimated outing: ₹{totalGroupCost}</div>
              </div>
            </div>

            <button
              onClick={handleCopyUpiSplit}
              className="w-full py-2.5 px-4 rounded-xl btn-secondary text-xs font-semibold justify-center gap-2 cursor-pointer"
            >
              {copiedUpi ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-cyan-400" />}
              <span>{copiedUpi ? 'Split Details Copied!' : 'Copy Group Split Message'}</span>
            </button>
          </div>

          <div className="lg:col-span-7 p-5 rounded-2xl bg-white/3 border border-white/6">
            <span className="label-overline text-slate-500 block mb-3">Estimated Spending Breakdown (Per Person)</span>
            <div className="space-y-3">
              {[
                { label: 'Authentic Meals & Thatte Idlis', cost: foodShare, icon: '🍲', desc: 'Breakfast, snacks, and tea breaks' },
                { label: 'Transit & Fuel Contribution', cost: transitShare, icon: '⛽', desc: 'Bike / Cab fuel pool across Tumkur roads' },
                { label: 'Site Entry & Parking Fees', cost: entryShare, icon: '🎫', desc: 'Sanctuary or monument nominal access' },
                { label: 'Emergency Buffer / Refreshments', cost: bufferShare, icon: '🛡️', desc: 'Bottled water and tender coconut buffer' }
              ].map((cat, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/2 border border-white/5">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{cat.icon}</span>
                    <div>
                      <div className="text-xs font-bold text-white">{cat.label}</div>
                      <div className="text-[10px] text-slate-500">{cat.desc}</div>
                    </div>
                  </div>
                  <span className="font-mono text-sm font-bold text-emerald-400">~₹{cat.cost}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Smart Packing Checklist */}
      {activeTab === 'packing' && (
        <div className="animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="label-overline text-cyan-400">Pre-Trip Readiness</span>
              <p className="text-xs text-slate-400">Tailored dynamically for this specific Tumkur route.</p>
            </div>
            <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
              {packedCount} / {checklist.length} Packed
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {checklist.map((item) => (
              <button
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                  item.checked
                    ? 'bg-emerald-950/20 border-emerald-500/30 text-slate-400'
                    : 'bg-white/3 border-white/6 text-white hover:border-cyan-500/30'
                }`}
              >
                {item.checked ? (
                  <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <Square className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                )}
                <span className={`text-xs ${item.checked ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                  {item.text}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Kannada Guide & Cultural Etiquette */}
      {activeTab === 'kannada' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in">
          {kannadaPhrases.map((phrase, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-white/3 border border-white/6 hover:border-cyan-500/30 transition-all">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
                  Phrase #{idx + 1}
                </span>
                <span className="text-[10px] text-slate-500">{phrase.context}</span>
              </div>
              <div className="text-sm font-bold text-white mb-1">
                "{phrase.phrase}"
              </div>
              <div className="text-xs text-slate-400 font-light italic">
                Translation: {phrase.english}
              </div>
            </div>
          ))}

          <div className="sm:col-span-2 p-4 rounded-2xl bg-amber-500/8 border border-amber-500/20 flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300 leading-relaxed">
              <strong className="text-amber-300">Local Tumkur Tip:</strong> Siddaganga Mutt serves free sanctified noon meals (Dasoha) to all travelers. At Namada Chilume spring, keep small food packets and shiny items tucked securely inside bags to avoid playful temple macaques.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
