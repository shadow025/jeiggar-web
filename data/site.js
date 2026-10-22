// Contenido del sitio JEIGGAR. Todo el texto proviene del sitio actual jeiggar.co
// (ver notas del equipo en Figma). Las imágenes son fotografías de stock de Unsplash
// (licencia Unsplash) usadas como reemplazo de los marcadores "Aquí va: imagen".

const U = (id, w = 1200, extra = '') =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80${extra}`;

const empresa = {
  nombre: 'JEIGGAR',
  nombreLargo: 'JEIGGAR INGENIERÍA Y CONSTRUCCIÓN',
  lema: 'Expertos en ingeniería y construcción con más de 8 años de experiencia en el mercado.',
  direccion: 'Calle 21AN 1-112 Local 1, Prados del Norte, Cúcuta',
  telefono: '+57 301 665 1308',
  telefonoHref: 'tel:+573016651308',
  whatsapp: '573054807054',
  whatsappHref: 'https://wa.me/573054807054',
  correo: 'gerencia@jeiggar.co',
  facebook: 'https://www.facebook.com/profile.php?id=61556566499848',
  instagram: 'https://www.instagram.com/jeiggaringenieriaconstruccion/',
  mapsQuery: 'Calle 21AN 1-112 Local 1, Prados del Norte, Cúcuta, Colombia',
};

const servicios = [
  {
    slug: 'disenos',
    nombre: 'Diseños',
    nombreMenu: 'Diseños',
    nombreFooter: 'Diseños Arquitectónicos',
    icono: 'lapiz',
    lema: 'Innovación y calidad en cada proyecto.',
    portada: U('photo-1721244654394-36a7bc2da288'),
    plantilla: 'disenos',
  },
  {
    slug: 'consultoria',
    nombre: 'Consultoría',
    tituloHero: 'Consultoría Especializada',
    icono: 'chat',
    lema: 'Soluciones expertas en consultoría para tus proyectos de ingeniería y construcción.',
    portada: U('photo-1608303588026-884930af2559'),
    tarjetaInicio: 'Transformamos sus ideas en proyectos viables. Nuestros consultores expertos le brindan asesoría técnica especializada para desarrollar proyectos de construcción y arquitectura con los más altos estándares',
    imagenInicio: U('photo-1581094488379-6a10d04c0f04', 800),
    intro: {
      etiqueta: 'Consultoría',
      texto: 'En JEIGGAR, proporcionamos servicios de consultoría integral diseñados para asegurar la ejecución exitosa de sus proyectos. Nuestro selecto equipo de expertos le ofrece asesoramiento técnico preciso, planificación estratégica avanzada y soluciones innovadoras, meticulosamente adaptadas a sus requerimientos específicos.',
      imagen: U('photo-1581094488379-6a10d04c0f04', 1000),
    },
    secciones: [
      {
        tipo: 'tarjetas',
        etiqueta: 'Consultoría',
        titulo: 'Nuestros Servicios de Consultoría',
        items: [
          { icono: 'chat', titulo: 'Asesoría Técnica', texto: 'Proporcionamos análisis y recomendaciones técnicas precisas para optimizar el rendimiento y la viabilidad de sus proyectos.' },
          { icono: 'buscar', titulo: 'Análisis de Proyectos', texto: 'Realizamos una evaluación exhaustiva y una planificación detallada para garantizar la robustez y el éxito de sus iniciativas desde su concepción.' },
          { icono: 'regla', titulo: 'Gestión de Ingeniería', texto: 'Coordinamos y supervisamos expertamente todos los aspectos de ingeniería de sus obras, asegurando la calidad y el cumplimiento de los estándares más exigentes.' },
        ],
      },
      {
        tipo: 'panel',
        etiqueta: 'Consultoría',
        titulo: '¿Por qué elegir nuestra consultoría?',
        items: [
          { icono: 'usuarios', titulo: 'Equipo Profesional', texto: 'Contamos con un equipo de especialistas con probada trayectoria y profunda experiencia en el sector de ingeniería y construcción.' },
          { icono: 'capas', titulo: 'Soluciones Integrales', texto: 'Abordamos cada proyecto desde una perspectiva integral, cubriendo meticulosamente todos los aspectos técnicos, estratégicos y operativos necesarios para su éxito.' },
          { icono: 'bombillo', titulo: 'Innovación Constante', texto: 'Integramos activamente las tecnologías y metodologías más recientes y disruptivas del sector para ofrecer soluciones de vanguardia.' },
          { icono: 'reloj', titulo: 'Puntualidad', texto: 'Nos adherimos estrictamente a los cronogramas establecidos, optimizando los tiempos de entrega para mejorar significativamente la eficiencia operativa de su proyecto.' },
        ],
      },
    ],
    cta: { titulo: '¿Necesitas asesoría experta?', texto: 'Contáctanos hoy mismo y descubre cómo podemos ayudarte a llevar tus proyectos al siguiente nivel.' },
  },
  {
    slug: 'interventoria',
    nombre: 'Interventoría',
    tituloHero: 'Interventoría profesional',
    icono: 'escudo',
    lema: 'Control y supervisión especializada para tus proyectos.',
    portada: U('photo-1626885930974-4b69aa21bbf9'),
    tarjetaInicio: 'Garantizamos la ejecución óptima de sus proyectos. Nuestros servicios de interventoría aseguran el cumplimiento de normas, calidad y seguridad en cada fase de construcción.',
    imagenInicio: U('photo-1694521787193-9293daeddbaa', 800),
    intro: {
      etiqueta: 'Interventoría',
      texto: 'Con JEIGGAR, su proyecto está en manos expertas. Nuestra interventoría garantiza una ejecución impecable, asegurando que cada fase cumpla con los más altos estándares de calidad, se adhiera estrictamente a los plazos y se mantenga dentro del presupuesto acordado.',
      imagen: U('photo-1694521787193-9293daeddbaa', 1000),
    },
    secciones: [
      {
        tipo: 'tarjetas',
        etiqueta: 'Interventoría',
        titulo: 'Nuestros servicios',
        items: [
          { icono: 'visto', titulo: 'Control de calidad', texto: 'Supervisamos meticulosamente cada fase constructiva para asegurar el cumplimiento de los más altos estándares de calidad y especificaciones técnicas.' },
          { icono: 'reloj', titulo: 'Gestión de tiempos', texto: 'Gestionamos activamente el cronograma del proyecto para asegurar el cumplimiento eficiente y puntual de todos los plazos de ejecución.' },
          { icono: 'moneda', titulo: 'Control de costos', texto: 'Realizamos un seguimiento detallado y optimizamos la inversión para mantener el proyecto dentro del presupuesto aprobado sin comprometer la calidad.' },
        ],
      },
    ],
    cta: { titulo: '¿Necesitas supervisión experta?', texto: 'Contáctanos para garantizar el éxito de tus proyectos.' },
  },
  {
    slug: 'remodelacion-de-edificaciones',
    nombre: 'Remodelación de Edificaciones',
    tituloHero: 'Remodelación de edificaciones',
    icono: 'casa',
    lema: 'Transformamos espacios antiguos en edificaciones modernas y funcionales.',
    portada: U('photo-1517581177682-a085bb7ffb15'),
    tarjetaInicio: 'Renovamos espacios con creatividad y precisión. Desde viviendas hasta oficinas, entregamos proyectos llave en mano respetando sus necesidades estéticas y funcionales.',
    imagenInicio: U('photo-1618832515490-e181c4794a45', 800),
    secciones: [
      {
        tipo: 'tarjetas',
        etiqueta: 'Remodelación',
        titulo: 'Remodelación de edificaciones',
        items: [
          { icono: 'casa', titulo: 'Espacios Residenciales', texto: 'Transformamos su hogar con diseños modernos y funcionales que optimizan cada espacio para su bienestar.' },
          { icono: 'usuarios', titulo: 'Entornos corporativos', texto: 'Ejecutamos remodelaciones de oficinas diseñadas para potenciar la productividad, fomentar la colaboración y mejorar significativamente el bienestar de su equipo.' },
          { icono: 'moneda', titulo: 'Locales Comerciales', texto: 'Rediseñamos su local comercial para crear experiencias de compra cautivadoras que optimicen el flujo de clientes y potencien su marca.' },
        ],
      },
      {
        tipo: 'proyecto',
        etiqueta: 'Proyecto destacado',
        titulo: 'Edificio Residencial "Las Acacias"',
        intro: 'Remodelación de un edificio residencial en el centro de la ciudad:',
        texto: 'Remodelación integral de 5 pisos con modernización de fachada, instalaciones eléctricas y sistemas de climatización.',
        datos: [
          { etiqueta: 'Área remodelada', valor: '2,500 m²' },
          { etiqueta: 'Duración', valor: '6 meses' },
          { etiqueta: 'Innovaciones', valor: 'Materiales sostenibles y diseño contemporáneo' },
        ],
        imagen: U('photo-1784853879843-f3c5aacf2569', 1000),
        pie: 'Proyecto completado 2023',
      },
    ],
    cta: { titulo: '¿Listo para remodelar tu propiedad?', texto: 'Contáctanos para transformar tus espacios con profesionales.' },
  },
  {
    slug: 'movimiento-de-tierras',
    nombre: 'Movimiento de Tierras',
    tituloHero: 'Movimiento de tierras',
    icono: 'tierra',
    lema: 'Expertos en movimiento de tierras para proyectos de construcción.',
    portada: U('photo-1580901369227-308f6f40bdeb'),
    tarjetaInicio: 'Ejecutamos movimientos de tierra y excavaciones con maquinaria especializada y personal calificado, preparando terrenos para proyectos de cualquier escala con precisión y eficiencia.',
    imagenInicio: U('photo-1628645419184-26a1f2757340', 800),
    intro: {
      etiqueta: 'Movimiento de tierras',
      texto: 'En JEIGGAR, ofrecemos servicios especializados en movimiento de tierras, utilizando maquinaria de última generación para la preparación experta del terreno, garantizando así cimentaciones sólidas y confiables.',
      imagen: U('photo-1628645419184-26a1f2757340', 1000),
    },
    secciones: [
      {
        tipo: 'media',
        etiqueta: 'Proceso',
        titulo: 'Nuestro proceso de trabajo',
        texto: 'Descubra paso a paso cómo abordamos la preparación eficiente de terrenos, garantizando resultados óptimos:',
        imagen: U('photo-1768085091650-e8e89ef57b76', 1400),
        esVideo: true,
      },
      {
        tipo: 'tarjetas',
        etiqueta: 'Movimiento de tierras',
        titulo: 'Nuestros servicios',
        items: [
          { icono: 'tierra', titulo: 'Excavación y desmonte', texto: 'Realizamos excavaciones con máxima precisión y tareas de desmonte para la adecuada preparación inicial de cualquier tipo de terreno.' },
          { icono: 'regla', titulo: 'Nivelación de terrenos', texto: 'Realizamos la nivelación y conformación de terrenos para crear superficies estables, esenciales para la base de sus proyectos constructivos.' },
          { icono: 'capas', titulo: 'Compactación de suelos', texto: 'Aplicamos técnicas de compactación avanzadas para aumentar la densidad y resistencia de los suelos, asegurando una base firme y duradera para la construcción.' },
        ],
      },
    ],
    cta: { titulo: '¿Necesitas movimiento de tierras?', texto: 'Contáctanos para preparar tu terreno con profesionales.' },
  },
  {
    slug: 'elaboracion-de-actas-de-vecindad',
    nombre: 'Elaboración de Actas de Vecindad',
    tituloHero: 'Elaboración de actas de vecindad',
    icono: 'documento',
    lema: 'Facilitamos la elaboración de actas de vecindad para comunidades.',
    portada: U('photo-1603796846097-bee99e4a601f'),
    intro: {
      etiqueta: 'Actas de vecindad',
      texto: 'En JEIGGAR, ofrecemos un servicio especializado y riguroso para la elaboración de actas de vecindad, asegurando la correcta documentación de acuerdos y decisiones comunitarias con plena validez legal.',
      imagen: U('photo-1565688534245-05d6b5be184a', 1000),
    },
    secciones: [
      {
        tipo: 'pasos',
        etiqueta: 'Actas de vecindad',
        titulo: 'Nuestro proceso',
        items: [
          { icono: 'usuarios', titulo: 'Reunión con la comunidad', texto: 'Facilitamos encuentros con la comunidad para recopilar de manera organizada todos los acuerdos, decisiones y puntos relevantes a documentar.' },
          { icono: 'lapiz', titulo: 'Redacción del acta', texto: 'Procedemos a la redacción detallada y con lenguaje claro del documento, asegurando que refleje fielmente todos los acuerdos registrados.' },
          { icono: 'check', titulo: 'Aprobación y firma', texto: 'Gestionamos la presentación del acta para su revisión, aprobación formal y posterior firma por parte de los miembros de la comunidad involucrados.' },
        ],
      },
    ],
    cta: { titulo: '¿Necesitas elaborar un acta de vecindad?', texto: 'Contáctanos para documentar los acuerdos de tu comunidad de manera profesional.' },
  },
  {
    slug: 'adaptacion-de-contenedores',
    nombre: 'Adaptación de Contenedores',
    tituloHero: 'Espacios Innovadores',
    icono: 'contenedor',
    lema: 'Transformamos contenedores en espacios funcionales y modernos.',
    portada: U('photo-1774970735440-5c82addea754'),
    tarjetaInicio: 'Soluciones innovadoras en espacios modulares. Convertimos contenedores en viviendas, oficinas o locales comerciales funcionales, con diseños personalizados y máxima eficiencia',
    imagenInicio: U('photo-1789224412676-bb6a9e12f666', 800),
    intro: {
      etiqueta: 'Contenedores',
      texto: 'En JEIGGAR, somos pioneros en la transformación de contenedores marítimos en espacios plenamente funcionales y estéticos: desde viviendas confortables y oficinas modernas hasta locales comerciales únicos. Nuestro enfoque combina innovación, sostenibilidad y un aprovechamiento inteligente de recursos.',
      imagen: U('photo-1789224412676-bb6a9e12f666', 1000),
    },
    secciones: [
      {
        tipo: 'tarjetas',
        etiqueta: 'Contenedores',
        titulo: 'Tipos de adaptaciones',
        items: [
          { icono: 'casa', titulo: 'Viviendas', texto: 'Transformamos su hogar con diseños modernos y funcionales que optimizan cada espacio para su bienestar.' },
          { icono: 'usuarios', titulo: 'Oficinas', texto: 'Diseñamos y construimos oficinas funcionales y adaptables que promueven la productividad y el bienestar laboral.' },
          { icono: 'moneda', titulo: 'Soluciones Comerciales Únicas', texto: 'Creamos espacios comerciales distintivos y memorables a partir de contenedores, optimizando la experiencia del cliente.' },
        ],
      },
      {
        tipo: 'antes-despues',
        etiqueta: 'Proyecto destacado',
        titulo: 'Proyecto destacado',
        texto: 'Explore la notable transformación de un contenedor estándar en una moderna y funcional oficina',
        antes: U('photo-1789224412676-bb6a9e12f666', 1200),
        despues: U('photo-1764344815220-2cbf59c95f46', 1200),
      },
      {
        tipo: 'panel',
        etiqueta: 'Contenedores',
        titulo: 'Beneficios de adaptar contenedores',
        items: [
          { icono: 'hoja', titulo: 'Compromiso Sostenible', texto: 'Mediante la reutilización de contenedores, contribuimos activamente a la reducción del impacto ambiental y la promoción de la economía circular.' },
          { icono: 'moneda', titulo: 'Eficiencia Económica', texto: 'La adaptación de contenedores representa una alternativa significativamente más económica en comparación con los métodos de construcción tradicionales.' },
          { icono: 'rapidez', titulo: 'Rapidez en la Ejecución', texto: 'Disfrute de tiempos de construcción considerablemente más cortos, permitiendo la finalización de su proyecto con mayor celeridad.' },
        ],
      },
    ],
    cta: { titulo: '¿Listo para transformar un contenedor?', texto: 'Contáctanos hoy mismo para comenzar tu proyecto de adaptación.' },
  },
  {
    slug: 'elaboracion-de-presupuestos',
    nombre: 'Elaboración de Presupuestos',
    tituloHero: 'Elaboración de Presupuestos',
    icono: 'calculadora',
    lema: 'Presupuestos detallados y transparentes para tus proyectos de construcción.',
    portada: U('photo-1746221331496-a87689fc8eb9'),
    tarjetaInicio: 'Optimizamos sus recursos con presupuestos detallados y realistas. Nuestra planificación financiera garantiza el mejor rendimiento de su inversión sin sacrificar calidad',
    imagenInicio: U('photo-1711437757489-f739a581c55b', 800),
    intro: {
      etiqueta: 'Presupuestos',
      texto: 'En JEIGGAR, nuestra especialidad es ofrecer presupuestos precisos y adaptados a las particularidades de cada proyecto constructivo. Nos enfocamos en brindar total transparencia, exactitud y eficiencia, pilares fundamentales para una gestión financiera exitosa.',
      imagen: U('photo-1711437757489-f739a581c55b', 1000),
    },
    secciones: [
      {
        tipo: 'pasos',
        etiqueta: 'Metodología',
        titulo: 'Nuestra Metodología de Presupuestación',
        items: [
          { icono: 'buscar', titulo: 'Evaluación Inicial', texto: 'Analizamos minuciosamente sus requerimientos y las características específicas del proyecto para definir con precisión su alcance financiero y técnico.' },
          { icono: 'calculadora', titulo: 'Cálculo de Costos', texto: 'Empleamos herramientas y técnicas avanzadas para calcular de manera precisa y confiable todos los costos asociados al proyecto.' },
          { icono: 'documento', titulo: 'Presupuesto Final', texto: 'Le presentamos un presupuesto final completamente detallado y transparente, listo para su revisión y aprobación.' },
        ],
      },
      {
        tipo: 'panel',
        etiqueta: 'Presupuestos',
        titulo: '¿Por qué elegirnos?',
        items: [
          { icono: 'ojo', titulo: 'Transparencia', texto: 'Proporcionamos un desglose exhaustivo de cada rubro, asegurando total comprensión y control sobre la distribución de los costos. Te proporcionamos un desglose claro y detallado de todos los costos.' },
          { icono: 'rapidez', titulo: 'Rapidez', texto: 'Elaboramos su presupuesto de manera ágil y eficiente, optimizando los tiempos de entrega sin sacrificar la exactitud ni la calidad.' },
          { icono: 'moneda', titulo: 'Ahorro', texto: 'Nuestro enfoque experto busca la mejor optimización de recursos, asegurando la máxima relación costo-beneficio para su proyecto.' },
        ],
      },
    ],
    cta: { titulo: '¿Listo para comenzar?', texto: 'Contáctanos hoy mismo y obtén un presupuesto personalizado para tu proyecto.' },
  },
  {
    slug: 'administracion-y-construccion-de-obras',
    nombre: 'Administración y Construcción de Obras',
    tituloHero: 'Administración y Construcción de Obras',
    icono: 'grua',
    lema: 'Expertos en administración y construcción de obras desde hace 8 años.',
    portada: U('photo-1485083269755-a7b559a4fe5e'),
    intro: {
      etiqueta: 'Administración de obras',
      texto: 'JEIGGAR es su aliado estratégico en la administración y construcción de obras. Nos especializamos en ejecutar proyectos civiles con los más altos estándares de calidad, eficiencia y cumplimiento. Gestionamos el ciclo completo de la obra, desde la fase de planificación hasta la entrega, con un enfoque meticuloso en cada detalle para la plena satisfacción del cliente.',
      imagen: U('photo-1599995903128-531fc7fb694b', 1000),
    },
    secciones: [
      {
        tipo: 'lista',
        etiqueta: 'Servicios',
        titulo: 'Nuestros servicios',
        texto: 'Ofrecemos una gama completa de servicios especializados en la administración y ejecución de obras, incluyendo:',
        items: ['Gestión integral de proyectos', 'Construcción de infraestructura residencial y comercial', 'Supervisión y control de obras', 'Ejecución de proyectos urbanísticos'],
        imagen: U('photo-1541888946425-d81bb19240f5', 1000),
      },
      {
        tipo: 'media',
        etiqueta: 'Proyectos',
        titulo: 'Proyectos destacados',
        texto: 'Nuestro historial incluye la ejecución de obras emblemáticas como complejos edificios corporativos, desarrollos urbanísticos y puentes peatonales, reflejando nuestro compromiso inherente con la calidad superlativa y la innovación constante.',
        imagen: U('photo-1565008447742-97f6f38c985c', 1400),
      },
      {
        tipo: 'media',
        etiqueta: 'Equipo',
        titulo: 'Nuestro equipo',
        texto: 'Nuestro equipo está conformado por arquitectos, ingenieros y técnicos altamente calificados, cuya colaboración sinérgica asegura la culminación exitosa de cada proyecto con los más altos estándares de excelencia.',
        imagen: U('photo-1759922378222-47ad736a174d', 1400),
        invertido: true,
      },
    ],
    cta: { titulo: '¿Listo para comenzar tu próximo proyecto?', texto: 'Contáctanos para conocer cómo podemos ayudarte.' },
  },
];

const disenos = {
  slug: 'disenos',
  nombre: 'Diseños',
  lema: 'Innovación y calidad en cada proyecto.',
  portada: U('photo-1721244654394-36a7bc2da288'),
  intro: {
    etiqueta: 'Diseños',
    titulo: 'Explora nuestros diseños',
    texto: 'En JEIGGAR, cada proyecto nace de un diseño innovador y meticulosamente adaptado a sus necesidades. Le invitamos a explorar nuestras especialidades y encontrar la solución óptima para su visión.',
  },
  especialidades: [
    { icono: 'lapiz', titulo: 'Diseños arquitectónicos', texto: 'Combinamos maestría arquitectónica con un enfoque integral que equilibra funcionalidad, estética y sostenibilidad en cada propuesta.', items: ['Planos detallados y personalizados.', 'Uso de tecnologías avanzadas como BIM.', 'Enfoque en eficiencia energética y diseño sostenible.'], imagen: U('photo-1503387762-592deb58ef4e', 1000) },
    { icono: 'capas', titulo: 'Diseños estructurales', texto: 'Aseguramos la seguridad y durabilidad de cada obra a través de una ingeniería estructural precisa y el uso de materiales óptimos, aplicando metodologías avanzadas.', items: ['Cálculos estructurales precisos.', 'Materiales de alta resistencia.', 'Análisis de cargas y resistencias.'], imagen: U('photo-1508450859948-4e04fabaa4ea', 1000) },
    { icono: 'gota', titulo: 'Diseños Hidráulicos y Sanitarios', texto: 'Desarrollamos soluciones eficientes y sostenibles para la gestión de agua y residuos, asegurando la conformidad total con las regulaciones aplicables y la funcionalidad a largo plazo.', items: ['Diseño de redes de acueducto y alcantarillado.', 'Cálculo de presiones y caudales óptimos.', 'Soluciones para tratamiento de aguas residuales.'], imagen: U('photo-1503387837-b154d5074bd2', 1000) },
    { icono: 'via', titulo: 'Diseños Viales', texto: 'Diseñamos infraestructura vial robusta, segura y funcional, optimizada para soportar altos volúmenes de tráfico y asegurar una larga vida útil y una movilidad eficiente.', items: ['Planificación de carreteras y urbanismos.', 'Estudio de tráfico y señalización.', 'Uso de materiales de alta resistencia.'], imagen: U('photo-1760708626681-59a5373819a6', 1000), esVideo: true },
  ],
  tecnologias: {
    titulo: 'Tecnologías y herramientas',
    texto: 'Utilizamos herramientas de vanguardia para garantizar la precisión y calidad en cada proyecto.',
    items: [
      { icono: 'lapiz', titulo: 'AutoCAD', texto: 'Software líder en diseño 2D y 3D.' },
      { icono: 'cubo', titulo: 'Revit', texto: 'Herramienta BIM para modelado de construcción.' },
      { icono: 'capas', titulo: 'SketchUp', texto: 'Modelado 3D intuitivo.' },
      { icono: 'dron', titulo: 'Drones', texto: 'Levantamientos topográficos y supervisión de obras.' },
    ],
  },
  cta: { titulo: 'Transforma tus ideas en realidad', texto: 'Contáctanos hoy mismo para hacer realidad tu proyecto.' },
};

const inicio = {
  hero: {
    titulo: ['Construyendo el futuro con ', 'innovación', ' y calidad'],
    texto: 'Somos especialistas en ingeniería, construcción y consultoría, ofreciendo soluciones integrales adaptadas a las necesidades de cada proyecto. Combinamos experiencia, tecnología y compromiso para garantizar resultados de calidad.',
    imagen: U('photo-1541888946425-d81bb19240f5', 1200),
    destacado: { icono: 'medalla', titulo: 'Experiencia comprobada', texto: 'Más de 8 años en el mercado con proyectos exitosos.' },
  },
  serviciosInicio: ['consultoria', 'interventoria', 'movimiento-de-tierras', 'elaboracion-de-presupuestos', 'adaptacion-de-contenedores', 'remodelacion-de-edificaciones'],
  porQue: {
    titulo: '¿Por qué elegirnos?',
    items: [
      { icono: 'medalla', titulo: 'Experiencia comprobada', texto: 'Más de 8 años en el mercado con proyectos exitosos.' },
      { icono: 'check', titulo: 'Calidad garantizada', texto: 'Materiales de primera línea y procesos certificados.' },
      { icono: 'reloj', titulo: 'Cumplimiento de plazos', texto: 'Entregamos a tiempo sin comprometer la calidad.' },
    ],
  },
  cta: { titulo: '¿Listo para empezar tu próximo proyecto?', texto: 'Contáctanos y descubre cómo podemos ayudarte.' },
};

const quienesSomos = {
  lema: 'Expertos en ingeniería y construcción con más de 8 años de experiencia.',
  portada: U('photo-1577199001468-44c049e7603f'),
  intro: 'En JEIGGAR, nuestro compromiso es erigir el futuro con firmeza inquebrantable e innovación distintiva. Cada proyecto constituye un testimonio de nuestra excelencia operativa y visión estratégica, integrando la rigurosidad de la ingeniería de precisión con soluciones genuinamente transformadoras.',
  puntos: ['8+ años transformando ideas en estructuras perdurables', 'Diseños inteligentes que optimizan recursos y espacios', 'Relaciones constructivas basadas en resultados tangibles'],
  mision: { titulo: 'Misión', texto: 'JEIGGAR INGENIERÍA Y CONSTRUCCIÓN es una empresa dedicada a la prestación de servicios de ingeniería, construcción, diseño y consultoría, buscando satisfacer las necesidades de nuestros clientes actuales y potenciales; enmarcando nuestros procesos en óptimos estándares de calidad. Contamos con el recurso humano idóneo, competente y experimentado, que nos permite optimizar los servicios prestados.', imagen: U('photo-1672954766589-49f0dd0e106f', 1000) },
  vision: { titulo: 'Visión', texto: 'Ser una empresa líder enfocada en brindar los mejores servicios de ingeniería, construcción, diseño y consultoría a nuestros clientes; con importante presencia y reconocimiento a nivel nacional e internacional, desarrollando proyectos con el recurso humano idóneo y altamente calificado.', imagen: U('photo-1565008447742-97f6f38c985c', 1000) },
  aliados: {
    titulo: 'Nuestros Aliados',
    texto: 'Colaboramos con organizaciones líderes para ofrecer soluciones integrales en ingeniería y construcción',
    items: ['ACNUR', 'IMRD', 'Francisco de Paula Santander', 'Instituto Tecnico Guaimaral', 'Acción contra el Hambre', 'Corporación Opción Legal', 'OIM', 'Gases del Oriente'],
  },
  valores: {
    titulo: 'Nuestros Valores Fundamentales',
    items: [
      { icono: 'apreton', titulo: 'Confianza', texto: 'Construimos relaciones basadas en transparencia y credibilidad, estableciendo vínculos sólidos con clientes, partners y colaboradores mediante acciones consistentes y comunicación abierta.' },
      { icono: 'escudo', titulo: 'Fiabilidad', texto: 'Garantizamos consistencia en nuestros resultados y cumplimiento de compromisos, respaldados por procesos robustos y un equipo altamente capacitado que asegura entregas puntuales y de calidad.' },
      { icono: 'medalla', titulo: 'Excelencia', texto: 'Nos regimos por los más altos estándares de calidad en cada proyecto, implementando mejores prácticas y controles rigurosos para superar expectativas y establecer benchmarks en nuestro sector.' },
      { icono: 'bombillo', titulo: 'Innovación y Dinamismo', texto: 'Fomentamos una cultura de mejora continua y adaptabilidad, integrando tecnologías emergentes y metodologías ágiles para ofrecer soluciones vanguardistas a desafíos complejos.' },
      { icono: 'usuarios', titulo: 'Trabajo en Equipo', texto: 'Potenciamos sinergias mediante la colaboración interdisciplinaria, valorando la diversidad de pensamiento y fomentando un ambiente donde cada contribución suma al éxito colectivo.' },
      { icono: 'hoja', titulo: 'Responsabilidad', texto: 'Asumimos con seriedad nuestros compromisos sociales, ambientales y corporativos, implementando prácticas sostenibles y tomando decisiones conscientes de su impacto a largo plazo.' },
      { icono: 'corazon', titulo: 'Respeto', texto: 'Cultivamos un ambiente inclusivo que valora la dignidad de cada individuo, fomentando la escucha activa, la empatía y el reconocimiento de diversas perspectivas y culturas.' },
      { icono: 'balanza', titulo: 'Ética', texto: 'Operamos con integridad moral en todas nuestras acciones, asegurando que nuestras prácticas comerciales sean irreprochables y estén alineadas con regulaciones y códigos de conducta.' },
      { icono: 'check', titulo: 'Integridad', texto: 'Mantenemos coherencia entre nuestros valores, palabras y acciones, priorizando la honestidad incluso cuando esto implique desafíos comerciales o decisiones difíciles.' },
      { icono: 'candado', titulo: 'Seguridad', texto: 'Implementamos protocolos rigurosos para proteger datos, activos y personas, garantizando entornos confiables para nuestros stakeholders mediante tecnologías y políticas de vanguardia.' },
      { icono: 'rayo', titulo: 'Pasión', texto: 'Nos apasiona lo que hacemos, y esta energía se traduce en dedicación, creatividad y perseverancia para alcanzar la excelencia en cada proyecto que emprendemos.' },
    ],
  },
  cta: inicio.cta,
};

const alquiler = {
  titulo: 'Alquiler de equipos y herramientas',
  lema: '"Construye sin límites, alquila con facilidad."',
  portada: U('photo-1589939705384-5185137a7f0f'),
  intro: 'En JEIGGAR ofrecemos un servicio de alquiler de equipos y herramientas de alta calidad para tus proyectos de construcción, remodelación y mantenimiento. Contamos con una amplia variedad de herramientas modernas y en excelente estado, listas para ayudarte a completar tus tareas de manera eficiente y profesional. Ya sea para uso personal o profesional, nuestras herramientas están disponibles para ti.',
  herramientas: [
    { nombre: 'Tronzadora Dewalt', imagen: U('photo-1702200047649-ddefe9d4faa9', 500) },
    { nombre: 'Pulidora', imagen: U('photo-1734888369502-3e01d4c0a46e', 500) },
    { nombre: 'Sierra', imagen: U('photo-1642006953663-06f0387f5652', 500) },
    { nombre: 'Motobomba', imagen: U('photo-1523559094051-53bac879eb80', 500) },
    { nombre: 'Lijadora', imagen: U('photo-1513467655676-561b7d489a88', 500) },
    { nombre: 'Taladro', imagen: U('photo-1572981779307-38b8cabb2407', 500) },
    { nombre: 'Rotomartillo', imagen: U('photo-1564942513776-e922cb937bfe', 500) },
    { nombre: 'Guadaña', imagen: U('photo-1746436576978-21632bf9790d', 500) },
    { nombre: 'Fumigadora', imagen: U('photo-1524636090643-f30248a74e16', 500) },
    { nombre: 'Escalera', imagen: U('photo-1549030782-4935f80baeb6', 500) },
    { nombre: 'Cortadora Ceramica', imagen: U('photo-1560846389-956694677531', 500) },
    { nombre: 'Camilla', imagen: U('photo-1563210199-6ec2cfedd11e', 500) },
    { nombre: 'Cortadora pavimento', imagen: U('photo-1598302936625-6075fbd98dd7', 500) },
    { nombre: 'Carreton', imagen: U('photo-1637986793659-991282d1b05e', 500) },
    { nombre: 'Sopladora electrica', imagen: U('photo-1742093798436-bea70f40f187', 500) },
    { nombre: 'Soplete', imagen: U('photo-1522322512347-a0e57fd1744c', 500) },
    { nombre: 'Sopladora stihl', imagen: U('photo-1597691306652-3710b7663b93', 500) },
  ],
  porQue: {
    titulo: '¿Por qué alquilar con JEIGGAR?',
    texto: 'En JEIGGAR INGENIERÍA Y CONSTRUCCIÓN ofrecemos las mejores herramientas y equipos para tus proyectos. Alquilar con nosotros es fácil, rápido y rentable. ¡Descubre las ventajas!',
    items: [
      { icono: 'martillo', titulo: 'Herramientas de alta calidad', texto: 'Contamos con equipos modernos y en perfecto estado para garantizar el éxito de tus proyectos.' },
      { icono: 'moneda', titulo: 'Precios competitivos', texto: 'Ofrecemos tarifas accesibles y planes flexibles adaptados a tus necesidades.' },
      { icono: 'chat', titulo: 'Asesoría técnica', texto: 'Nuestro equipo de expertos está disponible para brindarte soporte y recomendaciones.' },
    ],
  },
};

const proyectos = {
  lema: 'Construyendo el futuro con innovación y calidad.',
  portada: U('photo-1599995903128-531fc7fb694b'),
  intro: { titulo: '¿Quieres construir tus sueños?', texto: 'En JEIGGAR, ofrecemos soluciones integrales para la construcción y el desarrollo de proyectos, fusionando experiencia técnica con un enfoque innovador.' },
  obras: [
    { titulo: 'Excavación y construcción de caja y muro de concreto', texto: 'Nuestra vasta experiencia abarca todas las facetas de la construcción, asegurando la materialización exitosa de cada proyecto.', imagen: U('photo-1774931363306-5a896cd4dd02', 1200), esVideo: true },
    { titulo: 'Mejoramiento de espacios deportivos', texto: 'En JEIGGAR, nuestro compromiso con la excelencia se manifiesta en cada proyecto, garantizando resultados de la más alta calidad.', imagen: U('photo-1522778119026-d647f0596c20', 1200) },
  ],
  destacados: {
    titulo: 'Proyectos destacados',
    texto: 'Nuestros proyectos son la evidencia tangible de cómo convertimos ideas en estructuras sólidas y funcionales.',
    items: [
      { titulo: 'Edificio Residencial "Las Palmas"', texto: 'Diseño y construcción de un edificio residencial de 20 pisos en Cúcuta, optimizando espacios con un diseño moderno y funcional.', antes: U('photo-1508450859948-4e04fabaa4ea', 1200), despues: U('photo-1545324418-cc1a3fa10c00', 1200), datos: [{ etiqueta: 'Área construida', valor: '15,000 m²' }, { etiqueta: 'Duración', valor: '18 meses' }, { etiqueta: 'Innovaciones', valor: 'Materiales sostenibles y eficiencia energética' }] },
      { titulo: 'Centro Comercial "El Solar"', texto: 'Transformación de un terreno subutilizado en un centro comercial moderno y sostenible.', antes: U('photo-1517089596392-fb9a9033e05b', 1200), despues: U('photo-1551361415-69c87624334f', 1200), datos: [{ etiqueta: 'Área construida', valor: '25,000 m²' }, { etiqueta: 'Duración', valor: '24 meses' }, { etiqueta: 'Innovaciones', valor: 'Paneles solares y reciclaje de agua' }] },
    ],
  },
  cta: { titulo: '¿Listo para comenzar tu próximo proyecto?', texto: 'Estamos preparados para transformar tu visión en una obra exitosa.' },
};

const contacto = {
  titulo: '¡Conéctate con nosotros!',
  lema: 'Expertos en ingeniería y construcción con más de 8 años de experiencia.',
  portada: U('photo-1579847188804-ecba0e2ea330'),
  intro: 'Síguenos en nuestras redes sociales y mantente al tanto de nuestras novedades.',
  canales: [
    { clave: 'facebook', titulo: 'Facebook', texto: 'Síguenos en Facebook para ver nuestros proyectos y novedades.', href: empresa.facebook },
    { clave: 'instagram', titulo: 'Instagram', texto: 'Mira nuestras fotos y proyectos más recientes en Instagram.', href: empresa.instagram },
    { clave: 'whatsapp', titulo: 'WhatsApp', texto: '¡Escríbenos a WhatsApp para cotizaciones o dudas rápidas!', href: empresa.whatsappHref },
    { clave: 'correo', titulo: 'Correo Electrónico', texto: 'Envíanos un correo a gerencia@jeiggar.co para consultas detalladas.', href: `mailto:${empresa.correo}` },
  ],
};

const navegacion = [
  { href: '/quienes-somos', etiqueta: '¿Quiénes Somos?' },
  { href: '/alquiler', etiqueta: 'Alquiler de Equipos/Herramientas' },
  { href: '/proyectos', etiqueta: 'Proyectos' },
  { href: '/servicios', etiqueta: 'Servicios', desplegable: true },
  { href: '/contacto', etiqueta: 'Contacto' },
];

const footerServicios = [
  { href: '/servicios/disenos', etiqueta: 'Diseños Arquitectónicos' },
  { href: '/servicios/consultoria', etiqueta: 'Consultoría' },
  { href: '/servicios/interventoria', etiqueta: 'Interventoría' },
  { href: '/servicios/movimiento-de-tierras', etiqueta: 'Movimiento de Tierras' },
  { href: '/servicios/remodelacion-de-edificaciones', etiqueta: 'Remodelaciones' },
];

// Opciones del formulario de cotización
const opcionesServicio = [
  ...servicios.map((s) => ({ valor: s.slug, etiqueta: s.nombre })),
  { valor: 'alquiler', etiqueta: 'Alquiler de Equipos/Herramientas' },
  { valor: 'otro', etiqueta: 'Otro / No estoy seguro' },
];

const tiposDocumento = [
  { valor: 'CC', etiqueta: 'Cédula de ciudadanía' },
  { valor: 'CE', etiqueta: 'Cédula de extranjería' },
  { valor: 'NIT', etiqueta: 'NIT (empresa)' },
  { valor: 'PAS', etiqueta: 'Pasaporte' },
];

module.exports = {
  empresa,
  servicios,
  disenos,
  inicio,
  quienesSomos,
  alquiler,
  proyectos,
  contacto,
  navegacion,
  footerServicios,
  opcionesServicio,
  tiposDocumento,
  getServicio: (slug) => servicios.find((s) => s.slug === slug),
};
