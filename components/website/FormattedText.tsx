import { Fragment } from 'react';

interface FormattedTextProps {
  text?: string | null;
  className?: string;
  /** Styling preset: 'lead' for the larger intro paragraph, 'body' for normal copy. */
  variant?: 'lead' | 'body';
}

const BULLET_RE = /^([-*•]|\d+[.)])\s+/;

/**
 * Renders plain text written in the admin into nicely formatted, well-aligned
 * content. It understands:
 *   - Paragraphs separated by a blank line
 *   - Bullet lists (lines starting with -, *, or •)
 *   - Numbered lists (lines starting with 1. or 1))
 *   - Single line breaks inside a paragraph
 *
 * This keeps the editing experience simple (just a textarea) while guaranteeing
 * consistent, organised output across every service.
 */
export default function FormattedText({ text, className, variant = 'body' }: FormattedTextProps) {
  if (!text || !text.trim()) return null;

  const blocks = text
    .replace(/\r\n/g, '\n')
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  const paragraphClass =
    variant === 'lead'
      ? 'text-gray-600 text-lg leading-relaxed'
      : 'text-gray-700 leading-relaxed';

  return (
    <div className={className}>
      {blocks.map((block, blockIndex) => {
        const lines = block
          .split('\n')
          .map((line) => line.trim())
          .filter(Boolean);

        const isList = lines.length > 0 && lines.every((line) => BULLET_RE.test(line));

        if (isList) {
          const ordered = /^\d+[.)]\s+/.test(lines[0]);
          const items = lines.map((line) => line.replace(BULLET_RE, ''));

          if (ordered) {
            return (
              <ol
                key={blockIndex}
                className="mb-5 list-decimal space-y-2 pl-5 marker:font-semibold marker:text-accent"
              >
                {items.map((item, i) => (
                  <li key={i} className="pl-1 leading-relaxed text-gray-700">
                    {item}
                  </li>
                ))}
              </ol>
            );
          }

          return (
            <ul key={blockIndex} className="mb-5 space-y-2 pl-1">
              {items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 leading-relaxed text-gray-700">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p key={blockIndex} className={`mb-5 last:mb-0 ${paragraphClass}`}>
            {lines.map((line, i) => (
              <Fragment key={i}>
                {line}
                {i < lines.length - 1 && <br />}
              </Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}
