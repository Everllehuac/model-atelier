import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Brain, Play } from "lucide-react";

const ModelTraining = () => {
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
          <Label>Algoritmo</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar algoritmo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="linear">Regresión Lineal</SelectItem>
              <SelectItem value="logistic">Regresión Logística</SelectItem>
              <SelectItem value="rf">Random Forest</SelectItem>
              <SelectItem value="svm">Máquina de Vector de Soporte</SelectItem>
              <SelectItem value="nn">Red Neuronal</SelectItem>
              <SelectItem value="xgboost">XGBoost</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="test-split">División de prueba (%)</Label>
            <Input 
              id="test-split" 
              type="number" 
              placeholder="20" 
              min="10" 
              max="50"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="epochs">Épocas</Label>
            <Input 
              id="epochs" 
              type="number" 
              placeholder="100" 
              min="1"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="learning-rate">Tasa de aprendizaje</Label>
          <Input 
            id="learning-rate" 
            type="number" 
            placeholder="0.001" 
            step="0.001"
          />
        </div>

        <div className="space-y-2">
          <Label>Método de validación</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar método" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="holdout">Validación Hold-out</SelectItem>
              <SelectItem value="cv">Validación cruzada</SelectItem>
              <SelectItem value="stratified">K-Fold estratificado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="success" className="w-full" size="lg">
          <Play className="w-5 h-5" />
          Entrenar Modelo
        </Button>
      </CardContent>
    </Card>
  );
};

export default ModelTraining;
