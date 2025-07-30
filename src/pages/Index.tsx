import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Palette, Calculator, Image, Star, Phone, Mail, Instagram, MapPin, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header/Navigation - Mobile First */}
      <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            {/* Logo - Mobile Optimized */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-tropical-primary rounded-full flex items-center justify-center">
                <Palette className="h-5 w-5 md:h-6 md:w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-bold text-tropical-primary">GUI MANCINI</h1>
                <p className="text-xs text-tropical-secondary hidden sm:block">Arte Tropical</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8">
              <Link to="/" className="text-tropical-secondary hover:text-tropical-primary font-medium transition-colors">
                HOME
              </Link>
              <Link to="/murais" className="text-tropical-secondary hover:text-tropical-primary font-medium transition-colors">
                MURAIS
              </Link>
              <Link to="/orcamento" className="text-tropical-primary hover:text-tropical-secondary font-medium transition-colors">
                ORÇAMENTO
              </Link>
              <Link to="/sobre" className="text-tropical-secondary hover:text-tropical-primary font-medium transition-colors">
                SOBRE
              </Link>
            </nav>

            {/* Mobile/Tablet CTA Button */}
            <div className="flex items-center space-x-2">
              <a href="tel:+5511999999999" className="lg:hidden">
                <Button size="sm" variant="outline" className="border-tropical-primary text-tropical-primary hover:bg-tropical-primary hover:text-white p-2">
                  <Phone className="h-4 w-4" />
                </Button>
              </a>
              <Link to="/orcamento">
                <Button size="sm" className="bg-tropical-primary hover:bg-tropical-secondary text-xs md:text-sm px-3 md:px-4">
                  <span className="hidden sm:inline">Orçamento</span>
                  <Calculator className="h-4 w-4 sm:hidden" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Navigation Menu - Simple */}
          <div className="lg:hidden mt-3 pt-3 border-t border-tropical-primary/20">
            <nav className="flex justify-center space-x-6 text-sm">
              <Link to="/" className="text-tropical-secondary hover:text-tropical-primary font-medium transition-colors">
                HOME
              </Link>
              <Link to="/murais" className="text-tropical-secondary hover:text-tropical-primary font-medium transition-colors">
                MURAIS
              </Link>
              <Link to="/sobre" className="text-tropical-secondary hover:text-tropical-primary font-medium transition-colors">
                SOBRE
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section com Background Image - Mobile First */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="scrape/fundohome2.jpeg"
            alt="Artista criando mural tropical"
            className="w-full h-full object-cover object-center md:object-right"
          />
          {/* Mobile Overlay - mais escuro para legibilidade */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
          {/* Overlay com cores tropicais */}
          <div className="absolute inset-0 bg-gradient-to-b from-tropical-primary/40 via-transparent to-tropical-accent/30 md:bg-gradient-to-br md:from-tropical-primary/30 md:via-transparent md:to-tropical-accent/20"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-10rem)]">

            {/* Main Content - Mobile First */}
            <div className="text-center md:text-left lg:pl-8 order-1">
              <Badge className="inline-flex mb-4 md:mb-6 bg-white/20 backdrop-blur-sm text-white border-white/30 text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2">
                ✨ Especialista em Murais Tropicais
              </Badge>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight">
                <span className="block">Transforme Seu</span>
                <span className="text-tropical-accent block">Espaço</span>
                <span className="text-tropical-light block">
                  com Arte
                </span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-6 md:mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed">
                Murais tropicais personalizados que trazem vida e natureza para seu ambiente.
              </p>

              <p className="text-tropical-light font-semibold text-lg md:text-xl mb-6 md:mb-8">
                Orçamento inteligente em 5 minutos!
              </p>

              {/* Buttons - Mobile Optimized */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-8 md:mb-12">
                <Link to="/orcamento" className="w-full sm:w-auto">
                  <Button size="lg" className="bg-tropical-accent hover:bg-tropical-accent/90 text-white text-base md:text-lg px-6 md:px-8 py-3 md:py-4 h-12 md:h-16 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 w-full font-semibold">
                    <Calculator className="mr-2 md:mr-3 h-5 md:h-6 w-5 md:w-6" />
                    Calcular Meu Orçamento
                    <ArrowRight className="ml-2 md:ml-3 h-5 md:h-6 w-5 md:w-6" />
                  </Button>
                </Link>
                <Link to="/murais" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="border-white text-black hover:bg-white hover:text-tropical-primary text-base md:text-lg px-6 md:px-8 py-3 md:py-4 h-12 md:h-16 transition-all duration-300 w-full sm:w-auto">
                    <Image className="mr-2 md:mr-3 h-5 md:h-6 w-5 md:w-6" />
                    Ver Portfólio
                  </Button>
                </Link>
              </div>

              {/* Stats - Mobile Optimized */}
              <div className="grid grid-cols-3 gap-3 md:gap-6 max-w-xs md:max-w-lg mx-auto md:mx-0">
                <div className="text-center md:text-left">
                  <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-tropical-light mb-1">100+</div>
                  <div className="text-xs md:text-sm text-white/80">Projetos</div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-tropical-light mb-1">5min</div>
                  <div className="text-xs md:text-sm text-white/80">Orçamento</div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-tropical-light mb-1">85%</div>
                  <div className="text-xs md:text-sm text-white/80">Precisão</div>
                </div>
              </div>
            </div>

            {/* Right Side - Desktop Only Visual Element */}
            <div className="hidden lg:flex items-center justify-center order-2">
              <div className="relative">
                {/* Decorative elements */}
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-tropical-light/20 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-tropical-accent/30 rounded-full blur-lg animate-pulse delay-1000"></div>

                {/* Main content box */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 xl:p-8 border border-white/20 shadow-2xl">
                  <div className="text-center">
                    <Palette className="h-12 xl:h-16 w-12 xl:w-16 text-tropical-light mx-auto mb-4" />
                    <h3 className="text-xl xl:text-2xl font-bold text-white mb-4">Sistema Inteligente</h3>
                    <p className="text-white/80 mb-6 text-sm xl:text-base">
                      Calcule o valor do seu mural com precisão baseado em:
                    </p>
                    <div className="space-y-3 text-left">
                      <div className="flex items-center text-white/90 text-sm xl:text-base">
                        <CheckCircle className="h-4 xl:h-5 w-4 xl:w-5 text-tropical-light mr-3 flex-shrink-0" />
                        <span>Área e dimensões</span>
                      </div>
                      <div className="flex items-center text-white/90 text-sm xl:text-base">
                        <CheckCircle className="h-4 xl:h-5 w-4 xl:w-5 text-tropical-light mr-3 flex-shrink-0" />
                        <span>Distância e localização</span>
                      </div>
                      <div className="flex items-center text-white/90 text-sm xl:text-base">
                        <CheckCircle className="h-4 xl:h-5 w-4 xl:w-5 text-tropical-light mr-3 flex-shrink-0" />
                        <span>Complexidade da arte</span>
                      </div>
                      <div className="flex items-center text-white/90 text-sm xl:text-base">
                        <CheckCircle className="h-4 xl:h-5 w-4 xl:w-5 text-tropical-light mr-3 flex-shrink-0" />
                        <span>Tipo de superfície</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Info Card - Visible only on mobile/tablet */}
            <div className="block lg:hidden order-3 mt-6">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 md:p-6 border border-white/20 shadow-xl max-w-sm mx-auto">
                <div className="text-center">
                  <Palette className="h-10 md:h-12 w-10 md:w-12 text-tropical-light mx-auto mb-3" />
                  <h3 className="text-lg md:text-xl font-bold text-white mb-3">Sistema Inteligente</h3>
                  <div className="grid grid-cols-2 gap-2 text-xs md:text-sm">
                    <div className="flex items-center text-white/90">
                      <CheckCircle className="h-3 md:h-4 w-3 md:w-4 text-tropical-light mr-2" />
                      <span>Área precisa</span>
                    </div>
                    <div className="flex items-center text-white/90">
                      <CheckCircle className="h-3 md:h-4 w-3 md:w-4 text-tropical-light mr-2" />
                      <span>Localização</span>
                    </div>
                    <div className="flex items-center text-white/90">
                      <CheckCircle className="h-3 md:h-4 w-3 md:w-4 text-tropical-light mr-2" />
                      <span>Complexidade</span>
                    </div>
                    <div className="flex items-center text-white/90">
                      <CheckCircle className="h-3 md:h-4 w-3 md:w-4 text-tropical-light mr-2" />
                      <span>Superfície</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator - Hidden on mobile */}
        <div className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section - Mobile First */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-tropical-primary mb-2 md:mb-4">
              Por que escolher nossos murais?
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-tropical-secondary max-w-2xl mx-auto">
              Mais de 5 anos criando obras únicas com tecnologia e arte
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <Card className="border-tropical-light/50 hover:border-tropical-primary/30 transition-all duration-300 hover:shadow-lg group">
              <CardHeader className="text-center p-4 md:p-6">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-tropical-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:bg-tropical-primary/20 transition-colors">
                  <Palette className="h-6 w-6 md:h-8 md:w-8 text-tropical-primary" />
                </div>
                <CardTitle className="text-tropical-primary text-lg md:text-xl">Arte 100% Personalizada</CardTitle>
              </CardHeader>
              <CardContent className="text-center p-4 md:p-6 pt-0">
                <p className="text-tropical-secondary text-sm md:text-base">
                  Cada mural é único, criado especialmente para seu espaço, estilo e preferências pessoais.
                </p>
                <div className="mt-3 md:mt-4 flex justify-center">
                  <CheckCircle className="h-4 md:h-5 w-4 md:w-5 text-tropical-accent mr-2" />
                  <span className="text-xs md:text-sm text-tropical-primary font-medium">16 Séries Disponíveis</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-tropical-light/50 hover:border-tropical-primary/30 transition-all duration-300 hover:shadow-lg group">
              <CardHeader className="text-center p-4 md:p-6">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-tropical-accent/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:bg-tropical-accent/20 transition-colors">
                  <Calculator className="h-6 w-6 md:h-8 md:w-8 text-tropical-accent" />
                </div>
                <CardTitle className="text-tropical-primary text-lg md:text-xl">Orçamento Inteligente</CardTitle>
              </CardHeader>
              <CardContent className="text-center p-4 md:p-6 pt-0">
                <p className="text-tropical-secondary text-sm md:text-base">
                  Sistema automatizado que calcula estimativas precisas baseado em área, distância e complexidade.
                </p>
                <div className="mt-3 md:mt-4 flex justify-center">
                  <CheckCircle className="h-4 md:h-5 w-4 md:w-5 text-tropical-accent mr-2" />
                  <span className="text-xs md:text-sm text-tropical-primary font-medium">Até 85% de Precisão</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-tropical-light/50 hover:border-tropical-primary/30 transition-all duration-300 hover:shadow-lg group md:col-span-2 lg:col-span-1">
              <CardHeader className="text-center p-4 md:p-6">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-tropical-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:bg-tropical-secondary/20 transition-colors">
                  <Star className="h-6 w-6 md:h-8 md:w-8 text-tropical-secondary" />
                </div>
                <CardTitle className="text-tropical-primary text-lg md:text-xl">Qualidade Premium</CardTitle>
              </CardHeader>
              <CardContent className="text-center p-4 md:p-6 pt-0">
                <p className="text-tropical-secondary text-sm md:text-base">
                  Materiais de alta qualidade e técnicas profissionais garantem durabilidade e beleza duradoura.
                </p>
                <div className="mt-3 md:mt-4 flex justify-center">
                  <CheckCircle className="h-4 md:h-5 w-4 md:w-5 text-tropical-accent mr-2" />
                  <span className="text-xs md:text-sm text-tropical-primary font-medium">Garantia Inclusa</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section - Mobile First */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-tropical-primary to-tropical-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
            Pronto para transformar seu espaço?
          </h3>
          <p className="text-base md:text-lg lg:text-xl text-white/90 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed">
            Receba uma estimativa personalizada e detalhada em menos de 5 minutos.
            <span className="block sm:inline"> Sistema inteligente que considera todos os fatores do seu projeto.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
            <Link to="/orcamento" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="bg-white text-tropical-primary hover:bg-tropical-cream text-base md:text-lg px-6 md:px-8 py-3 md:py-4 h-12 md:h-14 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full font-semibold">
                <Calculator className="mr-2 md:mr-3 h-5 md:h-6 w-5 md:w-6" />
                Começar Meu Orçamento
              </Button>
            </Link>

            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-tropical-primary text-base md:text-lg px-6 md:px-8 py-3 md:py-4 h-12 md:h-14 transition-all duration-300 w-full sm:w-auto">
              <Image className="mr-2 md:mr-3 h-5 md:h-6 w-5 md:w-6" />
              Ver Portfólio
            </Button>
          </div>
        </div>
      </section>

      {/* Footer - Mobile First */}
      <footer className="bg-tropical-primary py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            {/* Logo Section */}
            <div className="flex items-center justify-center space-x-3 mb-6 md:mb-8">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Palette className="h-6 w-6 md:h-7 md:w-7 text-white" />
              </div>
              <div>
                <h4 className="text-2xl md:text-3xl font-bold">GUI MANCINI</h4>
                <p className="text-tropical-cream text-sm md:text-base">Arte Tropical • Murais Personalizados</p>
              </div>
            </div>

            {/* Content Grid - Mobile Stacked */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
              {/* Contact Info */}
              <div className="order-1">
                <h5 className="font-semibold mb-3 text-tropical-cream text-lg md:text-base">Contato</h5>
                <div className="space-y-2 text-white/80">
                  <a href="tel:+5511999999999" className="flex items-center justify-center md:justify-start hover:text-white transition-colors">
                    <Phone className="h-4 w-4 mr-2" />
                    (11) 99999-9999
                  </a>
                  <a href="mailto:contato@guimancini.com" className="flex items-center justify-center md:justify-start hover:text-white transition-colors">
                    <Mail className="h-4 w-4 mr-2" />
                    contato@guimancini.com
                  </a>
                </div>
              </div>

              {/* Services */}
              <div className="order-3 md:order-2">
                <h5 className="font-semibold mb-3 text-tropical-cream text-lg md:text-base">Serviços</h5>
                <div className="space-y-2 text-white/80 text-sm md:text-base">
                  <div>Murais Externos</div>
                  <div>Murais Internos</div>
                  <div>Fachadas Comerciais</div>
                </div>
              </div>

              {/* Social Media */}
              <div className="order-2 md:order-3">
                <h5 className="font-semibold mb-3 text-tropical-cream text-lg md:text-base">Redes Sociais</h5>
                <div className="flex justify-center md:justify-start space-x-4">
                  <a href="#" className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full">
                    <Instagram className="h-5 w-5 md:h-6 md:w-6" />
                  </a>
                  <a href="tel:+5511999999999" className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full">
                    <Phone className="h-5 w-5 md:h-6 md:w-6" />
                  </a>
                  <a href="mailto:contato@guimancini.com" className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full">
                    <Mail className="h-5 w-5 md:h-6 md:w-6" />
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-white/20 pt-6">
              <p className="text-white/60 text-xs md:text-sm leading-relaxed">
                © 2024 Gui Mancini. Todos os direitos reservados.<br className="md:hidden" />
                <span className="hidden md:inline"> | </span>Arte Tropical Personalizada
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;