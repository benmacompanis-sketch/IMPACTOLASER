import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Aviso Legal",
  description: "Términos de uso e información legal del sitio de IMPACTO LÁSER.",
};

export default function AvisoLegalPage() {
  return (
    <main className="relative z-10 mx-auto max-w-2xl px-6 py-24 sm:py-32">
      <Link
        href="/"
        className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-laser-200"
      >
        <ArrowLeft className="size-4" /> Volver al inicio
      </Link>

      <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">Aviso Legal</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Última actualización: 19 de septiembre de 2026
      </p>

      <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-foreground/80">
        <section>
          <h2 className="font-display text-lg font-semibold text-white">1. Titular</h2>
          <p className="mt-2">
            Este sitio pertenece a IMPACTO LÁSER (Buenos Aires, Argentina). Contacto: impactolaser.arg@gmail.com.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-white">2. Objeto</h2>
          <p className="mt-2">
            El sitio tiene fines informativos sobre nuestros servicios de limpieza y restauración por láser. La
            información es orientativa y no constituye una oferta contractual vinculante.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-white">3. Imágenes y demostraciones</h2>
          <p className="mt-2">
            Las imágenes del comparador «antes / después» y el resto del material visual son ilustrativas de la
            tecnología de limpieza láser y no representan necesariamente un trabajo puntual realizado. Los resultados
            reales dependen del tipo de superficie, su estado y las condiciones de cada caso.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-white">4. Resultados y presupuestos</h2>
          <p className="mt-2">
            Cada trabajo se evalúa y cotiza de forma individual según la superficie. Los alcances, tiempos y resultados
            se confirman tras una evaluación previa. Ninguna afirmación de este sitio garantiza un resultado idéntico en
            todos los casos.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-white">5. Propiedad intelectual</h2>
          <p className="mt-2">
            Los contenidos, la marca, el logo y el diseño del sitio son propiedad de IMPACTO LÁSER y no pueden
            reproducirse sin autorización.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-white">6. Ley aplicable</h2>
          <p className="mt-2">Este aviso se rige por las leyes de la República Argentina.</p>
        </section>
      </div>
    </main>
  );
}
