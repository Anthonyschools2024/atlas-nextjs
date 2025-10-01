'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { insertTopic, insertQuestion, incrementVotes } from './data';

/**
 * Server Action: Creates a new topic in the database.
 */
export async function createTopic(formData: FormData) {
  const title = formData.get('title') as string;

  // Basic validation
  if (!title || title.trim().length === 0) {
    // In a real app, you'd handle this more gracefully
    return;
  }

  await insertTopic({ title });

  // Revalidate the cache for the UI page to show the new topic
  revalidatePath('/ui');
  // Redirect the user back to the main topics page
  redirect('/ui');
}

/**
 * Server Action: Creates a new question for a specific topic.
 * @param topicId - The ID of the topic the question belongs to.
 * @param formData - The form data containing the question's title.
 */
export async function createQuestion(topicId: string, formData: FormData) {
  const title = formData.get('title') as string;

  if (!title || title.trim().length === 0) {
    return;
  }
  
  await insertQuestion({
    title,
    topic_id: topicId,
    votes: 0, // Questions start with 0 votes
  });

  // Revalidate the cache for the specific topic page to show the new question
  revalidatePath(`/ui/topics/${topicId}`);
}

/**
 * Server Action: Increments the vote count for a specific question.
 * @param questionId - The ID of the question to vote for.
 * @param topicId - The ID of the topic, used for revalidating the page.
 */
export async function incrementVote(questionId: string, topicId: string) {
  await incrementVotes(questionId);
  
  // Revalidate the cache for the specific topic page to show the new vote count
  revalidatePath(`/ui/topics/${topicId}`);
}// Define your server actions here
