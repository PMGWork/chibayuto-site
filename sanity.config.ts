import { defineConfig, type InferSchemaValues } from '@sanity-typed/types'
import { structureTool } from "sanity/structure";
import { schemaTypes } from './src/sanity/schemaTypes'

const config = defineConfig({
  projectId: 'rao1a119',
  dataset: 'production',
  plugins: [
    structureTool()
  ],
  schema: {
    types: schemaTypes,
  },
});

export default config

export type SanityValues = InferSchemaValues<typeof config>