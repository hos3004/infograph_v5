import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const file = searchParams.get('file');

  if (!file) {
    return new NextResponse('File query parameter is missing', { status: 400 });
  }

  const safeFile = path.basename(file);
  if (safeFile !== file || safeFile === '.' || safeFile === '..' || safeFile.includes('\0')) {
    return new NextResponse('Invalid file query parameter', { status: 400 });
  }

  const baseOutputDir = process.env.OUTPUT_DIR || path.join(process.cwd(), 'output');
  const resolvedBaseOutputDir = path.resolve(baseOutputDir);
  const filePath = path.resolve(resolvedBaseOutputDir, safeFile);

  if (!filePath.startsWith(resolvedBaseOutputDir + path.sep)) {
    return new NextResponse('Invalid file query parameter', { status: 400 });
  }

  try {
    const fileBuffer = await fs.readFile(filePath);
    const dispositionFilename = safeFile.replace(/["\r\n]/g, '_');
    
    // Serve the video file to download
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'video/mp4',
        'Content-Disposition': `attachment; filename="${dispositionFilename}"`,
      },
    });
  } catch (error) {
    return new NextResponse('File not found', { status: 404 });
  }
}
