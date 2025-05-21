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

const calcularEdadesPromesa = (personas: Persona[]): Promise<PersonaConEdad[]> => {
  const promesas = personas.map((persona) => calcularEdadPromesa(persona));
  return Promise.all(promesas);
};

const personas: Persona[] = [
  { nombre: "Ana", fechaNacimiento: new Date(2007, 5, 15) },
  { nombre: "Carlos", fechaNacimiento: new Date(1968, 2, 8) },
  { nombre: "Elena", fechaNacimiento: new Date(2015, 10, 22) },
  { nombre: "Miguel", fechaNacimiento: new Date(1988, 7, 30) },
];

console.log("Usando Promesas:");
calcularEdadesPromesa(personas)
  .then(resultados => {
    console.log("Resultados con promesas:", resultados);
  })
  .catch(error => {
    console.error("Error con promesas:", error);
  });