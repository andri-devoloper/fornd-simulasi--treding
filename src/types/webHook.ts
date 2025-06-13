// src\types\webHook.ts
export type webHookType = {
  id?: string;
  timestamp?: string;
  symbol: string;
  plusDI: number;
  minusDI: number;
  adx: number;
  timeframe: string;
  action?: string;
  price_entry?: number;
  tp_price?: number;
  sl_price?: number;
  leverage?: string;
  takeProfit?: number;
  stopLoss?: number;
};

//    {
//        "symbol": "BTCUSDT",
//        "plusDI": 27.5,
//        "minusDI": 15.0,
//        "adx": 25.0,
//        "timeframe": "5m"
//     }
