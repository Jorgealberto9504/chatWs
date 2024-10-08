import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Obtenemos el path del archivo actual
const __filename = fileURLToPath(import.meta.url);

// Obtenemos el directorio del archivo actual
const __dirname = dirname(__filename);

// Exportamos __dirname para usarlo en otros archivos
export { __dirname };
