import * as fs from 'fs'; // Move this to the top
import { fetchSalesData, Opportunity } from './dataService';

async function runReportingTool() {
    console.log("Fetching sales pipeline data...");
    const data: Opportunity[] = await fetchSalesData();
    
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