import Hero from "@/components/Hero";
import FeatureCard from "@/components/FeatureCard";
import DataUpload from "@/components/DataUpload";
import DataCleaning from "@/components/DataCleaning";
import ModelTraining from "@/components/ModelTraining";
import { Upload, Sparkles, Brain, BarChart3, Database, Zap } from "lucide-react";
import uploadIcon from "@/assets/upload-icon.jpg";
import trainingIcon from "@/assets/training-icon.jpg";
import resultsIcon from "@/assets/results-icon.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Flujo de Trabajo ML Completo
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Todo lo que necesitas desde la carga de datos hasta el despliegue del modelo
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <FeatureCard
              icon={Upload}
              image={uploadIcon}
              title="Carga de Datos Fácil"
              description="Sube archivos CSV o Excel con soporte de arrastrar y soltar. Vista previa y selección de columnas al instante."
            />
            <FeatureCard
              icon={Sparkles}
              title="Limpieza Inteligente de Datos"
              description="Maneja automáticamente valores faltantes, normaliza datos y elimina duplicados con un clic."
            />
            <FeatureCard
              icon={Brain}
              image={trainingIcon}
              title="Entrenamiento de Modelos"
              description="Elige entre más de 50 algoritmos incluyendo redes neuronales, random forests y más."
            />
            <FeatureCard
              icon={BarChart3}
              image={resultsIcon}
              title="Análisis Visual"
              description="Métricas de entrenamiento en tiempo real, gráficos de precisión e informes de rendimiento completos."
            />
            <FeatureCard
              icon={Database}
              title="Integración con Bases de Datos"
              description="Conecta a bases de datos externas y extrae datos directamente para un flujo de trabajo sin interrupciones."
            />
            <FeatureCard
              icon={Zap}
              title="Procesamiento Rápido"
              description="Algoritmos optimizados aseguran un entrenamiento ultrarrápido incluso con grandes conjuntos de datos."
            />
          </div>
        </div>
      </section>

      {/* Platform Demo Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Pruébalo Ahora
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Sube tus datos y comienza a entrenar modelos en minutos
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            <div className="space-y-8">
              <DataUpload />
              <DataCleaning />
            </div>
            <div className="space-y-8">
              <ModelTraining />
              
              {/* Results Preview Card */}
              <div className="rounded-lg border bg-card p-8">
                <h3 className="text-xl font-semibold mb-4">Resultados del Entrenamiento</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 rounded-lg bg-muted/50">
                    <span className="text-muted-foreground">Precisión</span>
                    <span className="text-2xl font-bold text-success">94.2%</span>
                  </div>
                  <div className="flex justify-between items-center p-4 rounded-lg bg-muted/50">
                    <span className="text-muted-foreground">Pérdida</span>
                    <span className="text-2xl font-bold text-primary">0.058</span>
                  </div>
                  <div className="flex justify-between items-center p-4 rounded-lg bg-muted/50">
                    <span className="text-muted-foreground">Tiempo de Entrenamiento</span>
                    <span className="text-2xl font-bold">2.3s</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              ¿Listo para Construir tu Próximo Proyecto ML?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Únete a miles de científicos de datos y analistas que usan nuestra plataforma
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
