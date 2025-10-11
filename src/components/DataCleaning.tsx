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
          Data Cleaning
        </CardTitle>
        <CardDescription>
          Configure data preprocessing operations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="remove-nulls">Remove null values</Label>
            <Switch id="remove-nulls" />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="normalize">Normalize data</Label>
            <Switch id="normalize" />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="remove-duplicates">Remove duplicates</Label>
            <Switch id="remove-duplicates" />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Handle missing values</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mean">Fill with mean</SelectItem>
              <SelectItem value="median">Fill with median</SelectItem>
              <SelectItem value="mode">Fill with mode</SelectItem>
              <SelectItem value="forward">Forward fill</SelectItem>
              <SelectItem value="remove">Remove rows</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Scaling method</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select scaling" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="standard">Standard scaling</SelectItem>
              <SelectItem value="minmax">Min-Max scaling</SelectItem>
              <SelectItem value="robust">Robust scaling</SelectItem>
              <SelectItem value="none">No scaling</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="gradient" className="w-full" size="lg">
          Apply Transformations
        </Button>
      </CardContent>
    </Card>
  );
};

export default DataCleaning;
