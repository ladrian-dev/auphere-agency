/**
 * §6.2 — "El plano vivo": los estados del escenario narrativo.
 *
 * La home no tiene una ilustración por sección: tiene UNA pieza que se
 * reconfigura mientras bajas. Cada sección declara su estado y el escenario
 * mueve los mismos nodos a posiciones distintas. Los nodos nunca se destruyen
 * ni se recrean — se transportan. Eso es lo que hace que se lea como una sola
 * máquina contando su propia historia y no como cuatro dibujos sueltos.
 *
 * El sistema de coordenadas es el viewBox 0 0 720 620, compartido por todos los
 * estados.
 */

export const STAGE_VIEWBOX = { w: 720, h: 620 } as const;

/** Identificadores estables de cada nodo del plano. */
export const NODE_IDS = [
  'ch0',
  'ch1',
  'ch2',
  'ch3',
  'core',
  'out',
  'human',
  'tool0',
  'tool1',
  'tool2',
  'tool3',
] as const;

export type NodeId = (typeof NODE_IDS)[number];

export type StageStateId = 'network' | 'tracks' | 'capability' | 'timeline' | 'isolation';

export interface NodeLayout {
  /** Centro del nodo en coordenadas del viewBox. */
  x: number;
  y: number;
  /** Ancho de la caja. La altura es fija por tipo. */
  w: number;
  /** 0 = oculto. Permite retirar nodos que no participan en un estado. */
  opacity: number;
  /** Escala local, para destacar o hundir un nodo sin moverlo. */
  scale?: number;
}

export interface StageState {
  id: StageStateId;
  /**
   * Superficie sobre la que se dibuja este acto. El plano hereda `currentColor`
   * y vive en un carril que es hermano de las secciones, no hijo: sin esto
   * pintaba en tinta oscura sobre la sección oscura de compromisos y
   * desaparecía. Cada estado declara su tono y el carril lo aplica.
   */
  tone: 'light' | 'dark';
  /** Posición de cada nodo en este estado. */
  nodes: Record<NodeId, NodeLayout>;
  /**
   * Conexiones activas, como pares de nodos. El escenario dibuja una curva
   * entre los centros; las que desaparecen se destrazan con DrawSVG.
   */
  links: Array<[NodeId, NodeId]>;
  /** Etiquetas auxiliares que solo existen en este estado. */
  annotations?: Array<{ x: number; y: number; key: string; align?: 'start' | 'middle' | 'end' }>;
  /** Marcos que encuadran grupos de nodos (usado por `tracks`). */
  frames?: Array<{ x: number; y: number; w: number; h: number; key: string }>;
}

const hidden = (x: number, y: number): NodeLayout => ({ x, y, w: 130, opacity: 0 });

/**
 * 00 · HERO — la red completa.
 * Cuatro canales entran, el núcleo clasifica, sale una respuesta y una rama
 * sube hacia la persona. Es el producto entero en un plano.
 */
const network: StageState = {
  id: 'network',
  tone: 'dark',
  nodes: {
    // 175 de ancho: un canal puede llevar sufijo de estado ("TIKTOK · PRONTO").
    ch0: { x: 110, y: 110, w: 175, opacity: 1 },
    ch1: { x: 110, y: 232, w: 175, opacity: 1 },
    ch2: { x: 110, y: 354, w: 175, opacity: 1 },
    ch3: { x: 110, y: 476, w: 175, opacity: 1 },
    core: { x: 370, y: 300, w: 150, opacity: 1, scale: 1 },
    out: { x: 630, y: 300, w: 130, opacity: 1 },
    human: { x: 622, y: 96, w: 150, opacity: 1 },
    tool0: { x: 150, y: 570, w: 120, opacity: 1 },
    tool1: { x: 290, y: 570, w: 120, opacity: 1 },
    tool2: { x: 430, y: 570, w: 120, opacity: 1 },
    tool3: { x: 570, y: 570, w: 120, opacity: 1 },
  },
  links: [
    ['ch0', 'core'],
    ['ch1', 'core'],
    ['ch2', 'core'],
    ['ch3', 'core'],
    ['core', 'out'],
    ['core', 'human'],
    ['core', 'tool0'],
    ['core', 'tool1'],
    ['core', 'tool2'],
    ['core', 'tool3'],
  ],
};

/**
 * 01 · TRES FORMAS — la misma máquina, tres envolturas.
 * El núcleo se queda quieto y los canales se reagrupan en tres columnas. Lo
 * que cambia no es el motor: es el marco que lo rodea.
 */
const tracks: StageState = {
  id: 'tracks',
  tone: 'light',
  nodes: {
    ch0: { x: 130, y: 300, w: 150, opacity: 1 },
    ch1: { x: 360, y: 300, w: 150, opacity: 1 },
    ch2: { x: 590, y: 300, w: 150, opacity: 1 },
    ch3: hidden(360, 300),
    core: { x: 360, y: 470, w: 160, opacity: 1, scale: 1 },
    out: hidden(360, 470),
    human: hidden(360, 300),
    tool0: hidden(130, 470),
    tool1: hidden(360, 470),
    tool2: hidden(590, 470),
    tool3: hidden(360, 470),
  },
  links: [
    ['ch0', 'core'],
    ['ch1', 'core'],
    ['ch2', 'core'],
  ],
  frames: [
    { x: 130, y: 300, w: 190, h: 150, key: 'hire' },
    { x: 360, y: 300, w: 190, h: 150, key: 'resell' },
    { x: 590, y: 300, w: 190, h: 150, key: 'embed' },
  ],
  annotations: [{ x: 360, y: 556, key: 'sharedEngine', align: 'middle' }],
};

/**
 * 02 · CAPACIDADES — el núcleo se abre y las herramientas pasan a primer plano.
 * Los canales se retiran al fondo: aquí la historia no es por dónde entra la
 * conversación, sino qué sabe hacer el agente con ella.
 */
const capability: StageState = {
  id: 'capability',
  tone: 'light',
  nodes: {
    ch0: { x: 108, y: 120, w: 170, opacity: 0.28 },
    ch1: { x: 108, y: 210, w: 170, opacity: 0.28 },
    ch2: { x: 108, y: 300, w: 170, opacity: 0.28 },
    ch3: { x: 108, y: 390, w: 170, opacity: 0.28 },
    core: { x: 380, y: 255, w: 190, opacity: 1, scale: 1.12 },
    out: hidden(380, 255),
    human: hidden(600, 120),
    tool0: { x: 200, y: 500, w: 150, opacity: 1 },
    tool1: { x: 380, y: 500, w: 150, opacity: 1 },
    tool2: { x: 560, y: 500, w: 150, opacity: 1 },
    tool3: { x: 380, y: 578, w: 150, opacity: 1 },
  },
  links: [
    ['core', 'tool0'],
    ['core', 'tool1'],
    ['core', 'tool2'],
    ['core', 'tool3'],
  ],
};

/**
 * 03 · CÓMO TRABAJAMOS — todo colapsa en una línea temporal de tres estaciones.
 * El mismo plano se convierte en el calendario del proyecto.
 */
const timeline: StageState = {
  id: 'timeline',
  tone: 'light',
  nodes: {
    ch0: { x: 150, y: 310, w: 160, opacity: 1 },
    ch1: { x: 360, y: 310, w: 160, opacity: 1 },
    ch2: { x: 570, y: 310, w: 160, opacity: 1 },
    ch3: hidden(360, 310),
    core: hidden(360, 310),
    out: hidden(570, 310),
    human: hidden(360, 150),
    tool0: hidden(150, 430),
    tool1: hidden(360, 430),
    tool2: hidden(570, 430),
    tool3: hidden(360, 430),
  },
  links: [
    ['ch0', 'ch1'],
    ['ch1', 'ch2'],
  ],
  annotations: [
    { x: 150, y: 248, key: 't0' },
    { x: 360, y: 248, key: 't1' },
    { x: 570, y: 248, key: 't2' },
  ],
};

/**
 * 04 · COMPROMISOS — colapsa en el nodo de aislamiento.
 * Dos inquilinos, un muro que impone la base de datos. Es el argumento de la
 * sección dibujado, no descrito.
 */
const isolation: StageState = {
  id: 'isolation',
  tone: 'dark',
  nodes: {
    ch0: { x: 185, y: 250, w: 170, opacity: 1 },
    ch1: { x: 185, y: 380, w: 170, opacity: 1 },
    ch2: { x: 545, y: 250, w: 170, opacity: 1 },
    ch3: { x: 545, y: 380, w: 170, opacity: 1 },
    core: hidden(365, 315),
    out: hidden(365, 315),
    human: hidden(365, 150),
    tool0: hidden(185, 500),
    tool1: hidden(365, 500),
    tool2: hidden(545, 500),
    tool3: hidden(365, 500),
  },
  links: [],
  annotations: [
    { x: 185, y: 190, key: 'tenantA' },
    { x: 545, y: 190, key: 'tenantB' },
    { x: 365, y: 470, key: 'wall', align: 'middle' },
  ],
};

export const STAGE_STATES: Record<StageStateId, StageState> = {
  network,
  tracks,
  capability,
  timeline,
  isolation,
};
