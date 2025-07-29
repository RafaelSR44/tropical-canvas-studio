import { useMemo, useState, useEffect } from 'react';
import type { BudgetFormData, EstimateResult, PrecisionFactors } from '@/types/budget';

const BASE_VALUE_PER_SQUARE_METER = 200;
const BASE_CEP = '01310-100'; // São Paulo, SP

// Fatores de multiplicação por série de arte
const ART_SERIES_FACTORS: Record<string, number> = {
  'GM-001': 1.0,   // Plantas básicas
  'GM-002': 1.2,   // Flores detalhadas
  'GM-003': 0.9,   // Folhagem simples
  'GM-004': 1.5,   // Composição complexa
  'GM-005': 1.1,
  'GM-006': 1.3,
  'GM-007': 0.95,
  'GM-008': 1.4,
  'GM-009': 1.25,
  'GM-010': 1.0,
  'GM-011': 1.35,
  'GM-012': 0.85,
  'GM-013': 1.6,
  'GM-014': 1.15,
  'GM-015': 1.45,
  'GM-016': 1.2
};

// Fatores de multiplicação por tipo de superfície
const SURFACE_TYPE_FACTORS: Record<string, number> = {
  'parede-externa': 1.1,     // +10% (intempéries)
  'parede-interna': 1.0,     // base
  'muro-cerca': 1.05,        // +5%
  'fachada-comercial': 1.2,  // +20% (durabilidade)
  'teto-laje': 1.3,          // +30% (dificuldade)
  'outros': 1.0              // base
};

export const useBudgetCalculation = (formData: Partial<BudgetFormData>) => {
  const [isCalculating, setIsCalculating] = useState(false);
  const [distanceFactor, setDistanceFactor] = useState(1.0);

  // Simula cálculo de distância via CEP
  useEffect(() => {
    if (formData.cep) {
      setIsCalculating(true);
      const timer = setTimeout(() => {
        // Simulação simples de cálculo de distância
        const cepNumber = parseInt(formData.cep.replace(/\D/g, ''));
        const baseCepNumber = parseInt(BASE_CEP.replace(/\D/g, ''));
        const distance = Math.abs(cepNumber - baseCepNumber) / 1000; // Aproximação bem simples
        
        let factor = 1.0;
        if (distance > 500) factor = 1.6;      // +60%
        else if (distance > 200) factor = 1.4; // +40%
        else if (distance > 100) factor = 1.25; // +25%
        else if (distance > 50) factor = 1.15;  // +15%
        
        setDistanceFactor(factor);
        setIsCalculating(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [formData.cep]);

  const estimate = useMemo((): EstimateResult | null => {
    // Precisa pelo menos do tipo de superfície para calcular
    if (!formData.surfaceType) return null;

    // Calcula área (se informada) ou usa área padrão
    const area = formData.surfaceWidth && formData.surfaceHeight 
      ? formData.surfaceWidth * formData.surfaceHeight 
      : 6; // área padrão para estimativa

    const baseValue = area * BASE_VALUE_PER_SQUARE_METER;

    // Fatores de multiplicação
    const factors = {
      distance: distanceFactor,
      complexity: formData.complexity 
        ? formData.complexity <= 3 ? 0.9 
          : formData.complexity >= 7 ? 1.25 
          : 1.0
        : 1.0,
      artSeries: formData.artSeries 
        ? ART_SERIES_FACTORS[formData.artSeries] || 1.0 
        : 1.0,
      surface: SURFACE_TYPE_FACTORS[formData.surfaceType] || 1.0
    };

    const finalValue = baseValue * factors.distance * factors.complexity * factors.artSeries * factors.surface;
    
    // Margem de ±15% para min/max
    const minValue = finalValue * 0.85;
    const maxValue = finalValue * 1.15;

    return {
      baseValue,
      finalValue,
      minValue,
      maxValue,
      factors,
      area: formData.surfaceWidth && formData.surfaceHeight ? area : undefined
    };
  }, [formData, distanceFactor]);

  const precision = useMemo((): PrecisionFactors => {
    let total = 0;
    
    // Campos obrigatórios preenchidos (40%)
    const baseFields = (formData.fullName && formData.email && formData.phone && formData.cep && formData.surfaceType) ? 40 : 0;
    total += baseFields;

    // Tamanho da superfície (15%)
    const surfaceSize = (formData.surfaceWidth && formData.surfaceHeight) ? 15 : 0;
    total += surfaceSize;

    // Série de arte (10%)
    const artSeries = formData.artSeries ? 10 : 0;
    total += artSeries;

    // Fotos (10%)
    const photos = (formData.photos && formData.photos.length > 0) ? 10 : 0;
    total += photos;

    // Complexidade (5%)
    const complexity = formData.complexity ? 5 : 0;
    total += complexity;

    // Prazo (3%)
    const deadline = formData.desiredDeadline ? 3 : 0;
    total += deadline;

    // Observações detalhadas (2%)
    const notes = (formData.additionalNotes && formData.additionalNotes.length > 20) ? 2 : 0;
    total += notes;

    // Máximo de 85% (não 100% pois sempre há variáveis não consideradas)
    total = Math.min(total, 85);

    return {
      baseFields,
      surfaceSize,
      artSeries,
      photos,
      complexity,
      deadline,
      notes,
      total
    };
  }, [formData]);

  return {
    estimate,
    precision,
    isCalculating
  };
};