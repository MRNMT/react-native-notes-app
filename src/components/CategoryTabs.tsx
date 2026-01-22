import React from 'react';

interface CategoryTabsProps {
    categories: string[];
    onSelect: (category: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ categories, onSelect }) => {
    return (
        <div>
            {categories.map(category => (
                <button key={category} onClick={() => onSelect(category)}>
                    {category}
                </button>
            ))}
        </div>
    );
};

export default CategoryTabs;