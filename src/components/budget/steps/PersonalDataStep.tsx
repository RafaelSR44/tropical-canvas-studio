import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { MapPin, Loader2 } from 'lucide-react';
import type { BudgetFormData } from '@/types/budget';
import { useViaCep } from '@/hooks/useViaCep';

interface PersonalDataStepProps {
  form: UseFormReturn<BudgetFormData>;
}

export const PersonalDataStep: React.FC<PersonalDataStepProps> = ({ form }) => {
  const { register, formState: { errors }, setValue, watch } = form;
  const [isLoadingCep, setIsLoadingCep] = useState(false);
  const { fetchAddress } = useViaCep();

  const watchedCep = watch('cep');

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
  };

  const formatCep = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{5})(\d{3})/, '$1-$2');
  };

  const handleCepBlur = async () => {
    if (watchedCep && watchedCep.length === 9) {
      setIsLoadingCep(true);
      try {
        const address = await fetchAddress(watchedCep.replace(/\D/g, ''));
        if (address) {
          setValue('address', `${address.logradouro}, ${address.bairro}`);
          setValue('city', address.localidade);
          setValue('state', address.uf);
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
      } finally {
        setIsLoadingCep(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      <Alert>
        <MapPin className="h-4 w-4" />
        <AlertDescription>
          Preencha seus dados pessoais para calcularmos a estimativa com base na sua localização.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Nome Completo */}
        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="fullName">Nome Completo *</Label>
          <Input
            id="fullName"
            placeholder="Digite seu nome completo"
            {...register('fullName')}
            className={errors.fullName ? 'border-red-500' : ''}
          />
          {errors.fullName && (
            <p className="text-sm text-red-500">{errors.fullName.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            {...register('email')}
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Telefone */}
        <div className="space-y-2">
          <Label htmlFor="phone">Telefone *</Label>
          <Input
            id="phone"
            placeholder="(11) 99999-9999"
            {...register('phone')}
            onChange={(e) => {
              const formatted = formatPhone(e.target.value);
              setValue('phone', formatted);
            }}
            maxLength={15}
            className={errors.phone ? 'border-red-500' : ''}
          />
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        {/* CEP */}
        <div className="space-y-2">
          <Label htmlFor="cep">CEP *</Label>
          <div className="relative">
            <Input
              id="cep"
              placeholder="00000-000"
              {...register('cep')}
              onChange={(e) => {
                const formatted = formatCep(e.target.value);
                setValue('cep', formatted);
              }}
              onBlur={handleCepBlur}
              maxLength={9}
              className={errors.cep ? 'border-red-500' : ''}
            />
            {isLoadingCep && (
              <Loader2 className="h-4 w-4 animate-spin absolute right-3 top-3" />
            )}
          </div>
          {errors.cep && (
            <p className="text-sm text-red-500">{errors.cep.message}</p>
          )}
        </div>

        {/* Endereço (auto-preenchido) */}
        <div className="space-y-2">
          <Label htmlFor="address">Endereço</Label>
          <Input
            id="address"
            placeholder="Será preenchido automaticamente"
            {...register('address')}
            readOnly
            className="bg-muted"
          />
        </div>

        {/* Cidade */}
        <div className="space-y-2">
          <Label htmlFor="city">Cidade</Label>
          <Input
            id="city"
            placeholder="Será preenchida automaticamente"
            {...register('city')}
            readOnly
            className="bg-muted"
          />
        </div>

        {/* Estado */}
        <div className="space-y-2">
          <Label htmlFor="state">Estado</Label>
          <Input
            id="state"
            placeholder="UF"
            {...register('state')}
            readOnly
            className="bg-muted"
            maxLength={2}
          />
        </div>
      </div>
    </div>
  );
};