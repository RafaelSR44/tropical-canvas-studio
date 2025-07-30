// src/pages/Index.tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Palette, Calculator, Image, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header/Navigation */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <img src="logo.png" alt="Logo" className="h-100" />
            <nav className="hidden md:flex space-x-6">
              <Link to="/" className="text-muted-foreground hover:text-primary">HOME</Link>
              <Link to="/murais" className="text-muted-foreground hover:text-primary">MURAIS</Link>
              <Link to="/orcamento" className="text-muted-foreground hover:text-primary">ORÇAMENTOS</Link>
              <Link to="/sobre" className="text-muted-foreground hover:text-primary">SOBRE</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-green-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-primary mb-6">
            Transformando Espaços com Arte Tropical
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Murais personalizados que trazem a natureza para seu ambiente. 
            Especialista em arte tropical com mais de 100 projetos realizados.
          </p>
          <Link to="/orcamento">
            <Button size="lg" className="text-lg px-8 py-4">
              <Calculator className="mr-2 h-5 w-5" />
              Solicitar Orçamento
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Por que escolher nossos murais?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Palette className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Arte Personalizada</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Cada mural é único, criado especialmente para seu espaço e preferências.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Calculator className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Orçamento Inteligente</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Sistema automatizado que calcula estimativas precisas em tempo real.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Star className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Qualidade Garantida</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Materiais premium e técnicas profissionais para durabilidade máxima.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-6">Pronto para transformar seu espaço?</h3>
          <p className="text-xl mb-8 opacity-90">
            Receba uma estimativa personalizada em menos de 5 minutos
          </p>
          <Link to="/orcamento">
            <Button variant="secondary" size="lg" className="text-lg px-8 py-4">
              Começar Agora
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4 text-center">
          <h4 className="text-2xl font-bold mb-4">GUI MANCINI</h4>
          <p className="text-muted-foreground mb-4">Arte Tropical • Murais Personalizados</p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-muted-foreground hover:text-primary">Instagram</a>
            <a href="#" className="text-muted-foreground hover:text-primary">WhatsApp</a>
            <a href="#" className="text-muted-foreground hover:text-primary">Email</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;