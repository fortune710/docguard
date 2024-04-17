
# Project Title - DocGuard

This project is called DocGuard and it is a platform built for storing your most important documnents, and have your identity all in one login. 

## Project Motivation
Keeping tracks of all your paper/physical dcouments in a briefcase or safe space and be tedious to manage, for the following reasons:
1. They're liable to get misplaced if they're not kept properly
2. Sorting based on their categories is difficult
3. Looking through a stack of documents can be time-consuming

Existing digital solutions like Google Drive and Dropbox have the following issues: 
1. Documents tedious to access as search is broken 
2. Documents retrival time is slow
3. No way to determine what documents ahev expired out of the box


## DocGuard Features
With Features like QR code document retrieval, Expiry dates out of the box, inbox and notifications for documents about to expire, as well as AI-powered uploads, storing and retrieval of your identity has never been easier.

# Tech
DocGuard is built with the following technologies:
1. Next.js: For Client Side UI and Server Side Logic wit client and server Components.
2. TypeScript
3. Prisma: ORM for Database
4. PostgresSQL: Database
5. Google Cloud Platform: For Document Storage
6. Terraform: To provsion cloud resources on Google Cloud
7. Shadcn/ui: UI compoenent library
8. Bun: Runtime for running web application
9. Vercel: For deployments

## Installation
To get started with this project:
1. Clone the repository
```
git clone https://github.com/fortune710/docguard.git
cd docguard
```
2. Install all the dependencies
```
npm install
# or
bun install
# or 
yarn install
```

3. Run the applcation locally with
```
npm run dev
# or
bun run dev
```

4. Open http://localhost:3000 in your broswer to view the application



