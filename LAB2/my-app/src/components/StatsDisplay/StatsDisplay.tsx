import React from 'react';


export const StatsDisplay: React.FC<{ stats: TextStats; showReadingTime?: boolean }> = ({
  stats,
  showReadingTime = false,
}) => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg">
        <p><strong>Character Count:</strong> {stats.characterCount}</p>
        <p><strong>Word Count:</strong> {stats.wordCount}</p>
        {showReadingTime && (
            <p><strong>Estimated Reading Time:</strong> {stats.readingTime.toFixed(2)} minutes</p>
        )}
    </div>
  );
}