import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const {
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY
} = process.env

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing env vars. Required: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

async function createUsersFromStudents() {
  const { data: students, error } = await supabaseAdmin
    .from('Studentslist_2025')
    .select('mail_id, password')
    .not('mail_id', 'is', null)
    .not('password', 'is', null)

  if (error) {
    throw error
  }

  console.log(`Found ${students.length} students. Creating auth users...`)

  for (const s of students) {
    const email = s.mail_id
    const password = String(s.password)

    const { data, error } = await supabaseAdmin.auth.api.createUser({
      email,
      password,
      email_confirm: true
    })

    if (error) {
      if (String(error.message || '').toLowerCase().includes('already registered')) {
        console.log(`Exists: ${email}`)
      } else {
        console.error(`Failed: ${email} -> ${error.message}`)
      }
    } else {
      console.log(`Created: ${email}`)
    }
  }
}

async function createUsersFromAdmins() {
  const { data: admins, error } = await supabaseAdmin
    .from('Admin_list')
    .select('mail_id, password')
    .not('mail_id', 'is', null)
    .not('password', 'is', null)

  if (error) {
    throw error
  }

  console.log(`Found ${admins.length} admins. Creating auth users...`)

  for (const a of admins) {
    const email = a.mail_id
    const password = String(a.password)

    const { data, error } = await supabaseAdmin.auth.api.createUser({
      email,
      password,
      email_confirm: true
    })

    if (error) {
      if (String(error.message || '').toLowerCase().includes('already registered')) {
        console.log(`Exists: ${email}`)
      } else {
        console.error(`Failed: ${email} -> ${error.message}`)
      }
    } else {
      console.log(`Created: ${email}`)
    }
  }
}

async function main() {
  await createUsersFromAdmins()
  await createUsersFromStudents()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
