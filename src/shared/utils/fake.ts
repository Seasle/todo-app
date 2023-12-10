import { nanoid } from 'nanoid';
import { type Task } from '@/shared/types';

const DESCRIPTION_PROBABILITY = 0.3;
const PRIORITY_HIGH_PROBABILITY = 0.3;
const PRIORITY_NORMAL_PROBABILITY = 0.5;
const PRIORITY_LOW_PROBABILITY = 0.2;
const EXPIRES_IN_PROBABILITY = 0.35;
const IS_COMPLETED_PROBABILITY = 0.15;
const OVERDUE_PROBABILITY = 0.2;
const CREATED_AT_OFFSET = 2 * 24 * 60 * 60 * 1000;
const MIN_DURATION = 24 * 60 * 60 * 1000;
const MAX_DURATION = 7 * 24 * 60 * 60 * 1000;
const TITLE_LIPSUM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
const DESCRIPTION_LIPSUM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu porta metus. Aenean nec ipsum viverra, placerat arcu at, eleifend urna. Nullam in quam eu tellus vestibulum luctus. Proin tempus non velit a dictum. Suspendisse aliquam posuere blandit. Donec facilisis luctus diam in posuere. Maecenas ligula ex, finibus quis est at, efficitur volutpat neque.';

const tryProbability = (probability: number) => Math.random() <= probability;

const shuffle = ([...array]: string[]) => {
  let count = array.length;
  while (count) {
    const index = Math.floor(Math.random() * count--);
    [array[count], array[index]] = [array[index], array[count]];
  }
  return array;
};

const random = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const generateId = () => {
  return nanoid();
};

const generateText = (template: string) => {
  return shuffle(
    template
      .split('.')
      .map((entry) => entry.trim())
      .filter((entry) => entry.length > 0)
      .map((entry) => shuffle(entry.split(' ')).join(' ')),
  )
    .map((entry) =>
      entry[0]
        .toUpperCase()
        .concat(entry.slice(1).toLowerCase())
        .replace(/,$/g, ''),
    )
    .concat([''])
    .join('. ');
};

const generateTitle = () => {
  return generateText(TITLE_LIPSUM);
};

const generateDescription = () => {
  if (tryProbability(DESCRIPTION_PROBABILITY)) {
    return generateText(DESCRIPTION_LIPSUM);
  }

  return undefined;
};

const generatePriority = () => {
  if (tryProbability(PRIORITY_HIGH_PROBABILITY)) {
    return 'HIGH';
  }

  if (tryProbability(PRIORITY_NORMAL_PROBABILITY)) {
    return 'NORMAL';
  }

  if (tryProbability(PRIORITY_LOW_PROBABILITY)) {
    return 'LOW';
  }

  return undefined;
};

const generateCreatedAt = () => {
  const now = Date.now();
  const offset = random(-CREATED_AT_OFFSET, CREATED_AT_OFFSET);

  return new Date(now + offset).toISOString();
};

const generateExpiresIn = () => {
  if (tryProbability(EXPIRES_IN_PROBABILITY)) {
    if (tryProbability(OVERDUE_PROBABILITY)) {
      return new Date().toISOString();
    }

    const now = Date.now();
    const duration = random(MIN_DURATION, MAX_DURATION);

    return new Date(now + duration).toISOString();
  }

  return undefined;
};

const generateIsCompleted = () => {
  return tryProbability(IS_COMPLETED_PROBABILITY);
};

const generateFakeTask = (): Task => ({
  id: generateId(),
  title: generateTitle(),
  description: generateDescription(),
  priority: generatePriority(),
  createdAt: generateCreatedAt(),
  expiresIn: generateExpiresIn(),
  isCompleted: generateIsCompleted(),
});

export const generateFakeTasks = (count: number) =>
  new Array(count).fill(null).map(() => generateFakeTask());
