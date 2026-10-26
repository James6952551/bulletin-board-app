import { Calendars, MessagesCircle, Bug  } from 'lucide-react';
import { Heart, MessageCircle, StickyNote, SquarePlus  } from 'lucide-react';

export const Categories = [
    {label:"Event", value:"Event", icon:Calendars},
    {label:"Discussion", value:"Discussion", icon:MessagesCircle},
    {label:"Issue", value:"Issue", icon:Bug},
];

export const Tags = [
        {value:"nodejs", label:"nodejs"},
        {value:"nextjs", label:"nextjs"},
        {value:"react", label:"react"},
        {value:"tailwind", label:"tailwind"},
        {value:"javascript", label:"javascript"},
        {value:"typescript", label:"typescript"},
        {value:"bug", label:"bug"},
        {value:"ai", label:"ai"},
        {value:"css", label:"css"},
        {value:"frontend", label:"frontend"},
        {value:"database", label:"database"},
        {value:"postgresql", label:"postgresql"},
        {value:"architecture", label:"architecture"},
        {value:"system-design", label:"system-design"},      
    ];

export const Icon = {
  commentIcon: MessageCircle,
  likeIcon: Heart,
}

export const posts = [
  {
    "id": "post_1",
    "title": "Best practices for managing Server Actions in Next.js App Router?",
    "content": "Hey everyone! I'm refactoring an app to use Next.js Server Actions for form submissions. How do you usually handle loading states and error handling cleanly across components?\n\n```tsx\n// Example of what I'm trying right now\nasync function handleSubmit(formData: FormData) {\n  'use server';\n  // logic here\n}\n```",
    "category": "Discussion",
    "author": {
      "id": "user_101",
      "username": "dev_sarah",
      "avatarUrl": "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah"
    },
    "createdAt": "2026-10-08T09:30:00Z",
    "tags": ["nextjs", "react", "typescript"],
    "commentsCount": 3,
    "likesCount": 14
  },
  {
    "id": "post_2",
    "title": "Bug: Hydration error when using local storage in React components",
    "content": "I keep running into the classic `Text content does not match server-rendered HTML` error whenever I try to read user theme preferences from `localStorage` on initial load. What's the cleanest workaround for this in Next.js?",
    "category": "Issue",
    "author": {
      "id": "user_102",
      "username": "alex_codes",
      "avatarUrl": "https://api.dicebear.com/7.x/avataaars/svg?seed=alex"
    },
    "createdAt": "2026-10-07T14:15:00Z",
    "tags": ["react", "nextjs", "bug"],
    "commentsCount": 1,
    "likesCount": 8
  },
  {
    "id": "post_3",
    "title": "Virtual Meetup: Building AI-Powered CLI Tools with Node.js",
    "content": "Join us this coming Friday for a live coding session where we build a command-line interface tool integrated with the OpenAI API using TypeScript and Node.js. Beginners and experienced devs are all welcome!",
    "category": "Event",
    "author": {
      "id": "user_103",
      "username": "tech_lead_dan",
      "avatarUrl": "https://api.dicebear.com/7.x/avataaars/svg?seed=dan"
    },
    "createdAt": "2026-10-06T18:00:00Z",
    "eventDetails": {
      "scheduledFor": "2026-10-16T18:00:00Z",
      "location": "Online (Zoom Link in RSVP)"
    },
    "tags": ["nodejs", "typescript", "ai", "event"],
    "commentsCount": 5,
    "likesCount": 27
  },
  {
    "id": "post_4",
    "title": "Tailwind CSS v4 vs v3: What are your migration pain points?",
    "content": "I just started experimenting with Tailwind CSS v4 using the CSS-first configuration (`@theme`). It feels much faster, but some plugins and custom utility configurations broke. Has anyone migrated a large production app yet? How was the experience?\n\n```css\n/* Tailwind v4 CSS-first config style */\n@theme {\n  --color-brand-primary: #3b82f6;\n}\n```",
    "category": "Discussion",
    "author": {
      "id": "user_104",
      "username": "frontend_emma",
      "avatarUrl": "https://api.dicebear.com/7.x/avataaars/svg?seed=emma"
    },
    "createdAt": "2026-10-08T11:45:00Z",
    "tags": ["tailwind", "css", "frontend"],
    "commentsCount": 6,
    "likesCount": 22
  },
  {
    "id": "post_5",
    "title": "PostgreSQL connection pool exhausted under high load in serverless environment",
    "content": "We are hosting a Next.js app on Vercel connected to a PostgreSQL database. Under heavy traffic spikes, we keep getting `too many clients already` errors. We are using Prisma ORM. Are you guys using connection poolers like PgBouncer, or how do you manage serverless connection limits?",
    "category": "Issue",
    "author": {
      "id": "user_105",
      "username": "backend_mike",
      "avatarUrl": "https://api.dicebear.com/7.x/avataaars/svg?seed=mike"
    },
    "createdAt": "2026-10-07T22:10:00Z",
    "tags": ["postgresql", "prisma", "database", "devops"],
    "commentsCount": 4,
    "likesCount": 19
  },
  {
    "id": "post_6",
    "title": "Workshop: Intro to System Design for Mid-Level Developers",
    "content": "Moving from junior/mid-level to senior often requires mastering system design. This weekend, I'm hosting a hands-on workshop breaking down how to design a scalable URL shortener and handle cache invalidation.\n\nWe will cover load balancers, database sharding, and Redis caching strategies.",
    "category": "Event",
    "author": {
      "id": "user_106",
      "username": "architect_rachel",
      "avatarUrl": "https://api.dicebear.com/7.x/avataaars/svg?seed=rachel"
    },
    "createdAt": "2026-10-05T14:00:00Z",
    "eventDetails": {
      "scheduledFor": "2026-10-18T15:00:00Z",
      "location": "Discord Stage / Live Stream"
    },
    "tags": ["system-design", "architecture", "career", "event"],
    "commentsCount": 12,
    "likesCount": 45
  },
  {
    "id": "post_7",
    "title": "Quick tip: Use `Array.prototype.groupBy` instead of Lodash",
    "content": "Just a reminder that native JavaScript now supports `Object.groupBy()` and `Map.groupBy()` natively across modern browsers and Node.js. No need to pull in external utility libraries for simple grouping operations anymore!\n\n```javascript\nconst inventory = [\n  { name: 'asparagus', type: 'vegetable' },\n  { name: 'bananas', type: 'fruit' },\n  { name: 'broccoli', type: 'vegetable' },\n];\n\nconst result = Object.groupBy(inventory, ({ type }) => type);\n// Result: { vegetable: [...], fruit: [...] }\n```",
    "category": "Discussion",
    "author": {
      "id": "user_107",
      "username": "js_ninja",
      "avatarUrl": "https://api.dicebear.com/7.x/avataaars/svg?seed=ninja"
    },
    "createdAt": "2026-10-04T08:20:00Z",
    "tags": ["javascript", "es2024", "tips"],
    "commentsCount": 2,
    "likesCount": 38
  }
];