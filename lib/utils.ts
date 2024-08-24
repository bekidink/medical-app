import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function formatFileSize(bytes?: number) {
  if (!bytes) return '0 B';
  const k = 1024;
  const dm = 2;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
export function generateTrackingNumber(): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let trackingNumber = '';

  for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      trackingNumber += characters[randomIndex];
  }

  return trackingNumber;
}

export async function getData(endpoint:string) {
  try {
    const baseUrl = process.env.NEXTAUTH_URL;
    const response = await fetch(`http://localhost:3000/api/${endpoint}`, {
      cache: "no-store",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
export function generateSlug(title:string) {
  return title
    .toLowerCase()                   
    .trim()                          
    .replace(/[\s\W-]+/g, '-')       
    .replace(/^-+|-+$/g, '');       
}

