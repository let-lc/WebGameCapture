import fs from 'fs';

import { Schema } from './schema';

fs.writeFileSync('./public/locales/schema.json', JSON.stringify(Schema, null, 2));
