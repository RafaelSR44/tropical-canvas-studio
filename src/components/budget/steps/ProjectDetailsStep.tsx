import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Paintbrush } from 'lucide-react';
import type { BudgetFormData } from '@/types/budget';

interface ProjectDetailsStepProps {
  form: UseFormReturn<BudgetFormData>;
}

const surfaceTypeLabels = {
  'parede-externa': 'Parede Externa (+10%)',
  'parede-interna': 'Parede Interna',
  'muro-cerca': 'Muro/Cerca (+5%)',
  'fachada-comercial': 'Fachada Comercial (+20%)',
  'teto-laje': 'Teto/Laje (+30%)',
  'outros': 'Outros'
};

export const ProjectDetailsStep: React.FC<ProjectDetailsStepProps> = ({ form }) => {
  const { register, formState: { errors }, setValue, watch } = form;
  
  const selectedSurfaceType = watch('surfaceType');

  return (
    <div className="space-y-6">
      <Alert>
        <Paintbrush className="h-4 w-4" />
        <AlertDescription>
          Informe detalhes sobre o projeto para uma estimativa mais precisa.
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        {/* Tipo de Superfície */}
        <div className="space-y-2">
          <Label htmlFor="surfaceType">Tipo de Superfície *</Label>
          <Select 
            onValueChange={(value) => setValue('surfaceType', value as any)}
            value={selectedSurfaceType}
          >
            <SelectTrigger className={errors.surfaceType ? 'border-red-500' : ''}>
              <SelectValue placeholder="Selecione o tipo de superfície" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(surfaceTypeLabels).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.surfaceType && (
            <p className="text-sm text-red-500">{errors.surfaceType.message}</p>
          )}
          
          <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
            <p><strong>Dica:</strong> Cada tipo de superfície tem características específicas:</p>
            <ul className="mt-1 space-y-1">
              <li>• <strong>Parede Externa:</strong> Requer tinta especial para intempéries</li>
              <li>• <strong>Fachada Comercial:</strong> Maior durabilidade e resistência</li>
              <li>• <strong>Teto/Laje:</strong> Maior dificuldade de execução</li>
            </ul>
          </div>
        </div>

        {/* Campo personalizado para "Outros" */}
        {selectedSurfaceType === 'outros' && (
          <div className="space-y-2">
            <Label htmlFor="customSurfaceType">Especifique o tipo de superfície</Label>
            <Input
              id="customSurfaceType"
              placeholder="Descreva o tipo de superfície"
              {...register('customSurfaceType')}
            />
          </div>
        )}

        {/* Dimensões da Superfície */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Tamanho da Superfície (Opcional)</Label>
          <p className="text-sm text-muted-foreground">
            Informe as dimensões para uma estimativa mais precisa (+15% precisão)
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="surfaceWidth">Largura (metros)</Label>
              <Input
                id="surfaceWidth"
                type="number"
                step="0.1"
                min="0"
                placeholder="Ex: 3.5"
                {...register('surfaceWidth', { valueAsNumber: true })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="surfaceHeight">Altura (metros)</Label>
              <Input
                id="surfaceHeight"
                type="number"
                step="0.1"
                min="0"
                placeholder="Ex: 2.8"
                {...register('surfaceHeight', { valueAsNumber: true })}
              />
            </div>
          </div>

          {watch('surfaceWidth') && watch('surfaceHeight') && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
              <p className="text-sm text-green-800 dark:text-green-200">
                <strong>Área calculada:</strong> {(watch('surfaceWidth') * watch('surfaceHeight')).toFixed(2)}m²
                <br />
                <strong>Valor base:</strong> R$ {((watch('surfaceWidth') * watch('surfaceHeight')) * 200).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};