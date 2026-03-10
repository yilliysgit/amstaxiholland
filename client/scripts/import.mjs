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
  console.error('❌ Geef een bestand mee: node scripts/import.mjs scripts/mijnfile.json')
  process.exit(1)
}

const doc = JSON.parse(readFileSync(file, 'utf8'))

client.transaction()
  .createOrReplace(doc)
  .createOrReplace({ ...doc, _id: `drafts.${doc._id}` })
  .commit()
  .then(() => {
    console.log('✅ Import gelukt!')
  })
  .catch((err) => {
    console.error('❌ Fout:', err.message)
  })