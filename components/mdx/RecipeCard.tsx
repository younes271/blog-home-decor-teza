// RecipeCard — structured recipe summary card for MDX content
// Requirements: 11.4

import React from 'react';

interface RecipeCardProps {
  title: string;
  prepTime?: string;
  cookTime?: string;
  totalTime?: string;
  servings?: string | number;
  calories?: string | number;
  difficulty?: 'easy' | 'medium' | 'hard';
  ingredients?: string[];
  instructions?: string[];
  notes?: string;
}

const difficultyLabel: Record<string, string> = {
  easy: '🟢 Easy',
  medium: '🟡 Medium',
  hard: '🔴 Hard',
};

export function RecipeCard({
  title,
  prepTime,
  cookTime,
  totalTime,
  servings,
  calories,
  difficulty,
  ingredients,
  instructions,
  notes,
}: RecipeCardProps) {
  return (
    <div className="my-8 rounded-theme border border-border bg-surface overflow-hidden" itemScope itemType="https://schema.org/Recipe">
      {/* Header */}
      <div className="bg-primary/10 px-6 py-4 border-b border-border">
        <h2 className="font-heading text-xl font-bold text-text" itemProp="name">{title}</h2>
      </div>

      {/* Meta row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border">
        {prepTime && (
          <div className="bg-surface px-4 py-3 text-center">
            <p className="text-xs text-textMuted uppercase tracking-wide">Prep</p>
            <p className="font-semibold text-text text-sm" itemProp="prepTime">{prepTime}</p>
          </div>
        )}
        {cookTime && (
          <div className="bg-surface px-4 py-3 text-center">
            <p className="text-xs text-textMuted uppercase tracking-wide">Cook</p>
            <p className="font-semibold text-text text-sm" itemProp="cookTime">{cookTime}</p>
          </div>
        )}
        {totalTime && (
          <div className="bg-surface px-4 py-3 text-center">
            <p className="text-xs text-textMuted uppercase tracking-wide">Total</p>
            <p className="font-semibold text-text text-sm" itemProp="totalTime">{totalTime}</p>
          </div>
        )}
        {servings && (
          <div className="bg-surface px-4 py-3 text-center">
            <p className="text-xs text-textMuted uppercase tracking-wide">Servings</p>
            <p className="font-semibold text-text text-sm" itemProp="recipeYield">{servings}</p>
          </div>
        )}
      </div>

      <div className="px-6 py-4 space-y-4">
        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          {calories && (
            <span className="text-xs bg-surface border border-border rounded-full px-3 py-1 text-textMuted">
              {calories} cal
            </span>
          )}
          {difficulty && (
            <span className="text-xs bg-surface border border-border rounded-full px-3 py-1 text-textMuted">
              {difficultyLabel[difficulty] ?? difficulty}
            </span>
          )}
        </div>

        {/* Ingredients */}
        {ingredients && ingredients.length > 0 && (
          <div>
            <h3 className="font-heading font-semibold text-text mb-2">Ingredients</h3>
            <ul className="space-y-1" itemProp="recipeIngredient">
              {ingredients.map((ing, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-textMuted">
                  <span aria-hidden="true" className="text-primary mt-0.5">•</span>
                  {ing}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Instructions */}
        {instructions && instructions.length > 0 && (
          <div itemProp="recipeInstructions">
            <h3 className="font-heading font-semibold text-text mb-2">Instructions</h3>
            <ol className="space-y-2">
              {instructions.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-textMuted">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary text-textOnPrimary text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Notes */}
        {notes && (
          <div className="rounded-theme bg-primary/5 border border-primary/20 p-3">
            <p className="text-xs font-semibold text-primary mb-1">📝 Notes</p>
            <p className="text-sm text-textMuted">{notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}
