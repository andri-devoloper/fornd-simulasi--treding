// types/trading.ts

export type TradingConfig = {
  // id: string,
  symbol: string;
  //   timeframe: string;
  timeframe: "1m" | "5m" | "15m" | "1h" | "4h" | "1d";
  plusDIThreshold: number;
  minusDIThreshold: number;
  adxMinimum: number;
  takeProfitPercent: number;
  stopLossPercent: number;
  leverage: string;
};
