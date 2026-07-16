import * as fs from 'fs';
import * as path from 'path';

// Update the function signature in src/dataService.ts
export async function fetchSalesData(): Promise<Opportunity[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const rawData = fs.readFileSync(path.join(__dirname, '../src/data/opportunities.json'), 'utf-8');
            resolve(JSON.parse(rawData) as Opportunity[]);
        }, 500);
    });
}

// Add this interface to src/dataService.ts
export interface Opportunity {
    opportunityid: string;
    topic: string;
    estimatedvalue: number;
    statuscode: number;
    createdon: string;
}