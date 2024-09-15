# ETH Key Generator

[![npm version](https://img.shields.io/npm/v/eth-key-generator.svg)](https://www.npmjs.com/package/eth-key-generator)
[![downloads](https://img.shields.io/npm/dt/eth-key-generator.svg)](https://www.npmjs.com/package/eth-key-generator)

Una herramienta interactiva para generar wallets de Ethereum visualmente agradable y con explicaciones detalladas de cada paso del proceso.

---

## Tabla de Contenidos

- [Características](#características)
- [Instalación](#instalación)
- [Uso](#uso)
- [Ejemplos](#ejemplos)
- [Dependencias](#dependencias)
- [Contribución](#contribución)
- [Autor](#autor)
- [Notas Importantes](#notas-importantes)
- [Contacto](#contacto)

---

## Características

- **Generación de wallets de Ethereum**: Crea wallets de manera aleatoria o proporcionando entropía personalizada.
- **Efectos Visuales**: Interfaz atractiva con efectos que muestran el proceso de generación paso a paso.
- **Explicaciones Detalladas**: Cada etapa del proceso incluye descripciones para ayudar a los usuarios a entender cómo se genera una wallet.
- **Seguridad**: Utiliza la librería `ethers.js` para asegurar la generación de claves criptográficas de alta calidad.
- **Interfaz Interactiva**: Menús y prompts que facilitan la interacción del usuario con la herramienta.

---

## Instalación

### Requisitos Previos

- **Node.js** (versión 14 o superior)
- **npm** (versión 6 o superior)

### Instalación Global

Puedes instalar `eth-key-generator` de manera global usando npm:

\```bash
npm install -g eth-key-generator
\```

---

## Uso

Una vez instalado, puedes ejecutar la herramienta desde la línea de comandos:

\```bash
eth-key-generator
\```

Sigue las instrucciones en pantalla para generar tu wallet de Ethereum.

---

## Ejemplos

### Generar una Wallet Aleatoria

\```bash
eth-key-generator
\```

- Selecciona la opción **"Al azar"** cuando se te pregunte.
- La herramienta generará una wallet nueva, mostrando cada paso del proceso.

### Generar una Wallet con Entropía Personalizada

\```bash
eth-key-generator
\```

- Selecciona la opción **"Proporcionar entropía"**.
- Ingresa una cadena de texto que servirá como entropía adicional.
- La wallet se generará combinando tu entropía con entropía aleatoria.

---

## Dependencias

El proyecto utiliza las siguientes librerías:

- [ethers](https://www.npmjs.com/package/ethers) - Interacción con Ethereum y generación de claves.
- [chalk](https://www.npmjs.com/package/chalk) - Estilización de la salida en la consola.
- [figlet](https://www.npmjs.com/package/figlet) - Creación de texto en ASCII art.
- [inquirer](https://www.npmjs.com/package/inquirer) - Creación de interfaces interactivas en la línea de comandos.
- [ora](https://www.npmjs.com/package/ora) - Indicadores de carga y spinners.

---

## Contribución

¡Las contribuciones son bienvenidas! Por favor, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama para tu función o arreglo de bug (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -m 'Agrega nueva funcionalidad'`).
4. Sube tus cambios a tu fork (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request en el repositorio original.

---

## Autor

**David Zapata**

- [GitHub](https://github.com/DavidZapataOh)
- [Correo Electrónico](mailto:davidzapata5885@gmail.com)
- [Twitter](https://x.com/DavidZapataOh)

---

## Notas Importantes

- **Seguridad**: Esta herramienta es para fines educativos. No utilices las wallets generadas para manejar fondos reales sin las precauciones adecuadas.
- **Privacidad**: Asegúrate de guardar tu frase de recuperación y clave privada en un lugar seguro. No las compartas con nadie.
- **Actualizaciones**: Revisa regularmente si hay actualizaciones disponibles para garantizar que estás utilizando la versión más reciente y segura de la herramienta.

---

## Contacto

Si tienes preguntas, problemas o sugerencias, por favor abre un issue en GitHub o contáctame directamente.

---

¡Gracias por utilizar **ETH Key Gen**! Espero que esta herramienta te sea útil en tu aprendizaje y exploración del mundo de Ethereum y la criptografía.