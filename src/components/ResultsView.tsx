import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter } from "recharts";
import { TrendingUp, BarChart3 } from "lucide-react";

interface ResultsViewProps {
  metrics: {
    rSquared: string;
    rmse: string;
    mae: string;
  };
  scatterData: Array<{ x: number; actual: number; prediccion: number }>;
  barData: Array<{ nombre: string; importancia: number }>;
}

const ResultsView = ({ metrics, scatterData, barData }: ResultsViewProps) => {
  return (
    <div className="space-y-6 w-full">
      <Card>
        <CardHeader>
          <CardTitle>Métricas del Modelo</CardTitle>
          <CardDescription>Evaluación del rendimiento</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-accent/20 rounded-lg">
              <p className="text-sm text-muted-foreground">R²</p>
              <p className="text-2xl font-bold">{metrics.rSquared}</p>
            </div>
            <div className="text-center p-4 bg-accent/20 rounded-lg">
              <p className="text-sm text-muted-foreground">RMSE</p>
              <p className="text-2xl font-bold">{metrics.rmse}</p>
            </div>
            <div className="text-center p-4 bg-accent/20 rounded-lg">
              <p className="text-sm text-muted-foreground">MAE</p>
              <p className="text-2xl font-bold">{metrics.mae}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Regresión Lineal
          </CardTitle>
          <CardDescription>Valores actuales vs predicciones</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" name="X" />
              <YAxis />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Legend />
              <Scatter name="Actual" data={scatterData} fill="hsl(var(--primary))" dataKey="actual" />
              <Scatter name="Predicción" data={scatterData} fill="hsl(var(--success))" dataKey="prediccion" />
            </ScatterChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Importancia de Características
          </CardTitle>
          <CardDescription>Peso de cada variable en el modelo</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nombre" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="importancia" fill="hsl(var(--primary))" name="Importancia %" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsView;
