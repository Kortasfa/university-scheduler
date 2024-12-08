#!/bin/bash
npx supabase gen types typescript --project-id "$PROJECT_REF" --schema public > database.types.ts 