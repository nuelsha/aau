import { supabase } from "./supabase";

/**
 * Upload a file to Supabase Storage
 * @param {File} file - The file to upload
 * @param {string} bucketName - The name of the storage bucket
 * @param {string} filePath - The path within the bucket where the file should be stored
 * @returns {Promise<{data: {path: string}|null, error: Error|null}>} - The result of the upload operation
 */
export const uploadFile = async (
  file,
  bucketName = "partnership-documents",
  filePath = null
) => {
  try {
    if (!file) {
      throw new Error("No file provided");
    }

    // Create a unique file path if none is provided
    if (!filePath) {
      const timestamp = new Date().getTime();
      const fileExtension = file.name.split(".").pop();
      filePath = `${timestamp}_${Math.random()
        .toString(36)
        .substring(2, 15)}.${fileExtension}`;
    }

    // Upload the file to Supabase storage
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      if (error.message && error.message.includes("bucket not found")) {
        throw new Error(
          `The bucket "${bucketName}" does not exist. Please create it in your Supabase dashboard.`
        );
      }
      throw error;
    }

    // Get the public URL for the uploaded file
    const { data: publicUrlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(data.path);

    return {
      data: {
        path: data.path,
        url: publicUrlData.publicUrl,
      },
      error: null,
    };
  } catch (error) {
    console.error("Error uploading file:", error);
    return { data: null, error };
  }
};

/**
 * Delete a file from Supabase Storage
 * @param {string} filePath - The path of the file to delete
 * @param {string} bucketName - The name of the storage bucket
 * @returns {Promise<{data: {}, error: Error|null}>} - The result of the delete operation
 */
export const deleteFile = async (
  filePath,
  bucketName = "partnership-documents"
) => {
  try {
    const { data, error } = await supabase.storage
      .from(bucketName)
      .remove([filePath]);

    if (error) {
      throw error;
    }

    return { data, error: null };
  } catch (error) {
    console.error("Error deleting file:", error);
    return { data: null, error };
  }
};
