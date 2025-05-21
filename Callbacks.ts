type Persona = {
  nombre: string;
  fechaNacimiento: Date;
};

type PersonaConEdad = {
  nombre: string;
  edad: number;
};

const calcularEdad = (fechaNacimiento: Date): number => {
  const hoy = new Date();
  let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
  const m = hoy.getMonth() - fechaNacimiento.getMonth();

  if (m < 0 || (m === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
    edad--;
  }

  return edad;
};

const calcularEdadAsincrono = (
  persona: Persona,
  callback: (error: Error | null, resultado?: PersonaConEdad) => void,
) => {
  setTimeout(() => {
    try {
      const edad = calcularEdad(persona.fechaNacimiento);
      callback(null, { nombre: persona.nombre, edad });
    } catch (error) {
      callback(error as Error);
    }
  }, 500);
};

const calcularEdadesCallback = (
  personas: Persona[],
  callback: (error: Error | null, resultados?: PersonaConEdad[]) => void,
) => {
  const resultados: PersonaConEdad[] = [];
  let pendientes = personas.length;

  if (personas.length === 0) {
    callback(null, []);
    return;
  }

  personas.forEach((persona) => {
    calcularEdadAsincrono(persona, (error, resultado) => {
      if (error) {
        callback(error);
        return;
      }

      if (resultado) {
        resultados.push(resultado);
      }

      pendientes--;
      if (pendientes === 0) {
        callback(null, resultados);
      }
    });
  });
};

const personas: Persona[] = [
  { nombre: "Ana", fechaNacimiento: new Date(2003, 5, 15) },
  { nombre: "Carlos", fechaNacimiento: new Date(1975, 2, 8) },
  { nombre: "Elena", fechaNacimiento: new Date(1999, 10, 22) },
  { nombre: "Miguel", fechaNacimiento: new Date(2012, 7, 30) },
];


console.log("Usando Callbacks:");
calcularEdadesCallback(personas, (error, resultados) => {
  if (error) {
    console.error("Error con callbacks:", error);
    return;
  }
  console.log("Resultados con callbacks:", resultados);
});