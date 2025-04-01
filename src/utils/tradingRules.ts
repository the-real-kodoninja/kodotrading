export const applyTradingRules = (postContent: string, tradeSettings: { stopLoss: number; takeProfit: number; trailingStop: boolean }) => {
  const warnings: string[] = [];

  // Sykes' Rule: Cut losses fast (stop-loss should be tight for penny stocks)
  if (postContent.toLowerCase().includes('penny') && tradeSettings.stopLoss > 2) {
    warnings.push("Sykes' Rule: For penny stocks, stop-loss should be tight (≤2%).");
  }

  // Cameron's Rule: Predefined exits (take-profit should be set)
  if (tradeSettings.takeProfit === 0) {
    warnings.push("Cameron's Rule: Always set a predefined take-profit target.");
  }

  // General Rule: Risk management (stop-loss should always be set)
  if (tradeSettings.stopLoss === 0) {
    warnings.push("Risk Management: Always set a stop-loss to protect your capital.");
  }

  return warnings;
};
