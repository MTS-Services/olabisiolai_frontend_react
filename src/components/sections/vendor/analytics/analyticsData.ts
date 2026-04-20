import { Clock3, Eye, Mail, TrendingUp } from "lucide-react";

export const stats = [
  { title: "Total Enquiries", value: "1,284", delta: "+12%", icon: Mail, up: true },
  { title: "Profile Views", value: "42.5k", delta: "+8%", icon: Eye, up: true },
  { title: "Avg Conversion", value: "3.8%", delta: "-0.5%", icon: TrendingUp, up: false },
  { title: "Response Time", value: "15m", delta: "Stable", icon: Clock3, up: true },
];

export const reachAreas = [
  { area: "Eti-Osa", value: 92 },
  { area: "Ikeja", value: 78 },
  { area: "Lagos Island", value: 65 },
  { area: "Surulere", value: 40 },
  { area: "Lekki Ph 1", value: 32 },
];

export const listings = [
  { name: "Luxury Penthouse Staging", views: "12,402", clicks: "890", ctr: "7.1%", enquiries: "142", status: "Active" },
  { name: "Commercial Interior Refit", views: "8,110", clicks: "420", ctr: "5.2%", enquiries: "88", status: "Active" },
  { name: "Smart Home Consulting", views: "5,430", clicks: "215", ctr: "3.9%", enquiries: "54", status: "Boosted" },
  { name: "Bespoke Kitchen Design", views: "4,902", clicks: "180", ctr: "3.6%", enquiries: "31", status: "Active" },
];

export const trafficData = [30, 45, 40, 68, 54, 72, 50, 35, 63, 45];

export const heatmapData = [
  [25, 40, 35, 42, 55, 70, 58],
  [50, 68, 75, 85, 88, 90, 77],
  [45, 58, 65, 72, 81, 62, 49],
];
