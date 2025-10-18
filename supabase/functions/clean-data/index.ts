const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { data, options } = await req.json();
    
    let cleanedData = [...data];

    // Remove nulls
    if (options.removeNulls) {
      cleanedData = cleanedData.filter(row => {
        return Object.values(row).every(val => val !== null && val !== undefined && val !== '');
      });
    }

    // Remove duplicates
    if (options.removeDuplicates) {
      const seen = new Set();
      cleanedData = cleanedData.filter(row => {
        const key = JSON.stringify(row);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    }

    // Handle missing values
    if (options.missingValueMethod && options.missingValueMethod !== 'remove') {
      const numericColumns = Object.keys(cleanedData[0] || {}).filter(key => 
        typeof cleanedData[0][key] === 'number'
      );

      numericColumns.forEach(column => {
        const values = cleanedData.map(row => row[column]).filter(v => v !== null && !isNaN(v));
        
        let fillValue = 0;
        if (options.missingValueMethod === 'mean') {
          fillValue = values.reduce((a, b) => a + b, 0) / values.length;
        } else if (options.missingValueMethod === 'median') {
          const sorted = [...values].sort((a, b) => a - b);
          fillValue = sorted[Math.floor(sorted.length / 2)];
        }

        cleanedData = cleanedData.map(row => ({
          ...row,
          [column]: row[column] === null || isNaN(row[column]) ? fillValue : row[column]
        }));
      });
    }

    // Normalize/Scale
    if (options.scalingMethod && options.scalingMethod !== 'none') {
      const numericColumns = Object.keys(cleanedData[0] || {}).filter(key => 
        typeof cleanedData[0][key] === 'number'
      );

      numericColumns.forEach(column => {
        const values = cleanedData.map(row => row[column]);
        const min = Math.min(...values);
        const max = Math.max(...values);
        const mean = values.reduce((a, b) => a + b, 0) / values.length;
        const std = Math.sqrt(values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length);

        cleanedData = cleanedData.map(row => {
          let scaled = row[column];
          if (options.scalingMethod === 'standard') {
            scaled = (row[column] - mean) / (std || 1);
          } else if (options.scalingMethod === 'minmax') {
            scaled = (row[column] - min) / (max - min || 1);
          }
          return { ...row, [column]: scaled };
        });
      });
    }

    return new Response(
      JSON.stringify({ data: cleanedData }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    console.error('Error limpiando datos:', error);
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
