export const menuCategories = [{
        id: 'pho',
        name: 'Phở',
        description: 'Traditional Vietnamese noodle soup'
    },
    {
        id: 'rice',
        name: 'Cơm',
        description: 'Rice dishes'
    },
    {
        id: 'banh-mi',
        name: 'Bánh Mì',
        description: 'Vietnamese sandwiches'
    }
];

export const menuItems = [{
        id: 1,
        categoryId: 'pho',
        name: 'Phở Bò',
        description: 'Vietnamese beef noodle soup with herbs',
        price: '89,000₫',
        image: 'https://source.unsplash.com/featured/?pho',
        spicyLevel: 1,
        isPopular: true
    },
    {
        id: 2,
        categoryId: 'pho',
        name: 'Phở Gà',
        description: 'Chicken noodle soup with fresh herbs',
        price: '79,000₫',
        image: 'https://source.unsplash.com/featured/?chickensoup',
        spicyLevel: 1,
        isPopular: false
    },
    {
        id: 3,
        categoryId: 'rice',
        name: 'Cơm Tấm Sườn',
        description: 'Broken rice with grilled pork chop',
        price: '65,000₫',
        image: 'https://source.unsplash.com/featured/?grilledpork',
        spicyLevel: 0,
        isPopular: true
    },
    {
        id: 4,
        categoryId: 'rice',
        name: 'Cơm Gà Xối Mỡ',
        description: 'Rice with crispy fried chicken',
        price: '75,000₫',
        image: 'https://source.unsplash.com/featured/?friedchicken',
        spicyLevel: 0,
        isPopular: true
    },
    {
        id: 5,
        categoryId: 'banh-mi',
        name: 'Bánh Mì Thịt',
        description: 'Vietnamese sandwich with cold cuts and pate',
        price: '35,000₫',
        image: 'https://source.unsplash.com/featured/?sandwich',
        spicyLevel: 2,
        isPopular: true
    },
    {
        id: 6,
        categoryId: 'banh-mi',
        name: 'Bánh Mì Gà',
        description: 'Vietnamese sandwich with grilled chicken',
        price: '39,000₫',
        image: 'https://source.unsplash.com/featured/?chickensandwich',
        spicyLevel: 1,
        isPopular: false
    }
];