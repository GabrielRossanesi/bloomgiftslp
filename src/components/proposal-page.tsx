"use client";

import Image from "next/image";
import { useMemo, useState, type ReactNode } from "react";
import { AnimatePresence, MotionConfig, motion, useScroll, useSpring } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  ArrowRight,
  Check,
  Clock3,
  Gift,
  LayoutTemplate,
  Menu,
  MessageCircle,
  Minus,
  MousePointerClick,
  Package,
  Plus,
  Send,
  ShoppingBag,
  Smartphone,
  Sparkles,
  X,
} from "lucide-react";
import {
  catalogProducts,
  challengePoints,
  deliverables,
  flowSteps,
  investmentHighlights,
  navItems,
  outOfScope,
  solutionBlocks,
} from "@/lib/proposal-data";

const viewport = { once: true, margin: "-80px", amount: 0.2 };
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.58, ease: "easeOut" } },
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const moralesMarkSrc = `${basePath}/morales-mark-transparent.png`;
const moralesLogoWhiteSrc = `${basePath}/morales-logo-white.png`;
const whatsappNumber = "5511958846541";
const approvalMessage = "Olá! Gostaria de aprovar a proposta para desenvolvimento da nova landing page com catálogo da Bloom Gifts.";

const iconMap = {
  catalog: ShoppingBag,
  layout: LayoutTemplate,
  quantity: MousePointerClick,
  responsive: Smartphone,
  whatsapp: MessageCircle,
};

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function whatsappHref(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function SectionHeader({
  eyebrow,
  title,
  text,
  light = false,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  text?: string;
  light?: boolean;
  align?: "center" | "left";
}) {
  return (
    <motion.div
      className={cn("max-w-3xl", align === "center" ? "mx-auto text-center" : "text-left")}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      <span
        className={cn(
          "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold uppercase",
          light ? "border-white/20 bg-white/10 text-white/75" : "border-bloom-green/20 bg-white/70 text-bloom-graphite",
        )}
      >
        <span className={cn("h-1.5 w-1.5 rounded-full", light ? "bg-bloom-champagne" : "bg-bloom-green")} />
        {eyebrow}
      </span>
      <h2 className={cn("mt-4 text-balance text-3xl font-extrabold leading-tight md:text-5xl", light ? "text-white" : "text-bloom-ink")}>
        {title}
      </h2>
      {text ? <p className={cn("mt-4 text-base leading-8 md:text-lg", light ? "text-white/70" : "text-[#62645f]")}>{text}</p> : null}
    </motion.div>
  );
}

function ButtonLink({
  href,
  children,
  variant = "primary",
  icon = "arrow",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "light";
  icon?: "arrow" | "whatsapp" | "none";
}) {
  const external = href.startsWith("http");
  const Icon = icon === "whatsapp" ? MessageCircle : ArrowRight;

  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-extrabold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bloom-champagne focus-visible:ring-offset-2 focus-visible:ring-offset-bloom-porcelain md:min-h-14 md:px-6",
        variant === "primary" && "bg-bloom-graphite text-white shadow-[0_18px_42px_rgba(31,29,32,0.16)] hover:-translate-y-0.5 hover:bg-bloom-forest",
        variant === "secondary" && "border border-bloom-ink/10 bg-white/80 text-bloom-graphite hover:-translate-y-0.5 hover:border-bloom-green/30 hover:bg-white",
        variant === "light" && "bg-bloom-champagne text-bloom-graphite shadow-[0_18px_44px_rgba(196,147,70,0.22)] hover:-translate-y-0.5 hover:bg-bloom-mint",
      )}
      whileTap={{ scale: 0.98 }}
    >
      {icon !== "none" ? <Icon className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" /> : null}
      {children}
    </motion.a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });
  const approvalHref = whatsappHref(approvalMessage);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 md:px-6 md:pt-4">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[1.35rem] border border-[#e1d5c2] bg-[#fbf7ef] shadow-[0_14px_42px_rgba(31,29,32,0.12)]">
        <div className="h-1 bg-[#eadfcd]">
          <motion.div className="h-full origin-left bg-bloom-green" style={{ scaleX: progress }} />
        </div>

        <div className="grid min-h-[4.65rem] grid-cols-[1fr_auto] items-center gap-4 px-4 py-3 md:grid-cols-[1fr_auto_1fr] md:px-5">
          <a href="#topo" className="flex min-w-0 items-center gap-3" aria-label="Voltar ao início">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f5ebdc] shadow-[0_8px_20px_rgba(31,29,32,0.08)] ring-1 ring-[#d8c8ae]">
              <Image src={moralesMarkSrc} alt="Morales Soluções" width={36} height={36} className="h-8 w-8 object-contain" priority />
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block truncate text-sm font-extrabold text-bloom-graphite">Bloom Gifts</span>
              <span className="block truncate text-xs font-semibold text-[#6f685d]">Landing Page + Catálogo</span>
            </span>
          </a>

          <nav className="hidden items-center justify-center gap-1 rounded-full border border-[#e4d8c5] bg-[#f6eee2] p-1 lg:flex" aria-label="Navegação principal">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-bold text-[#4f4a43] transition hover:bg-white hover:text-bloom-graphite hover:shadow-[0_8px_18px_rgba(31,29,32,0.07)]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden justify-end md:flex">
            <ButtonLink href={approvalHref} icon="whatsapp">
              Aprovar proposta
            </ButtonLink>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d8c8ae] bg-[#fffaf2] text-bloom-graphite shadow-[0_8px_18px_rgba(31,29,32,0.08)] md:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>

        <AnimatePresence>
          {open ? (
            <motion.div
              className="border-t border-[#e4d8c5] bg-[#fbf7ef] px-4 pb-4 pt-2 md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="grid gap-2">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="rounded-xl px-3 py-3 text-sm font-bold text-bloom-graphite transition hover:bg-[#f1e5d3]"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <ButtonLink href={approvalHref} icon="whatsapp">
                  Aprovar proposta
                </ButtonLink>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}

function HeroPreview() {
  return (
    <div className="relative min-h-[320px] md:min-h-[520px]">
      <div className="absolute inset-0 rounded-lg border border-bloom-champagne/15 bg-[#2a2928] shadow-[0_28px_90px_rgba(0,0,0,0.26)]" />
      <div className="absolute inset-4 rounded-lg border border-bloom-champagne/20 bg-bloom-graphite/90 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] md:inset-6 md:p-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-bloom-champagne/25 bg-bloom-champagne/10 p-2 ring-1 ring-white/5">
              <Image src={moralesMarkSrc} alt="Morales Soluções" width={36} height={36} className="h-8 w-8 object-contain brightness-0 invert" />
            </span>
            <div>
              <p className="text-sm font-extrabold text-white">Bloom Gifts</p>
              <p className="text-xs font-semibold text-white/50">Catálogo conectado ao WhatsApp</p>
            </div>
          </div>
          <span className="hidden rounded-full border border-bloom-champagne/35 bg-bloom-champagne/90 px-3 py-1 text-xs font-extrabold text-bloom-graphite sm:inline-flex">Pedido rápido</span>
        </div>

        <div className="mt-6 grid gap-3">
          {["Kit boas-vindas", "Caixa personalizada", "Caneca premium"].map((item, index) => (
            <motion.div
              key={item}
              className="flex items-center justify-between rounded-lg border border-white/10 bg-white/10 p-3"
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + index * 0.08, duration: 0.45, ease: "easeOut" }}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-bloom-champagne/20 text-bloom-champagne">
                  <Gift className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-bold text-white">{item}</p>
                  <p className="text-xs font-semibold text-white/50">Quantidade selecionável</p>
                </div>
              </div>
              <span className="rounded-full border border-bloom-champagne/30 px-3 py-1 text-xs font-extrabold text-bloom-champagne">{index + 2} un.</span>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 rounded-lg bg-bloom-champagne p-4 text-bloom-graphite">
          <div className="flex items-start gap-3">
            <MessageCircle className="mt-0.5 h-5 w-5" aria-hidden="true" />
            <p className="text-sm font-extrabold leading-6">Mensagem pronta com produtos e quantidades para iniciar a conversa.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  const approvalHref = whatsappHref(approvalMessage);

  return (
    <section id="topo" className="relative overflow-hidden bg-bloom-graphite text-white">
      <div className="hero-mesh absolute inset-0" />
      <div className="premium-noise" />
      <Image
        src={moralesLogoWhiteSrc}
        alt=""
        width={520}
        height={335}
        className="pointer-events-none absolute -right-16 top-28 hidden h-auto w-[34rem] object-contain opacity-[0.07] md:block"
        aria-hidden="true"
        priority
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 pt-36 md:grid-cols-[0.95fr_1.05fr] md:px-8 md:pb-20 md:pt-40">
        <div className="relative z-10">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs font-bold text-white/70">
            <Sparkles className="h-4 w-4 text-bloom-champagne" aria-hidden="true" />
            Proposta comercial objetiva
          </div>
          <p className="text-sm font-bold uppercase text-bloom-champagne">Bloom Gifts</p>
          <h1 className="mt-4 max-w-3xl text-balance text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
            Nova presença digital para a Bloom Gifts
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-white/75 md:text-xl">
            Uma landing page elegante com catálogo integrado ao WhatsApp para apresentar a marca, organizar os produtos e facilitar novos pedidos.
          </p>
          <p className="mt-5 max-w-xl text-base leading-8 text-white/60">
            Uma solução objetiva para transformar a página atual em uma experiência mais bonita, clara e preparada para conversão.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={approvalHref} variant="light" icon="whatsapp">
              Aprovar proposta
            </ButtonLink>
            <ButtonLink href="#solucao" variant="secondary">
              Ver solução
            </ButtonLink>
          </div>
        </div>

        <HeroPreview />
      </div>
    </section>
  );
}

function Challenge() {
  return (
    <section id="desafio" className="px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <SectionHeader
            align="left"
            eyebrow="O desafio atual"
            title="Uma página mais clara, profissional e preparada para converter"
            text="A página atual da Bloom Gifts pode evoluir para uma experiência mais profissional, organizada e intuitiva, facilitando a apresentação da marca, dos produtos e o contato direto com clientes interessados."
          />

          <motion.div className="grid gap-3 sm:grid-cols-2" initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}>
            {challengePoints.map((point) => (
              <motion.div key={point} className="rounded-lg border border-bloom-ink/10 bg-white/75 p-4 shadow-[0_18px_50px_rgba(31,29,32,0.06)]" variants={fadeUp}>
                <Check className="h-5 w-5 text-bloom-green" aria-hidden="true" />
                <p className="mt-3 text-sm font-bold leading-6 text-bloom-graphite">{point}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Solution() {
  return (
    <section id="solucao" className="relative overflow-hidden bg-bloom-graphite px-5 py-16 text-white md:px-8 md:py-24">
      <div className="hero-mesh absolute inset-0 opacity-80" />
      <div className="premium-noise" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <SectionHeader
            align="left"
            light
            eyebrow="Solução proposta"
            title="Landing page + catálogo com pedido via WhatsApp"
            text="A proposta é desenvolver uma nova página para a Bloom Gifts com uma apresentação comercial elegante e uma área de catálogo onde o cliente poderá selecionar produtos, definir quantidades e enviar o interesse diretamente pelo WhatsApp."
          />
          <motion.div className="grid gap-3 sm:grid-cols-2" initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}>
            {solutionBlocks.map((block) => {
              const Icon = iconMap[block.icon as keyof typeof iconMap] ?? Sparkles;
              return (
                <motion.div key={block.title} className="rounded-lg border border-white/10 bg-white/10 p-5 backdrop-blur-md" variants={fadeUp}>
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-bloom-champagne text-bloom-graphite">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-lg font-extrabold text-white">{block.title}</h3>
                  <p className="mt-3 text-sm font-semibold leading-6 text-white/60">{block.text}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CatalogDemo() {
  const [quantities, setQuantities] = useState<Record<string, number>>({
    "kit-boas-vindas": 2,
    "caixa-personalizada": 1,
    "caneca-premium": 0,
    "caderno-corporativo": 0,
  });

  const selectedItems = useMemo(
    () => catalogProducts.filter((product) => (quantities[product.id] ?? 0) > 0).map((product) => `${product.name}: ${quantities[product.id]} un.`),
    [quantities],
  );

  const catalogMessage = useMemo(() => {
    if (!selectedItems.length) {
      return "Olá! Gostaria de receber informações sobre os produtos da Bloom Gifts.";
    }

    return `Olá! Tenho interesse nos seguintes produtos da Bloom Gifts:\n\n${selectedItems.join("\n")}`;
  }, [selectedItems]);

  function updateQuantity(productId: string, delta: number) {
    setQuantities((current) => ({
      ...current,
      [productId]: Math.max(0, (current[productId] ?? 0) + delta),
    }));
  }

  return (
    <section id="catalogo" className="px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
          <div>
            <SectionHeader
              align="left"
              eyebrow="Catálogo"
              title="Um exemplo simples do pedido via WhatsApp"
              text="O catálogo poderá exibir os produtos com imagem, nome e informações essenciais. A seleção abaixo ilustra o comportamento principal da nova página."
            />
            <motion.div className="mt-8 rounded-lg border border-bloom-green/20 bg-[#fff7e7] p-5" initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp}>
              <div className="flex items-start gap-3">
                <MessageCircle className="mt-1 h-5 w-5 text-bloom-green" aria-hidden="true" />
                <p className="text-sm font-bold leading-6 text-[#755b2f]">
                  O botão usa uma mensagem personalizada com os produtos selecionados. Na página final, esse fluxo será conectado ao número comercial definido pela Bloom Gifts.
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div className="grid gap-3 sm:grid-cols-2" initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}>
            {catalogProducts.map((product) => {
              const quantity = quantities[product.id] ?? 0;
              return (
                <motion.article key={product.id} className="rounded-lg border border-bloom-ink/10 bg-white/80 p-4 shadow-[0_18px_50px_rgba(31,29,32,0.07)]" variants={fadeUp}>
                  <div className={cn("flex h-32 items-center justify-center rounded-lg", product.accent)}>
                    <Package className={cn("h-12 w-12", product.accent === "bg-bloom-forest" ? "text-white" : "text-bloom-graphite")} aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-lg font-extrabold text-bloom-graphite">{product.name}</h3>
                  <p className="mt-2 min-h-16 text-sm font-semibold leading-6 text-[#62645f]">{product.description}</p>
                  <div className="mt-4 flex items-center justify-between rounded-lg border border-bloom-ink/10 bg-bloom-porcelain p-2">
                    <button
                      type="button"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-bloom-graphite shadow-[0_8px_22px_rgba(31,29,32,0.08)] transition hover:bg-bloom-champagne disabled:cursor-not-allowed disabled:opacity-40"
                      onClick={() => updateQuantity(product.id, -1)}
                      disabled={quantity === 0}
                      aria-label={`Reduzir quantidade de ${product.name}`}
                    >
                      <Minus className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <span className="min-w-16 text-center text-lg font-extrabold text-bloom-graphite">{quantity}</span>
                    <button
                      type="button"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-bloom-graphite text-white shadow-[0_8px_22px_rgba(31,29,32,0.12)] transition hover:bg-bloom-forest"
                      onClick={() => updateQuantity(product.id, 1)}
                      aria-label={`Aumentar quantidade de ${product.name}`}
                    >
                      <Plus className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </motion.article>
              );
            })}
            <motion.div className="rounded-lg bg-bloom-graphite p-5 text-white sm:col-span-2" variants={fadeUp}>
              <p className="text-sm font-semibold leading-6 text-white/60">Mensagem gerada</p>
              <p className="mt-3 whitespace-pre-line text-sm font-bold leading-6 text-white">{catalogMessage}</p>
              <div className="mt-5">
                <ButtonLink href={whatsappHref(catalogMessage)} variant="light" icon="whatsapp">
                  Enviar seleção no WhatsApp
                </ButtonLink>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Flow() {
  return (
    <section className="px-5 pb-16 md:px-8 md:pb-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Como vai funcionar" title="Um fluxo simples, claro e direto" />
        <motion.div className="mt-10 grid gap-4 md:grid-cols-4" initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}>
          {flowSteps.map((step, index) => (
            <motion.article key={step.title} className="relative rounded-lg border border-bloom-ink/10 bg-white/75 p-5 shadow-[0_18px_50px_rgba(31,29,32,0.06)]" variants={fadeUp}>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-bloom-graphite text-sm font-extrabold text-bloom-champagne">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-lg font-extrabold leading-6 text-bloom-graphite">{step.title}</h3>
              <p className="mt-3 text-sm font-semibold leading-6 text-[#62645f]">{step.text}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Scope() {
  return (
    <section className="px-5 pb-16 md:px-8 md:pb-24">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
        <motion.div className="rounded-lg border border-bloom-ink/10 bg-white/75 p-6 shadow-[0_20px_60px_rgba(31,29,32,0.07)] md:p-8" initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp}>
          <h2 className="text-3xl font-extrabold text-bloom-graphite">O que está incluso</h2>
          <div className="mt-6 grid gap-3">
            {deliverables.map((item) => (
              <div key={item} className="flex gap-3">
                <Check className="mt-1 h-5 w-5 shrink-0 text-bloom-green" aria-hidden="true" />
                <p className="text-sm font-bold leading-6 text-[#55564f]">{item}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 rounded-lg bg-bloom-porcelain p-4 text-sm font-semibold leading-6 text-[#62645f]">
            Cadastro, edição ou atualização recorrente de produtos após a entrega não está incluso como rotina mensal, salvo contratação adicional.
          </p>
        </motion.div>

        <motion.div className="rounded-lg border border-bloom-ink/10 bg-bloom-graphite p-6 text-white shadow-[0_20px_60px_rgba(31,29,32,0.12)] md:p-8" initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp}>
          <h2 className="text-3xl font-extrabold">O que não está incluso nesta proposta</h2>
          <div className="mt-6 grid gap-3">
            {outOfScope.map((item) => (
              <div key={item} className="flex gap-3">
                <X className="mt-1 h-5 w-5 shrink-0 text-bloom-champagne" aria-hidden="true" />
                <p className="text-sm font-bold leading-6 text-white/70">{item}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 rounded-lg border border-white/10 bg-white/10 p-4 text-sm font-semibold leading-6 text-white/70">
            Esses recursos podem ser avaliados futuramente em uma proposta separada, caso a Bloom queira evoluir a solução.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function Investment() {
  const approvalHref = whatsappHref(approvalMessage);

  return (
    <section id="investimento" className="relative overflow-hidden bg-bloom-graphite px-5 py-16 text-white md:px-8 md:py-24">
      <div className="hero-mesh absolute inset-0 opacity-80" />
      <div className="premium-noise" />
      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <SectionHeader
          align="left"
          light
          eyebrow="Investimento"
          title="R$ 2.500,00"
          text="Desenvolvimento da nova landing page com catálogo e direcionamento personalizado para WhatsApp."
        />

        <motion.div className="rounded-lg border border-white/10 bg-white/10 p-6 backdrop-blur-md md:p-8" initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp}>
          <div className="grid gap-3 sm:grid-cols-2">
            {investmentHighlights.map((item) => (
              <div key={item} className="flex gap-3 rounded-lg bg-white/10 p-4">
                <Check className="mt-1 h-5 w-5 shrink-0 text-bloom-champagne" aria-hidden="true" />
                <p className="text-sm font-bold leading-6 text-white/75">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-white/10 p-5">
              <Clock3 className="h-5 w-5 text-bloom-champagne" aria-hidden="true" />
              <h3 className="mt-3 text-lg font-extrabold">Prazo de desenvolvimento</h3>
              <p className="mt-3 text-sm font-semibold leading-6 text-white/70">
                Prazo estimado de até 20 dias úteis, considerando alinhamento inicial, desenvolvimento, ajustes finais e publicação.
              </p>
            </div>
            <div className="rounded-lg border border-white/10 p-5">
              <Send className="h-5 w-5 text-bloom-champagne" aria-hidden="true" />
              <h3 className="mt-3 text-lg font-extrabold">Condição sugerida</h3>
              <p className="mt-3 text-sm font-semibold leading-6 text-white/70">50% para início do projeto e 50% na entrega/publicação.</p>
            </div>
          </div>

          <p className="mt-5 text-xs font-semibold leading-6 text-white/50">
            O prazo pode variar conforme o envio de imagens, informações dos produtos e retornos necessários para fechamento.
          </p>
          <div className="mt-7">
            <ButtonLink href={approvalHref} variant="light" icon="whatsapp">
              Aprovar proposta
            </ButtonLink>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="px-5 py-16 md:px-8 md:py-24">
      <motion.div
        className="mx-auto max-w-5xl rounded-lg border border-bloom-ink/10 bg-white/80 p-7 text-center shadow-[0_24px_80px_rgba(31,29,32,0.08)] md:p-12"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={fadeUp}
      >
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-bloom-graphite text-bloom-champagne">
          <Gift className="h-6 w-6" aria-hidden="true" />
        </span>
        <h2 className="mt-5 text-balance text-3xl font-extrabold leading-tight text-bloom-graphite md:text-5xl">
          Prontos para transformar a página da Bloom Gifts?
        </h2>
        <p className="mx-auto mt-5 max-w-3xl text-base font-semibold leading-8 text-[#62645f] md:text-lg">
          Com uma página mais bonita, organizada e conectada ao WhatsApp, a Bloom Gifts ganha uma experiência mais profissional para apresentar seus produtos e receber novos pedidos.
        </p>
        <div className="mt-8">
          <ButtonLink href={whatsappHref(approvalMessage)} icon="whatsapp">
            Aprovar proposta
          </ButtonLink>
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-bloom-ink/8 bg-bloom-porcelain px-5 py-10 md:px-8">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-[0_12px_32px_rgba(31,29,32,0.08)] ring-1 ring-bloom-ink/5">
          <Image src={moralesMarkSrc} alt="Morales Soluções" width={34} height={34} className="h-8 w-8 object-contain" />
        </span>
        <p className="mt-5 text-sm font-semibold leading-6 text-[#62645f]">© 2026 Morales Soluções. Todos os direitos reservados.</p>
        <p className="mt-2 text-sm font-semibold leading-6 text-[#62645f]">
          Desenvolvido por{" "}
          <a
            href="https://moralessolucoes.com.br/tecnologia"
            target="_blank"
            rel="noopener noreferrer"
            className="font-extrabold text-bloom-green transition hover:text-bloom-graphite"
          >
            Morales Soluções
          </a>
        </p>
      </div>
    </footer>
  );
}

export function ProposalPage() {
  return (
    <MotionConfig reducedMotion="user">
      <main className="min-h-screen overflow-x-hidden">
        <Header />
        <Hero />
        <Challenge />
        <Solution />
        <CatalogDemo />
        <Flow />
        <Scope />
        <Investment />
        <FinalCta />
        <Footer />
      </main>
    </MotionConfig>
  );
}
