import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { randomBytes } from 'crypto';

export const config = {
  api: {
    bodyParser: false,
  },
};

// Generate unique filename
function generateUniqueFilename(originalName: string): string {
  const ext = originalName.split('.').pop();
  const randomName = randomBytes(16).toString('hex');
  return `${randomName}.${ext}`;
}

export async function POST(request: NextRequest) {
  try {
    console.log('=== DEALER REGISTRATION WITH FILES API CALLED ===');
    
    // Parse form data
    const formData = await request.formData();
    
    // Extract text fields
    const businessName = formData.get('businessName') as string;
    const businessType = formData.get('businessType') as string;
    const registrationNumber = formData.get('registrationNumber') as string;
    const kraPin = formData.get('kraPin') as string;
    const yearEstablished = formData.get('yearEstablished') as string;
    const contactPerson = formData.get('contactPerson') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const whatsapp = formData.get('whatsapp') as string;
    const website = formData.get('website') as string;
    const county = formData.get('county') as string;
    const town = formData.get('town') as string;
    const address = formData.get('address') as string;
    const description = formData.get('description') as string;
    const specialties = JSON.parse(formData.get('specialties') as string || '[]');
    const password = formData.get('password') as string || '';
    const confirmPassword = formData.get('confirmPassword') as string || '';
    const agreeToTerms = formData.get('agreeToTerms') === 'true';
    const agreeToVerification = formData.get('agreeToVerification') === 'true';

    console.log('Received form data:', {
      businessName, email, contactPerson,
      agreeToTerms, agreeToVerification
    });

    // Create uploads directory if it doesn't exist
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    const { mkdir } = await import('fs/promises');
    await mkdir(uploadDir, { recursive: true });

    // Function to save a file
    const saveFile = async (file: File | null, folder: string): Promise<string | null> => {
      if (!file) return null;
      
      const filename = generateUniqueFilename(file.name);
      const folderPath = join(uploadDir, folder);
      await mkdir(folderPath, { recursive: true });
      
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filePath = join(folderPath, filename);
      
      await writeFile(filePath, buffer);
      return `/uploads/${folder}/${filename}`;
    };

    // Save all files
    const profileImageUrl = await saveFile(formData.get('profileImage') as File, 'profile-images');
    const logoImageUrl = await saveFile(formData.get('logoImage') as File, 'logos');
    const coverImageUrl = await saveFile(formData.get('coverImage') as File, 'covers');
    const businessLicenseUrl = await saveFile(formData.get('businessLicense') as File, 'documents');
    const kraDocumentUrl = await saveFile(formData.get('kraDocument') as File, 'documents');
    const idCopyUrl = await saveFile(formData.get('idCopy') as File, 'documents');
    
    // Save gallery images
    const galleryUrls: string[] = [];
    for (let i = 0; i < 10; i++) {
      const image = formData.get(`galleryImage${i}`) as File;
      if (image) {
        const url = await saveFile(image, 'gallery');
        if (url) galleryUrls.push(url);
      }
    }

    console.log('Files saved:', {
      profileImageUrl,
      logoImageUrl,
      coverImageUrl,
      businessLicenseUrl,
      kraDocumentUrl,
      idCopyUrl,
      galleryUrls: galleryUrls.length
    });

    // Now send data to your NestJS backend
    const requestBody = {
      businessName,
      businessType,
      registrationNumber,
      kraPin,
      yearEstablished: Number(yearEstablished),
      contactPerson,
      email,
      phone,
      whatsapp,
      website,
      county,
      town,
      address,
      description,
      specialties,
      password,
      confirmPassword,
      agreeToTerms,
      agreeToVerification,
      // Include the file URLs
      profileImageUrl,
      logoUrl: logoImageUrl,
      coverImageUrl,
      businessLicensePath: businessLicenseUrl,
      kraDocumentPath: kraDocumentUrl,
      idCopyPath: idCopyUrl,
      gallery: galleryUrls,
    };

    console.log('Sending to backend:', {
      ...requestBody,
      gallery: `Array with ${galleryUrls.length} images`
    });

    // Send to your NestJS backend
    const response = await fetch('http://localhost:3001/auth/business-dealer-register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    console.log('Backend response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Backend error:', errorText);
      throw new Error(`Backend error: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    console.log('Backend response:', data);
    
    return NextResponse.json(data, { 
      status: response.status,
    });
    
  } catch (error: any) {
    console.error('Dealer registration error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Registration failed',
        details: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}