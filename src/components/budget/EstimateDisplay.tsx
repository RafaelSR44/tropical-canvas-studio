import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calculator, TrendingUp, AlertTriangle } from 'lucide-react';
import type { EstimateResult, PrecisionFactors } from '@/types/budget';

interface EstimateDisplayProps {
  estimate: EstimateResult | null;
  precision: PrecisionFactors;
  isCalculating: boolean;
}

export const EstimateDisplay: React.FC<EstimateDisplayProps> = ({
  estimate,
  precision,
  isCalculating
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getPrecisionColor = (precision: number) => {
    if (precision >= 70) return 'text-green-600';
    if (precision >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPrecisionText = (precision: number) => {
    if (precision >= 70) return 'Alta precisão';
    if (precision >= 50) return 'Precisão moderada';
    return 'Baixa precisão';
  };

  return (
    <div className="space-y-4">
      {/* Main Estimate Card */}
      <Card className="border-2 border-primary/20">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-lg">
            <Calculator className="h-5 w-5" />
            Estimativa Inicial
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isCalculating ? (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
              <p className="text-sm text-muted-foreground">Calculando...</p>
            </div>
          ) : estimate ? (
            <>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
                  {formatCurrency(estimate.minValue)} - {formatCurrency(estimate.maxValue)}
                </div>
                <p className="text-sm text-muted-foreground">
                  Valor base: {formatCurrency(estimate.baseValue)}
                </p>
                {estimate.area && (
                  <p className="text-xs text-muted-foreground">
                    Área: {estimate.area}m² • R$ 200,00/m²
                  </p>
                )}
              </div>

              <Separator />

              {/* Precision Indicator */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Precisão</span>
                  <Badge 
                    variant="outline" 
                    className={getPrecisionColor(precision.total)}
                  >
                    {precision.total}%
                  </Badge>
                </div>
                <Progress 
                  value={precision.total} 
                  className="h-2"
                />
                <p className="text-xs text-muted-foreground">
                  {getPrecisionText(precision.total)}
                </p>
              </div>

              <Separator />

              {/* Factors Breakdown */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Fatores Aplicados
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex justify-between">
                    <span>Distância:</span>
                    <span className={estimate.factors.distance > 1 ? 'text-orange-600' : 'text-green-600'}>
                      {estimate.factors.distance > 1 ? '+' : ''}{((estimate.factors.distance - 1) * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Superfície:</span>
                    <span className={estimate.factors.surface > 1 ? 'text-orange-600' : 'text-green-600'}>
                      {estimate.factors.surface > 1 ? '+' : ''}{((estimate.factors.surface - 1) * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Complexidade:</span>
                    <span className={estimate.factors.complexity > 1 ? 'text-orange-600' : 'text-green-600'}>
                      {estimate.factors.complexity > 1 ? '+' : estimate.factors.complexity < 1 ? '' : ''}{((estimate.factors.complexity - 1) * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Série Arte:</span>
                    <span className={estimate.factors.artSeries > 1 ? 'text-orange-600' : 'text-green-600'}>
                      {estimate.factors.artSeries > 1 ? '+' : estimate.factors.artSeries < 1 ? '' : ''}{((estimate.factors.artSeries - 1) * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              <Calculator className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Preencha os dados para ver a estimativa</p>
            </div>
          )}

          {/* Important Notice */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-yellow-800 dark:text-yellow-200">
                <p className="font-medium mb-1">⚠️ Esta é uma ESTIMATIVA inicial</p>
                <p>O valor final pode variar após análise técnica presencial.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Precision Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Como melhorar a precisão</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span>Dados básicos</span>
              <span className={precision.baseFields > 0 ? 'text-green-600' : 'text-gray-400'}>
                +{precision.baseFields}%
              </span>
            </div>
            <div className="flex justify-between">
              <span>Tamanho da superfície</span>
              <span className={precision.surfaceSize > 0 ? 'text-green-600' : 'text-gray-400'}>
                +{precision.surfaceSize}%
              </span>
            </div>
            <div className="flex justify-between">
              <span>Série de arte</span>
              <span className={precision.artSeries > 0 ? 'text-green-600' : 'text-gray-400'}>
                +{precision.artSeries}%
              </span>
            </div>
            <div className="flex justify-between">
              <span>Fotos da superfície</span>
              <span className={precision.photos > 0 ? 'text-green-600' : 'text-gray-400'}>
                +{precision.photos}%
              </span>
            </div>
            <div className="flex justify-between">
              <span>Complexidade</span>
              <span className={precision.complexity > 0 ? 'text-green-600' : 'text-gray-400'}>
                +{precision.complexity}%
              </span>
            </div>
            <div className="flex justify-between">
              <span>Prazo</span>
              <span className={precision.deadline > 0 ? 'text-green-600' : 'text-gray-400'}>
                +{precision.deadline}%
              </span>
            </div>
            <div className="flex justify-between">
              <span>Observações</span>
              <span className={precision.notes > 0 ? 'text-green-600' : 'text-gray-400'}>
                +{precision.notes}%
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};