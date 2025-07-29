import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Upload, X, Image, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PhotoUploadProps {
  onPhotosChange: (photos: string[]) => void;
  maxPhotos?: number;
  maxSize?: number; // em bytes
}

interface UploadedPhoto {
  id: string;
  url: string;
  name: string;
  size: number;
}

export const PhotoUpload: React.FC<PhotoUploadProps> = ({
  onPhotosChange,
  maxPhotos = 5,
  maxSize = 2 * 1024 * 1024 // 2MB
}) => {
  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setError(null);
    
    // Verificar se não excede o número máximo
    if (photos.length + acceptedFiles.length > maxPhotos) {
      setError(`Máximo de ${maxPhotos} fotos permitidas`);
      return;
    }

    // Verificar tamanho dos arquivos
    const oversizedFiles = acceptedFiles.filter(file => file.size > maxSize);
    if (oversizedFiles.length > 0) {
      setError(`Alguns arquivos excedem o limite de ${(maxSize / 1024 / 1024).toFixed(1)}MB`);
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const newPhotos: UploadedPhoto[] = [];
      
      for (let i = 0; i < acceptedFiles.length; i++) {
        const file = acceptedFiles[i];
        
        // Simular upload (na implementação real, enviaria para servidor)
        const reader = new FileReader();
        
        const photoPromise = new Promise<UploadedPhoto>((resolve) => {
          reader.onload = (e) => {
            const url = e.target?.result as string;
            resolve({
              id: Date.now().toString() + i,
              url,
              name: file.name,
              size: file.size
            });
          };
        });

        reader.readAsDataURL(file);
        const photo = await photoPromise;
        newPhotos.push(photo);
        
        // Atualizar progresso
        setUploadProgress(((i + 1) / acceptedFiles.length) * 100);
        
        // Simular delay de upload
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      const updatedPhotos = [...photos, ...newPhotos];
      setPhotos(updatedPhotos);
      onPhotosChange(updatedPhotos.map(p => p.url));
      
    } catch (err) {
      setError('Erro ao fazer upload das fotos');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  }, [photos, maxPhotos, maxSize, onPhotosChange]);

  const removePhoto = (photoId: string) => {
    const updatedPhotos = photos.filter(p => p.id !== photoId);
    setPhotos(updatedPhotos);
    onPhotosChange(updatedPhotos.map(p => p.url));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: maxPhotos - photos.length,
    disabled: isUploading || photos.length >= maxPhotos
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      {photos.length < maxPhotos && (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
            isDragActive 
              ? "border-primary bg-primary/5" 
              : "border-border hover:border-primary/50",
            isUploading && "pointer-events-none opacity-50"
          )}
        >
          <input {...getInputProps()} />
          <div className="space-y-2">
            <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
            {isDragActive ? (
              <p className="text-primary font-medium">Solte as fotos aqui...</p>
            ) : (
              <>
                <p className="font-medium">Clique ou arraste fotos aqui</p>
                <p className="text-sm text-muted-foreground">
                  Máximo {maxPhotos} fotos • Até {(maxSize / 1024 / 1024).toFixed(1)}MB cada
                </p>
                <p className="text-xs text-muted-foreground">
                  Formatos: JPEG, PNG, WebP
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Upload Progress */}
      {isUploading && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Fazendo upload...</span>
            <span>{Math.round(uploadProgress)}%</span>
          </div>
          <Progress value={uploadProgress} />
        </div>
      )}

      {/* Error Message */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Photos Grid */}
      {photos.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Fotos Adicionadas ({photos.length}/{maxPhotos})</h4>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {photos.map((photo) => (
              <div key={photo.id} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                  <img
                    src={photo.url}
                    alt={photo.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Remove Button */}
                <Button
                  size="sm"
                  variant="destructive"
                  className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removePhoto(photo.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
                
                {/* Photo Info */}
                <div className="mt-1 space-y-1">
                  <p className="text-xs font-medium truncate">{photo.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(photo.size)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info Alert */}
      {photos.length === 0 && (
        <Alert>
          <Image className="h-4 w-4" />
          <AlertDescription>
            Fotos da superfície ajudam nossa equipe a preparar um orçamento mais preciso. 
            Inclua diferentes ângulos e detalhes importantes.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};