import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  
  // Initialize S3 client for R2
  const s3 = new S3Client({
    region: 'auto',
    endpoint: `https://${config.r2AccountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: config.r2AccessKeyId,
      secretAccessKey: config.r2SecretAccessKey,
    },
  });

  const formData = await readMultipartFormData(event);
  
  if (!formData || formData.length === 0) {
    throw createError({ statusCode: 400, message: 'No file uploaded' });
  }

  const fileField = formData.find(f => f.name === 'file');
  const folderField = formData.find(f => f.name === 'folder');
  
  if (!fileField || !fileField.data) {
    throw createError({ statusCode: 400, message: 'File field is required' });
  }

  const folder = folderField?.data?.toString() || 'uploads';
  const originalName = fileField.filename || 'file';
  const ext = originalName.split('.').pop() || 'bin';
  const timestamp = Date.now();
  const randomId = Math.random().toString(36).substring(2, 8);
  const key = `${folder}/${timestamp}_${randomId}.${ext}`;

  // Determine content type
  const contentType = fileField.type || 'application/octet-stream';

  try {
    await s3.send(new PutObjectCommand({
      Bucket: config.r2BucketName,
      Key: key,
      Body: fileField.data,
      ContentType: contentType,
    }));

    // Return the public URL
    const publicUrl = config.public.r2PublicUrl
      ? `${config.public.r2PublicUrl}/${key}`
      : `https://${config.r2AccountId}.r2.cloudflarestorage.com/${config.r2BucketName}/${key}`;

    return {
      success: true,
      url: publicUrl,
      key: key,
      contentType: contentType,
    };
  } catch (err: any) {
    console.error('R2 upload error:', err);
    throw createError({ 
      statusCode: 500, 
      message: `Upload failed: ${err.message}` 
    });
  }
});
