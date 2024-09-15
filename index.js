#!/usr/bin/env node

import {ethers} from 'ethers';
import chalk from 'chalk';
import figlet from 'figlet';
import inquirer from 'inquirer';
import ora from 'ora';

/**
 * Muestra el título estilizado de la aplicación utilizando figlet y chalk.
 */
function displayTitle() {
  console.log(
    chalk.cyan(
      figlet.textSync('ETH Key Gen', { horizontalLayout: 'default' })
    )
  );
}
  
/**
 * Presenta un menú al usuario para elegir el método de generación de la wallet.
 * @returns {Promise<string>} Método de generación seleccionado por el usuario.
 */
async function promptUser() {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'generationMethod',
      message: '¿Cómo deseas generar tu wallet de Ethereum?',
      choices: ['Al azar', 'Proporcionar entropía'],
    },
  ]);

  return answers.generationMethod;
}
  
/**
 * Muestra mensajes explicativos con un spinner y un retraso simulado.
 * @param {ora.Ora} spinner - Instancia del spinner de ora.
 * @param {string} message - Mensaje a mostrar.
 * @param {number} delay - Tiempo en milisegundos para simular el retraso.
 */
async function explainStep(spinner, message, delay = 4000) {
  spinner.text = message;
  await new Promise(resolve => setTimeout(resolve, delay));
}
  
/**
 * Genera una wallet de Ethereum según el método seleccionado.
 * @param {string} method - Método de generación: 'Al azar' o 'Proporcionar entropía'.
 * @returns {Promise<ethers.Wallet>} Wallet generada.
 */
async function generateWallet(method) {
  let wallet;
  const spinner = ora().start();

  if (method === 'Al azar') {
    // Generación de entropía aleatoria
    await explainStep(spinner, 'Generando entropía aleatoria...');
    const randomBytes = ethers.randomBytes(16); // 16 bytes = 128 bits

    // Creación de la frase mnemónica a partir de la entropía
    await explainStep(spinner, 'Creando frase de recuperación (mnemónico)...');
    const mnemonic = ethers.Mnemonic.fromEntropy(randomBytes);
    
    // Derivación de la clave privada desde la frase mnemónica
    await explainStep(spinner, 'Derivando clave privada desde el mnemónico...');
    wallet = ethers.Wallet.fromPhrase(mnemonic.phrase);
    
    // La clave pública ya está disponible en wallet.publicKey
    await explainStep(spinner, 'Calculando clave pública a partir de la clave privada...');

    // La clave pública comprimida es la predeterminada en wallet.publicKey
    await explainStep(spinner, 'Comprimiendo clave pública...');

    // La dirección ya está disponible en wallet.address
    await explainStep(spinner, 'Generando dirección de Ethereum...');

  } else {
    // Detener el spinner antes de solicitar la entropía al usuario
    spinner.stop();

    // Solicitud de entropía adicional al usuario
    const entropyAnswer = await inquirer.prompt([
      {
        type: 'input',
        name: 'entropy',
        message: 'Ingresa una cadena de texto como entropía adicional:',
      },
    ]);
    spinner.start();

    // Combinación de la entropía del usuario con entropía aleatoria
    await explainStep(spinner, 'Combinando tu entropía con entropía aleatoria...');
    const entropyBytes = ethers.toUtf8Bytes(entropyAnswer.entropy);
    const randomBytes = ethers.randomBytes(16);
    let combinedEntropy = ethers.concat([randomBytes, entropyBytes]);

    // Aseguramos que la entropía total sea de 16 bytes (128 bits)
    combinedEntropy = ethers.dataSlice(ethers.keccak256(combinedEntropy), 0, 16);

     // Creación de la frase mnemónica a partir de la entropía combinada
    await explainStep(spinner, 'Creando frase de recuperación (mnemónico) a partir de la entropía...');
    const mnemonic = ethers.Mnemonic.fromEntropy(combinedEntropy);

    // Derivación de la clave privada desde la frase mnemónica
    await explainStep(spinner, 'Derivando clave privada desde el mnemónico...');
    wallet = ethers.Wallet.fromPhrase(mnemonic.phrase);

    // La clave pública ya está disponible en wallet.publicKey
    await explainStep(spinner, 'Calculando clave pública a partir de la clave privada...');

    // La clave pública comprimida es la predeterminada en wallet.publicKey
    await explainStep(spinner, 'Comprimiendo clave pública...');

    // La dirección ya está disponible en wallet.address
    await explainStep(spinner, 'Generando dirección de Ethereum...');
  }

  // Finalización del spinner con mensaje de éxito
  spinner.succeed('¡Wallet generada exitosamente!');
  return wallet;
}
  
/**
 * Muestra los detalles de la wallet generada con efectos visuales.
 * @param {ethers.Wallet} wallet - Wallet generada.
 */
async function displayWalletDetails(wallet) {
  console.log(chalk.green('\nDetalles de tu wallet de Ethereum:\n'));

  // Mostrar cada valor con efecto de revelado
  await revealValue('Frase de recuperación:', wallet.mnemonic.phrase, 'magenta');
  await revealValue('Clave privada:', wallet.privateKey, 'red');
  await revealValue('Clave pública (No comprimida):', wallet.signingKey.publicKey, 'yellow');
  await revealValue('Clave pública (Comprimida):', wallet.publicKey, 'yellow');
  await revealValue('Dirección de Ethereum:', wallet.address, 'green');

  console.log(chalk.blue('\n¡Asegúrate de mantener tu frase de recuperación y clave privada en un lugar seguro!\n'));
}
  
/**
 * Muestra valores con efectos visuales, revelando el contenido gradualmente.
 * @param {string} label - Etiqueta descriptiva del valor.
 * @param {string} value - Valor a mostrar.
 * @param {string} color - Color para resaltar el valor.
 */
async function revealValue(label, value, color) {
  process.stdout.write(chalk.cyan(`${label}\n`));

  // Si es la frase de recuperación, mostramos palabra por palabra
  if (label === 'Frase de recuperación:') {
    const words = value.split(' ');
    for (let word of words) {
      process.stdout.write(chalk[color](word) + ' ');
      await new Promise(resolve => setTimeout(resolve, 300)); // Ajusta la velocidad aquí
    }
    process.stdout.write('\n\n');
  } else {
    // Mostrar otros valores carácter por carácter
    const valueArray = value.split('');
    for (let char of valueArray) {
      process.stdout.write(chalk[color](char));
      await new Promise(resolve => setTimeout(resolve, 5));
    }
    process.stdout.write('\n\n');
  }
}
  
// Función principal para ejecutar el script
async function main() {
  // Mostrar el título de la aplicación
  displayTitle();

  // Presentar el menú al usuario y obtener el método de generación
  const method = await promptUser();

  // Generar la wallet según el método seleccionado
  const wallet = await generateWallet(method);

  // Mostrar los detalles de la wallet generada
  await displayWalletDetails(wallet);
}

main();