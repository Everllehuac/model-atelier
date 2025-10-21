import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import { TrendingUp, PieChart, Activity } from "lucide-react";
import { useMemo } from "react";

interface DataStatisticsProps {
  data: Record<string, any>[];
  headers: string[];
}

const DataStatistics = ({ data, headers }: DataStatisticsProps) => {
  const statistics = useMemo(() => {
    if (!data.length) return null;

    const createHistogram = (values: number[], columnName: string) => {
      const bins = 10;
      const min = Math.min(...values);
      const max = Math.max(...values);
      const binSize = (max - min) / bins;
      
      const histogram = Array(bins).fill(0).map((_, i) => ({
        rango: `${(min + i * binSize).toFixed(1)}-${(min + (i + 1) * binSize).toFixed(1)}`,
        frecuencia: 0,
        inicio: min + i * binSize
      }));

      values.forEach(value => {
        const binIndex = Math.min(Math.floor((value - min) / binSize), bins - 1);
        histogram[binIndex].frecuencia++;
      });

      return histogram;
    };

    const numericColumns = headers.filter(header => 
      typeof data[0][header] === 'number'
    );

    const stats = numericColumns.map(column => {
      const values = data.map(row => Number(row[column])).filter(val => !isNaN(val));
      const sum = values.reduce((a, b) => a + b, 0);
      const mean = sum / values.length;
      const sorted = [...values].sort((a, b) => a - b);
      const median = sorted[Math.floor(sorted.length / 2)];
      const variance = values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / values.length;
      const stdDev = Math.sqrt(variance);
      const min = Math.min(...values);
      const max = Math.max(...values);

      return {
        column,
        mean: mean.toFixed(2),
        median: median.toFixed(2),
        stdDev: stdDev.toFixed(2),
        min: min.toFixed(2),
        max: max.toFixed(2),
        count: values.length
      };
    });

    // Crear histograma para la primera columna numérica
    const histogramData = numericColumns.length > 0 ? createHistogram(
      data.map(row => Number(row[numericColumns[0]])).filter(val => !isNaN(val)),
      numericColumns[0]
    ) : [];

    // Crear datos de tendencia temporal
    const trendData = data.map((row, index) => ({
      index: index + 1,
      ...numericColumns.reduce((acc, col) => ({
        ...acc,
        [col]: Number(row[col]) || 0
      }), {})
    }));

    return { stats, histogramData, trendData, numericColumns };
  }, [data, headers]);

  if (!statistics || !data.length) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Estadísticas en Tiempo Real</CardTitle>
          <CardDescription>Carga datos para ver las estadísticas</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const COLORS = [
    'hsl(var(--primary))',
    'hsl(var(--secondary))',
    'hsl(var(--accent))',
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))'
  ];

  return (
    <div className="space-y-6 w-full">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Estadísticas Descriptivas
          </CardTitle>
          <CardDescription>Actualización en tiempo real • {data.length} registros</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-semibold">Variable</th>
                  <th className="text-right p-2 font-semibold">Media</th>
                  <th className="text-right p-2 font-semibold">Mediana</th>
                  <th className="text-right p-2 font-semibold">Desv. Est.</th>
                  <th className="text-right p-2 font-semibold">Mín</th>
                  <th className="text-right p-2 font-semibold">Máx</th>
                  <th className="text-right p-2 font-semibold">N</th>
                </tr>
              </thead>
              <tbody>
                {statistics.stats.map((stat, index) => (
                  <tr key={stat.column} className="border-b hover:bg-accent/10 transition-colors">
                    <td className="p-2 font-medium">{stat.column}</td>
                    <td className="text-right p-2">{stat.mean}</td>
                    <td className="text-right p-2">{stat.median}</td>
                    <td className="text-right p-2">{stat.stdDev}</td>
                    <td className="text-right p-2">{stat.min}</td>
                    <td className="text-right p-2">{stat.max}</td>
                    <td className="text-right p-2">{stat.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {statistics.histogramData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Distribución de Frecuencias
            </CardTitle>
            <CardDescription>Histograma de {statistics.numericColumns[0]}</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={statistics.histogramData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="rango" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="frecuencia" name="Frecuencia" radius={[8, 8, 0, 0]}>
                  {statistics.histogramData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {statistics.trendData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Tendencias de Datos
            </CardTitle>
            <CardDescription>Evolución de las variables en el tiempo</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={statistics.trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="index" label={{ value: 'Registro', position: 'insideBottom', offset: -5 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                {statistics.numericColumns.map((col, index) => (
                  <Line 
                    key={col}
                    type="monotone" 
                    dataKey={col} 
                    stroke={COLORS[index % COLORS.length]}
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DataStatistics;
