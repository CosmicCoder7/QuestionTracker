import React, { useState } from 'react';
import { Clock, Github, Bookmark, BookmarkCheck, Eye } from 'lucide-react';
import { Question } from '../types/question';
import { Badge } from './ui/Badge';
import { formatDistanceToNow } from 'date-fns';
import { QuestionPreview } from './QuestionPreview';
import { Timer } from './Timer';

interface QuestionCardProps {
  question: Question;
  onToggleBookmark: (id: string) => void;
  onEdit: (question: Question) => void;
  onDelete: (id: string) => void;
}

export function QuestionCard({
  question,
  onToggleBookmark,
  onEdit,
  onDelete,
}: QuestionCardProps) {
  const [showPreview, setShowPreview] = useState(false);
  const {
    id,
    title,
    difficulty,
    status,
    githubLink,
    timeSpent,
    bookmarked,
    tags,
    createdAt,
  } = question;

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-all">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              {title}
            </h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant={difficulty.toLowerCase()}>{difficulty}</Badge>
              <Badge
                variant={status.toLowerCase().replace(' ', '')}
                className="capitalize"
              >
                {status}
              </Badge>
            </div>
          </div>
          <button
            onClick={() => onToggleBookmark(id)}
            className="text-gray-400 hover:text-yellow-500 transition-colors"
          >
            {bookmarked ? (
              <BookmarkCheck className="h-6 w-6" />
            ) : (
              <Bookmark className="h-6 w-6" />
            )}
          </button>
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span
                key={tag.id}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md text-sm"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
          <Timer questionId={id} initialTime={timeSpent} />
          <span className="text-gray-400">
            Added {formatDistanceToNow(createdAt)} ago
          </span>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setShowPreview(true)}
            className="text-sm px-3 py-1 bg-purple-50 dark:bg-purple-900 text-purple-600 dark:text-purple-300 rounded hover:bg-purple-100 dark:hover:bg-purple-800 flex items-center gap-1"
          >
            <Eye className="h-4 w-4" />
            Preview
          </button>
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm px-3 py-1 bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded hover:bg-blue-100 dark:hover:bg-blue-800 flex items-center gap-1"
            >
              <Github className="h-4 w-4" />
              Solution
            </a>
          )}
          <button
            onClick={() => onEdit(question)}
            className="text-sm px-3 py-1 bg-green-50 dark:bg-green-900 text-green-600 dark:text-green-300 rounded hover:bg-green-100 dark:hover:bg-green-800"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(id)}
            className="text-sm px-3 py-1 bg-red-50 dark:bg-red-900 text-red-600 dark:text-red-300 rounded hover:bg-red-100 dark:hover:bg-red-800"
          >
            Delete
          </button>
        </div>
      </div>

      {showPreview && (
        <QuestionPreview
          question={question}
          onClose={() => setShowPreview(false)}
        />
      )}
    </>
  );
}