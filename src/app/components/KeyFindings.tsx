import React from 'react';

// Typdefinition för props
interface KeyFindingsProps {
  keyFindingsBlock: {
    basics: string;
    basicstext: string;
    goals: string;
    goalstext: string;
    problems: string;
    problemstext: string;
    solutions: string;
    solutionstext: string;
  };
}

const KeyFindings: React.FC<KeyFindingsProps> = ({ keyFindingsBlock }) => {
  // Kontrollerar om keyFindingsBlock finns innan rendering
  if (!keyFindingsBlock) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Basics */}
      <div className="flex flex-col p-4 bg-white rounded-lg">
        <h2 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-xl font-semibold">
          {keyFindingsBlock.basics}
        </h2>
        <p className="text-left text-sm sm:text-base md:text-lg font-light">
          {keyFindingsBlock.basicstext}
        </p>
      </div>

      {/* Goals */}
      <div className="flex flex-col p-4 bg-white rounded-lg">
        <h2 className="text-sm sm:text-base md:text-lg text-base sm:text-lg md:text-xl font-semibold">
          {keyFindingsBlock.goals}
        </h2>
        <p className="text-left text-sm sm:text-base md:text-lg font-light">
          {keyFindingsBlock.goalstext}
        </p>
      </div>

      {/* Problems */}
      <div className="flex flex-col p-4 bg-white rounded-lg">
        <h2 className="text-sm sm:text-base md:text-lg text-base sm:text-lg md:text-xl font-semibold">
          {keyFindingsBlock.problems}
        </h2>
        <p className="text-left text-sm sm:text-base md:text-lg font-light">
          {keyFindingsBlock.problemstext}
        </p>
      </div>

      {/* Solutions */}
      <div className="flex flex-col p-4 bg-white rounded-lg">
        <h2 className="text-sm sm:text-base md:text-lg text-base sm:text-lg md:text-xl font-semibold">
          {keyFindingsBlock.solutions}
        </h2>
        <p className="text-left text-sm sm:text-base md:text-lg font-light">
          {keyFindingsBlock.solutionstext}
        </p>
      </div>
    </div>
  );
};

export default KeyFindings;
