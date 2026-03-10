import { createClient } from '@sanity/client'
import { config } from 'dotenv'

config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const id = process.argv[2]
if (!id) {
  console.error('❌ Gebruik: node scripts/clear-sections.mjs DOCUMENT_ID')
  process.exit(1)
}

await client.patch(id).set({ sections: [] }).commit()
await client.patch(`drafts.${id}`).set({ sections: [] }).commit().catch(() => {})

console.log('✅ Sections leeggemaakt!')