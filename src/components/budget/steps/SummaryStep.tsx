import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  User, 
  MapPin, 
  Palette, 
  Ruler, 
  Calendar,
  Image,
  FileText,
  CheckCircle,
  Download,
  Share2
} from 'lucide-react';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import type { BudgetFormData } from '@/types/budget';

interface SummaryStepProps {
  form: UseFormReturn<BudgetFormData>;
}

const surfaceTypeLabels = {
  'parede-externa': 'Parede Externa',
  'parede-interna': 'Parede Interna',
  'muro-cerca': 'Muro/Cerca',
  'fachada-comercial': 'Fachada Comercial',
  'teto-laje': 'Teto/Laje',
  'outros': 'Outros'
};

const styleLabels = {
  'tropical-exuberante': 'Tropical Exuberante',
  'minimalista-verde': 'Minimalista Verde',
  'colorido-vibrante': 'Colorido Vibrante',
  'monocromatico': 'Monocromático',
  'realista-botanico': 'Realista Botânico'
};

const complexityLabels = {
  1: 'Muito Simples', 2: 'Simples', 3: 'Simples+',
  4: 'Média-', 5: 'Média', 6: 'Média+',
  7: 'Alta-', 8: 'Alta', 9: 'Alta+',
  10: 'Hiper-realista'
};

export const SummaryStep: React.FC<SummaryStepProps> = ({ form }) => {
  const formData = form.watch();

  const handleExportPDF = () => {
    console.log('Exportar PDF da estimativa');
    // Implementar exportação de PDF
  };

  const handleShareWhatsApp = () => {
    const message = `Olá! Gostaria de solicitar um orçamento para mural artístico.
    
Nome: ${formData.fullName}
Local: ${formData.city}, ${formData.state}
Tipo: ${surfaceTypeLabels[formData.surfaceType as keyof typeof surfaceTypeLabels]}
${formData.surfaceWidth && formData.surfaceHeight ? `Tamanho: ${formData.surfaceWidth}x${formData.surfaceHeight}m` : ''}

Aguardo contato!`;
    
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="space-y-6">
      <Alert>
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>
          Revise todas as informações antes de enviar sua solicitação de orçamento.
        </AlertDescription>
      </Alert>

      {/* Dados Pessoais */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <User className="h-5 w-5" />
            Dados Pessoais
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Nome</p>
              <p className="font-medium">{formData.fullName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{formData.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Telefone</p>
              <p className="font-medium">{formData.phone}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">CEP</p>
              <p className="font-medium">{formData.cep}</p>
            </div>
          </div>
          
          {formData.address && (
            <div className="pt-2">
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                Endereço
              </p>
              <p className="font-medium">{formData.address}, {formData.city} - {formData.state}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detalhes do Projeto */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Detalhes do Projeto
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Tipo de Superfície</p>
            <div className="flex items-center gap-2">
              <p className="font-medium">
                {surfaceTypeLabels[formData.surfaceType as keyof typeof surfaceTypeLabels]}
              </p>
              {formData.customSurfaceType && (
                <Badge variant="outline">{formData.customSurfaceType}</Badge>
              )}
            </div>
          </div>

          {formData.surfaceWidth && formData.surfaceHeight && (
            <div className="flex items-center gap-4">
              <div>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Ruler className="h-3 w-3" />
                  Dimensões
                </p>
                <p className="font-medium">
                  {formData.surfaceWidth}m × {formData.surfaceHeight}m
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Área Total</p>
                <p className="font-medium text-primary">
                  {(formData.surfaceWidth * formData.surfaceHeight).toFixed(2)}m²
                </p>
              </div>
            </div>
          )}

          {formData.artSeries && (
            <div>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Image className="h-3 w-3" />
                Série de Arte
              </p>
              <p className="font-medium">{formData.artSeries}</p>
            </div>
          )}

          {formData.preferredStyles && formData.preferredStyles.length > 0 && (
            <div>
              <p className="text-sm text-muted-foreground">Estilos Preferidos</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {formData.preferredStyles.map((style) => (
                  <Badge key={style} variant="secondary">
                    {styleLabels[style as keyof typeof styleLabels]}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {formData.complexity && (
            <div>
              <p className="text-sm text-muted-foreground">Complexidade</p>
              <div className="flex items-center gap-2">
                <Badge variant="outline">
                  Nível {formData.complexity}
                </Badge>
                <span className="text-sm">
                  {complexityLabels[formData.complexity as keyof typeof complexityLabels]}
                </span>
              </div>
            </div>
          )}

          {formData.desiredDeadline && (
            <div>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Prazo Desejado
              </p>
              <p className="font-medium">
                {format(formData.desiredDeadline, "PPP", { locale: pt })}
              </p>
            </div>
          )}

          {formData.photos && formData.photos.length > 0 && (
            <div>
              <p className="text-sm text-muted-foreground">Fotos Enviadas</p>
              <p className="font-medium">{formData.photos.length} foto(s)</p>
            </div>
          )}

          {formData.additionalNotes && (
            <div>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <FileText className="h-3 w-3" />
                Observações
              </p>
              <div className="bg-muted/50 p-3 rounded-lg mt-1">
                <p className="text-sm">{formData.additionalNotes}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Ações */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Próximos Passos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              onClick={handleExportPDF}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Baixar PDF
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleShareWhatsApp}
              className="flex items-center gap-2"
            >
              <Share2 className="h-4 w-4" />
              Compartilhar via WhatsApp
            </Button>
          </div>

          <Separator />

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
              O que acontece agora?
            </h4>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>• Você receberá um email de confirmação</li>
              <li>• Nossa equipe analisará sua solicitação em até 24h</li>
              <li>• Entraremos em contato para agendar uma visita técnica</li>
              <li>• Após a visita, enviaremos o orçamento final detalhado</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};