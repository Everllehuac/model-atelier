const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Simple linear regression implementation
function linearRegression(xValues: number[], yValues: number[]) {
  const n = xValues.length;
  const sumX = xValues.reduce((a, b) => a + b, 0);
  const sumY = yValues.reduce((a, b) => a + b, 0);
  const sumXY = xValues.reduce((sum, x, i) => sum + x * yValues[i], 0);
  const sumX2 = xValues.reduce((sum, x) => sum + x * x, 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  return { slope, intercept };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { data, targetColumn, featureColumns } = await req.json();

    if (!targetColumn || !featureColumns || featureColumns.length === 0) {
      throw new Error('Debe especificar columnas objetivo y características');
    }

    // Extract target and feature values
    const yValues = data.map((row: any) => row[targetColumn]);
    const xValues = data.map((row: any) => row[featureColumns[0]]); // Use first feature for simple regression

    // Train model
    const { slope, intercept } = linearRegression(xValues, yValues);

    // Make predictions
    const predictions = xValues.map((x: number) => slope * x + intercept);

    // Calculate metrics
    const meanY = yValues.reduce((a: number, b: number) => a + b, 0) / yValues.length;
    const ssTotal = yValues.reduce((sum: number, y: number) => sum + Math.pow(y - meanY, 2), 0);
    const ssResidual = yValues.reduce((sum: number, y: number, i: number) => 
      sum + Math.pow(y - predictions[i], 2), 0
    );
    const rSquared = 1 - (ssResidual / ssTotal);
    const rmse = Math.sqrt(ssResidual / yValues.length);

    // Prepare chart data
    const scatterData = xValues.map((x: number, i: number) => ({
      x,
      actual: yValues[i],
      prediccion: predictions[i]
    }));

    // Bar chart data (feature importance)
    const barData = featureColumns.map((col: string) => ({
      nombre: col,
      importancia: Math.abs(slope) * 100
    }));

    return new Response(
      JSON.stringify({
        model: { slope, intercept },
        metrics: {
          rSquared: rSquared.toFixed(4),
          rmse: rmse.toFixed(4),
          mae: (yValues.reduce((sum: number, y: number, i: number) => 
            sum + Math.abs(y - predictions[i]), 0) / yValues.length).toFixed(4)
        },
        predictions,
        scatterData,
        barData
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    console.error('Error entrenando modelo:', error);
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
