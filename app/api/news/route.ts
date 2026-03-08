import { NextResponse } from 'next/server';

const APIS = [
  { name: 'CNBC', url: 'https://api.nexray.web.id/berita/cnbcindonesia' },
  { name: 'CNN', url: 'https://api.nexray.web.id/berita/cnn' },
  { name: 'Kompas', url: 'https://api.nexray.web.id/berita/kompas' },
  { name: 'Sindo', url: 'https://api.nexray.web.id/berita/sindonews' },
  { name: 'Suara', url: 'https://api.nexray.web.id/berita/suara' }
];

export async function GET() {
  try {
    const fetchPromises = APIS.map(async (api) => {
      try {
        const res = await fetch(api.url, { next: { revalidate: 300 } });
        const data = await res.json();
        return (data.result || []).map((item: any) => ({
          title: item.title || 'Tanpa Judul',
          link: item.link || '#',
          image: item.image || item.image_thumbnail || item.imageUrl || 'https://via.placeholder.com/500x300?text=No+Image',
          source: api.name,
          time: item.date || item.timestamp || item.time || 'Baru saja',
        }));
      } catch (err) { return []; }
    });

    const allResults = await Promise.all(fetchPromises);
    const mergedNews = allResults.flat().sort(() => Math.random() - 0.5);
    return NextResponse.json(mergedNews);
  } catch (error) {
    return NextResponse.json({ error: 'Gagal mengambil berita' }, { status: 500 });
  }
          }
