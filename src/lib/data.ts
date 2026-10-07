/**
 * Content model for every section of the landing.
 * Centralised so copy and lists can evolve without touching components.
 */

import {
  Droplets,
  FlaskConical,
  Sparkles,
  Hand,
  Trash2,
  Gauge,
  ShieldCheck,
  Crosshair,
  type LucideIcon,
} from "lucide-react";

/*
 * Afirmaciones revisadas con el dueño (oct 2026). Lo que dice la publicidad
 * pasa a formar parte de la oferta (Ley 24.240, art. 8), así que no volver a
 * poner sin consultarlo:
 *  - "Sin residuos" a secas: el laser vaporiza el contaminante y eso hace
 *    humo. Lo cierto es que no deja residuos secundarios (arena, barro, agua).
 *  - "Sin polvo": se ve humo, y no siempre se trabaja con aspiración.
 *  - "No tóxico": no se usan químicos, pero el humo no se debe respirar.
 *  - "100% respeto por la superficie": no daña porque siempre se arranca con
 *    pruebas a baja energía (clave en superficies delicadas como la madera),
 *    pero un 100% se lee como garantía.
 */

/* ── Tecnología: beneficios clave ── */
export type Benefit = { icon: LucideIcon; label: string };

export const benefits: Benefit[] = [
  { icon: Droplets, label: "Sin agua" },
  { icon: FlaskConical, label: "Sin químicos" },
  { icon: Sparkles, label: "Sin abrasivos" },
  { icon: Hand, label: "Sin contacto físico" },
  { icon: Trash2, label: "Sin residuos secundarios" },
  { icon: Gauge, label: "Prueba previa a baja energía" },
  { icon: ShieldCheck, label: "Conserva la superficie original" },
  { icon: Crosshair, label: "Máxima precisión" },
];

/* ── Qué removemos ── */
export type RemovalItem = {
  title: string;
  description: string;
};

export const removals: RemovalItem[] = [
  { title: "Pintura", description: "Capas de pintura y recubrimientos sin atacar el material base." },
  { title: "Óxido", description: "Corrosión y óxido superficial en metales ferrosos y no ferrosos." },
  { title: "Sarro", description: "Incrustaciones minerales y sarro acumulado por el tiempo." },
  { title: "Aceite", description: "Películas de aceite adheridas a piezas y maquinaria." },
  { title: "Grasas", description: "Grasa industrial y de cocina, incluso carbonizada." },
  { title: "Grafitis", description: "Vandalismo y pintadas sobre fachadas y patrimonio." },
  { title: "Suciedad extrema", description: "Hollín, polución y depósitos de difícil acceso." },
  { title: "Manchas antiguas", description: "Marcas envejecidas que otros métodos no logran quitar." },
];

/* ── Superficies ── */
export type SurfaceGroup = {
  category: string;
  caption: string;
  items: string[];
};

export const surfaceGroups: SurfaceGroup[] = [
  {
    category: "Metal",
    caption: "Ferrosos y nobles",
    items: ["Hierro", "Acero inoxidable", "Fundición", "Aluminio", "Bronce", "Cobre", "Plata", "Oro"],
  },
  {
    category: "Construcción",
    caption: "Obra y revestimiento",
    items: ["Piedra", "Mármol", "Cemento", "Azulejos", "Ladrillo visto"],
  },
  {
    category: "Otros",
    caption: "Materiales delicados",
    items: ["Madera", "Porcelanato", "Juntas"],
  },
];

/* ── Aplicaciones ── */
export type Application = { title: string; group: string };

export const applications: Application[] = [
  { title: "Fachadas", group: "Arquitectura" },
  { title: "Casas", group: "Arquitectura" },
  { title: "Locales", group: "Arquitectura" },
  { title: "Administraciones de edificios", group: "Arquitectura" },
  { title: "Hoteles", group: "Arquitectura" },
  { title: "Countries", group: "Arquitectura" },
  { title: "Restauración histórica", group: "Patrimonio" },
  { title: "Monumentos", group: "Patrimonio" },
  { title: "Museos", group: "Patrimonio" },
  { title: "Iglesias", group: "Patrimonio" },
  { title: "Cementerios", group: "Patrimonio" },
  { title: "Parrillas", group: "Hogar" },
  { title: "Hogares a leña", group: "Hogar" },
  { title: "Motores", group: "Industria" },
  { title: "Autopartes", group: "Industria" },
  { title: "Maquinaria industrial", group: "Industria" },
];

/* ── Comparativa ── */
export const comparison = {
  traditional: {
    title: "Métodos tradicionales",
    points: ["Agua", "Químicos", "Lijas", "Abrasión", "Polvo abrasivo", "Residuos", "Daño potencial"],
  },
  laser: {
    title: "Limpieza Laser",
    points: [
      "Precisión extrema",
      "Sin contacto",
      "Sin desgaste",
      "Sin químicos",
      "Sin residuos secundarios",
      "Conserva la superficie original",
    ],
  },
} as const;

/* ── Estadísticas ── */
export type Stat = { value: number; suffix: string; label: string };

export const stats: Stat[] = [
  { value: 100, suffix: "%", label: "Proceso en seco" },
  { value: 0, suffix: "%", label: "Químicos" },
  { value: 0, suffix: "%", label: "Abrasivos" },
  { value: 100, suffix: "%", label: "Precisión controlada" },
];

/* ── Proceso ── */
export type ProcessStep = { step: string; title: string; description: string };

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Evaluación",
    description:
      "Analizamos la superficie, el tipo de contaminante y el resultado esperado, en sitio o por imágenes.",
  },
  {
    step: "02",
    title: "Análisis",
    description:
      "Definimos la longitud de onda, potencia y parámetros del laser para cada material, con una prueba previa a baja energía.",
  },
  {
    step: "03",
    title: "Aplicación del laser",
    description:
      "El haz vaporiza únicamente la capa contaminante mediante ablación, sin tocar el material base.",
  },
  {
    step: "04",
    title: "Resultado final",
    description:
      "Entregamos la superficie original recuperada y limpia, sin restos de arena, agua ni químicos.",
  },
];

/* ── Testimonios ── */
export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  initials: string;
};

// Solo testimonios reales, textuales y con permiso escrito del cliente.
// Mientras esta lista esté vacía, la sección no se muestra.
export const testimonials: Testimonial[] = [];

/* ── FAQ ── */
export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  {
    question: "¿La limpieza laser daña la superficie?",
    answer:
      "No, si se calibra bien. Por eso siempre arrancamos con pruebas a baja energía y ajustamos hasta sacar la suciedad, el óxido o la pintura sin marcar el material de abajo. En superficies delicadas, como la madera, esa prueba es clave. Por esa precisión se usa en patrimonio y piezas de alto valor.",
  },
  {
    question: "¿Utiliza químicos?",
    answer:
      "Ninguno. Es un proceso 100% en seco: sin agua, sin solventes y sin detergentes.",
  },
  {
    question: "¿Genera residuos?",
    answer:
      "Mucho menos que los métodos tradicionales. No deja residuos secundarios: no hay arena, barro ni líquidos para juntar después, como pasa con el arenado o los químicos. Lo que sí se ve es humo, porque el laser vaporiza el óxido o la pintura que elimina.",
  },
  {
    question: "¿Hay que tomar alguna precaución mientras trabajan?",
    answer:
      "Sí. El humo que se genera al vaporizar óxido o pintura no se debe respirar. Por eso trabajamos con máscara y recomendamos que nadie se quede al lado mientras dura la limpieza.",
  },
  {
    question: "¿Qué materiales pueden limpiarse?",
    answer:
      "Metales (hierro, acero, aluminio, bronce, cobre, plata, oro), piedra, mármol, cemento, ladrillo, madera, porcelanato y más. Ajustamos los parámetros del laser a cada material.",
  },
  {
    question: "¿Puede utilizarse en patrimonio histórico?",
    answer:
      "Sí, es uno de sus usos más valiosos. Por su precisión y su carácter no abrasivo, se utiliza en monumentos, museos, iglesias y restauraciones donde conservar la superficie original es prioritario.",
  },
  {
    question: "¿Puede utilizarse en piezas industriales?",
    answer:
      "Absolutamente. Motores, autopartes, moldes y maquinaria: removemos óxido, grasa y pintura sin desgaste dimensional, ideal para mantenimiento y preparación de superficies.",
  },
];
