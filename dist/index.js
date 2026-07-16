"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs")); // Move this to the top
const dataService_1 = require("./dataService");
async function runReportingTool() {
    console.log("Fetching sales pipeline data...");
    const data = await (0, dataService_1.fetchSalesData)();
    // Performance Calculations
    const totalOpportunities = data.length;
    const wonOpportunities = data.filter(opp => opp.statuscode === 3).length;
    // Prevent division by zero
    const conversionRate = totalOpportunities > 0
        ? (wonOpportunities / totalOpportunities) * 100
        : 0;
    // Financial Calculation
    const totalPipelineValue = data.reduce((sum, opp) => sum + opp.estimatedvalue, 0);
    const wonPipelineValue = data
        .filter(opp => opp.statuscode === 3)
        .reduce((sum, opp) => sum + opp.estimatedvalue, 0);
    const report = {
        totalOpportunities,
        wonOpportunities,
        conversionRate: conversionRate.toFixed(2),
        totalPipelineValue,
        wonPipelineValue
    };
    // Now this works because fs is imported at the top
    fs.writeFileSync('report.json', JSON.stringify(report, null, 2));
    console.log("Report generated successfully: report.json");
}
runReportingTool();
