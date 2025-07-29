import React from 'react';
import { BudgetForm } from '@/components/budget/BudgetForm';

const Orcamento = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Sistema de Orçamento Inteligente
            </h1>
            <p className="text-muted-foreground text-lg">
              Calcule automaticamente o valor estimado do seu projeto
            </p>
          </div>
          
          <BudgetForm />
        </div>
      </div>
    </div>
  );
};

export default Orcamento;