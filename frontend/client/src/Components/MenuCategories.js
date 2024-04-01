import VerticalMenu from './VerticalMenu';

import { categories } from 'shared/categories';

const MenuCategories = () => {
    return (
        <div>
            <h2>Vertical Menu</h2>
            <VerticalMenu categories={categories} />
        </div>
    );
};

export default MenuCategories;