"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Manifest = {
  versionCode: number;
  apkUrl: string;
  notes?: string;
};

export default function Home() {
  const [manifest, setManifest] = useState<Manifest | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      try {
        const res = await fetch('/latest.json', { cache: 'no-store' });
        if (!res.ok) throw new Error('manifest fetch failed');
        const json = await res.json();
        setManifest(json as Manifest);
      } catch (err) {
        setManifest(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-24 px-6 bg-white dark:bg-black sm:items-start">
        <Image src="/next.svg" alt="logo" width={120} height={28} />

        <h1 className="mt-8 text-3xl font-bold">Wasla Updater</h1>

        <div className="mt-6 w-full max-w-xl rounded-md border px-6 py-5">
          {loading ? (
            <p>Loading latest manifest…</p>
          ) : manifest ? (
            <div className="flex flex-col gap-3">
              <div>
                <strong>Version:</strong> {manifest.versionCode}
              </div>
              <div>
                <strong>Notes:</strong> {manifest.notes || '—'}
              </div>
              <div>
                <a
                  className="inline-block mt-3 rounded bg-sky-600 px-4 py-2 text-white"
                  href={manifest.apkUrl}
                  download
                >
                  Download APK
                </a>
              </div>
            </div>
          ) : (
            <p>No manifest available.</p>
          )}
        </div>
      </main>
    </div>
  );
}
