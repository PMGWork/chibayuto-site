import { defineConfig, type InferSchemaValues } from '@sanity-typed/types'
import { structureTool } from "sanity/structure";
import { schemaTypes } from './src/sanity/schemaTypes'

const config = defineConfig({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  plugins: [
    structureTool()
  ],
  schema: {
    types: schemaTypes,
  },
});

export default config

export type SanityValues = InferSchemaValues<typeof config>