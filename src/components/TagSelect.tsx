import React from 'react';
import { Tag } from '../types/question';
import { defaultTags } from '../data/defaultTags';
import { X } from 'lucide-react';

interface TagSelectProps {
  selectedTags: Tag[];
  onTagSelect: (tag: Tag) => void;
  onTagRemove: (tagId: string) => void;
}

export function TagSelect({ selectedTags, onTagSelect, onTagRemove }: TagSelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');

  const availableTags = defaultTags.filter(
    (tag) => !selectedTags.some((selected) => selected.id === tag.id)
  );

  const filteredTags = availableTags.filter((tag) =>
    tag.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-white dark:bg-gray-800 min-h-[42px]">
        {selectedTags.map((tag) => (
          <span
            key={tag.id}
            className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-md text-sm"
          >
            {tag.name}
            <button
              onClick={() => onTagRemove(tag.id)}
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        <input
          type="text"
          placeholder="Search tags..."
          className="flex-1 min-w-[120px] border-none outline-none bg-transparent text-gray-700 dark:text-gray-300"
          onClick={() => setIsOpen(true)}
          onFocus={() => setIsOpen(true)}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {isOpen && (
        <>
          <div
            className="fixed inset-0"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border rounded-md shadow-lg max-h-60 overflow-auto">
            {filteredTags.length > 0 ? (
              filteredTags.map((tag) => (
                <button
                  key={tag.id}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                  onClick={() => {
                    onTagSelect(tag);
                    setSearchTerm('');
                  }}
                >
                  {tag.name}
                </button>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-500 dark:text-gray-400">
                No tags found
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}