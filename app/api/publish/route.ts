import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const versionCode = Number(body.versionCode || 0)
    const apkUrl = String(body.apkUrl || '')
    const notes = body.notes ? String(body.notes) : ''

    if (!versionCode || !apkUrl) {
      return NextResponse.json({ error: 'versionCode and apkUrl required' }, { status: 400 })
    }

    const manifest = { versionCode, apkUrl, notes }
    const outPath = path.join(process.cwd(), 'public', 'latest.json')

    await fs.promises.writeFile(outPath, JSON.stringify(manifest))

    return NextResponse.json({ ok: true, versionCode, apkUrl })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 })
  }
}
