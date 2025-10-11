import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Sparkles } from "lucide-react";

const DataCleaning = () => {
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
            <Switch id="remove-nulls" />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="normalize">Normalizar datos</Label>
            <Switch id="normalize" />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="remove-duplicates">Eliminar duplicados</Label>
            <Switch id="remove-duplicates" />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Manejar valores faltantes</Label>
          <Select>
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
          <Select>
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

        <Button variant="gradient" className="w-full" size="lg">
          Aplicar Transformaciones
        </Button>
      </CardContent>
    </Card>
  );
};

export default DataCleaning;
