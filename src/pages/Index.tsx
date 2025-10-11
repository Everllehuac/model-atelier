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
              Complete ML Workflow
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need from data upload to model deployment
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <FeatureCard
              icon={Upload}
              image={uploadIcon}
              title="Easy Data Upload"
              description="Upload CSV or Excel files with drag-and-drop support. Preview and select columns instantly."
            />
            <FeatureCard
              icon={Sparkles}
              title="Smart Data Cleaning"
              description="Automatically handle missing values, normalize data, and remove duplicates with one click."
            />
            <FeatureCard
              icon={Brain}
              image={trainingIcon}
              title="Model Training"
              description="Choose from 50+ algorithms including neural networks, random forests, and more."
            />
            <FeatureCard
              icon={BarChart3}
              image={resultsIcon}
              title="Visual Analytics"
              description="Real-time training metrics, accuracy plots, and comprehensive performance reports."
            />
            <FeatureCard
              icon={Database}
              title="Database Integration"
              description="Connect to external databases and pull data directly for seamless workflow."
            />
            <FeatureCard
              icon={Zap}
              title="Fast Processing"
              description="Optimized algorithms ensure lightning-fast training even with large datasets."
            />
          </div>
        </div>
      </section>

      {/* Platform Demo Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Try It Now
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Upload your data and start training models in minutes
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
                <h3 className="text-xl font-semibold mb-4">Training Results</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 rounded-lg bg-muted/50">
                    <span className="text-muted-foreground">Accuracy</span>
                    <span className="text-2xl font-bold text-success">94.2%</span>
                  </div>
                  <div className="flex justify-between items-center p-4 rounded-lg bg-muted/50">
                    <span className="text-muted-foreground">Loss</span>
                    <span className="text-2xl font-bold text-primary">0.058</span>
                  </div>
                  <div className="flex justify-between items-center p-4 rounded-lg bg-muted/50">
                    <span className="text-muted-foreground">Training Time</span>
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
              Ready to Build Your Next ML Project?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of data scientists and analysts using our platform
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
