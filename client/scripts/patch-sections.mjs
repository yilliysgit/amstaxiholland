import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { config } from 'dotenv'

config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const file = process.argv[2]
if (!file) {
  console.error('❌ Gebruik: node scripts/patch-sections.mjs scripts/subservices/familie-bezoek.json')
  process.exit(1)
}

const doc = JSON.parse(readFileSync(file, 'utf8'))

await client
  .patch(doc._id)
  .set({ sections: doc.sections })
  .commit()

await client
  .patch(`drafts.${doc._id}`)
  .set({ sections: doc.sections })
  .commit()
  .catch(() => {}) // draft bestaat misschien niet

console.log('✅ Sections gepatcht!')