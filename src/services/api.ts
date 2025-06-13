// src\services\api.ts
const BASE_URL = "http://localhost:5000/api";

import type { TradingConfig } from "../types/trading";
import type { webHookType } from "../types/webHook";

async function saveConfig(config: TradingConfig): Promise<TradingConfig> {
  const response = await fetch(`${BASE_URL}/config`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(config),
  });

  if (!response.ok) {
    throw new Error(`Failed to save config: ${response.statusText}`);
  }

  return response.json();
}

async function getConfigs(): Promise<TradingConfig[]> {
  const response = await fetch(`${BASE_URL}/configs`); // New endpoint for multiple configs
  if (!response.ok) {
    throw new Error(`Failed to fetch configs: ${response.statusText}`);
  }
  return response.json();
}

async function getConfig(): Promise<TradingConfig> {
  const response = await fetch(`${BASE_URL}/config`);
  if (!response.ok) {
    throw new Error(`Failed to fetch config: ${response.statusText}`);
  }
  return response.json();
}

// async function saveConfig(config: any) {
//   const response = await fetch(`${BASE_URL}/final`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(config),
//   });

//   if (!response.ok) {
//     throw new Error(`Failed to save config: ${response.statusText}`);
//   }

//   return response.json();
// }

async function sendWebhookSignal(payload: webHookType) {
  const response = await fetch(`${BASE_URL}/webhook`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });


  return response.json();
}

async function getOrders() {
  const response = await fetch(`${BASE_URL}/orders`);
  return response.json();
}

export { saveConfig, getConfig, getOrders, getConfigs, sendWebhookSignal };
