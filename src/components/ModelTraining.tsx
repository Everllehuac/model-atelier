import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, Play } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ModelTrainingProps {
  data: Record<string, any>[];
  headers: string[];
  onTrainingComplete: (results: any) => void;
}

const ModelTraining = ({ data, headers, onTrainingComplete }: ModelTrainingProps) => {
  const [targetColumn, setTargetColumn] = useState('');
  const [featureColumn, setFeatureColumn] = useState('');
  const [isTraining, setIsTraining] = useState(false);
  const { toast } = useToast();

  const handleTrain = async () => {
    if (!targetColumn || !featureColumn) {
      toast({
        title: "Error",
        description: "Selecciona columnas objetivo y características",
        variant: "destructive",
      });
      return;
    }

    setIsTraining(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/train-model`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            data,
            targetColumn,
            featureColumns: [featureColumn]
          })
        }
      );

      if (!response.ok) throw new Error('Error al entrenar modelo');

      const result = await response.json();
      onTrainingComplete(result);
      
      toast({
        title: "Modelo entrenado",
        description: `R² = ${result.metrics.rSquared}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo entrenar el modelo",
        variant: "destructive",
      });
    } finally {
      setIsTraining(false);
    }
  };
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5" />
          Entrenamiento de Modelos
        </CardTitle>
        <CardDescription>
          Configura y entrena tu modelo de machine learning
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Columna Objetivo (Y)</Label>
          <Select value={targetColumn} onValueChange={setTargetColumn}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar columna objetivo" />
            </SelectTrigger>
            <SelectContent>
              {headers.map((header) => (
                <SelectItem key={header} value={header}>{header}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Columna Característica (X)</Label>
          <Select value={featureColumn} onValueChange={setFeatureColumn}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar característica" />
            </SelectTrigger>
            <SelectContent>
              {headers.map((header) => (
                <SelectItem key={header} value={header}>{header}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="p-4 bg-accent/20 rounded-lg">
          <p className="text-sm text-muted-foreground">
            Algoritmo: <span className="font-semibold">Regresión Lineal</span>
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Ideal para relaciones lineales entre variables
          </p>
        </div>

        <Button 
          variant="success" 
          className="w-full" 
          size="lg"
          onClick={handleTrain}
          disabled={isTraining || data.length === 0}
        >
          <Play className="w-5 h-5" />
          {isTraining ? 'Entrenando...' : 'Entrenar Modelo'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ModelTraining;
