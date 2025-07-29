import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Upload, Image, Lightbulb } from 'lucide-react';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import type { BudgetFormData } from '@/types/budget';
import { PhotoUpload } from '../PhotoUpload';

interface AdvancedDetailsStepProps {
  form: UseFormReturn<BudgetFormData>;
}

const artSeriesData = {
  'GM-001': { title: 'Plantas Básicas', complexity: 'Simples', factor: '1.0x' },
  'GM-002': { title: 'Flores Detalhadas', complexity: 'Média', factor: '1.2x' },
  'GM-003': { title: 'Folhagem Simples', complexity: 'Simples', factor: '0.9x' },
  'GM-004': { title: 'Composição Complexa', complexity: 'Alta', factor: '1.5x' },
  'GM-005': { title: 'Natureza Tropical', complexity: 'Média', factor: '1.1x' },
  'GM-006': { title: 'Jardim Vertical', complexity: 'Alta', factor: '1.3x' },
  'GM-007': { title: 'Minimalista Verde', complexity: 'Simples', factor: '0.95x' },
  'GM-008': { title: 'Floresta Urbana', complexity: 'Alta', factor: '1.4x' },
  'GM-009': { title: 'Botânico Realista', complexity: 'Alta', factor: '1.25x' },
  'GM-010': { title: 'Folhas Abstratas', complexity: 'Média', factor: '1.0x' },
  'GM-011': { title: 'Cactos e Suculentas', complexity: 'Alta', factor: '1.35x' },
  'GM-012': { title: 'Sombras Verdes', complexity: 'Simples', factor: '0.85x' },
  'GM-013': { title: 'Exuberância Tropical', complexity: 'Muito Alta', factor: '1.6x' },
  'GM-014': { title: 'Plantas Geométricas', complexity: 'Média', factor: '1.15x' },
  'GM-015': { title: 'Mural Orgânico', complexity: 'Alta', factor: '1.45x' },
  'GM-016': { title: 'Harmonia Natural', complexity: 'Média', factor: '1.2x' }
};

const styleLabels = {
  'tropical-exuberante': 'Tropical Exuberante',
  'minimalista-verde': 'Minimalista Verde',
  'colorido-vibrante': 'Colorido Vibrante',
  'monocromatico': 'Monocromático',
  'realista-botanico': 'Realista Botânico'
};

const complexityLabels = {
  1: 'Muito Simples',
  2: 'Simples',
  3: 'Simples+',
  4: 'Média-',
  5: 'Média',
  6: 'Média+',
  7: 'Alta-',
  8: 'Alta',
  9: 'Alta+',
  10: 'Hiper-realista'
};

export const AdvancedDetailsStep: React.FC<AdvancedDetailsStepProps> = ({ form }) => {
  const { register, formState: { errors }, setValue, watch } = form;
  
  const selectedArtSeries = watch('artSeries');
  const selectedStyles = watch('preferredStyles') || [];
  const complexity = watch('complexity') || 5;
  const desiredDeadline = watch('desiredDeadline');

  const handleStyleChange = (style: string, checked: boolean) => {
    const currentStyles = selectedStyles;
    if (checked) {
      setValue('preferredStyles', [...currentStyles, style as any]);
    } else {
      setValue('preferredStyles', currentStyles.filter(s => s !== style));
    }
  };

  return (
    <div className="space-y-6">
      <Alert>
        <Lightbulb className="h-4 w-4" />
        <AlertDescription>
          Estes campos são opcionais, mas aumentam significativamente a precisão da estimativa.
        </AlertDescription>
      </Alert>

      {/* Série de Arte */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Image className="h-5 w-5" />
            Série de Arte de Referência
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Selecione uma obra que inspire seu projeto (+10% precisão)
          </p>
        </CardHeader>
        <CardContent>
          <Select 
            onValueChange={(value) => setValue('artSeries', value as any)}
            value={selectedArtSeries}
          >
            <SelectTrigger>
              <SelectValue placeholder="Escolha uma série de arte" />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {Object.entries(artSeriesData).map(([value, data]) => (
                <SelectItem key={value} value={value}>
                  <div className="flex items-center justify-between w-full">
                    <span>{value} - {data.title}</span>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{data.complexity}</span>
                      <span className="font-mono">{data.factor}</span>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {selectedArtSeries && (
            <div className="mt-3 p-3 bg-muted rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{artSeriesData[selectedArtSeries].title}</h4>
                  <p className="text-sm text-muted-foreground">
                    Complexidade: {artSeriesData[selectedArtSeries].complexity}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-mono">Fator: {artSeriesData[selectedArtSeries].factor}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Estilos Preferidos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Estilos Preferidos</CardTitle>
          <p className="text-sm text-muted-foreground">
            Selecione um ou mais estilos (múltipla escolha)
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(styleLabels).map(([value, label]) => (
              <div key={value} className="flex items-center space-x-2">
                <Checkbox
                  id={value}
                  checked={selectedStyles.includes(value as any)}
                  onCheckedChange={(checked) => handleStyleChange(value, checked as boolean)}
                />
                <Label htmlFor={value} className="cursor-pointer">
                  {label}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Complexidade */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Complexidade Desejada</CardTitle>
          <p className="text-sm text-muted-foreground">
            Ajuste o nível de detalhamento (+5% precisão)
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Nível: {complexity}</span>
              <span className="text-sm font-medium">{complexityLabels[complexity as keyof typeof complexityLabels]}</span>
            </div>
            <Slider
              value={[complexity]}
              onValueChange={(value) => setValue('complexity', value[0])}
              max={10}
              min={1}
              step={1}
              className="py-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Simples</span>
              <span>Hiper-realista</span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded text-center">
              <p className="font-medium">1-3: Simples</p>
              <p className="text-muted-foreground">-10% no valor</p>
            </div>
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-center">
              <p className="font-medium">4-6: Média</p>
              <p className="text-muted-foreground">Valor base</p>
            </div>
            <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded text-center">
              <p className="font-medium">7-10: Alta</p>
              <p className="text-muted-foreground">+25% no valor</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prazo Desejado */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Prazo Desejado</CardTitle>
          <p className="text-sm text-muted-foreground">
            Quando gostaria que o projeto fosse concluído? (+3% precisão)
          </p>
        </CardHeader>
        <CardContent>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !desiredDeadline && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {desiredDeadline ? (
                  format(desiredDeadline, "PPP", { locale: pt })
                ) : (
                  <span>Selecione uma data</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={desiredDeadline}
                onSelect={(date) => setValue('desiredDeadline', date)}
                disabled={(date) => date < new Date()}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </CardContent>
      </Card>

      {/* Upload de Fotos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Fotos da Superfície
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Adicione até 5 fotos da superfície a ser pintada (+10% precisão)
          </p>
        </CardHeader>
        <CardContent>
          <PhotoUpload
            onPhotosChange={(photos) => setValue('photos', photos)}
            maxPhotos={5}
            maxSize={2 * 1024 * 1024} // 2MB
          />
        </CardContent>
      </Card>

      {/* Observações Adicionais */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Observações Adicionais</CardTitle>
          <p className="text-sm text-muted-foreground">
            Detalhe suas ideias e preferências (+2% precisão para textos detalhados)
          </p>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Descreva suas ideias, preferências de cores, inspirações, ou qualquer detalhe importante para o projeto..."
            {...register('additionalNotes')}
            className="min-h-24"
            maxLength={1000}
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>Máximo 1000 caracteres</span>
            <span>{watch('additionalNotes')?.length || 0}/1000</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};