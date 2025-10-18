import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DataCleaningProps {
  data: Record<string, any>[];
  onDataCleaned: (cleanedData: Record<string, any>[]) => void;
}

const DataCleaning = ({ data, onDataCleaned }: DataCleaningProps) => {
  const [removeNulls, setRemoveNulls] = useState(false);
  const [normalize, setNormalize] = useState(false);
  const [removeDuplicates, setRemoveDuplicates] = useState(false);
  const [missingValueMethod, setMissingValueMethod] = useState('');
  const [scalingMethod, setScalingMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleClean = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/clean-data`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            data,
            options: {
              removeNulls,
              normalize,
              removeDuplicates,
              missingValueMethod,
              scalingMethod
            }
          })
        }
      );

      if (!response.ok) throw new Error('Error al limpiar datos');

      const result = await response.json();
      onDataCleaned(result.data);
      
      toast({
        title: "Datos limpiados",
        description: "Transformaciones aplicadas exitosamente",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron limpiar los datos",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          Limpieza de Datos
        </CardTitle>
        <CardDescription>
          Configura las operaciones de preprocesamiento de datos
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="remove-nulls">Eliminar valores nulos</Label>
            <Switch id="remove-nulls" checked={removeNulls} onCheckedChange={setRemoveNulls} />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="normalize">Normalizar datos</Label>
            <Switch id="normalize" checked={normalize} onCheckedChange={setNormalize} />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="remove-duplicates">Eliminar duplicados</Label>
            <Switch id="remove-duplicates" checked={removeDuplicates} onCheckedChange={setRemoveDuplicates} />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Manejar valores faltantes</Label>
          <Select value={missingValueMethod} onValueChange={setMissingValueMethod}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar método" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mean">Rellenar con media</SelectItem>
              <SelectItem value="median">Rellenar con mediana</SelectItem>
              <SelectItem value="mode">Rellenar con moda</SelectItem>
              <SelectItem value="forward">Rellenar hacia adelante</SelectItem>
              <SelectItem value="remove">Eliminar filas</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Método de escalado</Label>
          <Select value={scalingMethod} onValueChange={setScalingMethod}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar escalado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="standard">Escalado estándar</SelectItem>
              <SelectItem value="minmax">Escalado Min-Max</SelectItem>
              <SelectItem value="robust">Escalado robusto</SelectItem>
              <SelectItem value="none">Sin escalado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          variant="gradient" 
          className="w-full" 
          size="lg"
          onClick={handleClean}
          disabled={isProcessing || data.length === 0}
        >
          {isProcessing ? 'Procesando...' : 'Aplicar Transformaciones'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default DataCleaning;
