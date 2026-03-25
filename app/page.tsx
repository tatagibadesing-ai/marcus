"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Script from "next/script"
import {
  Check,
  CalendarCheck,
  Target,
  BookOpen,
  ChatCircle,
  Shield,
  Trophy,
  Broadcast,
  LockKey,
  Warning,
  CaretLeft,
  CaretRight,
  CaretDown,
  Users,
  Lightning,
  MagnifyingGlass,
  Alarm,
  Compass,
  Key,
  MicrophoneStage,
  RocketLaunch,
  Hourglass,
  MapTrifold,
  LockKeyOpen,
  ChatCircleDots,
  ArrowRight
} from "@phosphor-icons/react"

// =========================================
// STYLE OBJECTS
// =========================================
const goldBorderStyle = {
  backgroundColor: "transparent",
  borderTop: "1px solid #FFCD01",
  borderBottom: "1px solid #FFCD01",
  borderImage: "linear-gradient(to right, transparent, #FFCD01, transparent) 1",
}

// =========================================
// COMPONENTE DE UI
// =========================================

const AnimatedGradientButton = ({
  children,
  className = "",
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) => {
  return (
    <button
      className={`relative overflow-hidden uppercase transition-all hover:scale-105 rounded-xl text-lg font-bold tracking-tight ${className}`}
      style={{
        background: "linear-gradient(90deg, #FFCD01, #FFD83A, #FFCD01, #FFD83A)",
        backgroundSize: "300% 100%",
        animation: "gradientShift 3s ease infinite",
      }}
      {...props}
    >
      {children}
    </button>
  )
}

const GradientText = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <span
      className={className}
      style={{
        background: "linear-gradient(90deg, #FFCD01, #FFD83A)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {children}
    </span>
  )
}

// =========================================
// CONFIGURAÇÕES DE ANIMAÇÃO
// =========================================

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.2, staggerChildren: 0.1, ease: [0.16, 1, 0.3, 1] },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
}

// =========================================
// DADOS
// =========================================

const imersaoCards = [
  {
    numero: "1",
    titulo: "Passo 1: Estude pelo Resumo",
    descricao: "Comece o contato com a matéria através de um conteúdo direcionado e focado no que a banca exige.",
    lista: [
      "Marcações por relevância",
      "Links de lei seca",
      "Estudo ágil",
    ],
  },
  {
    numero: "2",
    titulo: "Passo 2: Revise pelo Anki",
    descricao: "Use o sistema de revisão inteligente com cerca de 1.600 flashcards baseados em questões.",
    lista: [
      "Revisão espaçada",
      "Alta retenção do conteúdo",
      "Acabe com os brancos",
    ],
  },
  {
    numero: "3",
    titulo: "Passo 3: Treine",
    descricao: "Aplique tudo fazendo questões direcionadas através dos filtros prontos (TEC e Qconcursos).",
    lista: [
      "Prioridade real do edital",
      "Onde focar sua energia",
      "Zero tempo perdido",
    ],
  },
]

const forWhoList = [
  "Não tenho tempo para estudar",
  "Não tenho base",
  "Já tentei de tudo e não deu certo",
  "Para quem está perdido, sem método, sem rotina",
  "Para quem está começando e não quer perder tempo",
  "Para quem tem 25, 30, 40+ anos e acha que já passou da idade",
]

const deliverables = [
  {
    titulo: "Resumo Completo PRF",
    descricao: "Resumo estratégico com foco em cobrança de banca.\n\n✔ Conteúdo direcionado\n✔ Marcações por relevância\n✔ Links de lei seca\n✔ Foco no que cai\n\nMaterial suficiente para estudar a maior parte do edital.",
    icone: BookOpen,
    precoAntigo: "R$ 197,00",
    link: "https://pay.kiwify.com.br/gK7ikY8",
  },
  {
    titulo: "Anki PRF",
    descricao: "Sistema de revisão inteligente.\n\n✔ Revisão espaçada\n✔ Questões adaptadas\n✔ Cerca de 1.600 flashcards\n✔ Alta retenção\n\nPare de esquecer o que estudou.",
    icone: Lightning,
    precoAntigo: "R$ 117,00",
    link: "https://pay.kiwify.com.br/lNcdm4R",
  },
  {
    titulo: "Guia Estratégico PRF",
    descricao: "O cérebro da preparação.\n\n✔ Percentual de cobrança\n✔ Prioridade real\n✔ Filtros prontos TEC\n✔ Filtros Qconcursos\n\nVocê sabe exatamente onde focar.",
    icone: MapTrifold,
    precoAntigo: "R$ 97,00",
    link: "https://pay.kiwify.com.br/zQhXByj",
  },
]

const authorityItems = [
  "Anos de experiência com mais de 1.400 aprovações juntas",
  "Aprovado na PMGO, PCGO e PRF aos 19 anos",
  "Estudou praticamente só pelo celular e iPad",
  "Mentores responsáveis pelo método que aprovou policiais no país inteiro",
]

const faqItems = [
  {
    pergunta: "Funciona mesmo para quem está começando do zero?",
    resposta: "Sim. O sistema foi pensado para quem não tem base nenhuma. Você recebe o passo a passo completo: o que estudar, como revisar e onde treinar.",
  },
  {
    pergunta: "Preciso ter conhecimento prévio de alguma matéria?",
    resposta: "Não. O Combo PRF foi organizado para guiar desde o primeiro contato com cada disciplina até a resolução de questões avançadas.",
  },
  {
    pergunta: "Como funciona o acesso?",
    resposta: "Após a confirmação, você recebe acesso imediato a todos os materiais: Resumo Estratégico, Anki com 1.600+ flashcards e o Guia Estratégico com filtros prontos.",
  },
  {
    pergunta: "Por quanto tempo tenho acesso ao material?",
    resposta: "O acesso é vitalício. Você pode estudar no seu ritmo, sem prazo para expirar.",
  },
  {
    pergunta: "O material é atualizado?",
    resposta: "Sim. O material é atualizado gratuitamente por 1 ano, acompanhando as mudanças legislativas e os padrões de cobrança da banca.",
  },
]

// =========================================
// COMPONENTE PRINCIPAL
// =========================================

export default function ComboPrfPage() {
  const heroRef = useRef(null)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  useEffect(() => {
    const customCursor = document.querySelector("[data-custom-cursor]") as HTMLElement
    if (customCursor) {
      customCursor.style.display = "none"
    }
    document.body.style.cursor = "auto"

    const styleId = "imersao-scrollbar-style"
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style")
      style.id = styleId
      style.textContent = `
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: #1a1a1a; }
        ::-webkit-scrollbar-thumb { background: #FFCD01; border-radius: 5px; }
        ::-webkit-scrollbar-thumb:hover { background: #FFD83A; }
        * { scrollbar-width: thin; scrollbar-color: #FFCD01 #1a1a1a; }
      `
      document.head.appendChild(style)
    }

    return () => {
      if (customCursor) customCursor.style.display = ""
      document.body.style.cursor = ""
      const style = document.getElementById(styleId)
      if (style) style.remove()
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const heroY = useTransform(scrollYProgress, [0, 1], [0, -50])

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Meta Pixel Code */}
      <Script id="facebook-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1926485138077316');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=1926485138077316&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>

      <style jsx global>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      {/* =========================================
          SEÇÃO 1: HERO
      ========================================= */}
      <motion.section
        ref={heroRef}
        style={{ y: heroY }}
        className="relative min-h-[85vh] md:min-h-screen flex items-start md:items-center overflow-hidden bg-black"
      >
        {/* CONTAINER DA IMAGEM */}
        <div className="absolute top-0 left-0 w-full z-0 h-[38vh] md:h-full md:inset-0">
          <Image
            src="/Herosectionimage.webp"
            alt="Marcus - Combo PRF"
            fill
            className="object-cover object-[88%_center] scale-[0.95] translate-x-[-2%] md:scale-100 md:translate-x-0 lg:object-contain lg:object-right lg:scale-[1.10] lg:origin-right lg:translate-x-[5%] opacity-100"
            priority
            quality={100}
          />
          {/* Degradê Mobile */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black via-black/0 to-transparent md:hidden" />
          {/* Degradê Desktop */}
          <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-black/0 via-black/0 to-transparent" />

          {/* Floating Badges */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -10, 0],
                x: [0, 5, 0]
              }}
              transition={{
                opacity: { delay: 0.8, duration: 0.6 },
                scale: { delay: 0.8, duration: 0.6 },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                x: { duration: 5, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute top-[45%] right-[60%] md:right-[38%] bg-zinc-900/60 backdrop-blur-md px-3 py-1.5 md:px-6 md:py-3 rounded-md flex items-center gap-2 md:gap-3 shadow-2xl"
            >
              <Trophy weight="fill" className="w-3 h-3 md:w-5 md:h-5 text-[#FFCD01]" />
              <span className="text-white text-[10px] md:text-xs font-bold uppercase tracking-widest whitespace-nowrap">19 ANOS</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, 10, 0],
                x: [0, -5, 0]
              }}
              transition={{
                opacity: { delay: 1, duration: 0.6 },
                scale: { delay: 1, duration: 0.6 },
                y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
                x: { duration: 5.5, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute top-[42%] right-[5%] bg-zinc-900/60 backdrop-blur-md px-3 py-1.5 md:px-6 md:py-3 rounded-md flex items-center gap-2 md:gap-3 shadow-2xl"
            >
              <Trophy weight="fill" className="w-3 h-3 md:w-5 md:h-5 text-[#FFCD01]" />
              <span className="text-white text-[10px] md:text-xs font-bold uppercase tracking-widest whitespace-nowrap">APROVADO PRF</span>
            </motion.div>
          </div>
        </div>

        {/* Fade inferior */}
        <div className="absolute bottom-0 left-0 w-full h-24 md:h-48 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />

        {/* CONTAINER PRINCIPAL */}
        <div className="relative z-20 container mx-auto border-x border-white/5 bg-black/0 h-full">
          <div className="px-4 sm:px-6 md:px-12 2xl:px-20 py-8 pt-[35vh] md:py-20 md:pt-20 pb-12 flex flex-col md:block items-center">
            <motion.div
              className="w-full md:max-w-2xl flex flex-col items-center md:items-start text-center md:text-left drop-shadow-xl"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {/* Logo da Marca */}
              <motion.div variants={itemVariants} className="mb-6">
                <Image
                  src="/logodamarca.webp"
                  alt="Logo"
                  width={140}
                  height={40}
                  className="h-8 md:h-10 w-auto"
                />
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 backdrop-blur-sm rounded-md mb-4 md:mb-6"
              >
                <CalendarCheck className="w-4 h-4 text-[#FFCD01]" weight="fill" />
                <span className="text-zinc-300 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">
                  Sistema Validado
                </span>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-2xl sm:text-3xl md:text-5xl leading-[1.1] mb-4 md:mb-6 drop-shadow-2xl tracking-tight font-bold"
              >
                Os Materiais de Estudos com Sistema Completo Para PRF Que Já Formou a Base da Preparação de Quem <GradientText>Saiu do Zero e Foi Aprovado</GradientText>
              </motion.h1>

              <motion.div variants={itemVariants} className="mb-6 md:mb-8 w-full max-w-xl md:max-w-3xl px-2 md:px-0">
                <p className="text-zinc-200 text-sm sm:text-base lg:text-lg font-medium leading-relaxed mb-2 drop-shadow-md">
                  Pare de estudar perdido. Aqui estão os materiais que ajudaram na preparação de um aprovado na PRF aos 19 anos.
                </p>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                  ✔ Resumo Estratégico &nbsp; ✔ Revisão Inteligente &nbsp; ✔ Questões Direcionadas <br/> Tudo organizado em um único sistema.
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="mb-10 w-full flex justify-center md:justify-start">
                <a href="https://pay.kiwify.com.br/0xIY097" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                  <AnimatedGradientButton className="w-full sm:w-auto text-black text-base sm:text-lg font-extrabold px-10 py-4 md:px-14 md:py-5 shadow-[0_0_30px_rgba(255,205,1,0.3)] hover:shadow-[0_0_60px_rgba(255,205,1,0.5)] border-2 border-white/20 whitespace-nowrap transition-all">
                    QUERO ACESSAR O COMBO PRF
                  </AnimatedGradientButton>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* =========================================
          SEÇÃO VSL & PROVA SOCIAL
      ========================================= */}
      <section className="py-20 lg:py-28 relative bg-[#0a0a0a]" style={goldBorderStyle}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-8 leading-tight">
            Assista esse vídeo antes de tomar qualquer decisão sobre sua <GradientText>preparação para PRF</GradientText>
          </h2>

          <div className="aspect-video w-full rounded-2xl overflow-hidden border border-[#FFCD01]/30 shadow-[0_0_50px_rgba(255,205,1,0.1)] bg-zinc-900 flex items-center justify-center relative mb-12 cursor-pointer hover:border-[#FFCD01]/60 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
            <div className="relative z-20 flex flex-col items-center gap-4">
              <span className="text-white font-medium text-[10px] tracking-[0.3em] uppercase opacity-70">
                APERTAR PLAY (VSL)
              </span>
            </div>
          </div>

          <a href="https://pay.kiwify.com.br/0xIY097" target="_blank" rel="noopener noreferrer" className="mb-24 block">
            <AnimatedGradientButton className="text-black font-bold px-10 py-5 w-full md:w-auto">
              QUERO ACESSAR O COMBO PRF
            </AnimatedGradientButton>
          </a>
        </div>

        {/* PROVA SOCIAL */}
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-8">
            <Image
              src="/prflogo.png.webp"
              alt="Logo PRF"
              width={120}
              height={120}
              className="h-20 md:h-24 w-auto opacity-80"
            />
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">
            Pessoas Comuns <GradientText>já estão evoluindo</GradientText>
          </h2>
          <p className="text-zinc-400 mb-12 max-w-2xl mx-auto">
            Resultados daqueles que pararam de tentar a sorte e começaram a estudar com método.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { texto: "Comecei do zero e em 4 meses já estava acertando 80% das questões. O sistema realmente funciona.", autor: "Lucas R." },
              { texto: "Eu estudava sem rumo, gastando horas em matérias que nem caíam. Com o Combo PRF organizei tudo.", autor: "Amanda S." },
              { texto: "Trabalho o dia inteiro e só tenho 2h por dia. Com o método consegui otimizar cada minuto.", autor: "Rafael M." },
              { texto: "O Anki mudou minha vida. Parei de esquecer o que estudava e minha evolução foi absurda.", autor: "Camila P." },
              { texto: "Já tinha desistido duas vezes. Voltei com esse sistema e pela primeira vez me senti preparado.", autor: "Diego F." },
              { texto: "Tenho 38 anos e achava que não dava mais. O método provou que idade não é desculpa.", autor: "Patrícia L." },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 text-left hover:border-[#FFCD01]/20 transition-colors"
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-[#FFCD01] text-sm">★</span>
                  ))}
                </div>
                <p className="text-zinc-300 text-sm leading-relaxed mb-4 italic">&ldquo;{item.texto}&rdquo;</p>
                <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">— {item.autor}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          SEÇÃO 2: QUEBRA DE CRENÇA
      ========================================= */}
      <section
        className="py-20 lg:py-28 relative overflow-hidden"
        style={{
          ...goldBorderStyle,
          background: "radial-gradient(ellipse at center, rgba(30,30,30,0.5) 0%, transparent 70%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-left"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 rounded-lg border border-zinc-800 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                <span className="text-zinc-400 text-xs font-bold uppercase tracking-widest">Diagnóstico Real</span>
              </div>

              <h2 className="text-white mb-6 leading-tight md:text-4xl font-semibold text-2xl">
                A maioria das pessoas não reprova porque é burra.{" "}
                <span
                  style={{
                    background: "linear-gradient(90deg, #FFCD01, #FFD83A)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Reprova porque estuda perdido.
                </span>
              </h2>

              <p className="text-zinc-300 text-lg leading-relaxed mb-8">
                É Exatamente isso que acontece com o concurseiro médio.
              </p>

              <div className="space-y-4 mb-8">
                <p className="text-white text-xl font-semibold">E a culpa não é sua. A culpa é do método.</p>
                <p className="text-zinc-300 text-base leading-relaxed">
                  Ele não sabe como usar as ferramentas para a Polícia Rodoviária Federal de forma estratégica.
                </p>
              </div>

              <div className="flex items-center gap-3 text-sm text-zinc-400 italic border-l-2 border-zinc-800 pl-4">
                <Warning className="w-5 h-5 text-[#FFCD01]" />
                <span>Sem direção. Sem prioridade. Sem revisão. Sem estratégia. É só perda de tempo.</span>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="relative"
            >
              <div className="absolute -inset-4 bg-[#FFCD01]/5 blur-3xl rounded-full pointer-events-none" />

              <div className="relative bg-zinc-900/20 backdrop-blur-sm p-8 lg:p-12 rounded-3xl">
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 bg-[#FFCD01]/10 rounded-xl flex items-center justify-center text-[#FFCD01]">
                    <Target className="w-7 h-7" weight="fill" />
                  </div>
                  <div className="px-3 py-1 bg-[#FFCD01]/10 rounded text-xs font-bold text-[#FFCD01] uppercase tracking-wider">
                    Novo Padrão
                  </div>
                </div>

                <h3 className="text-2xl text-white mb-4 font-semibold">Combo PRF Completo</h3>

                <p className="text-zinc-300 text-base mb-6 leading-relaxed">
                  O fim da frustração. Você não sabe o que estudar? Nós organizamos.
                </p>

                <div className="p-5 bg-zinc-950/50 rounded-xl mb-8">
                  <p className="text-zinc-400 text-sm italic">
                    &ldquo;...porque respeita o cérebro, o tempo e a rotina real de quem estuda pra concurso.&rdquo;
                  </p>
                </div>

                <ul className="space-y-4">
                  {[
                    "Abre PDF sem saber se aquilo cai",
                    "Assiste aula sem prioridade",
                    "Faz questão sem evoluir"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-base text-zinc-200">
                      <Check className="w-5 h-5 text-[#FFCD01]" weight="bold" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================
          SEÇÃO: ORGANIZAÇÃO VS CONTEÚDO
      ========================================= */}
      <section className="py-20 lg:py-32 relative bg-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto flex flex-col items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-8 tracking-tighter leading-[1.1] uppercase">
                O Problema Não é Falta de Conteúdo. <br />
                <GradientText>É Falta de Organização.</GradientText>
              </h2>

              <p className="text-zinc-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                Você não precisa de mais PDFs para acumular em pastas que nunca abrirá. <br className="hidden md:block" />
                Você precisa de um <span className="text-white">sistema blindado</span> que responda:
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-16 mb-24 max-w-3xl mx-auto">
              {[
                "O que estudar",
                "Em que ordem estudar",
                "Como revisar",
                "Onde focar energia",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#FFCD01] shadow-[0_0_10px_#FFCD01]" />
                  <span className="text-zinc-200 text-xl font-bold tracking-tight border-b border-transparent uppercase italic">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center w-full"
            >
              <div className="h-px w-20 bg-[#FFCD01]/30 mx-auto mb-12" />

              <p className="text-zinc-400 text-lg mb-12 max-w-xl mx-auto">
                Foi exatamente isso que o <span className="text-[#FFCD01] font-bold">Marcus</span> organizou. <br />
                Um sistema simples e letal:
              </p>

              <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-20 mb-12 md:mb-20 relative">
                <div className="hidden md:block absolute top-[28px] left-[25%] right-[25%] h-px bg-gradient-to-r from-transparent via-[#FFCD01]/40 to-transparent" />

                {["Estudar", "Revisar", "Treinar"].map((step, i) => (
                  <div key={i} className="flex flex-col items-center relative z-10">
                    <div className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center mb-2 md:mb-6 relative">
                      <div className="absolute inset-0 bg-black rounded-full scale-75" />
                      <span className="text-[#FFCD01] font-bold text-xl md:text-2xl relative z-10">{i + 1}</span>
                    </div>
                    <span className="text-xl md:text-3xl font-bold text-white uppercase tracking-tighter italic">{step}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-12">
                {["Sem improviso.", "Sem caos.", "Sem perda de tempo."].map((text, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FFCD01] animate-pulse shadow-[0_0_8px_#FFCD01]" />
                    <span className="text-zinc-500 font-bold uppercase tracking-[0.2em] text-[10px] sm:text-xs">
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================
          SEÇÃO 4: QUEM É MARCUS
      ========================================= */}
      <section className="py-32 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #00074A 0%, #000a3a 50%, #000000 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="order-2 lg:order-1"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-4 font-semibold">
                Quem é <GradientText>Marcus</GradientText>
              </h2>
              <p className="text-zinc-400 text-lg mb-8">Ele viveu a realidade do concurseiro. Hoje esse sistema virou o Combo PRF.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {authorityItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#FFCD01] flex-shrink-0" />
                    <span className="text-zinc-300">{item}</span>
                  </div>
                ))}
              </div>

              <div className="bg-[#00074A]/30 p-6 rounded-xl border-l-4 border-l-[#00074A]">
                <p className="text-lg italic text-zinc-300 font-medium mb-4">
                  Eu não falo teoria. Eu falo o que funciona.
                </p>
                <p className="text-zinc-400">
                  Enquanto muitos cursinhos cobram fortunas, o Marcus organizou um método de elite acessível.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="relative order-1 lg:order-2"
            >
              <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl relative">
                <Image
                  src="/fotodomarcus.webp"
                  alt="Marcus"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl backdrop-blur-md bg-black/60 flex items-center justify-between">
                  <div>
                    <div className="text-2xl text-white tracking-tighter font-semibold">
                      1.400<span className="text-[#FFCD01]">+</span>
                    </div>
                    <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Aprovados</div>
                  </div>
                  <div className="h-10 w-[1px] bg-white/20" />
                  <div className="text-right">
                    <div className="text-2xl text-white tracking-tighter font-semibold">
                      19<span className="text-[#FFCD01]">anos</span>
                    </div>
                    <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                      Aprovado PRF
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================
          SEÇÃO 6: O QUE VOCÊ VAI RECEBER
      ========================================= */}
      <section
        className="relative py-14 lg:py-24"
        style={{
          background: "radial-gradient(circle at center, #111111 0%, #000000 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 mb-6 rounded-lg">
              <span className="text-zinc-400 uppercase tracking-widest font-bold text-xs">Entregáveis Exclusivos</span>
            </div>
            <h2 className="sm:text-4xl lg:text-5xl mb-4 text-2xl text-white font-semibold">
              O Que Você Vai <GradientText>Receber</GradientText>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {deliverables.map((item, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="rounded-2xl overflow-hidden border border-[#504535] transition-all hover:scale-[1.02] group flex flex-col"
                style={{
                  background: "linear-gradient(210deg, #1B1B1B 0%, #010101 100%)",
                }}
              >
                <div className="h-48 w-full border-b border-[#504535]/30 flex items-center justify-center bg-zinc-900/50 relative overflow-hidden group-hover:bg-zinc-900/80 transition-colors">
                  <div className="absolute inset-0 bg-[#FFCD01]/5 blur-2xl rounded-full scale-0 group-hover:scale-100 transition-transform duration-700" />
                  <item.icone
                    weight="duotone"
                    className="w-24 h-24 text-[#FFCD01] relative z-10 drop-shadow-[0_0_15px_rgba(210,169,63,0.3)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                  />
                  <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-xl text-white mb-4 leading-tight font-semibold">{item.titulo}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-8 flex-grow whitespace-pre-line">{item.descricao}</p>
                  <div className="w-full h-px bg-[#504535] mb-5"></div>
                  <div className="flex items-center gap-3 mt-auto mb-4">
                    <span className="text-zinc-500 line-through text-sm font-medium">{item.precoAntigo}</span>
                    <span className="text-xl">👉</span>
                    <span className="text-white font-bold text-xl">R$ 0</span>
                  </div>
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="block text-center text-xs font-bold text-[#FFCD01] uppercase tracking-wider border border-[#FFCD01]/30 rounded-lg py-2 hover:bg-[#FFCD01]/10 transition-colors">
                    Comprar individual
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          SEÇÃO 3: COMO O SISTEMA FUNCIONA
      ========================================= */}
      <section className="lg:py-32 relative bg-black overflow-hidden py-16">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#FFCD01] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="sm:text-4xl lg:text-5xl font-bold mb-6 max-w-4xl mx-auto leading-tight text-2xl text-white">
              ENTENDA COMO O <GradientText>SISTEMA FUNCIONA</GradientText>
            </h2>
            <p className="text-zinc-400 max-w-3xl mx-auto leading-relaxed text-base">
              A tríade blindada contra distrações e improviso:
            </p>
          </motion.div>

          {/* LAYOUT MOBILE */}
          <div className="md:hidden relative flex flex-col gap-10 pb-8">
            <div className="absolute left-[2rem] top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#FFCD01]/60 to-transparent" />

            {imersaoCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative pl-24"
              >
                <div className="absolute left-0 top-0 w-16 h-16 rounded-2xl bg-[#101010] border border-[#333] flex items-center justify-center shadow-lg z-10">
                  <span className="text-2xl font-bold text-zinc-500">{card.numero}</span>
                </div>

                <div className="absolute left-[5.5rem] top-6 w-4 h-4 bg-zinc-900/40 border-l border-b border-white/5 rotate-45 transform z-20 backdrop-blur-md" />

                <div className="bg-zinc-900/40 backdrop-blur-md border border-white/5 p-6 rounded-2xl relative z-10">
                  <h3 className="text-lg text-white mb-3 leading-tight font-semibold">{card.titulo}</h3>

                  {card.descricao && (
                    <p className="text-zinc-400 text-sm leading-relaxed mb-4">{card.descricao}</p>
                  )}

                  {card.lista && (
                    <div className="bg-black/20 rounded-xl p-4 border border-white/5">
                      <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold mb-3">Erros destruídos:</p>
                      <div className="space-y-2">
                        {card.lista.map((item, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <Check className="w-3 h-3 text-[#FFCD01] flex-shrink-0 mt-0.5" weight="bold" />
                            <span className="text-zinc-400 text-xs leading-snug">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* LAYOUT DESKTOP */}
          <div
            className="hidden md:block relative w-full group/carousel"
            onMouseDown={(e) => {
              const slider = e.currentTarget.querySelector('.scroll-container') as HTMLElement;
              if (!slider) return;
              let isDown = true;
              const startX = e.pageX - slider.offsetLeft;
              const scrollLeft = slider.scrollLeft;

              slider.style.scrollBehavior = 'auto';
              e.currentTarget.style.cursor = 'grabbing';

              const mouseMoveHandler = (ev: MouseEvent) => {
                if (!isDown) return;
                ev.preventDefault();
                const x = ev.pageX - slider.offsetLeft;
                const walk = (x - startX) * 1.0;
                slider.scrollLeft = scrollLeft - walk;
              };

              const mouseUpHandler = () => {
                isDown = false;
                slider.style.scrollBehavior = 'smooth';
                const mainContainer = document.querySelector('.cursor-grab') as HTMLElement;
                if (mainContainer) mainContainer.style.cursor = 'grab';
                window.removeEventListener('mousemove', mouseMoveHandler);
                window.removeEventListener('mouseup', mouseUpHandler);
              };

              window.addEventListener('mousemove', mouseMoveHandler);
              window.addEventListener('mouseup', mouseUpHandler);
            }}
          >
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none opacity-80" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none opacity-80" />

            <div
              className="scroll-container flex gap-0 overflow-x-auto pb-12 pt-4 scroll-smooth cursor-grab active:cursor-grabbing"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {imersaoCards.map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="relative flex flex-col items-center min-w-[400px] select-none group px-4"
                >
                  <div className="absolute top-10 w-full flex items-center justify-center z-0">
                    <div className={`h-[2px] w-1/2 bg-[#FFCD01]/60 ${index === 0 ? 'opacity-0' : 'opacity-100'}`} />
                    <div className={`h-[2px] w-1/2 bg-[#FFCD01]/60 ${index === imersaoCards.length - 1 ? 'opacity-0' : 'opacity-100'}`} />
                  </div>

                  <div className="relative z-10 mb-8 pointer-events-none">
                    <div className="w-20 h-20 rounded-2xl bg-[#101010] border border-[#333] flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:border-[#FFCD01] group-hover:shadow-[0_0_20px_rgba(209,168,61,0.4)] transition-all duration-500 relative overflow-hidden">
                      <div className="absolute inset-0 bg-[#FFCD01]/0 group-hover:bg-[#FFCD01]/10 transition-colors duration-500" />
                      <span className="text-4xl font-bold text-zinc-500 group-hover:text-[#FFCD01] transition-colors duration-300 relative z-10">
                        {card.numero}
                      </span>
                    </div>
                  </div>

                  <div className="w-6 h-6 bg-zinc-900/40 border-l border-t border-white/5 rotate-45 transform relative z-20 -mb-3 group-hover:bg-zinc-900/60 transition-colors backdrop-blur-md" />

                  <div className="w-full bg-zinc-900/40 backdrop-blur-md border border-white/5 p-8 rounded-2xl hover:bg-zinc-900/60 hover:border-[#FFCD01]/30 transition-all duration-300 flex flex-col h-full relative z-10 group-hover:-translate-y-2 shadow-lg">
                    <h3 className="text-xl text-white mb-4 text-center group-hover:text-[#FFD83A] transition-colors font-semibold">
                      {card.titulo}
                    </h3>

                    {card.descricao && (
                      <p className="text-zinc-400 text-sm leading-relaxed text-center flex-1">{card.descricao}</p>
                    )}

                    {card.lista && (
                      <div className="text-left mt-4 w-full bg-black/20 p-5 rounded-xl border border-white/5">
                        <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold mb-3 text-center">Erros destruídos:</p>
                        <div className="space-y-2">
                          {card.lista.map((item, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <Check className="w-3 h-3 text-[#FFCD01] flex-shrink-0 mt-1" weight="bold" />
                              <span className="text-zinc-400 text-xs leading-snug">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              <div className="min-w-[100px] shrink-0" />
            </div>

            <div className="flex justify-center gap-3 mt-8 relative z-30">
              <button
                onClick={() => {
                  const slider = document.querySelector('.scroll-container');
                  if (slider) slider.scrollLeft -= 400;
                }}
                className="w-10 h-10 rounded-full bg-[#101010] border border-[#333] flex items-center justify-center hover:border-[#FFCD01] transition-colors group"
              >
                <CaretLeft className="w-5 h-5 text-zinc-600 group-hover:text-[#FFCD01] transition-colors" />
              </button>
              <button
                onClick={() => {
                  const slider = document.querySelector('.scroll-container');
                  if (slider) slider.scrollLeft += 400;
                }}
                className="w-10 h-10 rounded-full bg-[#101010] border border-[#333] flex items-center justify-center hover:border-[#FFCD01] transition-colors group"
              >
                <CaretRight className="w-5 h-5 text-zinc-600 group-hover:text-[#FFCD01] transition-colors" />
              </button>
            </div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mt-16"
          >
            <a href="https://pay.kiwify.com.br/0xIY097" target="_blank" rel="noopener noreferrer">
              <AnimatedGradientButton className="text-black font-bold px-10 py-4 shadow-[0_0_20px_rgba(255,205,1,0.3)]">
                QUERO ACESSAR O COMBO PRF
              </AnimatedGradientButton>
            </a>
            <p className="text-zinc-300 text-sm mt-6 font-medium">
              Vagas limitadas — transmissão fechada.
            </p>
          </motion.div>
        </div>
      </section>

      {/* =========================================
          SEÇÃO 7: INVESTIMENTO
      ========================================= */}
      <section
        id="investimento"
        className="relative py-16 lg:py-24 overflow-hidden"
        style={{
          ...goldBorderStyle,
          background: "radial-gradient(ellipse at center, rgba(30,30,30,0.5) 0%, transparent 70%)",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 lg:px-0">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h3 className="text-white font-bold text-lg sm:text-2xl uppercase tracking-wider max-w-4xl mx-auto leading-relaxed mb-4">
              Quanto Custa Ter Acesso a <GradientText>Todo o Sistema?</GradientText>
            </h3>
            <p className="text-zinc-400 text-base max-w-2xl mx-auto">
              Separado, cada material teria seu próprio valor. Mas você não precisa comprar nada separado.
            </p>
          </motion.div>

          {/* Pricing Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-lg mx-auto"
          >
            <div className="relative rounded-3xl border border-[#FFCD01]/30 overflow-hidden" style={{ background: "linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)" }}>
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FFCD01] to-transparent" />

              <div className="p-8 sm:p-12 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFCD01]/10 rounded-full mb-6">
                  <Shield weight="fill" className="w-4 h-4 text-[#FFCD01]" />
                  <span className="text-[#FFCD01] text-xs font-bold uppercase tracking-widest">Combo PRF Completo</span>
                </div>

                <div className="space-y-3 mb-8">
                  {deliverables.map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span className="text-zinc-300">{item.titulo}</span>
                      <span className="text-zinc-500 line-through">{item.precoAntigo}</span>
                    </div>
                  ))}
                  <div className="h-px bg-zinc-800 my-4" />
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400 text-sm">Total separado:</span>
                    <span className="text-zinc-500 line-through text-lg">R$ 411,00</span>
                  </div>
                </div>

                <div className="mb-8">
                  <p className="text-zinc-500 text-xs uppercase tracking-widest mb-2">Seu investimento hoje:</p>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl sm:text-6xl font-extrabold text-white">R$ 0</span>
                  </div>
                  <p className="text-[#FFCD01] text-sm font-medium mt-2">Acesso gratuito por tempo limitado</p>
                </div>

                <a href="https://pay.kiwify.com.br/0xIY097" target="_blank" rel="noopener noreferrer" className="block">
                  <AnimatedGradientButton className="w-full text-black font-extrabold px-8 py-5 text-lg rounded-2xl shadow-[0_0_40px_rgba(255,205,1,0.3)] hover:shadow-[0_0_60px_rgba(255,205,1,0.5)]">
                    QUERO ACESSAR O COMBO PRF
                  </AnimatedGradientButton>
                </a>

                <div className="flex items-center justify-center gap-2 mt-6">
                  <LockKey className="w-4 h-4 text-zinc-500" />
                  <span className="text-zinc-500 text-xs">Acesso imediato e seguro</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================
          SEÇÃO: PARA QUEM É
      ========================================= */}
      <section className="py-20 lg:py-28 bg-black relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Para Quem <GradientText>É o Combo PRF</GradientText>
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Se você se identifica com alguma dessas frases, esse sistema foi feito para você:
            </p>
          </motion.div>

          <div className="space-y-4 max-w-2xl mx-auto">
            {forWhoList.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900/30 border border-zinc-800/50 hover:border-[#FFCD01]/20 transition-colors"
              >
                <Check className="w-5 h-5 text-[#FFCD01] flex-shrink-0" weight="bold" />
                <span className="text-zinc-200 text-base">{item}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mt-12"
          >
            <a href="https://pay.kiwify.com.br/0xIY097" target="_blank" rel="noopener noreferrer">
              <AnimatedGradientButton className="text-black font-bold px-10 py-4 shadow-[0_0_20px_rgba(255,205,1,0.3)]">
                QUERO ACESSAR O COMBO PRF
              </AnimatedGradientButton>
            </a>
          </motion.div>
        </div>
      </section>

      {/* =========================================
          SEÇÃO: FAQ
      ========================================= */}
      <section className="py-20 lg:py-28 bg-[#0a0a0a] relative" style={goldBorderStyle}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4">
              Perguntas <GradientText>Frequentes</GradientText>
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-xl border border-white/10 overflow-hidden bg-white/5"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-zinc-900/50 transition-colors"
                >
                  <span className="text-white font-medium text-sm sm:text-base pr-4">{item.pergunta}</span>
                  <CaretDown
                    className={`w-5 h-5 text-[#FFCD01] flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="text-zinc-400 text-sm leading-relaxed">{item.resposta}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          SEÇÃO: CTA FINAL
      ========================================= */}
      <section className="py-24 lg:py-32 bg-black relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#FFCD01] opacity-[0.04] blur-[150px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Você Pode Continuar Estudando Perdido. <br />
              <GradientText>Ou Pode Começar Agora.</GradientText>
            </h2>
            <p className="text-zinc-400 text-lg mb-10 max-w-xl mx-auto">
              O sistema está pronto. Os materiais estão organizados. Só falta você decidir.
            </p>

            <a href="https://pay.kiwify.com.br/0xIY097" target="_blank" rel="noopener noreferrer">
              <AnimatedGradientButton className="text-black font-extrabold px-12 py-5 text-lg rounded-2xl shadow-[0_0_40px_rgba(255,205,1,0.3)] hover:shadow-[0_0_60px_rgba(255,205,1,0.5)]">
                QUERO ACESSAR O COMBO PRF
              </AnimatedGradientButton>
            </a>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-8">
              {["Acesso Imediato", "Suporte Incluso", "Sem Risco"].map((text, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FFCD01]" weight="bold" />
                  <span className="text-zinc-400 text-sm">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================
          FOOTER
      ========================================= */}
      <footer className="py-8 bg-black border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-zinc-600 text-xs">
            © {new Date().getFullYear()} Combo PRF. Todos os direitos reservados.
          </p>
          <p className="text-zinc-700 text-[10px] mt-2">
            Este produto não garante a obtenção de resultados. Qualquer referência ao desempenho passado não é indicativa de resultados futuros.
          </p>
        </div>
      </footer>
    </main>
  )
}
