import React from 'react';
import Draggable from 'react-draggable';
import { X } from 'lucide-react';
import { Question } from '../types/question';
import { Badge } from './ui/Badge';
import { Timer } from './Timer';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface QuestionPreviewProps {
  question: Question;
  onClose: () => void;
}

export function QuestionPreview({ question, onClose }: QuestionPreviewProps) {
  return (
    <Draggable handle=".preview-handle">
      <div className="fixed top-1/4 left-1/4 w-3/4 max-w-3xl bg-white rounded-lg shadow-xl">
        <div className="preview-handle cursor-move border-b p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">{question.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Badge variant={question.difficulty.toLowerCase()}>
                {question.difficulty}
              </Badge>
              <Badge
                variant={question.status.toLowerCase().replace(' ', '')}
                className="capitalize"
              >
                {question.status}
              </Badge>
            </div>
            <Timer questionId={question.id} initialTime={question.timeSpent} />
          </div>

          <div className="prose max-w-none">
            <h3 className="text-lg font-medium">Description</h3>
            <p className="text-gray-700">{question.description}</p>
          </div>

          {question.solution && (
            <div>
              <h3 className="text-lg font-medium mb-2">Solution</h3>
              <SyntaxHighlighter
                language="javascript"
                style={vscDarkPlus}
                className="rounded-lg"
              >
                {question.solution}
              </SyntaxHighlighter>
            </div>
          )}

          {question.githubLink && (
            <div>
              <h3 className="text-lg font-medium mb-2">GitHub Solution</h3>
              <a
                href={question.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                View on GitHub
              </a>
            </div>
          )}
        </div>
      </div>
    </Draggable>
  );
}