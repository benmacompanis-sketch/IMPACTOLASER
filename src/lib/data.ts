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
  Wind,
  ShieldCheck,
  Crosshair,
  type LucideIcon,
} from "lucide-react";

/* ── Tecnología: beneficios clave ── */
export type Benefit = { icon: LucideIcon; label: string };

export const benefits: Benefit[] = [
  { icon: Droplets, label: "Sin agua" },
  { icon: FlaskConical, label: "Sin químicos" },
  { icon: Sparkles, label: "Sin abrasivos" },
  { icon: Hand, label: "Sin contacto físico" },
  { icon: Trash2, label: "Sin residuos" },
  { icon: Wind, label: "Sin polvo" },
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
    points: ["Agua", "Químicos", "Lijas", "Abrasión", "Polvo", "Residuos", "Daño potencial"],
  },
  laser: {
    title: "Limpieza Láser",
    points: [
      "Precisión extrema",
      "Sin contacto",
      "Sin desgaste",
      "Sin químicos",
      "Sin residuos",
      "Conserva la superficie original",
    ],
  },
} as const;

/* ── Estadísticas ── */
export type Stat = { value: number; suffix: string; label: string };

export const stats: Stat[] = [
  { value: 100, suffix: "%", label: "Respeto por la superficie original" },
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
      "Definimos la longitud de onda, potencia y parámetros del láser para cada material específico.",
  },
  {
    step: "03",
    title: "Aplicación del láser",
    description:
      "El haz vaporiza únicamente la capa contaminante mediante ablación, sin tocar el material base.",
  },
  {
    step: "04",
    title: "Resultado final",
    description:
      "Entregamos la superficie original recuperada, limpia, sin residuos ni daño estructural.",
  },
];

/* ── Testimonios ── */
export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  initials: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Recuperaron la fachada de piedra de nuestro edificio histórico sin un solo rasguño. El resultado parece imposible.",
    author: "Administración Belgrano",
    role: "Consorcio · Restauración de fachada",
    initials: "AB",
  },
  {
    quote:
      "Limpiamos un lote completo de autopartes de fundición. Cero abrasión, cero residuos y una precisión que ningún químico nos había dado.",
    author: "Taller Mecánico Sur",
    role: "Industria · Restauración de motores",
    initials: "TS",
  },
  {
    quote:
      "Quitaron grafitis de un monumento protegido respetando la pátina original. Patrimonio intacto, suciedad eliminada.",
    author: "Dirección de Cultura",
    role: "Patrimonio · Monumento urbano",
    initials: "DC",
  },
  {
    quote:
      "La parrilla y el hogar a leña quedaron como nuevos, sin desarmar nada y sin productos tóxicos en casa.",
    author: "Familia Ortega",
    role: "Hogar · Parrilla y hogar a leña",
    initials: "FO",
  },
];

/* ── FAQ ── */
export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  {
    question: "¿La limpieza láser daña la superficie?",
    answer:
      "No. El láser actúa únicamente sobre la capa contaminante que está por encima del material original. La energía está calibrada para vaporizar suciedad, óxido o pintura sin alterar el sustrato, por eso es el método elegido para patrimonio y piezas de alto valor.",
  },
  {
    question: "¿Utiliza químicos?",
    answer:
      "Ninguno. Es un proceso 100% en seco: sin agua, sin solventes y sin detergentes. No hay productos tóxicos involucrados ni en el proceso ni en el resultado.",
  },
  {
    question: "¿Genera residuos?",
    answer:
      "Prácticamente no. El contaminante se convierte en partículas que captamos por aspiración. No quedan barros, no hay desechos líquidos ni polvo abrasivo disperso.",
  },
  {
    question: "¿Qué materiales pueden limpiarse?",
    answer:
      "Metales (hierro, acero, aluminio, bronce, cobre, plata, oro), piedra, mármol, cemento, ladrillo, madera, porcelanato y más. Ajustamos los parámetros del láser a cada material.",
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
