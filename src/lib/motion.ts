/**
 * Ajustes compartidos de las animaciones de entrada.
 *
 * Antes cada componente usaba un margen NEGATIVO (-40px, -60px, -80px): la
 * animación arrancaba recién cuando el elemento ya estaba adentro de la
 * pantalla, y después tardaba casi un segundo. Al scrollear a ritmo normal se
 * llegaba a las secciones con el texto todavía apareciendo (medido: 56% del
 * texto en pantalla, en promedio), y eso se sentía como que la web no cargaba.
 *
 * Con un margen POSITIVO abajo, la animación se dispara mientras el elemento
 * todavía está debajo de la pantalla, así cuando el visitante llega ya terminó.
 * Quien scrollea despacio igual ve la entrada; a ritmo normal, el contenido
 * simplemente ya está ahí.
 */
export const REVEAL_VIEWPORT_MARGIN = "0px 0px 40% 0px";
