import { z } from 'zod';

export const surfaceTypes = [
  'parede-externa',
  'parede-interna',
  'muro-cerca',
  'fachada-comercial',
  'teto-laje',
  'outros'
] as const;

export const artSeries = [
  'GM-001',
  'GM-002',
  'GM-003',
  'GM-004',
  'GM-005',
  'GM-006',
  'GM-007',
  'GM-008',
  'GM-009',
  'GM-010',
  'GM-011',
  'GM-012',
  'GM-013',
  'GM-014',
  'GM-015',
  'GM-016'
] as const;

export const styles = [
  'tropical-exuberante',
  'minimalista-verde',
  'colorido-vibrante',
  'monocromatico',
  'realista-botanico'
] as const;

export const budgetSchema = z.object({
  // Dados Pessoais (obrigatórios)
  fullName: z.string()
    .min(5, 'Nome deve ter pelo menos 5 caracteres')
    .refine((val) => val.trim().split(' ').length >= 2, 'Informe nome completo'),
  email: z.string().email('Email inválido'),
  phone: z.string()
    .min(10, 'Telefone deve ter pelo menos 10 dígitos')
    .regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, 'Formato de telefone inválido'),
  cep: z.string()
    .length(9, 'CEP deve ter 8 dígitos')
    .regex(/^\d{5}-\d{3}$/, 'Formato de CEP inválido'),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  
  // Detalhes do Projeto (obrigatórios)
  surfaceType: z.enum(surfaceTypes),
  customSurfaceType: z.string().optional(),
  
  // Detalhes Avançados (opcionais)
  surfaceWidth: z.number().positive().optional(),
  surfaceHeight: z.number().positive().optional(),
  artSeries: z.enum(artSeries).optional(),
  preferredStyles: z.array(z.enum(styles)).optional(),
  complexity: z.number().min(1).max(10).optional(),
  desiredDeadline: z.date().optional(),
  photos: z.array(z.string()).optional(),
  additionalNotes: z.string().max(1000).optional()
});

export type BudgetFormData = z.infer<typeof budgetSchema>;

export interface EstimateResult {
  baseValue: number;
  finalValue: number;
  minValue: number;
  maxValue: number;
  factors: {
    distance: number;
    complexity: number;
    artSeries: number;
    surface: number;
  };
  area?: number;
}

export interface PrecisionFactors {
  baseFields: number;
  surfaceSize: number;
  artSeries: number;
  photos: number;
  complexity: number;
  deadline: number;
  notes: number;
  total: number;
}