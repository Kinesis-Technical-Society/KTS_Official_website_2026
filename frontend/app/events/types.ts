import { ReactNode } from "react";

export interface Event {
  type?: ReactNode;
  id: number | string;
  title: string;
  date: string;
  status: "upcoming" | "brewing" | "past";
  description: string;
  tags: string[];
  participants?: number;
  highlights?: string[];
  prize?: string;
  location: string;
  image?: string;
  accent: string;
  gradient: string;
  photos: string[];
  photoColors?: string[];
}
