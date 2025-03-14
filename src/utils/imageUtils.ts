// src/utils/imageUtils.ts

// Default fallback image for posts
export const DEFAULT_POST_IMAGE = '/default-post.jpg';

// Default fallback image for avatars
export const DEFAULT_AVATAR_IMAGE = '/default-avatar.png';

// Check if an image URL is valid
export const isValidImageUrl = (url: string): boolean => {
  // Check if URL is empty or just whitespace
  if (!url || url.trim() === '') return false;
  
  // Check if URL has a valid protocol
  if (!url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('/')) {
    return false;
  }
  
  // Check for common image extensions
  const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
  const hasValidExtension = validExtensions.some(ext => 
    url.toLowerCase().endsWith(ext)
  );
  
  // If it's a relative URL starting with /, assume it's valid
  if (url.startsWith('/')) return true;
  
  return hasValidExtension;
};

// Get a valid image URL or return a fallback
export const getValidImageUrl = (url: string | null, isAvatar: boolean = false): string => {
  if (!url) {
    // Return appropriate fallback based on image type
    return isAvatar ? DEFAULT_AVATAR_IMAGE : DEFAULT_POST_IMAGE;
  }
  
  // If URL is already valid, return it
  if (isValidImageUrl(url)) {
    // If it's a relative URL, it's already good to go
    if (url.startsWith('/')) return url;
    
    // If it has a protocol, assume it's correct
    if (url.startsWith('http')) return url;
  }
  
  // For URLs without protocol, try adding https
  const urlWithProtocol = `https://${url}`;
  if (isValidImageUrl(urlWithProtocol)) {
    return urlWithProtocol;
  }
  
  // If all else fails, return the fallback
  return isAvatar ? DEFAULT_AVATAR_IMAGE : DEFAULT_POST_IMAGE;
};

// Handle image loading errors by replacing with fallback
export const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>, isAvatar: boolean = false): void => {
  const fallback = isAvatar ? DEFAULT_AVATAR_IMAGE : DEFAULT_POST_IMAGE;
  event.currentTarget.src = fallback;
}; 