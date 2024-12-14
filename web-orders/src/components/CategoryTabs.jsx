import React from 'react';
import { Tab } from '@headlessui/react';
import clsx from 'clsx';

export default function CategoryTabs({ categories, selectedCategory, onSelectCategory }) {
  return (
    <Tab.Group onChange={onSelectCategory}>
      <Tab.List className="flex space-x-1 rounded-xl bg-orange-100 p-1">
        {categories.map((category) => (
          <Tab
            key={category.id}
            className={({ selected }) =>
              clsx(
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-orange-400 focus:outline-none focus:ring-2',
                selected
                  ? 'bg-white shadow text-orange-700'
                  : 'text-orange-600 hover:bg-white/[0.12] hover:text-orange-700'
              )
            }
          >
            {category.name}
          </Tab>
        ))}
      </Tab.List>
    </Tab.Group>
  );
}