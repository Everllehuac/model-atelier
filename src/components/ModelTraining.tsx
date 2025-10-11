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
          Model Training
        </CardTitle>
        <CardDescription>
          Configure and train your machine learning model
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Algorithm</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select algorithm" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="linear">Linear Regression</SelectItem>
              <SelectItem value="logistic">Logistic Regression</SelectItem>
              <SelectItem value="rf">Random Forest</SelectItem>
              <SelectItem value="svm">Support Vector Machine</SelectItem>
              <SelectItem value="nn">Neural Network</SelectItem>
              <SelectItem value="xgboost">XGBoost</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="test-split">Test split (%)</Label>
            <Input 
              id="test-split" 
              type="number" 
              placeholder="20" 
              min="10" 
              max="50"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="epochs">Epochs</Label>
            <Input 
              id="epochs" 
              type="number" 
              placeholder="100" 
              min="1"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="learning-rate">Learning rate</Label>
          <Input 
            id="learning-rate" 
            type="number" 
            placeholder="0.001" 
            step="0.001"
          />
        </div>

        <div className="space-y-2">
          <Label>Validation method</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="holdout">Hold-out validation</SelectItem>
              <SelectItem value="cv">Cross-validation</SelectItem>
              <SelectItem value="stratified">Stratified K-Fold</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="success" className="w-full" size="lg">
          <Play className="w-5 h-5" />
          Train Model
        </Button>
      </CardContent>
    </Card>
  );
};

export default ModelTraining;
