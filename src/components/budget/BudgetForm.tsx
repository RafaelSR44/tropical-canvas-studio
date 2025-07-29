import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { PersonalDataStep } from './steps/PersonalDataStep';
import { ProjectDetailsStep } from './steps/ProjectDetailsStep';
import { AdvancedDetailsStep } from './steps/AdvancedDetailsStep';
import { SummaryStep } from './steps/SummaryStep';
import { EstimateDisplay } from './EstimateDisplay';
import { useBudgetCalculation } from '@/hooks/useBudgetCalculation';
import { budgetSchema, type BudgetFormData } from '@/types/budget';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const steps = [
  { id: 1, title: 'Dados Pessoais', component: PersonalDataStep },
  { id: 2, title: 'Detalhes do Projeto', component: ProjectDetailsStep },
  { id: 3, title: 'Detalhes Avançados', component: AdvancedDetailsStep },
  { id: 4, title: 'Resumo', component: SummaryStep }
];

export const BudgetForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<BudgetFormData>>({});

  const form = useForm<BudgetFormData>({
    resolver: zodResolver(budgetSchema),
    defaultValues: formData,
    mode: 'onChange'
  });

  const { estimate, precision, isCalculating } = useBudgetCalculation(form.watch());

  const progress = (currentStep / steps.length) * 100;
  const CurrentStepComponent = steps.find(step => step.id === currentStep)?.component;

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: BudgetFormData) => {
    console.log('Budget form submitted:', data);
    // Aqui seria enviado para o backend ou API
  };

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progresso</span>
              <span className="font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              {steps.map((step) => (
                <span
                  key={step.id}
                  className={`${
                    currentStep >= step.id ? 'text-primary font-medium' : ''
                  }`}
                >
                  {step.title}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">
                {steps.find(step => step.id === currentStep)?.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {CurrentStepComponent && (
                <CurrentStepComponent form={form} />
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Anterior
                </Button>

                {currentStep < steps.length ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center gap-2"
                  >
                    Próximo
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    onClick={form.handleSubmit(onSubmit)}
                    className="flex items-center gap-2"
                  >
                    Solicitar Orçamento
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Estimate Display */}
        <div className="lg:col-span-1">
          <EstimateDisplay
            estimate={estimate}
            precision={precision}
            isCalculating={isCalculating}
          />
        </div>
      </div>
    </div>
  );
};