import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'


const s3Client = new S3Client()
const bucketName = process.env.ATTACHMENT_BUCKET
const urlExpiration = parseInt(process.env.SIGNED_URL_EXPIRATION)

export async function getUploadUrl(fileId) {
    
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileId
    })

    const uploadFileUrl = await getSignedUrl(s3Client, command, {
      expiresIn: urlExpiration
    })
    logger.info(`Obtained an uploadUrl = ${uploadFileUrl}`, {function: "getUploadUrl()"} )
    return uploadFileUrl
}

export function getAttachmentUrl(fileId) {
    return `https://${bucketName}.s3.amazonaws.com/${fileId}`
}