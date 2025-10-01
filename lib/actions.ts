'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { insertTopic, insertQuestion, incrementVotes } from './data';
import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';

// ... (keep your existing createTopic, createQuestion, incrementVote functions)

export async function createTopic(formData: FormData) {
  const title = formData.get('title') as string;
  if (!title || title.trim().length === 0) { return; }
  await insertTopic({ title });
  revalidatePath('/ui');
  redirect('/ui');
}

export async function createQuestion(topicId: string, formData: FormData) {
  const title = formData.get('title') as string;
  if (!title || title.trim().length === 0) { return; }
  await insertQuestion({ title, topic_id: topicId, votes: 0 });
  revalidatePath(`/ui/topics/${topicId}`);
}

export async function incrementVote(questionId: string, topicId: string) {
  await incrementVotes(questionId);
  revalidatePath(`/ui/topics/${topicId}`);
}

// NEW: Server action for authentication
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

// NEW: Server action for signing out
export async function signOutAction() {
  await signOut();
}