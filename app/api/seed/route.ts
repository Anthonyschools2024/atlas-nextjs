// FIX: The 'db' import is no longer needed. We will use 'sql' directly.
import { sql } from "@vercel/postgres";
import bcrypt from "bcryptjs";
import { users, topics, questions } from "@/lib/placeholder-data";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// This function is no longer a separate export, but you can define it inside for clarity if you wish.
// We will put all the logic directly inside GET for simplicity.

export async function GET(request: NextRequest) {
  try {
    // The BEGIN command is not necessary when executing queries directly.
    // The library handles transactions implicitly for single queries.
    // For a script like this, we'll run commands sequentially.

    // Drop tables first to ensure a clean slate
    await sql`DROP TABLE IF EXISTS questions`;
    await sql`DROP TABLE IF EXISTS topics`;
    await sql`DROP TABLE IF EXISTS users`;
    await sql`DROP TABLE IF EXISTS answers`;

    // Create Extensions and Tables
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    
    // Create Users Table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    // Create Topics Table
    await sql`
      CREATE TABLE IF NOT EXISTS topics (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        title VARCHAR(255) NOT NULL
      );
    `;

    // Create Questions Table
    await sql`
      CREATE TABLE IF NOT EXISTS questions (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        topic_id UUID NOT NULL,
        votes INT NOT NULL,
        answer_id UUID
      );
    `;

    // Create Answers Table
    await sql`
      CREATE TABLE IF NOT EXISTS answers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        answer VARCHAR(255) NOT NULL,
        question_id UUID NOT NULL
      );
    `;
    
    console.log(`Created tables successfully.`);

    // Insert data into the tables
    
    // Insert Users
    await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return sql`
          INSERT INTO users (id, name, email, password)
          VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
          ON CONFLICT (id) DO NOTHING;
        `;
      })
    );
    console.log(`Seeded ${users.length} users.`);

    // Insert Topics
    await Promise.all(
      topics.map(
        (topic) => sql`
          INSERT INTO topics (id, title)
          VALUES (${topic.id}, ${topic.title})
          ON CONFLICT (id) DO NOTHING;
        `
      )
    );
    console.log(`Seeded ${topics.length} topics.`);

    // Insert Questions
    await Promise.all(
      questions.map(
        (question) => sql`
          INSERT INTO questions (id, title, topic_id, votes)
          VALUES (${question.id}, ${question.title}, ${question.topic_id}, ${question.votes})
          ON CONFLICT (id) DO NOTHING;
        `
      )
    );
    console.log(`Seeded ${questions.length} questions.`);
    
    // Insert Answers
    const answersData = [
      {
        id: "0b93d8dc-6e43-49e3-b59f-b67531247612",
        answer: "It's a new feature in TypeScript that makes it easier to write type-safe code.",
        question_id: "0b93d8dc-6e43-49e3-b59f-b67531247612",
      },
    ];
    await Promise.all(
      answersData.map(
        (answer) => sql`
          INSERT INTO answers (id, answer, question_id)
          VALUES (${answer.id}, ${answer.answer}, ${answer.question_id})
          ON CONFLICT (id) DO NOTHING;
        `
      )
    );
    console.log(`Seeded ${answersData.length} answers.`);

    revalidatePath("/", "layout");
    return NextResponse.json({ message: "Database seeded successfully" });
  } catch (error) {
    console.error('Database seeding error:', error);
    return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 });
  }
}

