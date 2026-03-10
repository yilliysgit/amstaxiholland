import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { config } from 'dotenv'
import { v4 as uuidv4 } from 'uuid'

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
  console.error('❌ Gebruik: node scripts/faq-import.mjs scripts/faq/faq-particulier.json')
  process.exit(1)
}

const faqs = JSON.parse(readFileSync(file, 'utf8'))
const tx = client.transaction()

faqs.forEach((faq, i) => {
  const id = uuidv4()
  const doc = {
    _type: 'faqItem',
    _id: id,
    internalName: faq.question.nl,
    category: faq.category,
    sortOrder: i,
    question: { nl: faq.question.nl, en: faq.question.en },
    answer: { nl: faq.answer.nl, en: faq.answer.en },
  }
  tx.createOrReplace(doc)
  tx.createOrReplace({ ...doc, _id: `drafts.${id}` })
})

tx.commit()
  .then(() => console.log(`✅ ${faqs.length} FAQ items geïmporteerd!`))
  .catch(err => console.error('❌ Fout:', err.message))