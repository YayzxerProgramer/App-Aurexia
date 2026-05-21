import { useState } from "react";

const COLORS = {
  primary: "#5B21B6",
  secondary: "#7C3AED",
  accent: "#EC4899",
  teal: "#0D9488",
  orange: "#F59E0B",
  light: "#F5F3FF",
  white: "#FFFFFF",
  gray: "#6B7280",
  dark: "#1E1B4B",
  success: "#10B981",
  danger: "#EF4444",
  warning: "#F59E0B",
};

const userTypes = [
  { id: "estudiante", label: "Estudiante", icon: "🎒", color: "#7C3AED" },
  { id: "docente", label: "Docente", icon: "📚", color: "#0D9488" },
  { id: "padre", label: "Padre/Madre de Familia", icon: "👨‍👩‍👧", color: "#EC4899" },
  { id: "persona", label: "Persona Natural", icon: "🤝", color: "#F59E0B" },
];

const coursesByRole = {
  estudiante: [
    {
      id: 1, title: "Conociendo mis derechos", icon: "🛡️", color: "#7C3AED",
      progress: 100, duration: "5h", modules: 4,
      description: "Aprende cuáles son tus derechos fundamentales y cómo protegerlos.",
      lessons: [
        { title: "¿Qué son los derechos?", duration: "10 min", done: true },
        { title: "Mis derechos como niño/a", duration: "15 min", done: true },
        { title: "¿Qué hago si no me respetan?", duration: "12 min", done: true },
        { title: "Evaluación final", duration: "10 min", done: true },
      ]
    },
    {
      id: 2, title: "¿Qué es la ESCNNA?", icon: "❓", color: "#EC4899",
      progress: 60, duration: "8h", modules: 6,
      description: "Entiende qué es la Explotación Sexual Comercial y cómo identificarla.",
      lessons: [
        { title: "¿Qué significa ESCNNA?", duration: "5 min", done: true },
        { title: "Formas en que puede ocurrir", duration: "7 min", done: true },
        { title: "Mitos y realidades", duration: "6 min", done: true },
        { title: "Factores de riesgo", duration: "6 min", done: false },
        { title: "Consecuencias", duration: "5 min", done: false },
        { title: "¿Cómo prevenirla?", duration: "6 min", done: false },
      ]
    },
    {
      id: 3, title: "Señales de alerta", icon: "⚠️", color: "#F59E0B",
      progress: 30, duration: "6h", modules: 5,
      description: "Reconoce situaciones de riesgo y señales importantes.",
      lessons: [
        { title: "¿Qué es una señal de alerta?", duration: "8 min", done: true },
        { title: "Señales en el entorno físico", duration: "10 min", done: false },
        { title: "Señales en el entorno digital", duration: "10 min", done: false },
        { title: "¿A quién le cuento?", duration: "8 min", done: false },
        { title: "Práctica y evaluación", duration: "10 min", done: false },
      ]
    },
    {
      id: 4, title: "Seguridad digital", icon: "🔒", color: "#0D9488",
      progress: 0, duration: "7h", modules: 5,
      description: "Navega seguro y protege tu información personal en internet.",
      lessons: []
    },
  ],
  docente: [
    {
      id: 1, title: "Marco legal y normativo", icon: "⚖️", color: "#0D9488",
      progress: 100, duration: "6h", modules: 4,
      description: "Conoce las leyes que protegen a niñas, niños y adolescentes.",
      lessons: [
        { title: "Código de Infancia y Adolescencia", duration: "15 min", done: true },
        { title: "Ruta de atención institucional", duration: "12 min", done: true },
        { title: "Responsabilidad del docente", duration: "10 min", done: true },
        { title: "Evaluación", duration: "10 min", done: true },
      ]
    },
    {
      id: 2, title: "Detección y reporte", icon: "🔍", color: "#7C3AED",
      progress: 50, duration: "8h", modules: 5,
      description: "Cómo identificar y reportar casos de ESCNNA correctamente.",
      lessons: [
        { title: "Indicadores de abuso", duration: "15 min", done: true },
        { title: "Cómo hablar con un estudiante", duration: "12 min", done: true },
        { title: "Protocolo de reporte", duration: "10 min", done: false },
        { title: "Coordinación con entidades", duration: "10 min", done: false },
        { title: "Evaluación", duration: "10 min", done: false },
      ]
    },
    {
      id: 3, title: "Pedagogía preventiva", icon: "🎓", color: "#EC4899",
      progress: 0, duration: "10h", modules: 6,
      description: "Estrategias y herramientas para enseñar prevención en el aula.",
      lessons: []
    },
  ],
  padre: [
    {
      id: 1, title: "Comunicación en familia", icon: "💬", color: "#EC4899",
      progress: 80, duration: "5h", modules: 4,
      description: "Cómo hablar con tus hijos sobre seguridad y prevención.",
      lessons: [
        { title: "Creando un ambiente de confianza", duration: "10 min", done: true },
        { title: "Vocabulario adecuado por edades", duration: "12 min", done: true },
        { title: "Señales de alerta en casa", duration: "10 min", done: true },
        { title: "¿Qué hacer si me cuenta algo?", duration: "8 min", done: false },
      ]
    },
    {
      id: 2, title: "Riesgos en internet", icon: "📱", color: "#0D9488",
      progress: 40, duration: "6h", modules: 5,
      description: "Protege a tus hijos en el entorno digital.",
      lessons: [
        { title: "Peligros comunes en redes", duration: "10 min", done: true },
        { title: "Control parental", duration: "12 min", done: true },
        { title: "Grooming y cómo prevenirlo", duration: "10 min", done: false },
        { title: "Redes sociales y privacidad", duration: "8 min", done: false },
        { title: "Evaluación", duration: "10 min", done: false },
      ]
    },
    {
      id: 3, title: "Rutas de apoyo familiar", icon: "🏠", color: "#F59E0B",
      progress: 0, duration: "4h", modules: 3,
      description: "Conoce a dónde acudir y cómo acompañar a tu hijo/a.",
      lessons: []
    },
  ],
  persona: [
    {
      id: 1, title: "Identificar y actuar", icon: "👁️", color: "#F59E0B",
      progress: 70, duration: "5h", modules: 4,
      description: "Cómo reconocer situaciones de riesgo y qué hacer al respecto.",
      lessons: [
        { title: "¿Qué es la ESCNNA?", duration: "10 min", done: true },
        { title: "Señales en mi comunidad", duration: "12 min", done: true },
        { title: "¿Cómo denunciar?", duration: "8 min", done: true },
        { title: "Apoyar sin revictimizar", duration: "10 min", done: false },
      ]
    },
    {
      id: 2, title: "Redes de protección comunitaria", icon: "🌐", color: "#7C3AED",
      progress: 20, duration: "6h", modules: 4,
      description: "Cómo construir entornos seguros en tu comunidad.",
      lessons: [
        { title: "El rol de la comunidad", duration: "10 min", done: true },
        { title: "Articulación con instituciones", duration: "12 min", done: false },
        { title: "Campañas de prevención", duration: "8 min", done: false },
        { title: "Evaluación", duration: "10 min", done: false },
      ]
    },
  ],
};

const communityPosts = [
  {
    id: 1, time: "Hace 2 horas", category: "Mi experiencia",
    content: "Gracias a esta app entendí que lo que me pasó no fue mi culpa. Por mucho tiempo me sentí sola, pero ahora sé que hay personas que pueden ayudarme. Ya llamé a la línea 141 y estoy recibiendo apoyo. 💜",
    likes: 124, comments: 23, userType: "estudiante",
  },
  {
    id: 2, time: "Hace 5 horas", category: "Pedir consejo",
    content: "Soy docente y noto que una de mis estudiantes ha cambiado mucho. Se aisla, ya no participa y llegó con marcas en los brazos. No sé cómo acercarme sin asustarla. ¿Alguien tiene experiencia con esto?",
    likes: 87, comments: 41, userType: "docente",
  },
  {
    id: 3, time: "Hace 1 día", category: "Agradecimiento",
    content: "Mi hijo me contó algo que me preocupó mucho. Gracias a los cursos de esta app supe exactamente qué hacer y a dónde ir. El proceso no fue fácil, pero estamos en el camino correcto. No están solos.",
    likes: 210, comments: 56, userType: "padre",
  },
  {
    id: 4, time: "Hace 2 días", category: "Mi experiencia",
    content: "En mi barrio vi algo sospechoso con una niña. Gracias a lo que aprendí aquí pude denunciar de manera correcta. La niña ya está siendo atendida. Todos podemos hacer la diferencia.",
    likes: 156, comments: 32, userType: "persona",
  },
  {
    id: 5, time: "Hace 3 días", category: "Agradecimiento",
    content: "Pensé que estaba sola en esto. Leer las historias aquí me dio fuerza para hablar. Ahora recibo terapia. Si alguien más lo está viviendo: sí hay salida y sí hay personas que te creen.",
    likes: 198, comments: 67, userType: "estudiante",
  },
];

const attentionRoutes = [
  {
    id: 1, name: "Línea 141 - ICBF", type: "phone", number: "141",
    description: "Atención 24/7 · Línea gratuita", icon: "📞",
    color: "#7C3AED", services: ["Orientación psicosocial", "Restablecimiento de derechos", "Protección a menores", "Asesoría legal"],
    available: "24 horas, 7 días"
  },
  {
    id: 2, name: "Línea 122 - Policía", type: "phone", number: "122",
    description: "Emergencias · Atención inmediata", icon: "🚔",
    color: "#1D4ED8", services: ["Atención a emergencias", "Protección inmediata", "Acompañamiento policial"],
    available: "24 horas, 7 días"
  },
  {
    id: 3, name: "Línea 123 - Emergencias", type: "phone", number: "123",
    description: "Emergencias médicas y generales", icon: "🚑",
    color: "#DC2626", services: ["Emergencias médicas", "Traslado seguro", "Atención de crisis"],
    available: "24 horas, 7 días"
  },
  {
    id: 4, name: "Línea 106 - FGN", type: "phone", number: "106",
    description: "Fiscalía General de la Nación", icon: "⚖️",
    color: "#0D9488", services: ["Denuncias de delitos", "Seguimiento de casos", "Asesoría jurídica"],
    available: "24 horas, 7 días"
  },
  {
    id: 5, name: "Comisaría de Familia", type: "place",
    description: "Medidas de protección y restablecimiento", icon: "🏛️",
    color: "#EC4899", services: ["Medidas de protección", "Atención psicosocial", "Asesoría legal", "Restablecimiento de derechos"],
    available: "Lunes a Viernes, 8:00 a.m. - 5:00 p.m."
  },
  {
    id: 6, name: "ICBF Centro Zonal", type: "place",
    description: "Instituto Colombiano de Bienestar Familiar", icon: "👶",
    color: "#F59E0B", services: ["Protección de menores", "Programas de apoyo familiar", "Orientación"],
    available: "Lunes a Viernes, 8:00 a.m. - 5:00 p.m."
  },
];

const categoryColors = {
  "Mi experiencia": "#7C3AED",
  "Pedir consejo": "#EC4899",
  "Agradecimiento": "#0D9488",
};

const userTypeColors = {
  estudiante: "#7C3AED",
  docente: "#0D9488",
  padre: "#EC4899",
  persona: "#F59E0B",
};

const userTypeLabels = {
  estudiante: "Estudiante",
  docente: "Docente",
  padre: "Padre/Madre",
  persona: "Persona Natural",
};

export default function AurexiaApp() {
  const [screen, setScreen] = useState("onboarding");
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeTab, setActiveTab] = useState("cursos");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [showPost, setShowPost] = useState(false);
  const [newPost, setNewPost] = useState("");
  const [newPostCategory, setNewPostCategory] = useState("Mi experiencia");
  const [posts, setPosts] = useState(communityPosts);
  const [likedPosts, setLikedPosts] = useState({});

  const s = {
    app: { fontFamily: "'Nunito', sans-serif", background: "#F5F3FF", minHeight: "100vh", maxWidth: 430, margin: "0 auto", position: "relative", overflow: "hidden", boxShadow: "0 0 40px rgba(91,33,182,0.15)" },
    screen: { minHeight: "100vh", display: "flex", flexDirection: "column" },
  };

  if (screen === "onboarding") {
    return (
      <div style={s.app}>
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
        <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #4C1D95 0%, #7C3AED 50%, #EC4899 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32, color: "white", textAlign: "center" }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🛡️</div>
          <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 38, fontWeight: 800, letterSpacing: -1, marginBottom: 8 }}>AUREXIA</div>
          <div style={{ fontSize: 14, opacity: 0.85, marginBottom: 8, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>Prevención de la ESCNNA</div>
          <div style={{ fontSize: 15, opacity: 0.75, marginBottom: 40, maxWidth: 300, lineHeight: 1.6 }}>Educamos, informamos y conectamos para proteger a niñas, niños y adolescentes.</div>
          <div style={{ width: "100%", marginBottom: 16 }}>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>¿Quién eres?</div>
            {userTypes.map(u => (
              <button key={u.id} onClick={() => { setSelectedUser(u); setScreen("home"); }}
                style={{ width: "100%", background: "rgba(255,255,255,0.15)", border: "2px solid rgba(255,255,255,0.3)", borderRadius: 16, padding: "14px 20px", marginBottom: 12, color: "white", cursor: "pointer", display: "flex", alignItems: "center", gap: 14, fontSize: 15, fontWeight: 700, backdropFilter: "blur(8px)", transition: "all 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.25)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
              >
                <span style={{ fontSize: 26 }}>{u.icon}</span>
                <span>{u.label}</span>
              </button>
            ))}
          </div>
          <div style={{ fontSize: 12, opacity: 0.6 }}>Todos los cursos confidenciales</div>
        </div>
      </div>
    );
  }

  const courses = coursesByRole[selectedUser?.id] || [];

  function HomeScreen() {
    return (
      <div style={{ flex: 1, overflowY: "auto", padding: "0 0 80px" }}>
        {/* Header */}
        <div style={{ background: "linear-gradient(135deg, #4C1D95, #7C3AED)", padding: "40px 24px 28px", color: "white" }}>
          <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 4 }}>¡Hola! 👋</div>
          <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 24, fontWeight: 800 }}>Bienvenido/a</div>
          <div style={{ fontSize: 13, opacity: 0.75, marginTop: 4 }}>{selectedUser?.icon} {selectedUser?.label}</div>
        </div>

        {/* Quick actions */}
        <div style={{ padding: "20px 20px 0" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
            {[
              { icon: "🎓", label: "Mis Cursos", tab: "cursos", color: "#7C3AED", bg: "#EDE9FE" },
              { icon: "🗺️", label: "Rutas de Atención", tab: "rutas", color: "#0D9488", bg: "#CCFBF1" },
              { icon: "💬", label: "Comunidad", tab: "comunidad", color: "#EC4899", bg: "#FCE7F3" },
              { icon: "📖", label: "Recursos", tab: "cursos", color: "#F59E0B", bg: "#FEF3C7" },
            ].map((item, i) => (
              <button key={i} onClick={() => setActiveTab(item.tab)}
                style={{ background: item.bg, border: "none", borderRadius: 16, padding: "18px 12px", cursor: "pointer", textAlign: "center", transition: "transform 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              >
                <div style={{ fontSize: 28, marginBottom: 6 }}>{item.icon}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: item.color }}>{item.label}</div>
              </button>
            ))}
          </div>

          {/* Progress banner */}
          <div style={{ background: "linear-gradient(135deg, #EC4899, #7C3AED)", borderRadius: 20, padding: "18px 20px", color: "white", marginBottom: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Tu progreso esta semana</div>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 24, fontWeight: 800 }}>{courses.filter(c => c.progress === 100).length}</div>
                <div style={{ fontSize: 11, opacity: 0.8 }}>Completados</div>
              </div>
              <div style={{ width: 1, background: "rgba(255,255,255,0.3)" }} />
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 24, fontWeight: 800 }}>{courses.filter(c => c.progress > 0 && c.progress < 100).length}</div>
                <div style={{ fontSize: 11, opacity: 0.8 }}>En progreso</div>
              </div>
              <div style={{ width: 1, background: "rgba(255,255,255,0.3)" }} />
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 24, fontWeight: 800 }}>{courses.length}</div>
                <div style={{ fontSize: 11, opacity: 0.8 }}>Total</div>
              </div>
            </div>
          </div>

          {/* Recent courses */}
          <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 16, fontWeight: 700, color: COLORS.dark, marginBottom: 12 }}>Continúa aprendiendo</div>
          {courses.filter(c => c.progress > 0 && c.progress < 100).slice(0, 2).map(course => (
            <CourseCard key={course.id} course={course} onSelect={() => { setSelectedCourse(course); setActiveTab("course-detail"); }} />
          ))}

          {/* Emergency banner */}
          <div style={{ background: "#FEF2F2", border: "2px solid #FCA5A5", borderRadius: 16, padding: "16px 20px", display: "flex", alignItems: "center", gap: 12, marginTop: 8 }}>
            <div style={{ fontSize: 28 }}>🆘</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, color: "#DC2626", fontSize: 13 }}>¿Estás en peligro ahora?</div>
              <div style={{ fontSize: 12, color: "#6B7280" }}>Llama gratis: Línea 141 ICBF</div>
            </div>
            <a href="tel:141" style={{ background: "#DC2626", color: "white", borderRadius: 10, padding: "8px 14px", fontWeight: 700, fontSize: 13, textDecoration: "none" }}>Llamar</a>
          </div>
        </div>
      </div>
    );
  }

  function CourseCard({ course, onSelect }) {
    return (
      <div onClick={onSelect} style={{ background: "white", borderRadius: 18, padding: "16px 18px", marginBottom: 12, boxShadow: "0 2px 12px rgba(91,33,182,0.08)", cursor: "pointer", border: `2px solid ${course.color}18`, transition: "transform 0.15s" }}
        onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
        onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: `${course.color}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>{course.icon}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 800, fontSize: 13, color: COLORS.dark, marginBottom: 3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{course.title}</div>
            <div style={{ fontSize: 11, color: COLORS.gray, marginBottom: 8 }}>{course.modules} módulos · {course.duration}</div>
            <div style={{ background: "#F3F4F6", borderRadius: 99, height: 6, overflow: "hidden" }}>
              <div style={{ width: `${course.progress}%`, height: "100%", background: course.color, borderRadius: 99, transition: "width 0.5s" }} />
            </div>
            <div style={{ fontSize: 11, color: course.color, fontWeight: 700, marginTop: 4 }}>{course.progress}% completado</div>
          </div>
        </div>
      </div>
    );
  }

  function CoursesScreen() {
    if (selectedCourse && activeTab === "course-detail") {
      return (
        <div style={{ flex: 1, overflowY: "auto", padding: "0 0 80px" }}>
          <div style={{ background: `linear-gradient(135deg, ${selectedCourse.color}, ${selectedCourse.color}99)`, padding: "40px 24px 28px", color: "white" }}>
            <button onClick={() => { setSelectedCourse(null); setActiveTab("cursos"); }} style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 10, color: "white", padding: "8px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer", marginBottom: 16 }}>← Volver</button>
            <div style={{ fontSize: 40 }}>{selectedCourse.icon}</div>
            <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 22, fontWeight: 800, marginTop: 8, marginBottom: 4 }}>{selectedCourse.title}</div>
            <div style={{ fontSize: 13, opacity: 0.85, marginBottom: 12 }}>{selectedCourse.description}</div>
            <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: 99, height: 8, overflow: "hidden" }}>
              <div style={{ width: `${selectedCourse.progress}%`, height: "100%", background: "white", borderRadius: 99 }} />
            </div>
            <div style={{ fontSize: 12, marginTop: 6, opacity: 0.9 }}>{selectedCourse.progress}% completado</div>
          </div>
          <div style={{ padding: "20px 20px 0" }}>
            <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 16, fontWeight: 700, color: COLORS.dark, marginBottom: 14 }}>Lecciones</div>
            {selectedCourse.lessons.length === 0 && (
              <div style={{ background: "#F9FAFB", borderRadius: 16, padding: 24, textAlign: "center", color: COLORS.gray }}>
                <div style={{ fontSize: 36, marginBottom: 8 }}>🔒</div>
                <div style={{ fontWeight: 700 }}>Próximamente</div>
                <div style={{ fontSize: 13 }}>Este curso está siendo preparado para ti.</div>
              </div>
            )}
            {selectedCourse.lessons.map((lesson, i) => (
              <div key={i} style={{ background: "white", borderRadius: 14, padding: "14px 16px", marginBottom: 10, display: "flex", alignItems: "center", gap: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", border: `1px solid ${lesson.done ? selectedCourse.color + "30" : "#F3F4F6"}` }}>
                <div style={{ width: 32, height: 32, borderRadius: 99, background: lesson.done ? selectedCourse.color : "#F3F4F6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>
                  {lesson.done ? "✓" : i + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 13, color: COLORS.dark }}>{lesson.title}</div>
                  <div style={{ fontSize: 11, color: COLORS.gray }}>⏱ {lesson.duration}</div>
                </div>
                {!lesson.done && <div style={{ background: selectedCourse.color, color: "white", borderRadius: 8, padding: "4px 10px", fontSize: 11, fontWeight: 700 }}>Ir</div>}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div style={{ flex: 1, overflowY: "auto", padding: "0 0 80px" }}>
        <div style={{ background: "linear-gradient(135deg, #4C1D95, #7C3AED)", padding: "40px 24px 24px", color: "white" }}>
          <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 22, fontWeight: 800 }}>Mis Cursos</div>
          <div style={{ fontSize: 13, opacity: 0.8, marginTop: 4 }}>Aprende a tu ritmo y obtén tu certificado 🎓</div>
        </div>
        <div style={{ padding: "20px 20px 0" }}>
          {courses.map(course => (
            <CourseCard key={course.id} course={course} onSelect={() => { setSelectedCourse(course); setActiveTab("course-detail"); }} />
          ))}
          <div style={{ background: "#F0FDF4", borderRadius: 16, padding: 16, textAlign: "center", marginTop: 8 }}>
            <div style={{ fontSize: 13, color: "#15803D", fontWeight: 700 }}>✅ Todos los cursos son gratuitos</div>
            <div style={{ fontSize: 12, color: "#16A34A" }}>Diseñados por profesionales en protección infantil</div>
          </div>
        </div>
      </div>
    );
  }

  function CommunityScreen() {
    const handleLike = (id) => {
      setLikedPosts(prev => ({ ...prev, [id]: !prev[id] }));
      setPosts(prev => prev.map(p => p.id === id ? { ...p, likes: likedPosts[id] ? p.likes - 1 : p.likes + 1 } : p));
    };
    const handleSubmit = () => {
      if (!newPost.trim()) return;
      const post = { id: Date.now(), time: "Ahora mismo", category: newPostCategory, content: newPost, likes: 0, comments: 0, userType: selectedUser?.id };
      setPosts(prev => [post, ...prev]);
      setNewPost(""); setShowPost(false);
    };
    return (
      <div style={{ flex: 1, overflowY: "auto", padding: "0 0 80px" }}>
        <div style={{ background: "linear-gradient(135deg, #BE185D, #EC4899)", padding: "40px 24px 24px", color: "white" }}>
          <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 22, fontWeight: 800 }}>Comunidad</div>
          <div style={{ fontSize: 13, opacity: 0.8, marginTop: 4 }}>Un espacio seguro, anónimo y de apoyo 💜</div>
        </div>
        <div style={{ padding: "16px 20px 0" }}>
          {/* New post button */}
          <button onClick={() => setShowPost(!showPost)} style={{ width: "100%", background: "white", border: "2px dashed #C4B5FD", borderRadius: 16, padding: 16, textAlign: "left", cursor: "pointer", marginBottom: 16, color: COLORS.gray, fontSize: 14, fontWeight: 600 }}>
            ✏️ Comparte tu experiencia de forma anónima...
          </button>

          {showPost && (
            <div style={{ background: "white", borderRadius: 16, padding: 16, marginBottom: 16, boxShadow: "0 4px 20px rgba(91,33,182,0.1)" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.dark, marginBottom: 8 }}>Categoría:</div>
              <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
                {["Mi experiencia", "Pedir consejo", "Agradecimiento"].map(cat => (
                  <button key={cat} onClick={() => setNewPostCategory(cat)}
                    style={{ background: newPostCategory === cat ? categoryColors[cat] : "#F3F4F6", color: newPostCategory === cat ? "white" : COLORS.gray, border: "none", borderRadius: 99, padding: "6px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
                    {cat}
                  </button>
                ))}
              </div>
              <textarea value={newPost} onChange={e => setNewPost(e.target.value)} placeholder="Escribe tu historia, pregunta o agradecimiento..."
                style={{ width: "100%", minHeight: 100, border: "1px solid #E5E7EB", borderRadius: 12, padding: 12, fontSize: 13, resize: "none", fontFamily: "inherit", boxSizing: "border-box" }} />
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <button onClick={() => setShowPost(false)} style={{ flex: 1, background: "#F3F4F6", border: "none", borderRadius: 10, padding: 10, fontSize: 13, fontWeight: 700, cursor: "pointer", color: COLORS.gray }}>Cancelar</button>
                <button onClick={handleSubmit} style={{ flex: 2, background: "#EC4899", border: "none", borderRadius: 10, padding: 10, fontSize: 13, fontWeight: 700, cursor: "pointer", color: "white" }}>Publicar anónimamente 🛡️</button>
              </div>
              <div style={{ fontSize: 11, color: COLORS.gray, marginTop: 8, textAlign: "center" }}>Tu identidad siempre estará protegida</div>
            </div>
          )}

          {posts.map(post => (
            <div key={post.id} style={{ background: "white", borderRadius: 18, padding: "16px 18px", marginBottom: 14, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 99, background: `${userTypeColors[post.userType]}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
                  {userTypes.find(u => u.id === post.userType)?.icon || "👤"}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 12, color: COLORS.dark }}>Usuario anónimo · {userTypeLabels[post.userType]}</div>
                  <div style={{ fontSize: 11, color: COLORS.gray }}>{post.time}</div>
                </div>
                <div style={{ marginLeft: "auto", background: `${categoryColors[post.category]}15`, color: categoryColors[post.category], borderRadius: 99, padding: "4px 10px", fontSize: 11, fontWeight: 700 }}>{post.category}</div>
              </div>
              <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.65, marginBottom: 12 }}>{post.content}</div>
              <div style={{ display: "flex", gap: 16, borderTop: "1px solid #F3F4F6", paddingTop: 10 }}>
                <button onClick={() => handleLike(post.id)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: likedPosts[post.id] ? "#EC4899" : COLORS.gray, fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                  {likedPosts[post.id] ? "❤️" : "🤍"} {post.likes}
                </button>
                <div style={{ fontSize: 13, color: COLORS.gray, display: "flex", alignItems: "center", gap: 4 }}>💬 {post.comments}</div>
                <div style={{ marginLeft: "auto", fontSize: 12, color: "#0D9488", fontWeight: 700 }}>Apoyar 💜</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function RoutesScreen() {
    if (selectedRoute) {
      return (
        <div style={{ flex: 1, overflowY: "auto", padding: "0 0 80px" }}>
          <div style={{ background: `linear-gradient(135deg, ${selectedRoute.color}, ${selectedRoute.color}99)`, padding: "40px 24px 28px", color: "white" }}>
            <button onClick={() => setSelectedRoute(null)} style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 10, color: "white", padding: "8px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer", marginBottom: 16 }}>← Volver</button>
            <div style={{ fontSize: 42 }}>{selectedRoute.icon}</div>
            <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 22, fontWeight: 800, marginTop: 8 }}>{selectedRoute.name}</div>
            <div style={{ fontSize: 13, opacity: 0.85, marginTop: 4 }}>{selectedRoute.description}</div>
          </div>
          <div style={{ padding: "20px 20px 0" }}>
            <div style={{ background: "#F0FDF4", borderRadius: 14, padding: 14, marginBottom: 16 }}>
              <div style={{ fontWeight: 700, color: "#15803D", fontSize: 13 }}>⏰ Disponibilidad</div>
              <div style={{ fontSize: 13, color: "#374151", marginTop: 4 }}>{selectedRoute.available}</div>
            </div>
            <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 16, fontWeight: 700, color: COLORS.dark, marginBottom: 12 }}>Servicios que ofrecen</div>
            {selectedRoute.services.map((svc, i) => (
              <div key={i} style={{ background: "white", borderRadius: 12, padding: "12px 16px", marginBottom: 8, display: "flex", alignItems: "center", gap: 10, boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
                <div style={{ width: 8, height: 8, borderRadius: 99, background: selectedRoute.color, flexShrink: 0 }} />
                <div style={{ fontSize: 13, color: "#374151" }}>{svc}</div>
              </div>
            ))}
            {selectedRoute.type === "phone" && (
              <a href={`tel:${selectedRoute.number}`} style={{ display: "block", background: selectedRoute.color, color: "white", borderRadius: 16, padding: 16, textAlign: "center", fontWeight: 800, fontSize: 16, textDecoration: "none", marginTop: 16 }}>
                📞 Llamar ahora: {selectedRoute.number}
              </a>
            )}
          </div>
        </div>
      );
    }
    return (
      <div style={{ flex: 1, overflowY: "auto", padding: "0 0 80px" }}>
        <div style={{ background: "linear-gradient(135deg, #065F46, #0D9488)", padding: "40px 24px 24px", color: "white" }}>
          <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 22, fontWeight: 800 }}>Rutas de Atención</div>
          <div style={{ fontSize: 13, opacity: 0.8, marginTop: 4 }}>Encuentra ayuda cercana. No estás solo/a 💜</div>
        </div>
        <div style={{ padding: "16px 20px 0" }}>
          <div style={{ background: "#FEF2F2", border: "2px solid #FCA5A5", borderRadius: 16, padding: 14, marginBottom: 16, display: "flex", gap: 12, alignItems: "center" }}>
            <div style={{ fontSize: 28 }}>🆘</div>
            <div>
              <div style={{ fontWeight: 800, color: "#DC2626", fontSize: 13 }}>Emergencia inmediata</div>
              <div style={{ fontSize: 12, color: "#6B7280" }}>Si estás en peligro ahora mismo</div>
              <a href="tel:141" style={{ color: "#DC2626", fontWeight: 700, fontSize: 13 }}>Llama al 141 ahora →</a>
            </div>
          </div>

          <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 15, fontWeight: 700, color: COLORS.dark, marginBottom: 12 }}>📞 Líneas de ayuda 24/7</div>
          {attentionRoutes.filter(r => r.type === "phone").map(route => (
            <div key={route.id} onClick={() => setSelectedRoute(route)} style={{ background: "white", borderRadius: 18, padding: "16px 18px", marginBottom: 12, display: "flex", gap: 14, alignItems: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", cursor: "pointer", border: `2px solid ${route.color}20`, transition: "transform 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              <div style={{ width: 52, height: 52, borderRadius: 16, background: `${route.color}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>{route.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 14, color: COLORS.dark }}>{route.name}</div>
                <div style={{ fontSize: 12, color: COLORS.gray, marginTop: 2 }}>{route.description}</div>
              </div>
              <a href={`tel:${route.number}`} onClick={e => e.stopPropagation()} style={{ background: route.color, color: "white", borderRadius: 12, padding: "8px 14px", fontWeight: 800, fontSize: 14, textDecoration: "none" }}>{route.number}</a>
            </div>
          ))}

          <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 15, fontWeight: 700, color: COLORS.dark, marginBottom: 12, marginTop: 8 }}>🏛️ Instituciones cercanas</div>
          {attentionRoutes.filter(r => r.type === "place").map(route => (
            <div key={route.id} onClick={() => setSelectedRoute(route)} style={{ background: "white", borderRadius: 18, padding: "16px 18px", marginBottom: 12, display: "flex", gap: 14, alignItems: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", cursor: "pointer", border: `2px solid ${route.color}20`, transition: "transform 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              <div style={{ width: 52, height: 52, borderRadius: 16, background: `${route.color}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>{route.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 14, color: COLORS.dark }}>{route.name}</div>
                <div style={{ fontSize: 12, color: COLORS.gray, marginTop: 2 }}>{route.description}</div>
                <div style={{ fontSize: 11, color: route.color, fontWeight: 700, marginTop: 4 }}>Ver servicios →</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "home", icon: "🏠", label: "Inicio" },
    { id: "cursos", icon: "🎓", label: "Cursos" },
    { id: "comunidad", icon: "💬", label: "Comunidad" },
    { id: "rutas", icon: "🗺️", label: "Rutas" },
  ];

  const renderMain = () => {
    if (activeTab === "home") return <HomeScreen />;
    if (activeTab === "cursos" || activeTab === "course-detail") return <CoursesScreen />;
    if (activeTab === "comunidad") return <CommunityScreen />;
    if (activeTab === "rutas") return <RoutesScreen />;
  };

  return (
    <div style={s.app}>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <div style={{ flex: 1, overflowY: "auto" }}>
          {renderMain()}
        </div>
        {/* Bottom nav */}
        <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 430, background: "white", borderTop: "1px solid #F3F4F6", display: "flex", boxShadow: "0 -4px 20px rgba(0,0,0,0.08)", zIndex: 100 }}>
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => { setActiveTab(tab.id); if (tab.id !== "cursos") setSelectedCourse(null); }}
              style={{ flex: 1, padding: "10px 0 12px", background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
              <div style={{ fontSize: 22 }}>{tab.icon}</div>
              <div style={{ fontSize: 10, fontWeight: 700, color: (activeTab === tab.id || (tab.id === "cursos" && activeTab === "course-detail")) ? COLORS.primary : COLORS.gray }}>
                {tab.label}
              </div>
              {(activeTab === tab.id || (tab.id === "cursos" && activeTab === "course-detail")) && (
                <div style={{ width: 4, height: 4, borderRadius: 99, background: COLORS.primary }} />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
