import { useState } from 'react';
import axios from 'axios';

interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: boolean;
}

export const useViaCep = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAddress = async (cep: string): Promise<ViaCepResponse | null> => {
    if (!cep || cep.length !== 8) {
      setError('CEP deve ter 8 dígitos');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get<ViaCepResponse>(
        `https://viacep.com.br/ws/${cep}/json/`
      );

      if (response.data.erro) {
        setError('CEP não encontrado');
        return null;
      }

      return response.data;
    } catch (err) {
      setError('Erro ao buscar CEP. Verifique sua conexão.');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fetchAddress,
    isLoading,
    error
  };
};