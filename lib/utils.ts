import { AvailabilityTimes, DoctorProfileAvailability } from "@/types/types";
import { Availability } from "@prisma/client";
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

// utils/date.ts
export function formatToday(): string {
  const today = new Date();

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  };

  return today.toLocaleDateString('en-US', options).replace(',', ', ');
}
export const getDayName=(): keyof DoctorProfileAvailability=>{
  const daysOfWeek:(keyof DoctorProfileAvailability)[]=[
      "sunday",
      "monday",
      "tuesDay",
      "wednesday",
      "thursday",
      "friday",
      "saturday"
  ]
  const today=new Date()
  const dayName=daysOfWeek[today.getDay()]
  return dayName
}
export const getDayOfWeek = (date: Date): keyof AvailabilityTimes => {
  const days: (keyof AvailabilityTimes)[] = ['sunday', 'monday', 'tuesDay', 'wednesday', 'thursday', 'friday', 'saturday'];
  return days[date.getDay()];
};
export function generateInitials(fullName: string): string {
  const nameParts = fullName.trim().split(' ');
  const initials = nameParts.map(part => part[0].toUpperCase()).join('');
  return initials;
}

export function timeAgo(createdAt: Date): string {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - createdAt.getTime()) / 1000);

  const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1,
  };

  for (const [unit, value] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / value);
      if (interval > 1) {
          return `${interval} ${unit}s ago`;
      } else if (interval === 1) {
          return `${interval} ${unit} ago`;
      }
  }

  return "just now";
}
export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long', // Friday
    day: '2-digit',  // 12
    month: 'long',   // July
    year: 'numeric'  // 2024
  };

  const formattedDate = date.toLocaleDateString('en-US', options);

  // Replace comma after the weekday with a comma-space and the other commas with just commas
  return formattedDate.replace(/,\s/g, ',').replace(',', ', ');
}
export function formatAppointment(date: Date): string {
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const dayOfWeek = daysOfWeek[date.getUTCDay()];
  const month = months[date.getUTCMonth()];
  const dayOfMonth = date.getUTCDate();

  return `${dayOfWeek}, ${month}, ${dayOfMonth}`;
}
