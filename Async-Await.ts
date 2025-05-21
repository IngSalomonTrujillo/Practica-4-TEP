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

const calcularEdadPromesa = (persona: Persona): Promise<PersonaConEdad> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const edad = calcularEdad(persona.fechaNacimiento);
        resolve({ nombre: persona.nombre, edad });
      } catch (error) {
        reject(error);
      }
    }, 500);
  });
};

const calcularEdadesAsync = async (personas: Persona[]): Promise<PersonaConEdad[]> => {
  const resultados: PersonaConEdad[] = [];

  for (const persona of personas) {
    const resultado = await calcularEdadPromesa(persona);
    resultados.push(resultado);
  }

  return resultados;
};

const personas: Persona[] = [
  { nombre: "Ana", fechaNacimiento: new Date(1991, 5, 15) },
  { nombre: "Carlos", fechaNacimiento: new Date(1985, 2, 8) },
  { nombre: "Elena", fechaNacimiento: new Date(2005, 10, 22) },
  { nombre: "Miguel", fechaNacimiento: new Date(1988, 7, 30) },
];

console.log("Usando Async/Await:");
(async () => {
  try {
    const resultados = await calcularEdadesAsync(personas);
    console.log("Resultados con async/await:", resultados);
  } catch (error) {
    console.error("Error con async/await:", error);
  }
})();