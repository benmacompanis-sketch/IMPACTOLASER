import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Política de Privacidad",
  description: "Cómo IMPACTO LÁSER trata los datos de contacto de los visitantes.",
};

export default function PrivacidadPage() {
  return (
    <main className="relative z-10 mx-auto max-w-2xl px-6 py-24 sm:py-32">
      <Link
        href="/"
        className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-laser-200"
      >
        <ArrowLeft className="size-4" /> Volver al inicio
      </Link>

      <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">
        Política de Privacidad
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Última actualización: 23 de septiembre de 2026
      </p>

      <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-foreground/80">
        <p>En IMPACTO LÁSER respetamos tu privacidad. Esta política explica qué datos recibimos y cómo los usamos.</p>

        <section>
          <h2 className="font-display text-lg font-semibold text-white">1. Responsable</h2>
          <p className="mt-2">
            IMPACTO LÁSER — impactolaser.arg@gmail.com — WhatsApp +54 11 5876-1471 — Buenos Aires, Argentina.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-white">2. Qué datos recibimos</h2>
          <p className="mt-2">
            Este sitio no utiliza cookies de seguimiento, no tiene herramientas de analítica ni formularios que
            almacenen información. Solo recibimos los datos que nos brindás voluntariamente cuando nos escribís por
            WhatsApp, teléfono o correo electrónico (por ejemplo, tu nombre, teléfono y tu consulta).
          </p>
          <p className="mt-2">
            Además, nuestro proveedor de alojamiento (Vercel Inc., con servidores en Estados Unidos) registra
            automáticamente datos técnicos de cada visita, como la dirección IP, el navegador y la fecha de acceso, con
            fines de seguridad y funcionamiento del sitio. No usamos esos datos para identificarte.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-white">3. Para qué los usamos</h2>
          <p className="mt-2">
            Únicamente para responder tu consulta y elaborar presupuestos. No los usamos para publicidad ni los vendemos
            a terceros.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-white">4. Con quién se comparten</h2>
          <p className="mt-2">
            No compartimos tus datos con terceros, salvo los medios necesarios para comunicarnos con vos: WhatsApp
            (Meta Platforms) si nos escribís por ese canal, y nuestro proveedor de correo. Cada uno cuenta con su propia
            política de privacidad.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-white">5. Cuánto tiempo los guardamos</h2>
          <p className="mt-2">
            Conservamos tu consulta el tiempo necesario para atenderla y, si contratás un servicio, mientras dure la
            relación comercial.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-white">6. Tus derechos (Ley 25.326)</h2>
          <p className="mt-2">
            Podés solicitar acceder, rectificar o eliminar tus datos escribiéndonos a impactolaser.arg@gmail.com. El
            organismo de control es la Agencia de Acceso a la Información Pública (AAIP —{" "}
            <a
              href="https://www.argentina.gob.ar/aaip"
              target="_blank"
              rel="noopener noreferrer"
              className="text-laser-200 underline underline-offset-2"
            >
              argentina.gob.ar/aaip
            </a>
            ). El derecho de acceso puede ejercerse en forma gratuita a intervalos no inferiores a seis meses, salvo que
            se acredite un interés legítimo al efecto (art. 14, inc. 3, Ley 25.326).
          </p>
          <p className="mt-4 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 text-sm text-foreground/70">
            LA AGENCIA DE ACCESO A LA INFORMACIÓN PÚBLICA, en su carácter de Órgano de Control de la Ley N° 25.326,
            tiene la atribución de atender las denuncias y reclamos que interpongan quienes resulten afectados en sus
            derechos por incumplimiento de las normas vigentes en materia de protección de datos personales.
          </p>
        </section>
      </div>
    </main>
  );
}
