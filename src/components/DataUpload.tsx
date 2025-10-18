import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileSpreadsheet, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DataUploadProps {
  onDataLoaded: (data: { headers: string[]; data: Record<string, any>[] }) => void;
}

const DataUpload = ({ onDataLoaded }: DataUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const processFile = async (fileToProcess: File) => {
    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append('file', fileToProcess);

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/process-csv`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) throw new Error('Error al procesar el archivo');

      const result = await response.json();
      onDataLoaded(result);
      
      toast({
        title: "Archivo procesado",
        description: `${result.rowCount} filas cargadas exitosamente`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo procesar el archivo",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.name.endsWith('.csv')) {
      setFile(droppedFile);
      processFile(droppedFile);
    } else {
      toast({
        title: "Archivo inválido",
        description: "Por favor sube un archivo CSV",
        variant: "destructive",
      });
    }
  }, [toast]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      processFile(selectedFile);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Sube Tu Dataset
        </CardTitle>
        <CardDescription>
          Sube archivos CSV o Excel para comenzar tu análisis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={`border-2 border-dashed rounded-lg p-12 text-center transition-all duration-300 ${
            isDragging 
              ? 'border-primary bg-primary/5' 
              : 'border-border hover:border-primary/50 hover:bg-accent/5'
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          {file ? (
            <div className="flex items-center justify-center gap-4">
              <FileSpreadsheet className="w-12 h-12 text-success" />
              <div className="text-left">
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setFile(null)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <>
              <Upload className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg font-medium mb-2">
                Arrastra y suelta tu archivo aquí
              </p>
              <p className="text-muted-foreground mb-6">
                o haz clic para buscar
              </p>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileInput}
                className="hidden"
                id="file-upload"
                disabled={isProcessing}
              />
              <label htmlFor="file-upload">
                <Button variant="gradient" size="lg" asChild disabled={isProcessing}>
                  <span>{isProcessing ? 'Procesando...' : 'Elegir Archivo'}</span>
                </Button>
              </label>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DataUpload;
