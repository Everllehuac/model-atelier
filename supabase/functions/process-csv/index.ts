const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      throw new Error('No se proporcionó ningún archivo');
    }

    const text = await file.text();
    const lines = text.split('\n').filter(line => line.trim());
    
    if (lines.length === 0) {
      throw new Error('El archivo está vacío');
    }

    // Detectar delimitador (coma o tabulación)
    const firstLine = lines[0];
    const delimiter = firstLine.includes('\t') ? '\t' : ',';
    
    console.log('Delimitador detectado:', delimiter === '\t' ? 'TAB' : 'COMA');

    // Parse CSV
    const headers = lines[0].split(delimiter).map(h => h.trim().replace(/^"|"$/g, ''));
    const rows = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(delimiter).map(v => v.trim().replace(/^"|"$/g, ''));
      const row: Record<string, any> = {};
      
      headers.forEach((header, index) => {
        const value = values[index];
        if (!value || value === '') {
          row[header] = null;
        } else {
          // Try to parse as number
          const numValue = parseFloat(value);
          row[header] = isNaN(numValue) ? value : numValue;
        }
      });
      
      rows.push(row);
    }

    return new Response(
      JSON.stringify({ 
        headers, 
        data: rows,
        rowCount: rows.length,
        columnCount: headers.length
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    console.error('Error procesando archivo:', error);
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
